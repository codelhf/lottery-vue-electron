<template>
  <el-row class="user-item">
    <el-col class="user-item-left">
      <img v-if="index % 2 === 0" class="user-item-img" :src="user.avatar" alt="" />
      <div v-else class="user-item-div">
        <span class="username">{{ user.username }}</span>
        <span class="description">{{ user.description }}</span>
      </div>
    </el-col>
    <el-col class="user-item-right">
      <img v-if="index % 2 !== 0" class="user-item-img" :src="user.avatar" alt="" />
      <div v-else class="user-item-div">
        <span class="username">{{ user.username }}</span>
        <span class="description">{{ user.description }}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    style: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
  .user-item {
    padding: 4px;
  }
  .user-item .user-item-left,
  .user-item .user-item-right {
    width: 50%;
    height: 100%;
  }
  .user-item .user-item-img,
  .user-item .user-item-div{
    width: 100%;
    height: 100%;
    border: 1px solid #eeeeee;
    background-color: #000000;
    opacity: 0.6;
  }
  .user-item-left .user-item-img,
  .user-item-left .user-item-div{
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .user-item-right .user-item-img,
  .user-item-right .user-item-div{
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .user-item .user-item-div .username,
  .user-item .user-item-div .description {
    display: block;
    width: 100%;
    height: 50%;
    padding: 20px;
  }
  .user-item .user-item-div .username {
    padding-top: 25%;
    font-size: 36px;
    font-weight: bold;
    color: #ffffff;
  }
  .user-item .user-item-div .description {
    font-size: 18px;
    font-weight: bold;
    color: #eeeeee;
  }
</style>
