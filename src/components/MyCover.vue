<template>
  <div class="my-cover">
    <div class="btn_img" @click="openDialog()">
      <img :src="value || coverImageUrl "/>
    </div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="720px"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <div style="padding-bottom: 20px">
            <el-radio-group
              v-model="collect"
              @change="hCollectChange"
              size="mini"
            >
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="收藏"></el-radio-button>
            </el-radio-group>
          </div>
          <el-row :gutter="10" class="img_list">
            <el-col
              v-for="image in images"
              :key="image.id"
              :class="{selected: image.url===selectedImageUrl}"
              class="img-item"
              :xs="12"
              :sm="6"
              :lg="4"

            >
              <el-image
              @click.native="hImageClick(image)"
                style="height: 100px"
                :src="image.url"
                fit="cover"
              ></el-image>
            </el-col>
          </el-row>
          <el-pagination
          style="margin-top:10px"
          :hide-on-single-page="true"
            background
            @current-change="hPageChange"
            layout="prev,pager,next"
            :page-size='per_page'
            :total="total_count"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
            <!-- 本质还是ajax技术做上传，action上传地址，show-file-list：false，不需要显示已上传的文件列表
             on-success：上传成功之后的回调函数 before-upload上传之前对文件进行检测 name 设置上传文件参数名要与后端接口中的要求一致
             -->
             <el-upload class="avatar-upload"
             action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
             :headers="headers"
             :on-success="hUploadSuccess"
             name="image"
             :show-file-list="false"
             :before-upload="beforeAvatarUpload">
             <!-- 如果当前有预览地址就说明图片上传成功了，给用户展示这张图，用户成功的看到这张图时，关闭整个上传
             对话框，图片的onload事件：当你设置图片的src时，浏览器会去请求图片的资源，当图片请求回来之后会有一个事件触发出来，这个事件就是onload-->
                <el-image v-if="imgSrc" :src='imgSrc' class="avatar"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="hConfirmImage = false"
          >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import defaultImg from '@/assets/default.png'
import { getImages } from '@/api/image.js'
export default {
  name: 'MyCover',
  data () {
    return {
      coverImageUrl: defaultImg,
      selectedImageUrl: null,
      dialogVisible: false,
      activeName: 'image',
      images: [],
      cur_page: 1,
      per_page: 10,
      total_count: 0,
      collect: false,
      imgSrc: null,
      headers: {
        Authorization: 'bearer $get{getUser().token}'
      }
    }
  },
  props: ['value'],
  methods: {
    openDialog () {
      this.activeName = 'image'
      this.imgSrc = null
      this.selectedImageUrl = ''
      this.dialogVisible = true
      this.loadImages()
    },
    async loadImages () {
      try {
        const res = await getImages({
          collect: this.collect, // 是否收藏
          per_page: this.per_page, // 每页几条
          page: this.cur_page // 请求的页码
        })
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    hPageChange (curPage) {
      this.cur_page = curPage
      this.loadImages()
    },
    hCollectChange () {
      this.loadImages()
    },
    hImageClick (image) {
      this.selectedImageUrl = image.url
      console.log(image, this.selectedImageUrl)
    },
    // 上传之前的验证
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('图片只能是JPG格式！')
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2MB！')
      }
      return isJPG && isLt2M
    },
    // 如果上传成功，则会把响应结果传给res
    hUploadSuccess (res) {
      console.log(res)
      this.imgSrc = res.data.url
      this.$message.success('上传素材成功')
    },
    hConfirmImage () {
      if (this.activeName === 'iamge') {
        // 素材库，有没有选中图
        if (!this.selectedImageUrl) {
          this.$message.console.warning('请先选中一张图片')
          return
        } else {
          // 预览图片：把你选中的图显示在图片按钮上
          this.coverImageUrl = this.selectedImageUrl
          this.$emit('input', this.selectedImageUrl)
        }
      } else if (this.activeName === 'upload') {
        // 上传图片，都没有上传
        if (!this.imgSrc) {
          this.$message.warning('请先上传一张图片')
          return
        } else {
          // 预览图片:把你选中的图显示在图片按钮上
          this.coverImageUrl = this.imgSrc
          this.$emit('input', this.selectedImageUrl)
        }
      }
      // 隐藏对话框
      this.dialogVisible = false
    }

  }
}
</script>
<style lang="less" scoped>
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img_list {
  margin-top: 15px;
  .img-item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.selected::after {
    content:'';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat center / 50px 50px;
}
.img-item {
    position: relative;
}
</style>
