<template>
    <div class="article-container">
        <el-card class="box-card">
            <!-- 标题 -->
            <div slot="hearder" class="clearfix">
            <my-breadcrumb>评论管理</my-breadcrumb>
            </div>
            <!-- 主体表格 -->
            <el-table
            v-loading='loading'
            :data="comments"
            style="width:100%">
            <el-table-column prop='title' label='文章标题'></el-table-column>
            <el-table-column prop='total_comment_count' label='总评论数'></el-table-column>
            <el-table-column prop='fans_comment_count' label='粉丝评论数'></el-table-column>
            >
            <!-- 由于是后端回传的数据是数值，而我们要显示出来的对应字符串，所以这里不能直接使用status -->
            <el-table-column label="评论状态">
                <template slot-scope="scope">
                   <el-tag v-if="scope.row.comment_status">关闭</el-tag>
                    <el-tag type="success" v-else>正常</el-tag>

                </template>
            </el-table-column>
            <e-table-column label='操作'>
                <template slot-scope="scope">
                      <el-button
                 v-if="scope.row.comment_status"
                size="mini"
                type="primary"
                circle
                @click="hToggleComment(scope.row)">打开评论</el-button>
                <el-button
                v-else
                size="mini"
                type="danger"
                circle
                @click="hToggleComment(scope.row)">
                关闭评论
                </el-button>

                </template>
            </e-table-column>
            </el-table>
            <!-- 分页组件 它只是根据total和page-size来显示页码，而与具体的表格数据无关 -->
            <el-pagination
            :disabled='loading'
            style="margin-top:10px"
            background
            layout="prev,pager,next"
            @current-change="hPageChange"
            :page-size="per_page"
            :total="total_count">
            </el-pagination>
        </el-card>
    </div>

</template>
<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { getComments, modCommentStatus } from '@/api/comment'
export default {
  name: 'CommentsIndex',
  props: {},
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      page: 1,
      per_page: 10,
      loading: false,
      total_count: 50,
      comments: []
    }
  },
  computed: {},
  created () {
    this.loadComment()
  },
  methods: {
    async loadComment () {
      const result = await getComments(this.page, this.per_page)
      console.log(result)
      this.comments = result.data.data.results
      this.total_count = result.data.data.total_count
    },
    async hToggleComment (comment) {
      try {
        await modCommentStatus(comment.id, toString(), !comment.comment_status)
        comment.comment_ststus = !comment.comment_status
        this.$message.success('操作成功')
      } catch {
        this.$message.error('操作失败')
      }
    },
    hPageChange (curPage) {
      this.page = curPage
      this.loadComment()
    }
  }
}
</script>
<style lang="less">

</style>
