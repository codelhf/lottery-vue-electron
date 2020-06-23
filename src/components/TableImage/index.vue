<template>
  <div class="table-column-image">
    <img v-if="src" :src="src" alt="">
    <img v-else :src="nullImage" alt="">
  </div>
</template>

<script>
import nullImage from '@/assets/img/null.jpg'

export default {
  name: 'TableImage',
  props: {
    src: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      nullImage: nullImage
    }
  }
}
</script>

<style scoped>
  .table-column-image{
    display: inline-block;
    width: 80px;
    height: 80px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
  }
  .table-column-image img{
    width: 100%;
    height: 100%;
  }
</style>
