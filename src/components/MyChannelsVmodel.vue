<template>
   <el-form-item label="频道">
    <el-select @change="hSelectChange"  v-model="channelId" clearable placeholder="请选择频道">
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
  name: 'MyChannelsVmodel',
  props: ['value'], // 收集从v-model上传过来的父组件中定义数据项的值
  data () {
    return {
      channelId: this.value, // 当前选中频道
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
      this.$emit('input', val)
    }
  },
  watch: {
    value () {
    // 如果value值有变化，则直接赋值给channelId(v-model中的数据)
    // value(newVal,oldVal)

      console.log('value的值变化了', this.value)
      this.channelId = this.value
    }
  }
}
</script>
