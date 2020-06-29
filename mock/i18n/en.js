export default {
  login: {
    noUsername: 'Account are incorrect.',
    noPassword: 'password are incorrect.',
    noUserInfo: 'Login failed, unable to get user details.',
    success: 'logout success'
  },
  lottery: {
    prize: 'Please add prizes',
    stock: 'The prizes have been drawn, Please Select Other Prize',
    user: 'Please invite more people to participate',
    startOne: {
      noStock: 'The prizes have been drawn, Please Select Other Prize',
      noUser: 'Please invite more people to participate',
      updatePrize: 'Failed to modify the number of prizes',
      savePrizeUser: 'Failed to save the winning user'
    },
    startAll: {
      noStock: 'The prizes have been drawn, Please Select Other Prize',
      noUser: 'Please invite more people to participate',
      updatePrize: 'Failed to modify the number of prizes',
      savePrizeUser: 'Failed to save the winning user'
    },
    resetAll: {
      resetPrize: 'Failed to reset prize',
      resetUsers: 'Failed to reset user',
      success: 'Reset successfully'
    }
  },
  prize: {
    list: 'no data',
    get: 'No prize found',
    create: {
      repeat: 'Prize already exists',
      saveError: 'Failed to save prize',
      success: 'Save prizes successfully'
    },
    update: {
      repeat: 'Prize already exists',
      updateError: 'Failed to update prizes',
      success: 'Successfully updated prizes'
    },
    delete: {
      deleteError: 'Failed to delete prize',
      success: 'Successfully deleted prize'
    },
    batchCreate: {
      noPrize: 'No Prize to save',
      repeat: 'Prize already exists',
      saveError: 'Failed to batch save prize',
      success: 'Batch save prizes successfully'
    }
  },
  users: {
    list: 'no data',
    get: 'No such person found',
    create: {
      repeat: 'Person already exists',
      saveError: 'Failed to save personnel',
      success: 'Save people successfully'
    },
    update: {
      repeat: 'Person already exists',
      updateError: 'Update staff failed',
      success: 'Update staff successful'
    },
    delete: {
      deleteError: 'Failed to delete person',
      success: 'Successfully deleted person'
    },
    batchCreate: {
      noUser: 'No User to save',
      repeat: 'Person already exists',
      saveError: 'Failed to batch save personnel',
      success: 'Batch save people successfully'
    }
  }
}
