<template>
  <div class="home-container">
    <!--奖品区-->
    <el-row style="text-align: center; padding-top: 30px">
      <el-col :span="2">
        <el-row>
          <el-button type="warning" size="small" icon="el-icon-menu" @click="toPrize" />
        </el-row>
        <el-row style="margin-top: 10px">
          <el-button type="danger" size="small">
            <lang-select class="set-language" style="color:#ffffff;" />
          </el-button>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-button type="danger" size="small" icon="el-icon-refresh-left" @click="toReset" />
        </el-row>
      </el-col>
      <el-col :span="8" :offset="6">
        <el-carousel
          class="carousel-prize"
          trigger="click"
          indicator-position="none"
          height="100px"
          :autoplay="false"
          @change="currentPrize"
        >
          <el-carousel-item v-for="item in allPrize" :key="item.id">
            <img v-if="item.image" class="prize-image" :src="item.image" alt="">
            <h3 v-else class="prize-name">{{ item.name }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <!--转动区-->
    <el-row style="text-align: center; padding-top: 30px">
      <audio v-if="musicPlay" :src="musicUrl" autoplay="autoplay" loop="loop" />
      <el-col :span="12" :offset="6">
        <el-carousel
          class="carousel-user"
          direction="vertical"
          indicator-position="none"
          :height="(screenHeight * 0.55) + 'px'"
          :autoplay="autoplay"
          :interval="interval"
          @change="currentUser"
        >
          <el-carousel-item v-for="(item, index) in noPrizeUser" :key="index">
            <multi-user v-if="showMultiple" :prize-user="prizeUser" />
            <multi-user v-else :prize-user="[item]" :user-index="index" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <!--操控区-->
    <el-row style="text-align: center; padding-top: 30px">
      <el-row>
        <el-col :span="4" :offset="10">
          <div style="margin-top: 10px">
            <el-button v-if="showButton" :loading="showLoading" type="primary" round style="width: 100%;" @click="startRun">{{ $t('home.start') }}</el-button>
            <el-button v-if="!showButton" :loading="showLoading" type="primary" round style="width: 100%;" @click="stopRun">{{ $t('home.stop') }}</el-button>
          </div>
          <div style="margin-top: 10px">
            <el-radio-group v-model="isSingle" size="small">
              <el-radio-button :label="true">{{ $t('home.single') }}</el-radio-button>
              <el-radio-button :label="false">{{ $t('home.multiple') }}</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { selectPrize, selectUser, selectPrizeStock, selectNoPrizeUser, startOne, startAll, resetStock } from '@/api/lottery'
import LangSelect from '@/components/LangSelect'
import { clearImage } from '@/utils/init'
import MultiUser from './multi-user'
import action from '../../assets/media/action.mp3'
import jump from '../../assets/media/jump.mp3'

export default {
  name: 'Home',
  components: {
    LangSelect,
    MultiUser
  },
  data() {
    return {
      allPrize: [],
      curPrize: [],
      allUser: [],
      noPrizeUser: [],
      prizeUser: [],
      showButton: true,
      showLoading: false,
      autoplay: false,
      interval: 1000,
      isSingle: true,
      showMultiple: false,
      stopUserIndex: null,
      prizeUserIndex: null,
      // 背景音乐
      musicUrl: null,
      musicPlay: false,
      screenHeight: window.innerHeight
    }
  },
  mounted() {
    this.getAllPrize()
    this.getNoPrizeUser()
    window.onresize = () => {
      this.screenHeight = window.innerHeight
    }
  },
  methods: {
    toPrize() {
      this.$router.push('/prize')
    },
    toReset() {
      // 校验奖品
      const prizeId = this.curPrize.id
      if (!prizeId) {
        return
      }
      this.$confirm(this.$t('home.confirm.message'), this.$t('home.confirm.title'), {
        cancelButtonText: this.$t('home.confirm.cancel'),
        confirmButtonText: this.$t('home.confirm.confirm'),
        type: 'warning'
      }).then(() => {
        resetStock(prizeId).then(() => {
          this.$message.success(this.$t('home.resetMsg'))
        }, error => {
          this.$message.error(error)
        })
      })
    },
    async getAllPrize() {
      const imageList = []
      await selectPrize().then(res => {
        this.allPrize = res.data
        // 倒排序
        this.allPrize.sort((a, b) => {
          return b.number - a.number
        })
        this.curPrize = this.allPrize[0]
        this.allPrize.map(item => {
          if (item.image) {
            imageList.push(item.image)
          }
        })
      })
      await selectUser().then(res => {
        this.allUser = res.data
        this.allUser.map(item => {
          if (item.avatar) {
            imageList.push(item.avatar)
          }
        })
      })
      console.log(imageList)
      clearImage(imageList)
    },
    getNoPrizeUser() {
      selectNoPrizeUser().then(res => {
        this.noPrizeUser = res.data
      })
    },
    currentPrize(index) {
      this.curPrize = this.allPrize[index]
      console.log(this.curPrize.name)
    },
    startRun() {
      // 校验奖品
      const prizeId = this.curPrize.id
      if (!prizeId) {
        return
      }
      // 校验库存
      selectPrizeStock(prizeId).then(() => {
        // 校验未中奖人员
        selectNoPrizeUser(prizeId).then(res => {
          this.noPrizeUser = res.data
          // 5 对应下面stopRun的5
          if (this.noPrizeUser.length < 5) {
            this.$message.error(this.$t('home.noUser'))
            return
          }
          // 先清空数据
          this.stopUserIndex = null
          this.prizeUserIndex = null
          this.showMultiple = false
          // 转动跑马灯
          this.autoplay = true
          this.interval = 300
          // 播放背景音乐
          this.musicPlay = true
          this.musicUrl = action
          this.showLoading = true
          setTimeout(() => {
            this.showButton = false
            this.showLoading = false
          }, 1.5 * 1000)
        }, error => {
          this.$message.error(error)
        })
      }, error => {
        this.$message.error(error)
      })
    },
    stopRun() {
      // 校验奖品
      const prizeId = this.curPrize.id
      if (!prizeId) {
        return
      }
      if (this.isSingle) {
        startOne(prizeId).then(res => {
          // 返回中奖人员
          const user = res.data
          this.showLoading = true
          // 展示中奖人员
          this.prizeUser = [user]
          // 查找中奖人员
          this.prizeUserIndex = this.noPrizeUser.map(item => item.id).indexOf(user.id)
          if (this.prizeUserIndex > 5) {
            this.stopUserIndex = this.prizeUserIndex - 5
          } else {
            this.stopUserIndex = (this.noPrizeUser.length - 5) + this.prizeUserIndex
          }
        })
      } else {
        startAll(prizeId).then(res => {
          // 返回第一个中奖人员
          const user = res.data[0]
          this.showLoading = true
          // 展示中奖人员
          this.prizeUser = res.data
          // 查找第一个中奖人员
          this.prizeUserIndex = this.noPrizeUser.map(item => item.id).indexOf(user.id)
          if (this.prizeUserIndex > 5) {
            this.stopUserIndex = this.prizeUserIndex - 5
          } else {
            this.stopUserIndex = (this.noPrizeUser.length - 5) + this.prizeUserIndex
          }
        })
      }
    },
    slowRun() {
      // 1000 < 5 * 200 + 300
      if (this.interval <= 1000) {
        this.autoplay = false
        this.interval = this.interval + 200
        setTimeout(() => {
          this.autoplay = true
          setTimeout(this.slowRun, this.interval + 100)
        }, 100)
      }
    },
    currentUser(index) {
      this.currentTime = new Date().getTime()
      console.log(index, this.prizeUserIndex, this.stopUserIndex, this.interval, this.currentTime - this.lastTime)
      this.lastTime = this.currentTime
      if (index === this.stopUserIndex) {
        // 开始减速
        this.slowRun()
        // 更换背景音乐
        this.musicUrl = jump
      }
      if (index === this.prizeUserIndex && this.interval > 1000) {
        // 减速后停止转动
        this.autoplay = false
        this.showMultiple = true
        this.stopUserIndex = null
        this.prizeUserIndex = null
        // 停止背景音乐
        this.musicPlay = false
        setTimeout(() => {
          this.showButton = true
          this.showLoading = false
        }, 1.5 * 1000)
      }
    }
  }
}
</script>

<style>
  .home-container {
    width: 100%;
    height: calc(100vh);
    background: url("../../assets/img/bg1.jpg") no-repeat top left / 100% 100%;
  }
  .carousel-prize .prize-image {
    display: inline-block;
    margin: 0;
    width: 160px;
    height: 100px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
  }
  .carousel-prize .prize-name {
    margin: 0;
    height: 100px;
    line-height: 100px;
    color: #FFE9AF;
    font-size: 66px;
  }
  .carousel-user .el-carousel__container {
    background-color: #000000;
    opacity: 0.6;
    border-radius: 8px;
  }
</style>
