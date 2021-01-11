<template>
  <div class=''>
    主页
    <div><my-cover v-model="imgSrc"></my-cover></div>
    <el-form>
    <my-channels @aaa='hAaa'></my-channels>
     <my-channels-vmodel v-model="channel_id_vmodel"></my-channels-vmodel>
    </el-form>

  </div>
</template>

<script>
// 引入MyChannels组件
import MyChannelsVmodel from '@/components/MyChannelsVmodel'
import MyChannels from '@/components/MyChannels'
import MyCover from '@/components/MyCover'
export default {
  name: 'Home',
  props: { },
  components: {
    MyChannels,
    MyCover,
    MyChannelsVmodel
  },
  data () {
    return {
      imgSrc: 'http://toutiao.meiduo.site/Fk2YzxVPpu89_zmIFX75DtbD8atn',
      channel_id_vmodel: 101,
      channel_id: ''
    }
  },
  computed: { },
  created () {
    console.log('home组件', this.$eventBus)
    this.$eventBus.$on('helloeventbus', (eventObj) => {
      console.log('在home组件中，收到了helloeventbus消息，参数是', eventObj)
    })
  },
  mounted () { },
  methods: {
    hAaa (value) {
      this.channel_id = value
    }
  }
}
</script>

<style scoped lang='less'></style>
