<template>
  <div class="setting-container">
    <el-card>
      <!-- 导航 -->
      <div slot="header">
        <my-breadcrumb>个人设置</my-breadcrumb>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">100</el-form-item>
            <el-form-item label="手机">{{ userInfo.mobile }}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介：">
              <el-input
                v-model="userInfo.intro"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
                <button @click="hSave" type="primary">保存设置</button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
            <!-- 上传组件 action必须属性 -->
            <el-upload
            class="avatar-uploader"
            action=""
            :http-request="uploadPhoto"
            :show-file-list="false">
            <img v-if="userInfo.photo" :src="userInfo.photo"  class="avatar" alt="">
            <i v-else class="el-icon-plus" avatar-uploader-icon></i></el-upload>
            <p class="edit-photo">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { userGetProfile, modUserProfile, modUserImage } from '@/api/user'
export default {
  name: 'my-setting',
  components: { MyBreadcrumb },
  props: {},
  data () {
    return {
      userInfo: {
        name: 'test',
        intro: 'info',
        email: 'info@qq.com'
      },
      imageUrl: null
    }
  },
  computed: {},
  created () {
    this.loadUserInfo()
  },
  methods: {
    hTestEventBus () {
      // 通过事件总线发布事件
      // 格式： 事件总线.$emit('事件名', 携带的参数)
      console.log('事件总线', this.$eventBus)
      this.$eventBus.$emit('helloeventbus', {
        a: 1,
        b: 2
      })
    },
    async loadUserInfo () {
      const result = await userGetProfile()
      this.userInfo = result.data.data
    },
    async hSave () {
      try {
        const { name, intro, email } = this.userInfo
        await modUserProfile({
          name, intro, email
        })
        this.$message.success('修改成功')
        this.$eventBus.$emit('update_user_name', this.userInfo.name)
      } catch {
        this.$message.console.error('修改失败')
      }
    },
    async uploadPhoto (obj) {
      try {
        // 取出要上传的文件
        const { file } = obj
        // 调用接口
        const formData = new FormData()
        formData.append('photo', file)
        const result = await modUserImage(formData)
        console.log(result)
        this.$message.success('头像上传成功')
        // 更新
        this.userInfo.photo = result.data.data.photo
        // 发布事件，通知layout去更新头像
        this.$eventBus.$emit('update_user_photo', this.userInfo.photo)
      } catch {
        this.$$message.error('头像上传失败')
      }
    }
  },
  mounted () {}
}
</script>

<style scoped lang='less'>
  .avatar {
    width: 178px;
    height: 178px;
    line-height: 178px;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

  }
  .edit-photo {
    font-size: 12px;
    text-align: center;
  }
</style>
