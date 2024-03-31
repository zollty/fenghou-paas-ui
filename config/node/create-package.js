// gulpjs是一个前端构建工具,而且gulpjs使用的是nodejs中stream来读取和操作数据，其速度更快。
import gulp from 'gulp'
// Inquirer 是常规交互式命令行用户接口的集合，提供给 Node.js 一个方便嵌入，漂亮的命令行接口
import inquirer from 'inquirer'
// 文件重命名
import rename from 'gulp-rename'
// gulp-replace这是一款gulp3的字符串替换插件
import replace from 'gulp-replace'
// 导入文件系统模块(fs)语法
import fs from 'fs'
// path 模块提供了一些用于处理文件路径的小工具
import path from 'path'
// child_process 模块提供了以与 popen(3) 类似但不完全相同的方式衍生子进程的能力
import child_process from 'child_process'
import { fileURLToPath } from 'url'
const filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filename)


//先定好询问开发者创建模块信息，可以根据需要添加
const queryPageInfo = async () => {
  const answer2 = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'please input package key ?',
      validate(input) {
        return Boolean(input)
      }
    },
    {
      type: 'input',
      name: 'desc',
      message: '请输入package的中文名 ?',
      validate(input) {
        return Boolean(input)
      }
    }
  ])
  return Object.assign({}, answer2)
}
/**创建文件 */
const createModule = async info =>
  new Promise((resolve, reject) => {
    console.log(info, '------>>>>>')
    // path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
    const dest = path.resolve(`packages/${info.name}`)
    // child_process.exec()完成后将 stdout 和 stderr 传给回调函数， child_process.exec()的同步版本，其将阻塞 Node.js 事件循环
    child_process.execSync(`mkdir ${dest}`)
    // 开始创建
    gulp
      .src([
        // 正常文件
        `${__dirname}/template/**/*`
      ])
      // 替换模板内容
      .pipe(replace('{{name}}', info.name))
      .pipe(replace('{{desc}}', info.desc))
      /*  .pipe(
        rename(path => {
          // 只修改文件名
          if (path.extname) {
            path.basename = info.name
          }
        })
      ) */
      .pipe(gulp.dest(dest))
      .on('end', () => {
        // 提示
        console.log(`>>> [${info.name}]文件夹创建完毕，结果在[${dest}]/*中查看`)
        resolve(true)
      })
  })

/**入口函数 */
const main = async () => {
  try {
    const moduleInfo = await queryPageInfo()
    await createModule(moduleInfo)
    console.log('创建完毕！')
  } catch (error) {
    console.error('创建失败！', error)
  }
}
main().then()
