<template>
  <div class="hybj" :style="{backgroundImage: 'url(' + hybg + ')' }">
    <div v-if="fmshow" class="wzdx"><span>{{ minutes }}分:{{ seconds }}秒</span></div>
    <div v-if="bsjsshow" class="wzdx"><span>比赛结束</span></div>
    <!-- <div class="wzdx">00:00</div> -->
    <el-button class="btn" type="primary" @click="goTo()">成绩展示</el-button>
  </div>
</template>

<script>
import hybg from '@/assets/img/hybg.png'
export default {
  data() {
    return {
      fmshow: true,
      bsjsshow: false,
      hybg: hybg,
      countDownList: '',
      minutes: 0,
      seconds: 4
    }
  },
  computed: {
    second: function() {
      return this.num(this.seconds)
    },
    minute: function() {
      return this.num(this.minutes)
    }
  },
  watch: {
    second: {
      handler(newVal) {
        this.num(newVal)
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal)
      }
    }
  },
  created() {
    this.timer()
  },
  methods: {

    num(n) {
      return n < 10 ? '0' + n : '' + n
    },
    timer() {
      var _this = this
      var time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59
          _this.minutes -= 1
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0
          _this.fmshow = false
          _this.bsjsshow = true
          window.clearInterval(time)
        } else {
          _this.seconds -= 1
        }
      }, 1000)
    },

    goTo() {
      this.$router.push('/kbzs/zjzs')
    }

  }

}
</script>
<style  >
.hybj{position: absolute;height: 100%;width: 100%;background: red; text-align: center;color: white; background-size:cover;
}
.wzdx{font-size: 50px;letter-spacing: 5px;position:relative;top: 30%}
.btn{position: absolute;;bottom: 20px;width: 200px;left: 50%;transform: translate(-100px);}
</style>
