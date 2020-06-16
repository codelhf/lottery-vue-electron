import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import LodashId from 'lodash-id'
import { dataPath } from './init'

const db = lowdb(new FileSync(dataPath))
// lowdb虽然无法很方便地创建一个自增的id字段，但是通过lodash-id这个插件
// 可以很方便地为每个新增的数据自动加上一个唯一标识的id字段。
db._.mixin(LodashId) // 通过._.mixin()引入

/**
 * 奖品表 prize
 * id 奖品唯一标识
 * image 奖品图片
 * name 奖品名称
 * description 奖品描述
 * stock 奖品数量
 * reset_stock 重置数量
 * number 奖品顺序
 * operate_time 操作时间
 */
if (!db.has('prizes').value()) {
  db.defaults({ prizes: [] }).write()
}

/**
 * 用户表 user
 * id 用户唯一标识
 * prize_id 奖品唯一标识
 * avatar 用户头像
 * username 用户名称
 * description 用户描述
 * operate_time 操作时间
 */
if (!db.has('users').value()) {
  db.defaults({ users: [] }).write()
}

export default db
