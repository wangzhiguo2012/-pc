<template>
  <div class="publish-container">
    <el-card>
      <div solt="hearder">
        <my-breadcrumb>发布文章</my-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="80px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor
            v-model="article.content"
            :option="editorOption"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio label="单图"></el-radio>
            <el-radio label="三图"></el-radio>
            <el-radio label="无图"></el-radio>
            <el-radio label="自动"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="article.cover.type>0" label="">
          <el-row :gutter="10">
            <el-col v-for="(item,idx) in article.cover.type" :key="idx" :xs="8" :sm="6" :md="6" :lg="4">
              <my-cover v-model="article.cover.images[idx]"></my-cover>
            </el-col>
          </el-row>
        </el-form-item>
        <my-channels v-model="article.channel_id"></my-channels>

        <el-form-item>
          <el-button type="primary" @click="hAddArticle(false)">发表</el-button>
          <el-button @click="hAddArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import MyCover from '@/components/MyCover'
import MyChannels from '@/components/MyChannels'
import MyBreadcrumb from '../../components/MyBreadcrumb.vue'
import { addArticle } from '@/api/article'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'AddArticle',
  props: {},
  data () {
    return {
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在5到30之间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          { min: 20, max: 30000, message: '最少20个字', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: 'blur' }
        ]
      },
      editorOption: {
        // 占位配置
        placeholder: '',
        modules: {
          // 配置工具栏
          toolbar: [
            ['bold', 'italic'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      channels: [],
      article: {
        title: '这里好文章，不读就错过了',
        content: '今天不读书，明天就',
        cover: {
          type: 0,
          images: ''
        },
        channel_id: ''
      }
    }
  },
  components: {
    quillEditor,
    MyBreadcrumb,
    MyChannels,
    MyCover
  },
  computed: {},
  created () {
    // this.loadChannels()
  },
  mounted () {},
  methods: {
    hAddArticle (isDraft) {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const result = await addArticle(isDraft, this.article)
            this.$message.success('发布成功')
            this.article.title = ''
            this.article.content = ''
          } catch (err) {
            this.$message.error('发布失败')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.publish-container/deep/ .ql-editor {
  height: 300px;
}
.publish-container/deep/ .ql-toolbar.ql-snow {
  padding: 0 8px;
}
</style>
