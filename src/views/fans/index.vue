<template>
  <div class='fans-container'>
      <el-card>
          <div slot="header">
              <my-breadcrumb>粉丝管理</my-breadcrumb>
          </div>
          <!-- tabs组件 -->
          <el-tabs v-model="activeName" type="card"  @tab-click="hTabClick">
              <el-tab-pane label="粉丝列表" name="list">
                  <!-- 列表 -->
                  <div class="fan_list">
                      <div class="fans_item" v-for="(fan,idx) in list" :key='idx'>
                          <el-avatar :size='80'
                          :src="fan.photo"></el-avatar>
                          <p>{{fan.name}}</p>
                          <el-button type="primary" plain size="small">+关注</el-button>
                      </div>
                  </div>
                  <el-pagination background
                  layout="prev,pager,next"
                  :page-size="per_page"
                  @current-change="hChangePage"
                  :total="total"></el-pagination>
              </el-tab-pane>
              <el-tab-pane label="粉丝画像" name="img">
                  <div ref="main" style="width: 600px;height:400px"></div>
              </el-tab-pane>
          </el-tabs>
      </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getFans, getFansStatistics } from '../../api/fans'
import echarts from 'echarts'
export default {
  name: 'my-fans',
  props: { },
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      activeName: 'list',
      per_page: 20,
      page: 1,
      list: [],
      total: 0,
      // 测试头像
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  computed: { },
  created () {
    this.loadFans()
  },
  mounted () { },
  methods: {
    async loadFans () {
      const result = await getFans(this.page, this.per_page)
      console.log(result)
      this.list = result.data.data.results
      this.total = result.data.data.total_count
    },
    hChangePage (curPage) {
      this.page = curPage
      this.loadFans()
    },
    hTabClick (tab) {
      if (tab.name === 'img') {
        this.draw()
      }
    },
    async draw () {
      // 去取回真实的数据
      const result = await getFansStatistics()
      const ages = result.data.data.age
      const ageY = []
      const ageX = []
      for (const key in ages) {
        ageY.push(ages[key])
        ageX.push(key.replace('le', '小于').replace('gt', '大于') + '岁 ')
      }
      var myChart = echarts.init(this.$refs.main)
      var option = {
        xAxis: {
          type: 'category',
          data: ageX
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: ageY,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220,220,220,0.8)'
          }
        }]
      }
      myChart.setOption(option)
    }

  }
}
</script>

<style scoped lang='less'>
.fans_list {
    .fans_item {
        width: 120px;
        height: 170px;
        border:1px dashed #ddd;
        text-align: center;
        padding-top:10px;
        display: inline-block;
        margin-right: 30px;
        margin-bottom:30px;
        p {
            margin: 10px 0;
        }
    }
}
</style>
