<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <my-breadcrumb>内容管理</my-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.channelId" placeholder="请选择频道" clearable>
            <el-option v-for="channel in channels" :key="channel.id" :value="channel.id" :label="channel.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
                    v-model="form.date"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
        </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="hQuery"  :disabled='loading'>查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 46147 条结果：
      </div>
      <!-- 数据列表 -->
      <el-table :data="articles" style="width: 100%" v-loading="loading">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover.images[0]"
              style="width: 150px; height: 100px"
              lazy
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="info"
              >待审核</el-tag
            >
            <el-tag v-else-if="scope.row.status === 2" type="success"
              >审核通过</el-tag
            >
            <el-tag v-else-if="scope.row.status === 3" type="warning"
              >审核失败</el-tag
            >
            <el-tag v-else-if="scope.row.status === 4" type="danger"
              >已删除</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              circle
              @click="hEdit(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="hDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->
      <!-- 列表分页 -->
      <el-pagination
              :disabled='loading'
               style="margin-top:10px;"
               background
               layout="prev, pager, next"
               @current-change="hPageChange"
               :total="total_count">>
        </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '../../api/article'
import MyBreadcrumb from '../../components/MyBreadcrumb'
export default {
  name: 'ArticleIndex',
  props: {},
  data () {
    return {
      form: {
        channelId: null, // 下拉列表选中的值
        date: null, // 查询日期区间，默认为null
        status: null // 查询文章的状态，默认为null
      },
      articles: [], // 文章列表
      curPage: 1,
      total_count: 0,
      channels: [],
      loading: false
    }
  },
  components: {
    MyBreadcrumb
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticles () {
      let beginPubdate = null
      if (this.form.date) {
        beginPubdate = this.form.date[0]
      }
      const endPubdate = this.form.date && this.form.date[1]
      let channelId = null
      if (this.form.channelId) {
        channelId = this.form.channelId
      }
      this.loading = true
      getArticles({
        channel_id: channelId,
        status: this.form.status,
        begin_pubdate: beginPubdate,
        end_pubdate: endPubdate,
        page: this.curPage
      }).then(res => {
        this.articles = res.data.data.results
        // 保存总数
        this.total_count = res.data.data.total_count
        this.loading = false
      }).catch(err => {
        console.log(err)
        // alert('错误！')
        this.$message({
          message: '查询失败，参数无效',
          type: 'error'
        })
        this.loading = false
      })
    },
    hQuery () {
      console.log(this.form.date)
      // 再次调用 查询方法
      this.curPage = 1
      this.loadArticles()
    },
    hEdit (row) {
      const id = row.id.toString()
      this.$router.push('/editArticle/' + id)
    },
    hPageChange (curPage) {
      this.curPage = curPage
      // 2. 再发请求
      this.loadArticles()
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    hDelete (row) {
      const id = row.id.toString()
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(id).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.loadArticles()
        }).catch(err => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
          console.dir(err)
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
</style>
