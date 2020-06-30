export default {
  login: {
    noUsername: '账号不存在',
    noPassword: '密码不正确',
    noUserInfo: '登录失败，无法获取用户详细信息',
    success: '登出成功'
  },
  lottery: {
    prize: '请添加奖品',
    stock: '该类奖品已抽完，请选择其他奖品',
    user: '请添加更多人员并且大于奖品数量',
    startOne: {
      noStock: '该类奖品已抽完，请选择其他奖品',
      noUser: '请添加更多人员并且大于奖品数量',
      updatePrize: '修改奖品数量失败',
      savePrizeUser: '保存中奖用户失败'
    },
    startAll: {
      noStock: '该类奖品已抽完，请选择其他奖品',
      noUser: '请添加更多人员并且大于奖品数量',
      updatePrize: '修改奖品数量失败',
      savePrizeUser: '保存中奖用户失败'
    },
    resetAll: {
      resetPrize: '重置奖品失败',
      resetUsers: '重置用户失败',
      success: '重置成功'
    }
  },
  prize: {
    list: '没有数据',
    get: '没有查询到该奖品',
    create: {
      repeat: '奖品已存在',
      saveError: '保存奖品失败',
      success: '保存奖品成功'
    },
    update: {
      repeat: '奖品已存在',
      updateError: '更新奖品失败',
      success: '更新奖品成功'
    },
    delete: {
      deleteError: '删除奖品失败',
      success: '删除奖品成功'
    },
    batchCreate: {
      noPrize: '没有需要保存的奖品',
      repeat: '奖品已存在',
      saveError: '批量保存奖品失败',
      success: '批量保存奖品成功'
    }
  },
  users: {
    list: '没有数据',
    get: '没有查询到该人员',
    create: {
      repeat: '人员已存在',
      saveError: '保存人员失败',
      success: '保存人员成功'
    },
    update: {
      repeat: '人员已存在',
      updateError: '更新人员失败',
      success: '更新人员成功'
    },
    delete: {
      deleteError: '删除人员失败',
      success: '删除人员成功'
    },
    batchCreate: {
      noUser: '没有要保存的人员',
      repeat: '人员已存在',
      saveError: '批量保存人员失败',
      success: '批量保存人员成功'
    }
  }
}
