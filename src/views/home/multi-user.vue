<template>
  <div class="multi-user">
    <template v-for="item in prizeUser">
      <user-item
        :key="item.id"
        :user="item"
        :index="userIndex"
        :user-item-style="userItemStyle"
        :username-style="usernameStyle"
        :description-style="descriptionStyle"
      />
    </template>
  </div>
</template>

<script>
import UserItem from './user-item'
export default {
  name: 'MultiUser',
  components: {
    UserItem
  },
  props: {
    prizeUser: {
      type: Array,
      required: true
    },
    userIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      userItemStyle: 'width: 100%; height: 100%',
      usernameStyle: 'font-size: 36px;',
      descriptionStyle: 'font-size: 18px;'
    }
  },
  updated() {
    if (this.prizeUser.length === 1) {
      this.userItemStyle = 'width: 100%; height: 100%'
      this.usernameStyle = 'font-size: 36px;'
      this.descriptionStyle = 'font-size: 18px;'
    } else if (this.prizeUser.length === 2) {
      this.userItemStyle = 'width: 50%; height: 50%'
      this.usernameStyle = 'font-size: 18px;'
      this.descriptionStyle = 'font-size: 9px;'
    } else if (this.prizeUser.length === 3) {
      this.userItemStyle = 'width: 33.33%; height: 33.33%'
      this.usernameStyle = 'font-size: 12px;'
      this.descriptionStyle = 'font-size: 6px;'
    } else if (this.prizeUser.length === 4) {
      this.userItemStyle = 'width: 50%; height: 50%'
      this.usernameStyle = 'font-size: 18px;'
      this.descriptionStyle = 'font-size: 9px;'
    } else if (this.prizeUser.length === 5) {
      this.userItemStyle = 'width: 33.33%; height: 33.33%'
      this.usernameStyle = 'font-size: 12px;'
      this.descriptionStyle = 'font-size: 6px;'
    } else if (this.prizeUser.length === 6) {
      this.userItemStyle = 'width: 33.33%; height: 33.33%'
      this.usernameStyle = 'font-size: 12px;'
      this.descriptionStyle = 'font-size: 6px;'
    } else if (this.prizeUser.length === 7) {
      this.userItemStyle = 'width: 25%; height: 25%'
      this.usernameStyle = 'font-size: 9px;'
      this.descriptionStyle = 'font-size: 6px;'
    } else if (this.prizeUser.length === 8) {
      this.userItemStyle = 'width: 25%; height: 25%'
      this.usernameStyle = 'font-size: 9px;'
      this.descriptionStyle = 'font-size: 6px;'
    } else if (this.prizeUser.length === 9) {
      this.userItemStyle = 'width: 33.33%; height: 33.33%'
      this.usernameStyle = 'font-size: 12px;'
      this.descriptionStyle = 'font-size: 6px;'
    } else if (this.prizeUser.length === 10) {
      this.userItemStyle = 'width: 25%; height: 25%'
      this.usernameStyle = 'font-size: 9px;'
      this.descriptionStyle = 'font-size: 6px;'
    } else if (this.prizeUser.length === 11) {
      this.userItemStyle = 'width: 25%; height: 25%'
      this.usernameStyle = 'font-size: 9px;'
      this.descriptionStyle = 'font-size: 6px;'
    } else if (this.prizeUser.length === 12) {
      this.userItemStyle = 'width: 25%; height: 25%'
      this.usernameStyle = 'font-size: 9px;'
      this.descriptionStyle = 'font-size: 6px;'
    } else if (this.prizeUser.length > 12) {
      this.userItemStyle = 'width: 25%; height: 25%'
      this.usernameStyle = 'font-size: 9px;'
      this.descriptionStyle = 'font-size: 6px;'
    }
  }
}
</script>

<style scoped>
  .multi-user {
    height: 100%;
    overflow-y: auto;
  }
</style>
