import path from 'path'
import os from 'os'
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
