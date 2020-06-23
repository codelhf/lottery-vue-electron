<template>
  <el-upload
    class="avatar-uploader"
    action="/"
    :auto-upload="true"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import path from 'path'
import fse from 'fs-extra'
import { imagePath } from '@/utils/init'

export default {
  name: 'Upload',
  props: {
    imageUrl: {
      type: String,
      default: null
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error(this.$t('components.upload.error'))
      }
      console.log('before', file)
      // 复制图片
      const fileName = new Date().getTime().toString() + file.name.substr(file.name.lastIndexOf('.'))
      const filePath = path.join(imagePath, fileName)
      fse.copySync(file.path, filePath)
      this.$emit('upload-path', 'local-resource:///' + filePath.replace(/\\/g, '/'))
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
