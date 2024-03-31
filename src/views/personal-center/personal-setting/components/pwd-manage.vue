<template>
  <div class="pwd-manage">
    <div class="pwd-fix">
      <div class="title">请输入原密码进行验证以修改密码</div>
      <a-form
        class="pwd-form"
        ref="formRef"
        :model="formParams"
        :rules="rules"
        auto-label-width
      >
        <template v-if="updateType === 'password'">
          <a-form-item field="oldPwd" label="原密码">
            <a-input-password v-model="formParams.oldPwd" />
          </a-form-item>
        </template>
        <template v-else>
          <a-form-item field="cellphone" label="电话号码">
            <a-input v-model="formParams.cellphone" />
          </a-form-item>
          <a-form-item field="smsCaptcha" label="验证码">
            <a-input v-model="formParams.smsCaptcha">
              <template #suffix>
                <a-button type="text" @click="handleGetSmsCode">{{
                  smsText
                }}</a-button>
              </template>
            </a-input>
          </a-form-item>
        </template>
        <a-form-item field="newPwd" label="新密码">
          <a-input-password v-model="formParams.newPwd" />
        </a-form-item>
        <a-form-item field="newPwds" label="确认密码">
          <a-input-password v-model="formParams.newPwds" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" class="save-btn" @click="handleSave"
            >保存信息</a-button
          >
        </a-form-item>
      </a-form>
      <div class="message-content">
        <div :class="['icon', [message.type]]">
          <IconCheckCircleFill v-if="message.type === 'success'" />
          <IconInfoCircleFill v-if="message.type === 'error'" />
        </div>
        <div class="message">{{ message.text }}</div>
      </div>
    </div>
    <div class="check-update-type">
      <div class="text">
        <IconCheckCircleFill class="icon" />
        <span class="text" v-if="updateType === 'password'"
          >如果忘记密码，且您的手机还在正常使用，可选择手机验证码的方式。</span
        >
        <span class="text" v-else
          >如果手机验证方式失败，可选择原密码方式进行验证。（如无法获取手机验证码，请联系管理员进行修改。）</span
        >
      </div>
      <div class="type-btn" @click="changeType">
        {{ updateType === "password" ? "手机验证码方式" : "原密码方式" }}
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  captchaSmsGet,
  changePassword,
  changePasswordBySms,
  checkPersonalCellphone,
  getPublicKey
} from "@/api/userInfo"
import { FieldRule, Message } from "@arco-design/web-vue"
import {
  IconInfoCircleFill,
  IconCheckCircleFill
} from "@arco-design/web-vue/es/icon"
import { onMounted, ref } from "vue"
import { sm2 } from "sm-crypto"
import md5 from "js-md5"
import { DefaultReturn } from "@/api/createdApi/server"

interface Params {
  oldPwd?: string
  newPwd?: string
  newPwds?: string
  cellphone?: string
  smsCaptcha?: string
}
type UpdateType = "password" | "sms"
const updateType = ref<UpdateType>("password")

const formParams = ref<Params>({})
const formRef = ref()

/**输入框电话号码是否为用户号码 */
const isUserPhone = ref(true)

/**会话id */
let sessionId = ""
const getSessionId = () => {
  // 获取sessionId
  if (!localStorage.getItem("sessionId")) {
    // 随机生成sessionId
    // this.sessionId = Math.random().toFixed(6).slice(-6)
    sessionId = getUuid()
    localStorage.setItem("sessionId", sessionId)
  } else {
    sessionId = localStorage.getItem("sessionId")
  }
}
/**获取uuid */
const getUuid = () => {
  let code = ""
  let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = chars.length
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return code
}

