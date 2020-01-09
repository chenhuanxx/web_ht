<template>
  <div  >
   <img :src="hybg" alt="" width="100%" style="">
  </div>
</template>

<script>
import hybg from '@/assets/img/hy.png'

import screenfull from 'screenfull'
export default {
  data() {
    return {
      hybg: hybg,
      isFullscreen: false
    }
  },
  computed: {

  },
  mounted() {
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isFullscreen = false
      }
    }
  },
  created() {

  },
  methods: {

    toggleFullscreen() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },

    /**
     * 全屏事件
     */
    screenfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'Your browser does not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
      this.isFullscreen = true
    },
    /**
     * 是否全屏并按键ESC键的方法
     */
    checkFull() {
      var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    }
  },

  goTo() {
    // 直接跳转
    this.$router.push('/kbzs')
    // //带参数跳转
    // this.$router.push({path:'/testDemo',query:{setid:123456}});
    // this.$router.push({name:'testDemo',params:{setid:111222}});
  },
  timeFormat(param) {
    return param < 10 ? '0' + param : param
  }

}
</script>
<style  >
.hybj{position: absolute;height: 100%;width: 100%;background: red; text-align: center;color: white; background-size:cover;
}
.wzdx{font-size: 50px;letter-spacing: 5px;position:relative;top: 30%}
.btn{position: absolute;;bottom: 20px;width: 200px;left: 50%;transform: translate(-100px);}
</style>
