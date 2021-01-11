<template>
  <div class='image-container'>
    <el-card class="abc">
      <div slot="header" class="clearfix">
        <my-breadcrumb>素材管理</my-breadcrumb>
      </div>
      <div style="padding-bottom:20px;">
        <el-radio-group v-model="collect" @change="hCollectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>

        <el-button
        @click="dialogVisible=true"
        type="success" size="mini" style="float:right">上传图片素材</el-button>
      </div>
      <!-- 图片列表 -->
      <el-row :gutter="10">
        <el-col
        v-for="(image,idx) in images"
        :key="image.id"
        class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            :src="image.url"
            style="height:150px;"
            fit="cover"
          ></el-image>
          <!-- option只在全部 选项卡中才会出现，而在收藏选项卡中，不可见 -->
          <div class="option" v-show="!collect">
            <!-- 是否收藏 -->
            <span
              :style="{color:image.is_collected ? 'red': '#fff'}"
              class="el-icon-star-off"
              @click="hSwitchCollect(image)">
              </span>
            <span class="el-icon-delete"
            @click="hDelete(image.id, idx)"></span>
          </div>
       </el-col>
      </el-row>
      <el-pagination
        style="margin-top:10px;"
        :hide-on-single-page="true"
        background
        layout="prev, pager, next"
        @current-change="hPageChange"
        :page-size="per_page"
        :total="total_count">
      </el-pagination>
    </el-card>
    <el-dialog
      title="提示"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      >
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :on-success="hUploadSuccess"
        name="image"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload">
        <el-image @load="hLoadImgOk" v-if="imgSrc" :src="imgSrc" class="avatar"></el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

    </el-dialog>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { getImages, switchCollect, deleteImage } from '@/api/image.js'
import { getUser } from '@/utils/storage.js'
export default {
  name: 'ImageIndex',
  props: { },
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      imgSrc: null,
      headers: {
        Authorization: `Bearer ${getUser().token}`
      },
      dialogVisible: false, // 是否显示弹出对话框
      images: [],
      collect: false, // 是否是 收藏的图片， true表示是收藏，false表示是全部
      total_count: 0, // 本次查询结果总数
      cur_page: 1, // 当前页码
      per_page: 10 // 一页10张图
    }
  },
  computed: { },
  created () {
    this.loadImages()
  },
  methods: {
    hDelete (id, idx) {
      // 删除之前，要做提示
      this.$confirm('删除了就找不回来啦?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await deleteImage(id)
          this.$message.success('删除成功')
          this.images.splice(idx, 1)
        } catch {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        // 用户取消了
      })
    },
    async hSwitchCollect (image) {
      const { id, is_Collected } = image
      try {
        await switchCollect(id, !is_Collected)
        this.$message.success('操作成功')
        image.is_Collected = !is_Collected
      } catch {
        this.$message.error('操作失败')
      }
    },
    async loadImages () {
      try {
        const res = await getImages({
          collect: this.collect, // 是否是收藏
          per_page: this.per_page, // 每页几条
          page: this.cur_page // 请求的页码
        })
        // 保存当前查询结果
        this.images = res.data.data.results

        // 更新查询总结果数
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    // 翻页按钮
    hPageChange (curPage) {
      // alert(curPage)
      // 1. 更新查询参数
      this.cur_page = curPage
      // 2. 再发请求
      this.loadImages()
    },
    hCollectChange () {
      // 全部&收藏 的切换
      console.log(this.collect)
      // 重发请求
      this.loadImages()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    hUploadSuccess (res) {
      console.log(res)
      // 保存上传成功之后的图片地址
      // 它会显示出来给用户看
      this.imgSrc = res.data.url
      this.$message.success('上传素材成功')
      this.loadImages()
    },
    hLoadImgOk () {
      // 关闭对话框，把  imgSrc 置空
      // 3000 给用户一点时间反应
      setTimeout(() => {
        this.dialogVisible = false
        this.imgSrc = null
      }, 3000)
      // alert('用户成功地看到这张图')
    }
  }
}
</script>

<style lang="less" scoped>

  .image-container /deep/ .el-card__body{
      padding: 20px;
  }

  .img_item {
    position: relative;
    box-sizing: border-box;
  }
  .option {
    position: absolute;
    left: 5px;
    right:5px;
    bottom: 5px;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    color: #fff;
    span {
      margin: 0 30px;
      cursor: pointer;
    }
  }
  .avatar{
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
</style>
