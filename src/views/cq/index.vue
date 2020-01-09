<template>
  <div class="g-container">
    <el-form v-model="listFrom" :inline="true">
      <el-form-item label="抽签轮数：">
        <el-select v-model="listFrom.times" placeholder="请选择" class="w-full" @change="selectTrigger">
          <el-option
            v-for="item in cqlsList"
            :key="item.val"
            :label="item.lab"
            :value="item.val"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-star-off" type="primary" @click="cqdata">抽签</el-button>
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-download" type="success">
          <a :href="'http://139.9.175.238:8080/guandan/app/match/excelDownload?times='+ listFrom.times">导出表格</a>
        </el-button>
      </el-form-item>

    </el-form>
    <div><h2>{{ listFrom.times }}抽签结果</h2></div>
    <div>
      <el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column type="index" label="" width="60" align="center" />
        <el-table-column label="队伍信息" align="center" />
        <el-table-column label="队手信息" align="center" />
      </el-table>

      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border stripe :header-cell-style="{background:'rgb(229, 229, 229)',color:'#606266'}">
        <el-table-column type="index" label="桌号" width="60" align="center" />
        <el-table-column prop="groupANum" label="编号" align="center" width="100" />
        <el-table-column prop="groupASchool" label="学校" align="center" />
        <el-table-column prop="groupARealname" label="队员" align="center" />
        <el-table-column label="方位" align="center">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.groupAPosition== 0">东西</span>
              <span v-if="scope.row.groupAPosition == 1">南北</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="groupBNum" label="编号" align="center" width="100" />
        <el-table-column prop="groupBSchool" label="学校" align="center" />
        <el-table-column prop="groupBRealname" label="队员" align="center" />
        <el-table-column label="方位" align="center">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.groupBPosition == 0">东西</span>
              <span v-if="scope.row.groupBPosition == 1">南北</span>
            </div>
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
      dcbgshow: false,
      loading: false,
      cqlsList: [
        { val: '第一轮', lab: '第一轮' },
        { val: '第二轮', lab: '第二轮' },
        { val: '第三轮', lab: '第三轮' },
        { val: '第四轮', lab: '第四轮' },
        { val: '第五轮', lab: '第五轮' },
        { val: '第六轮', lab: '第六轮' }
      ],

      currentPage: 1,
      total: 1,
      tableData1: [],
      tableData: [],
      listFrom: {
        page: 1,
        limit: 10,
        times: '第一轮'
      },
      url: ''
    }
  },
  created() {
    this.getListData()
    // this.cqff();
  },
  methods: {
    selectTrigger() {
      this.getListData()
    },
    getlist(){
      this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
          this.tableData = res.page.list
          this.total = res.page.totalCount
        })
    },

    getListData() {
      if (this.listFrom.times == '第一轮') {
        this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
          this.tableData = res.page.list
          this.total = res.page.totalCount
        })
      }

      if (this.listFrom.times == '第二轮') {
        this.listFrom.times = '第一轮'
        this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
          this.tableData = res.page.list
          if (this.tableData.length == 0) {
            this.$message({
              type: 'warning',
              message: '您跳轮抽签了!请重新选择轮数。 '
            })
          } else {
            this.listFrom.times = '第二轮'
            this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
              this.tableData = res.page.list
              this.total = res.page.totalCount
            })
          }
        })
      }

      if (this.listFrom.times == '第三轮') {
        this.listFrom.times = '第二轮'
        this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
          this.tableData = res.page.list
          if (this.tableData.length == 0) {
            this.$message({
              type: 'warning',
              message: '您跳轮抽签了!请重新选择轮数。'
            })
            this.listFrom.times = '第一轮'
          } else {
            this.listFrom.times = '第三轮'
            this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
              this.tableData = res.page.list
              this.total = res.page.totalCount
            })
          }
        })
      }

      if (this.listFrom.times == '第四轮') {
        this.listFrom.times = '第三轮'
        this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
          this.tableData = res.page.list
          if (this.tableData.length == 0) {
            this.$message({
              type: 'warning',
              message: '您跳轮抽签了!请重新选择轮数。'
            })
            this.listFrom.times = '第一轮'
          } else {
            this.listFrom.times = '第四轮'
            this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
              this.tableData = res.page.list
              this.total = res.page.totalCount
            })
          }
        })
      }

      if (this.listFrom.times == '第五轮') {
        this.listFrom.times = '第四轮'
        this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
          this.tableData = res.page.list
          if (this.tableData.length == 0) {
            this.$message({
              type: 'warning',
              message: '您跳轮抽签了!请重新选择轮数。'
            })
            this.listFrom.times = '第一轮'
          } else {
            this.listFrom.times = '第五轮'
            this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
              this.tableData = res.page.list
              this.total = res.page.totalCount
            })
          }
        })
      }

      if (this.listFrom.times == '第六轮') {
        this.listFrom.times = '第五轮'
        this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
          this.tableData = res.page.list
          if (this.tableData.length <= 0) {
            this.$message({
              type: 'warning',
              message: '您跳轮抽签了!请重新选择轮数。'
            })
            this.listFrom.times = '第一轮'
          } else {
            this.listFrom.times = '第六轮'
            this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
              this.tableData = res.page.list
              this.total = res.page.totalCount
            })
          }
        })
      }
    },

    cqdata() {
      var data = {
        times: this.listFrom.times
      }
      this.$store.dispatch('cq/matchchou', data).then(res => {
        if (res.code == 0) {
          this.$message({
            type: 'success',
            message: '抽签完成'
          })
          this.getListData()
        }
        if (res.code == 500) {
          this.$message({
            type: 'warning',
            message: res.msg + '无法重新抽签'
          })
        }
      })
    },

    // qrdata(){
    //       var cadata={
    //         times:this.listFrom.times
    //       }
    //       this.$store.dispatch('cq/matchsure', cadata).then(res => {
    //         if(res.code==0){
    //           this.dcbgshow=true;
    //         }
    //       })
    // },

    dcbg() {
      this.url = 'http://139.9.175.238:8080/guandan/app/match/excelDownload' + this.this.listFrom.times
    },

    // 分页
    handleSizeChange(val) {
      this.listFrom.limit = val
      this.getListData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.listFrom.page = val
      this.getListData()
    }

  }
}
</script>

<style>
.red{color: red}
.el-table__empty-block{display: none !important;}
</style>
