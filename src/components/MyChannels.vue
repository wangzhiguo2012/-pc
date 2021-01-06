<template>
   <!-- 由于它的根元素是el-form-item，则在使用这个组件时，要用el-form包起来 -->
   <el-form-item label="频道">
    <!-- clearable： 表示可清空的单选 -->
    <el-select v-model="channelId" clearable placeholder="请选择频道" @change="hSelectChange" >
      <el-option
      v-for="channel in channels"
      :key="channel.id"
      :label="channel.name"
      :value="channel.id"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
// 引入方法，发请求，取回数据给channels
import { getArticleChannels } from '@/api/article'

export default {
  name: 'MyChannels',
  data () {
    return {
      channelId: '', // 当前选中频道
      channels: [] // 频道列表
    }
  },
  computed: { },
  async created () {
    const result = await getArticleChannels()
    console.log('loadChannels', result)
    this.channels = result.data.data.channels
  },
  // created () {
  //   this.loadChannels()
  // },
  methods: {
    hSelectChange (val) {
      this.$emit('aaa', val)
    }
  }
}
</script>
