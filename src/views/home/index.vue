<template>
  <div class="home-container">
    <!--奖品区-->
    <el-row style="text-align: center; padding-top: 20px">
      <el-col :span="2">
        <el-row>
          <el-button type="warning" size="small" icon="el-icon-menu" @click="toHome" />
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
          @change="changeCurrentPrize"
        >
          <el-carousel-item v-for="item in allPrize" :key="item.id">
            <h3 class="prize">{{ item.name }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <!--转动区-->
    <el-row style="text-align: center; padding-top: 20px">
      <el-col :span="12" :offset="6">
        <el-carousel
          class="carousel-user"
          direction="vertical"
          indicator-position="none"
          :height="(screenHeight * 0.55) + 'px'"
          :autoplay="autoplay"
          :interval="interval"
          @change="changeCurrentUser"
        >
          <el-carousel-item v-for="item in noPrizeUser" :key="item.id">
            <h3>{{ item.username }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <audio id="playAction" autoplay="autoplay" loop="loop" src=""></audio>
    </el-row>
    <!--操控区-->
    <el-row style="text-align: center; padding-top: 10px">
      <el-row>
        <el-col :span="4" :offset="10">
          <div style="margin-top: 10px">
            <el-button v-if="showButton" :loading="showLoading" type="primary" round style="width: 100%;" @click="startRun">开始</el-button>
            <el-button v-if="!showButton" :loading="showLoading" type="primary" round style="width: 100%;" @click="stopRun">停止</el-button>
          </div>
          <div style="margin-top: 10px">
            <el-radio-group v-model="type" size="small">
              <el-radio-button label="单抽" />
              <el-radio-button label="全抽" />
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { selectPrize, selectStock, selectUser, startOne, resetAll } from '@/api/lottery'

export default {
  name: 'Home',
  data() {
    return {
      allPrize: [],
      currentPrize: [],
      noPrizeUser: [],
      showButton: true,
      showLoading: false,
      type: '单抽',
      autoplay: false,
      interval: 1000,
      stopUserIndex: null,
      prizeUserIndex: null,
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
    toHome() {
      this.$router.push('/prize')
    },
    toReset() {
      resetAll().then(res => {
        this.$message.success(res.message || '重置成功')
      })
    },
    getAllPrize() {
      selectPrize().then(res => {
        this.allPrize = res.data
        // 倒排序
        this.allPrize.sort((a, b) => {
          return b.number - a.number
        })
        this.currentPrize = this.allPrize[0]
      })
    },
    changeCurrentPrize(index) {
      this.currentPrize = this.allPrize[index]
      console.log(this.currentPrize.name)
    },
    getNoPrizeUser() {
      selectUser().then(res => {
        this.noPrizeUser = res.data
      })
    },
    startRun() {
      // 校验奖品
      const prizeId = this.currentPrize.id
      if (!prizeId) {
        return
      }
      // 校验库存
      selectStock(prizeId).then(res => {
        // 校验未中奖人员
        selectUser().then(res => {
          this.noPrizeUser = res.data
          this.stopUserIndex = null
          this.prizeUserIndex = null
          // 转动跑马灯
          this.autoplay = true
          this.interval = 300
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
      const prizeId = this.currentPrize.id
      if (!prizeId) {
        return
      }
      if (this.type === '单抽') {
        startOne(prizeId).then(res => {
          // 返回中奖人员
          const user = res.data
          this.showLoading = true
          // 查找中奖人员
          this.prizeUserIndex = this.noPrizeUser.map(item => item.id).indexOf(user.id)
          if (this.prizeUserIndex > 5) {
            this.stopUserIndex = this.prizeUserIndex - 5
          } else {
            this.stopUserIndex = (this.noPrizeUser.length - 5) + this.prizeUserIndex
          }
          // 速度调慢
          setInterval(() => {
            this.interval = this.interval + 100
          }, 1000)
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
    changeCurrentUser(index) {
      this.currentTime = new Date().getTime()
      console.log(index, this.prizeUserIndex, this.stopUserIndex, this.interval, this.currentTime - this.lastTime)
      this.lastTime = this.currentTime
      if (index === this.stopUserIndex) {
        // 开始减速
        this.slowRun()
      }
      if (index === this.prizeUserIndex && this.interval > 1000) {
        // 减速后停止转动
        this.autoplay = false
        this.stopUserIndex = null
        this.prizeUserIndex = null
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
  .carousel-prize .prize {
    margin: 0;
    height: 100px;
    line-height: 100px;
    color: #FFE9AF;
    font-size: 66px;
  }
  .carousel-user .el-carousel__container {
    opacity: 0.6;
    background-color: #000000;
    border-radius: 8px;
  }
  .carousel-user .el-carousel__container .user {
    margin: 0;
    line-height: 500px;
  }
</style>
