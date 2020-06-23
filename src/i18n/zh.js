export default {
  route: {
    dashboard: '首页',
    prize: '奖品管理',
    users: '人员管理'
  },
  navbar: {
    github: '项目地址',
    logOut: '退出登录'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    validUsername: '请输入正确的用户名',
    validPassword: '密码不能少于6位数'
  },
  home: {
    resetMsg: '重置成功',
    start: '开始',
    stop: '停止',
    single: '单抽',
    multiple: '多抽'
  },
  components: {
    langSelect: {
      success: '切换语言成功'
    },
    upload: {
      error: '上传头像图片大小不能超过 2MB!'
    }
  },
  prize: {
    listQuery: {
      name: '奖品名称',
      placeholderName: '请输入奖品名称',
      description: '奖品描述',
      placeholderDescription: '请输入奖品描述'
    },
    listButton: {
      search: '搜索',
      reset: '重置',
      add: '增加奖品'
    },
    table: {
      prizeImage: '奖品图片',
      prizeName: '奖品名称',
      prizeDesc: '奖品描述',
      prizeStock: '奖品数量',
      prizeNumber: '奖品顺序',
      operateTime: '操作时间',
      operation: '操作',
      prizeUsers: '中奖人员',
      edit: '编辑',
      delete: '删除'
    },
    item: {
      addTitle: '新增奖品',
      editTitle: '编辑奖品',
      image: '奖品图片',
      name: '奖品名称',
      placeholderName: '请输入奖品名称',
      description: '奖品描述',
      placeholderDescription: '请输入奖品描述',
      stock: '奖品数量',
      placeholderStock: '请输入奖品数量',
      number: '奖品顺序',
      placeholderNumber: '请输入奖品顺序',
      formCancel: '取消',
      formConfirm: '确定'
    }
  },
  users: {
    listQuery: {
      username: '人员名称',
      placeholderUsername: '请输入人员名称',
      description: '人员描述',
      placeholderDescription: '请输入人员描述',
      prizeName: '奖品名称',
      placeholderPrizeName: '请选择奖品'
    },
    listButton: {
      search: '搜索',
      reset: '重置',
      add: '增加人员'
    },
    table: {
      avatar: '人员头像',
      username: '人员名称',
      description: '人员描述',
      prizeImage: '奖品图片',
      prizeName: '奖品名称',
      operateTime: '操作时间',
      operation: '操作',
      edit: '编辑',
      delete: '删除'
    },
    item: {
      addTitle: '新增人员',
      editTitle: '编辑人员',
      avatar: '人员头像',
      username: '人员名称',
      placeholderUsername: '请输入人员名称',
      description: '人员描述',
      placeholderDescription: '请输入人员描述',
      formCancel: '取消',
      formConfirm: '确定'
    }
  }
}
