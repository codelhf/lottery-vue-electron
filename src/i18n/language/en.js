export default {
  route: {
    dashboard: 'Dashboard',
    prize: 'Prize Manage',
    users: 'Users Manage'
  },
  navbar: {
    github: 'Github',
    logOut: 'Log Out'
  },
  login: {
    title: 'Login Form',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    any: 'any',
    validUsername: 'The username can not be less than 5 digits',
    validPassword: 'The password can not be less than 6 digits'
  },
  home: {
    resetMsg: 'Reset Success',
    start: 'Start',
    stop: 'Stop',
    single: 'Single',
    multiple: 'Multiple'
  },
  components: {
    langSelect: {
      success: 'Switch Language Success'
    },
    upload: {
      error: 'The size of the uploaded avatar image cannot exceed 2MB!'
    }
  },
  prize: {
    listQuery: {
      name: 'Prize Name',
      placeholderName: 'Please input Prize Name',
      description: 'Description',
      placeholderDescription: 'Please input Prize Description'
    },
    listButton: {
      search: 'Search',
      reset: 'Reset',
      add: 'Add Prize',
      delete: 'Delete Selected',
      document: 'Template Excel',
      upload: 'Upload Excel',
      download: 'Export Excel'
    },
    confirm: {
      title: 'warning',
      deleteOne: 'You sure you want to delete it?',
      deleteSelected: 'Are you sure you want to delete the selected item?',
      deleteAll: 'Are you sure you want to delete all?',
      cancel: 'cancel',
      confirm: 'confirm'
    },
    table: {
      prizeImage: 'Prize Image',
      prizeName: 'Prize Name',
      prizeDesc: 'Prize Desc',
      prizeStock: 'Prize Stock',
      prizeNumber: 'Prize Number',
      operateTime: 'Operate Time',
      operation: 'Operation',
      prizeUsers: 'Prize Users',
      edit: 'Edit',
      delete: 'Delete'
    },
    item: {
      addTitle: 'Add Prize',
      editTitle: 'Edit Prize',
      image: 'Prize Image',
      name: 'Prize Name',
      placeholderName: 'Please input Prize Name',
      description: 'Prize Desc',
      placeholderDescription: 'Please input Prize Description',
      stock: 'Prize Stock',
      placeholderStock: 'Please input Prize Stock',
      number: 'Prize Number',
      placeholderNumber: 'Please input Prize Number',
      formCancel: 'Cancel',
      formConfirm: 'Confirm'
    },
    itemRules: {
      name: 'Prize name cannot be empty',
      description: 'Prize description cannot be empty',
      stock: 'The number of prizes cannot be empty',
      number: 'Prize order cannot be empty'
    }
  },
  users: {
    listQuery: {
      username: 'Username',
      placeholderUsername: 'Please input Username',
      description: 'Description',
      placeholderDescription: 'Please input Description',
      prizeName: 'Prize Name',
      placeholderPrizeName: 'Please Select Prize'
    },
    listButton: {
      search: 'Search',
      reset: 'Reset',
      add: 'Add Users',
      delete: 'Delete Selected',
      document: 'Template Excel',
      upload: 'Upload Excel',
      download: 'Export Excel'
    },
    confirm: {
      title: 'warning',
      deleteOne: 'You sure you want to delete it?',
      deleteSelected: 'Are you sure you want to delete the selected item?',
      deleteAll: 'Are you sure you want to delete all?',
      cancel: 'cancel',
      confirm: 'confirm'
    },
    table: {
      avatar: 'Avatar',
      username: 'Username',
      description: 'Description',
      prizeImage: 'Prize Image',
      prizeName: 'Prize Name',
      operateTime: 'Operate Time',
      operation: 'Operation',
      edit: 'Edit',
      delete: 'Delete'
    },
    item: {
      addTitle: 'Add User',
      editTitle: 'Edit User',
      avatar: 'Avatar',
      username: 'Username',
      placeholderUsername: 'Please input Username',
      description: 'description',
      placeholderDescription: 'Please input Description',
      formCancel: 'Cancel',
      formConfirm: 'Confirm'
    },
    itemRules: {
      username: 'Person name cannot be empty',
      description: 'Person description cannot be empty'
    }
  }
}
