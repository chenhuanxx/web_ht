<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div v-if="dlshow">
        <div class="title-container">
          <h3 class="title">2019年苏州市计算机学会数字化校园专委会</h3>
          <h3 class="title">掼蛋比赛</h3>
        </div>

        <el-form-item prop="yhm">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="loginForm.yhm"
            placeholder="请输入用户名"
          />

        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="mm">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>

            <el-input
              :key="passwordType"
              ref="mm"
              v-model="loginForm.mm"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px; " @click="handleLogin">登录</el-button>

      <!-- <div class="bbh">
        <p>2019年苏州市计算机学会数字化校园专委会掼蛋比赛</p>
        <p>掼蛋比赛</p>
      </div> -->
      </div>

    </el-form>

  </div>
</template>

<script>
import SocialSign from './components/SocialSignin'
import { setAdmin } from '@/utils/auth'
export default {

  name: 'Login',
  components: { SocialSign },
  data() {
    return {
      userdetailShow: false,
      dlshow: true,
      mimashow: false,
      loginForm: {
        yhm: '',
        mm: '',
        isPwd: '',
        Pwd: ''
      },
      loginRules: {
        yhm: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        mm: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 125, message: '密码长度不得少于6个字符', trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },

  created() {
    this.keyupSubmit()
  },
  methods: {
    // 修改密码
    changePassword() {
      this.dlshow = false
      this.mimashow = true
    },
    keyupSubmit() {
      document.onkeydown = e => {
        const _key = window.event.keyCode
        if (_key === 13) {
          this.handleLogin()
        }
      }
    },
    detailShow() {
      this.userdetailShow = true
    },
    // 取消
    cancel() {
      this.dlshow = true
      this.mimashow = false
      this.loginForm.Pwd = ''
      this.loginForm.isPwd = ''
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.mm.focus()
      })
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(res => {
              this.loading = false
              // if(res.code==20000){
              //   this.$message({
              //     message:"登录成功",
              //     type: 'success'
              //   })
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })

              // }else{
              //    this.$message({
              //     message:res.message,
              //     type: 'warning'
              //   })
              // }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.color1{color: white}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 580px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

.bbh{margin-top: 50px;}
.bbh p{color: white;text-align: center;font-size: 20px;line-height: 180%;}
</style>
