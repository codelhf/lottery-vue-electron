<template>
  <el-upload
      class="avatar-uploader"
      action="http://localhost:9080/#/"
      :auto-upload="true"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import fse from 'fs-extra'
import { imagePath } from '@/utils/init'
export default {
  name: 'Upload',
  props: {
    fileUrl: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  created() {
    this.imageUrl = this.fileUrl || ''
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      console.log('before', file)
      // 移动图片
      this.imageUrl = imagePath + '/' + file.name
      fse.copySync(file.path, this.imageUrl)
      this.$emit('upload-path', this.imageUrl)
      return isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>
