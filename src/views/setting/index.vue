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
                <button @click="updateUser" type="primary">保存设置</button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
            <!-- 上传组件 action必须属性 -->
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {},
  data () {
    return {}
  },
  computed: {},
  created () {},
  mounted () {}
}
</script>

<style scoped lang='less'></style>
