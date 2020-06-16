<template>
  <div class="page-container">
    <!--奖品区-->
    <el-row style="text-align: center; padding-top: 10px">
      <el-col :span="2">
        <el-button type="warning" size="small" icon="el-icon-menu" @click="toHome" />
        <el-button type="danger" size="small" icon="el-icon-refresh-left" @click="reset" />
      </el-col>
      <el-col :span="4" :offset="8">
        <el-carousel
          trigger="click"
          indicator-position="none"
          height="100px"
          :autoplay="false"
          @change="changeCurrentPrize"
        >
          <el-carousel-item v-for="item in allPrize" :key="item.id">
            <h3>{{ item.name }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <!--转动区-->
    <el-row style="text-align: center; padding-top: 20px">
      <el-col :span="12" :offset="6">
        <el-carousel
          direction="vertical"
          indicator-position="none"
          height="520px"
          :autoplay="autoplay"
          :interval="interval"
          @change="changeCurrentUser"
        >
          <el-carousel-item v-for="item in noPrizeUser" :key="item.id">
            <h3>{{ item.username }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
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
import { selectPrize, selectStock, selectUser, reset } from '@/api/lottery'

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
      prizeUserIndex: null
    }
  },
  created() {
    this.getAllPrize()
    this.getNoPrizeUser()
  },
  methods: {
    toHome() {
      this.$router.push('/prize')
    },
    reset() {
      reset(this.currentPrize.id).then(res => {
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
      this.showLoading = true
      this.prizeUserIndex = 19
      if (this.prizeUserIndex > 5) {
        this.stopUserIndex = this.prizeUserIndex - 5
      } else {
        this.stopUserIndex = this.noPrizeUser.length - 5 + this.prizeUserIndex
      }
      // if (this.type === '单抽') {
      //   startOne(prizeId).then(res => {
      //     // 返回中奖人员
      //     const user = res.data
      //     // 查找中奖人员
      //     this.prizeUserIndex = this.noPrizeUser.indexOf(user)
      //     // 速度调慢
      //     setInterval(() => {
      //       this.interval = this.interval + 100
      //     }, 1000)
      //   })
      // }
    },
    slowRun() {
      if (this.interval <= 200 * 5) {
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
      console.log(this.prizeUserIndex, this.interval, this.currentTime - this.lastTime)
      this.lastTime = this.currentTime
      if (index === this.stopUserIndex) {
        // 开始减速
        this.slowRun()
      }
      if (index === this.prizeUserIndex && this.interval > 200 * 5) {
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

<style scoped>
.page-container {
  width: 100%;
  height: calc(100vh);
  background: url("../../assets/img/bg1.jpg") no-repeat top left / 100% 100%;
}

.el-carousel__item h3 {
  margin: 0;
  line-height: 100px;
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
