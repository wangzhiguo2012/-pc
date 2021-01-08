<template>
  <div class=''>
    <el-form>
    <my-channels @aaa='hAaa'></my-channels>
    </el-form>
    <my-cover v-model="imgSrc"></my-cover>
  </div>
</template>

<script>
// 引入MyChannels组件
import MyChannels from '@/components/MyChannels'
import MyCover from '@/components/MyCover'
export default {
  name: 'Home',
  props: { },
  components: {
    MyChannels,
    MyCover
  },
  data () {
    return {
      imgSrc: 'http://toutiao.meiduo.site/Fk2YzxVPpu89_zmIFX75DtbD8atn'
    }
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
