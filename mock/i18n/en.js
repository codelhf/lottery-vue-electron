export default {
  login: {
    noUsername: 'Account are incorrect.',
    noPassword: 'password are incorrect.',
    noUserInfo: 'Login failed, unable to get user details.',
    success: 'logout success'
  },
  lottery: {
    prize: 'Please add prizes',
    user: 'Please add people',
    prizeStock: 'The prizes have been drawn, Please Select Other Prize',
    noPrizeUser: 'Please add more people and more than the number of prizes',
    startOne: {
      noStock: 'The prizes have been drawn, Please Select Other Prize',
      noUser: 'Please add more people and more than the number of prizes',
      updatePrize: 'Failed to modify the number of prizes',
      savePrizeUser: 'Failed to save the winning user'
    },
    startAll: {
      noStock: 'The prizes have been drawn, Please Select Other Prize',
      noUser: 'Please add more people and more than the number of prizes',
      updatePrize: 'Failed to modify the number of prizes',
      savePrizeUser: 'Failed to save the winning user'
    },
    resetStock: {
      resetPrize: 'Failed to reset prize',
      resetUsers: 'Failed to reset people',
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
      saveError: 'Failed to save person',
      success: 'Save person successfully'
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
      noUser: 'No person to save',
      repeat: 'Person already exists',
      saveError: 'Failed to batch save personnel',
      success: 'Batch save people successfully'
    }
  }
}
