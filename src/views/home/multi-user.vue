<template>
  <div class="multi-user">
    <template v-for="item in prizeUser">
      <user-item :key="item.id" :style="style" :user="item" :index="userIndex" />
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
      style: ''
    }
  },
  mounted() {
    if (this.prizeUser.length === 1) {
      this.style = 'width: 100%; height: 100%'
    } else if (this.prizeUser.length === 2) {
      this.style = 'width: 50%; height: 50%'
    } else if (this.prizeUser.length === 3) {
      this.style = 'width: 33.33%; height: 33.33%'
    } else if (this.prizeUser.length === 4) {
      this.style = 'width: 50%; height: 50%'
    } else if (this.prizeUser.length === 5) {
      this.style = 'width: 33.33%; height: 33.33%'
    } else if (this.prizeUser.length === 6) {
      this.style = 'width: 33.33%; height: 33.33%'
    } else if (this.prizeUser.length === 7) {
      this.style = 'width: 25%; height: 25%'
    } else if (this.prizeUser.length === 8) {
      this.style = 'width: 25%; height: 25%'
    } else if (this.prizeUser.length === 9) {
      this.style = 'width: 33.33%; height: 33.33%'
    } else if (this.prizeUser.length === 10) {
      this.style = 'width: 25%; height: 25%'
    } else if (this.prizeUser.length === 11) {
      this.style = 'width: 25%; height: 25%'
    } else if (this.prizeUser.length === 12) {
      this.style = 'width: 25%; height: 25%'
    } else if (this.prizeUser.length > 12) {
      this.style = 'width: 25%; height: 25%'
    }
  }
}
</script>

<style scoped>
  .multi-user {
    height: 100%;
  }
</style>
