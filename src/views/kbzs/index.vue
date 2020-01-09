<template>
  <div class="hybj" :style="{backgroundImage: 'url(' + hybg + ')' }"> 
        <div class="wzdx">元旦快乐</div>
        <el-button class="btn" type="primary" @click="goTo()">开始</el-button>
  </div>
</template>

<script>  
import hybg from '@/assets/img/hybg.png'
export default { 
  data() {
    return { 
      hybg:hybg, 
      }
  },
  computed: {
    
  },
  mounted() { 
  },
  created(){
      
  },
  methods: {
         goTo(){
                //直接跳转
                this.$router.push('/kbzs/djs');
 
                // //带参数跳转
                // this.$router.push({path:'/testDemo',query:{setid:123456}});
                // this.$router.push({name:'testDemo',params:{setid:111222}});
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
