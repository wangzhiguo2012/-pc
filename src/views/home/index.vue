<template>
  <div class=''>
    <el-form>
    <my-channels @aaa='hAaa'></my-channels>
    </el-form>
  </div>
</template>

<script>
// 引入MyChannels组件
import MyChannels from '@/components/MyChannels'
export default {
  name: 'Home',
  props: { },
  components: {
    MyChannels
  },
  data () {
    return { }
  },
  computed: { },
  created () { },
  mounted () { },
  methods: {
    hAaa (value) {
      this.channel_id = value
    }
  }
}
</script>

<style scoped lang='less'></style>
