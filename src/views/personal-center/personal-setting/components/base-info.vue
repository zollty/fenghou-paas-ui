<template>
  <div class="base-info">
    <a-form
      ref="formRef"
      :model="formParams"
      :rules="rules"
      :style="{ width: '400px', marginLeft: '100px' }"
    >
      <a-form-item field="username" label="用户名">
        <a-input v-model="formParams.username" disabled />
      </a-form-item>
      <a-form-item field="nickname" label="姓名">
        <a-input v-model="formParams.nickname" />
      </a-form-item>
      <a-form-item field="orgName" label="组织机构">
        <a-input v-model="formParams.orgName" disabled />
      </a-form-item>
      <a-form-item field="telephone" label="手机号码">
        <a-input v-model="formParams.telephone" />
      </a-form-item>
      <a-form-item field="email" label="邮箱">
        <a-input v-model="formParams.email" />
      </a-form-item>
      <a-form-item field="sex" label="性别">
        <a-select
          v-model="formParams.sex"
          :options="[
            { label: '男', value: 1 },
            { label: '女', value: 2 },
            { label: '其他', value: 3 }
          ]"
        />
      </a-form-item>
      <a-form-item field="age" label="年龄">
        <a-input-number v-model="formParams.age" />
      </a-form-item>
      <div class="footer">
        <a-button
          type="primary"
          class="save-btn"
          @click="dealSave"
          :disabled="!isUpdate"
          >保存信息</a-button
        >
      </div>
    </a-form>
    <a-space direction="vertical" class="upload-img">
      <div class="title">头像:</div>
      <div class="img-content">
        <img
          :src="headerImg && headerImg.url ? headerImg.url : ''"
          alt=""
          class="left-img"
        />
        <div class="right-upload">
          <div class="text">上传新头像</div>
          <a-upload
            :action="envVar.VITE_APP_UPLOAD_URL"
            :file-list="fileList"
            :custom-icon="getCustomIcon()"
            :auto-upload="false"
            :limit="1"
            @change="onChange"
            ref="uploadRef"
          />
          <div :class="`msg ${isLimt ? 'error-msg' : ''}`">
            文件大小最大不能超过1000k
          </div>
        </div>
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { updatePersonal, UserInfo } from "@/api/userInfo"
import { computed, ref, watch, h } from "vue"
import getUser from "@/hooks/getUser"
import {
  FieldRule,
  FileItem,
  FormInstance,
  Message
} from "@arco-design/web-vue"
import { cloneDeep } from "lodash"
import { objEqual } from "@/utils/tools"
import IconUpload from "@arco-design/web-vue/es/icon/icon-upload"
import IconFileAudio from "@arco-design/web-vue/es/icon/icon-file-audio"
import IconClose from "@arco-design/web-vue/es/icon/icon-close"
import IconFaceFrownFill from "@arco-design/web-vue/es/icon/icon-face-frown-fill"
import { envVar } from "@/config"
import { upload } from "@/api/createdApi"

const rules: Record<string, FieldRule | FieldRule[]> = {
  nickname: { required: true, message: "请输入姓名" }
}
const formRef = ref<FormInstance>()
const { userInfo, getUserInfoByApi } = getUser()
const formParams = ref<UserInfo>({})
const headerImg = ref<FileItem>()
const uploadRef = ref()
const max = 1000 * 1024
const isLimt = ref(false)
const fileList = ref<FileItem[]>([])

watch(
  () => userInfo.value,
  () => {
    Object.assign(formParams.value, userInfo.value)
    if (userInfo.value.avatar) {
      headerImg.value = {
        uid: "",
        url: userInfo.value.avatar
      }
    }
  },
  { deep: true, immediate: true }
)
const isUpdate = computed(() => {
  return (
    !objEqual(formParams.value, userInfo.value) ||
    (!userInfo.value.avatar && headerImg.value) ||
    (userInfo.value.avatar &&
      headerImg.value &&
      userInfo.value.avatar !== headerImg.value.url)
  )
})

const dealSave = async () => {
  try {
    const result = await formRef.value?.validate()
    if (result) {
      Message.warning("请完善表单")
      return
    }
    //先上传头像
    const img = await uploadImg()
    const res = await updatePersonal(
      Object.assign({}, formParams.value, {
        username: undefined,
        orgName: undefined,
        avatar: img ? img : userInfo.value.avatar
      })
    )
    if (!res[1] || !res[1].success || !res[1].data) {
      Message.warning(res[1].msg)
      return
    }
    Message.success("更新成功")
    headerImg.value = undefined
    fileList.value = []
    getUserInfoByApi()
  } catch (error) {
    Message.error(error)
  }
}
const uploadImg = async () => {
  try {
    if (
      !(
        (!userInfo.value.avatar && headerImg.value) ||
        (userInfo.value.avatar &&
          headerImg.value &&
          userInfo.value.avatar !== headerImg.value.url)
      )
    ) {
      return ""
    }
    const form = new FormData()
    form.append("file", headerImg.value.file)
    const res = await upload(form)
    console.log("upload", res)
    if (!res[1] || (res[1] as any[]).length < 1) {
      Message.error("上传头像失败")
      return ""
    }
    return (res[1][0] as unknown as any).url
  } catch (error) {
    console.log(error)
  }
}
const getCustomIcon = () => {
  return {
    retryIcon: () => h(IconUpload),
    cancelIcon: () => h(IconClose),
    fileIcon: () => h(IconFileAudio),
    removeIcon: () => h(IconClose),
    errorIcon: () => h(IconFaceFrownFill),
    fileName: (file) => {
      return `文件名： ${file.name}`
    }
  }
}
const onChange = (_, currentFile: FileItem) => {
  if (currentFile.file.size > max) {
    isLimt.value = true
    return
  }
  headerImg.value = {
    ...currentFile
  }
}
</script>

<style scoped lang="less">
.base-info {
  width: 100%;
  padding: 20px 0;
  display: flex;
}
.upload-img {
  color: var(--color-text-2);
  margin-left: 50px;
}
.footer {
  display: flex;
  justify-content: center;
}
.save-btn {
  width: 100px;
}
.img-content {
  display: flex;
}
.left-img {
  margin-right: 30px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.right-upload {
  .text {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .msg {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
  }
  .error-msg {
    color: rgb(218, 86, 112);
  }
}
:deep(.arco-upload-progress) {
  display: none;
}
</style>