const changeType = () => {
  if (updateType.value === "password") {
    formParams.value.oldPwd = undefined
    updateType.value = "sms"
  } else {
    formParams.value.cellphone = undefined
    formParams.value.smsCaptcha = undefined
    updateType.value = "password"
  }
  clearMessage()
}
/**验证码文本 */
const smsText = ref("发送验证码")
let smsTimer = null
/**获取短信验证码 */
const handleGetSmsCode = async () => {
  if (!["发送验证码", "重新发送"].includes(smsText.value)) return
  smsText.value = ""
  //先校验手机号是否合法
  const result = await formRef.value?.validateField("cellphone")
  if (result) {
    smsText.value = "重新发送"
    return
  }
  try {
    /**先判断是否是用户手机号 */
    const tellRes = await checkPersonalCellphone(formParams.value.cellphone)
    console.log("phone", tellRes)
    if (!tellRes[1] || !tellRes[1].success) {
      smsText.value = "重新发送"
      if (tellRes[1]) {
        isUserPhone.value = false
        //触发手机号验证
        await formRef.value?.validateField("cellphone")
        isUserPhone.value = true
        return
      }
      setMessage("error", "发送验证码失败，请联系管理员查看原因")
      return
    }
    //发送验证码
    const res = await captchaSmsGet({
      cellphone: formParams.value.cellphone,
      useType: "chpwd",
      sessionId
    })
    console.log("sms", res)
    if (!res[1] || !res[1].success) {
      setMessage("error", "发送验证码失败，请联系管理员查看原因")
      smsText.value = "重新发送"
      return
    }
    let second = 60
    smsText.value = `${second}秒后重发`
    clearInterval(smsTimer)
    smsTimer = setInterval(() => {
      smsText.value = `${second}秒后重发`
      second--
      if (second <= 0) {
        clearInterval(smsTimer)
        smsText.value = "重新发送"
      }
    }, 1000)
  } catch (error) {
    smsText.value = "重新发送"
    console.log(error)
  }
}
const handleSave = async () => {
  console.log("update", formParams.value)
  //验证表单
  const result = await formRef.value?.validate()
  if (result) return
  try {
    //先获取用户公钥
    const publicKeyRes = await getPublicKey()
    if (!publicKeyRes[1] || !publicKeyRes[1].success) {
      console.log("获取公钥失败")
      Message.error("获取公钥失败")
      return
    }
    const publicKey = publicKeyRes[1].data
    let res: [any, DefaultReturn<any>] = [undefined, undefined]
    //使用sm2加密新密码
    const newPassword = sm2.doEncrypt(formParams.value.newPwd, publicKey, 1)
    if (updateType.value === "password") {
      //通过旧密码修改
      //使用md5加密旧密码
      const oldPassword = md5(formParams.value.oldPwd)
      //执行修改
      res = await changePassword({ newPassword, oldPassword })
    } else {
      res = await changePasswordBySms(
        {
          cellphone: formParams.value.cellphone,
          smsCaptcha: formParams.value.smsCaptcha,
          newPassword
        },
        sessionId
      )
    }
    if (res[1] && res[1].success) {
      setMessage("success", "修改成功")
      return
    }
    console.log(res)
    if (res[1] && !res[1].success) {
      setMessage("error", "修改失败," + res[1].errorMsg)
      return
    }
    setMessage("error", "修改失败，请重新输入，或联系管理员进行修改")
  } catch (error) {
    console.log(error)
    Message.error(error)
  }
}
const rules: Record<string, FieldRule | FieldRule[]> = {
  oldPwd: [{ required: true, message: "请输入原密码" }],
  cellphone: [
    { required: true, message: "请输入手机号码" },
    {
      validator(values, callBack) {
        const reg = /^1[3-9]([0-9])\d{8}$/
        if (!reg.test(values)) {
          callBack("手机号码格式不正确")
        }
      }
    },
    {
      validator(values, callBack) {
        if (!isUserPhone.value) {
          callBack("手机号与用户手机号不一致")
        }
      }
    }
  ],
  smsCaptcha: [{ required: true, message: "请输入验证码" }],
  newPwd: [
    { required: true, message: "请输入新密码" },
    {
      maxLength: 18,
      minLength: 6,
      message: "密码应至少包含数字和大小写字母，长度为8-16位"
    },
    {
      validator: (values, callBack) => {
        const reg =
          /^(?![0-9]+$)(?![a-zA-Z]+$)(?![0-9\W]+$)(?![a-zA-Z\W]+$)[0-9A-Za-z\W]{8,16}$/
        if (!reg.test(values)) {
          callBack("密码应至少包含数字和大小写字母，长度为8-16位")
        }
      }
    }
  ],
  newPwds: [
    { required: true, message: "请确认密码" },
    {
      validator: (values, callBack) => {
        if (values !== formParams.value.newPwd) {
          callBack("两次密码不一致")
        }
      }
    }
  ]
}
const message = ref({
  type: "",
  text: ""
})
const setMessage = (type: string, text: string) => {
  message.value = {
    type,
    text
  }
}
const clearMessage = () => {
  message.value = {
    type: "",
    text: ""
  }
}

onMounted(() => {
  getSessionId()
})
</script>

<style scoped lang="less">
.pwd-manage {
  width: 100%;
  padding: 20px 0 20px 100px;
  display: flex;
  flex-direction: column;
  // align-items: center;
}
.pwd-fix {
  width: 400px;
  .title {
    color: var(--color-text-2);
  }
}
.pwd-form {
  width: 100%;
  margin-top: 20px;
}
.message-content {
  display: flex;
  align-items: center;
  margin-left: 50px;
  margin-bottom: 20px;
  .icon {
    font-size: 22px;
    margin-right: 15px;
    &.success {
      color: darkgreen;
    }
    &.error {
      color: rgb(194, 75, 75);
    }
  }
}
.check-update-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 30px;
  width: 600px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  .text {
    color: sandybrown;
  }
  .type-btn {
    margin-top: 10px;
    padding: 5px;
    border: 1px solid rgb(83, 83, 179);
    color: rgb(83, 83, 179);
    cursor: pointer;
  }
}
</style>
