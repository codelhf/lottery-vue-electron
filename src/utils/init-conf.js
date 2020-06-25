import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import LodashId from 'lodash-id'
import { configPath } from './init'
import packageJson from '../../package.json'

const db = lowdb(new FileSync(configPath))
// lowdb虽然无法很方便地创建一个自增的id字段，但是通过lodash-id这个插件
// 可以很方便地为每个新增的数据自动加上一个唯一标识的id字段。
db._.mixin(LodashId)// 通过._.mixin()引入

if (!db.has('tokens').value()) {
  db.defaults({
    tokens: {
      admin: {
        token: 'admin-token'
      },
      adminPwd: '123456',
      editor: {
        token: 'editor-token'
      },
      editorPwd: '111111'
    }
  }).write()
}

if (!db.has('users').value()) {
  db.defaults({
    users: {
      'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      },
      'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
      }
    }
  }).write()
}

if (!db.has('version').value()) {
  db.defaults({
    version: packageJson.version
  }).write()
}

export default db
