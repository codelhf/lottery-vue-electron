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
  db.defaults({
    prizes: [
      {
        'id': '9ef723f8-c742-46d5-a15d-ada18d6add5b',
        'image': '',
        'name': 'AA',
        'description': 'AA',
        'stock': 0,
        'number': 1,
        'resetStock': 3,
        'operateTime': 1593438828509
      },
      {
        'id': '6be1c5fb-11d9-4191-a4d7-3fbd16f5de54',
        'image': '',
        'name': 'BB',
        'description': 'BB',
        'stock': 1,
        'number': 2,
        'resetStock': 1,
        'operateTime': 1593438840415
      },
      {
        'id': '345d3d08-eef1-460d-a42b-859d9339b064',
        'image': '',
        'name': 'CC',
        'description': 'CC',
        'stock': 3,
        'number': 3,
        'resetStock': 3,
        'operateTime': 1593438852656
      }
    ]
  }).write()
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
  db.defaults({
    users: [
      {
        'id': '74534cd8-bf51-4445-9d14-6ab55e36e453',
        'prizeId': '9ef723f8-c742-46d5-a15d-ada18d6add5b',
        'avatar': '',
        'username': '01',
        'description': '01',
        'operateTime': 1593438962883
      },
      {
        'id': '3cf1f74a-6126-47b7-b0e8-2e2bd10e76c2',
        'avatar': '',
        'username': '02',
        'description': '02',
        'operateTime': 1593444997927
      },
      {
        'id': '7fcc740e-7c63-4e37-9326-f942649dc4b9',
        'avatar': '',
        'username': '03',
        'description': '03',
        'operateTime': 1593445309643
      },
      {
        'id': '89b80046-434f-4710-a0ce-9760fdcd8300',
        'avatar': '',
        'username': '04',
        'description': '04',
        'operateTime': 1593445309645
      },
      {
        'id': '6bd73462-3820-439b-98a6-55b37fe9c663',
        'avatar': '',
        'username': '05',
        'description': '05',
        'operateTime': 1593445309647
      },
      {
        'id': '93c84ca8-53d6-462d-9a59-bf2a0f03b67f',
        'avatar': '',
        'username': '06',
        'description': '06',
        'operateTime': 1593445309648
      },
      {
        'id': 'cb81db1e-48bb-4e4d-9949-d5788ff85595',
        'avatar': '',
        'username': '07',
        'description': '07',
        'operateTime': 1593443016451
      },
      {
        'id': '20b94e63-9b29-406c-8016-efd6c4251841',
        'avatar': '',
        'username': '08',
        'description': '08',
        'operateTime': 1593443016451
      },
      {
        'id': '16c83e7c-bb43-4fa8-9aa3-022ade538636',
        'avatar': '',
        'username': '09',
        'description': '09',
        'operateTime': 1593443016451
      },
      {
        'id': '388888cb-e774-4fec-97ef-43db73708886',
        'avatar': '',
        'username': '10',
        'description': '10',
        'operateTime': 1593443016451
      }
    ]
  }).write()
}

export default db
