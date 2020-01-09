<template>
  <div class="g-container">
    <!-- <div class="qp">
      <el-button class="btn" size="mini" type="primary" @click="goTo()">开始游戏</el-button>
    </div> -->
    <!-- <el-button type="primary" @click="print" v-print="'#printTest'">去打印</el-button> -->
    <div id="printTest" class="dada">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
        :header-cell-style="{background:'rgb(229, 229, 229)',color:'#606266'}"
      >

        <el-table-column label="队员" align="center">
          <template slot-scope="scope">
            <div><span>{{ scope.row.num }}</span> <span> {{ scope.row.realName }} </span></div>
          </template>
        </el-table-column>

        <el-table-column v-if="show1" label="第一轮" align="center">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.list[0].winOrFail=='fail'" class="sf">负</span>
              <span v-if="scope.row.list[0].winOrFail=='win'" class="sf">胜</span>
              <span v-if="scope.row.list[0].winOrFail=='平'" class="sf">平</span>

              <span> {{ scope.row.list[0].winScore }} 分</span></div>
            <div><span>对手:{{ scope.row.list[0].otherNum }}</span> <span>成绩{{ scope.row.list[0].socre }} </span></div>
          </template>
        </el-table-column>

        <el-table-column v-if="show2" label="第二轮" align="center">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.list[1].winOrFail=='fail'" class="sf">负</span>
              <span v-if="scope.row.list[1].winOrFail=='win'" class="sf">胜</span>
              <span v-if="scope.row.list[1].winOrFail=='平'" class="sf">平</span>
              <span> {{ scope.row.list[1].winScore }} 分</span></div>
            <div><span>对手:{{ scope.row.list[1].otherNum }}</span> <span>成绩{{ scope.row.list[1].socre }} </span></div>
          </template>
        </el-table-column>

        <el-table-column v-if="show3" label="第三轮" align="center">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.list[2].winOrFail=='fail'" class="sf">负</span>
              <span v-if="scope.row.list[2].winOrFail=='win'" class="sf">胜</span>
              <span v-if="scope.row.list[2].winOrFail=='平'" class="sf">平</span>
              <span> {{ scope.row.list[2].winScore }} 分</span></div>
            <div><span>对手:{{ scope.row.list[2].otherNum }}</span> <span>成绩{{ scope.row.list[2].socre }} </span></div>
          </template>
        </el-table-column>

        <el-table-column v-if="show4" label="第四轮" align="center">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.list[3].winOrFail=='fail'" class="sf">负</span>
              <span v-if="scope.row.list[3].winOrFail=='win'" class="sf">胜</span>
              <span v-if="scope.row.list[3].winOrFail=='平'" class="sf">平</span>
              <span> {{ scope.row.list[3].winScore }} 分</span></div>
            <div><span>对手:{{ scope.row.list[3].otherNum }}</span> <span>成绩{{ scope.row.list[3].socre }} </span></div>
          </template>
        </el-table-column>

        <el-table-column v-if="show5" label="第五轮" align="center">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.list[4].winOrFail=='fail'" class="sf">负</span>
              <span v-if="scope.row.list[4].winOrFail=='win'" class="sf">胜</span>
              <span v-if="scope.row.list[4].winOrFail=='平'" class="sf">平</span>
              <span> {{ scope.row.list[4].winScore }} 分</span></div>
            <div><span>对手:{{ scope.row.list[4].otherNum }}</span> <span>成绩{{ scope.row.list[4].socre }} </span></div>
          </template>
        </el-table-column>

        <el-table-column v-if="show6" label="第六轮" align="center">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.list[5].winOrFail=='fail'" class="sf">负</span>
              <span v-if="scope.row.list[5].winOrFail=='win'" class="sf">胜</span>
              <span v-if="scope.row.list[5].winOrFail=='平'" class="sf">平</span>
              <span> {{ scope.row.list[5].otherNum }} 分</span></div>
            <div><span>对手:{{ scope.row.list[5].otherNum }}</span> <span>成绩{{ scope.row.list[5].socre }} </span></div>
          </template>
        </el-table-column>

        <el-table-column label="总分" align="center">
          <template slot-scope="scope">
            <div><span>{{ scope.row.scoreSum }}分</span></div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        :current-page.sync="currentPage"
        :page-sizes="[ 10, 20, 30, 40, 50, 60]"
        :page-size="10"
        layout="prev, pager, next,total,sizes,jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      tableData: [],
      tableData1: [],
      listFrom: {
        page: 1,
        limit: 10
      },
      currentPage: 1,
      total: 1
    }
  },
  created() {
    this.getListData()
  },
  methods: {
    getListData() {
      this.$store.dispatch('cjlr/broad').then(res => {
        if (res.code == 0) {
          this.tableData = res.broadList
          this.total = this.tableData.length
          if (this.tableData[0].list[0]) {
            this.show1 = true
          }
          if (this.tableData[0].list[1]) {
            this.show2 = true
          }
          if (this.tableData[0].list[2]) {
            this.show3 = true
          }
          if (this.tableData[0].list[3]) {
            this.show4 = true
          }
          if (this.tableData[0].list[4]) {
            this.show5 = true
          }
          if (this.tableData[0].list[5]) {
            this.show6 = true
          }
          this.tableData.sort(this.compare('scoreSum'))
          this.tableData = this.tableData.slice((this.listFrom.page - 1) * this.listFrom.limit, this.listFrom.page * this.listFrom.limit)
        }
      })
    },
    compare(key) {
      return function(value1, value2) {
        var val1 = value1[key]
        var val2 = value2[key]
        return val2 - val1
      }
    },

    // /分页
    handleSizeChange(val) {
      this.listFrom.limit = val
      this.getListData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.listFrom.page = val
      this.getListData()
    },

    goTo() {
      this.$router.push('/djs')
    }

  }

}
</script>

<style>
.hybj{position: absolute;height: 100%;width: 100%;background: red; text-align: center;color: white; background-size:cover;
}
.wzdx{font-size: 50px;letter-spacing: 5px;position:relative;top: 30%}
.btn{ width: 100px; float: right;margin:10px;  }
 .qp{overflow: hidden;}
.dada{padding: 20px;}
.sf{font-size:20px;color: blue }

</style>
