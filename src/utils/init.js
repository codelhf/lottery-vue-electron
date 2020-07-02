import os from 'os'
import path from 'path'
import fse from 'fs-extra'

// 配置文件和数据文件目录
const homeDir = path.join(os.homedir(), '.lottery')

// 将数据存至系统用户目录，防止用户误删程序
export const configPath = path.join(homeDir, 'config.json')
fse.ensureFileSync(configPath)

// 将数据存至系统用户目录，防止用户误删程序
export const dataPath = path.join(homeDir, 'data.json')
fse.ensureFileSync(dataPath)

// 将图片存至系统用户目录，防止用户误删程序
export const imagePath = path.join(homeDir, 'img')
fse.ensureDirSync(imagePath)

// 清空系统用户目录下未使用图片
export function clearImage(usedImageList) {
  const files = fse.readdirSync(imagePath) // 读取该文件夹
  files.map(file => {
    let isUsed = false
    usedImageList.map(item => {
      const imageName = item.substr(item.lastIndexOf('/') + 1)
      if (file === imageName) {
        isUsed = true
      }
    })
    if (!isUsed) {
      fse.unlinkSync(path.join(imagePath, file))
      isUsed = false
    }
  })
}
