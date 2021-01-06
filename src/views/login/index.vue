<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo" style="font-size: 25px">你好啊</div>
      </div>
      <el-form class="login-form" ref="form" :model="user" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="onLogin"
            :loading="loginLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { userLogin } from '../../api/user.js'
import { setUser } from '../../utils/storage.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false
      },
      loginLoading: false,
      rules: {
        mobile: [
          { required: true, message: '必须输入手机号', trigger: 'change' },
          {
            pattern: /^1[35789]\d{9}$/,
            message: '手机号格式不对',
            trigger: 'change'
          }
        ],
        code: [
          { required: true, message: '必须要输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '验证码格式不对', trigger: 'change' }
        ],
        agree: [
          {
            // value: 表示当前值
            // 验证通过： 直接写callback()
            // 验证不通过： callback(new Error(‘错误消息))
            validator: (rule, value, callback) => {
              if (value) {
                // 如是选中，则验证通过
                callback()
              } else {
                // 如是不选中，则给出错误提示通过
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    async onLogin () {
      // 开启按钮上的loading效果
      this.loginLoading = true
      try {
        const res = await userLogin(this.user.mobile, this.user.code)
        // await取出promise中的then(res)中的res值
        this.$message({ message: '登陆成功', type: 'success' })
        this.loginLoading = false
        setUser(res.data.data)
        this.$router.push('/')
      } catch (err) {
        // 登陆出错了
        this.$message.error('登陆出错了')
        console.log(err)
        // 关闭loading状态
        this.loginLoading = false
      }
      // this.$router.push('/')
    }

  }
}
</script>

<style scoped lang="less">
// 铺满整屏
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        // background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
