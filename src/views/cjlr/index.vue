<template>
  <div class="g-container">
    <el-form :inline="true">
      <el-form-item label="抽签轮数：" prop="sjklx">
        <el-select v-model="listFrom.times" placeholder="请选择" class="w-full" @change="inquire">
          <el-option
            v-for="item in cqlsList"
            :key="item.val"
            :label="item.lab"
            :value="item.val"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
             <el-button icon="el-icon-search" type="primary" @click="inquire">查询每轮成绩</el-button>
          </el-form-item> -->
    </el-form>

    <div>
      <div><h2>{{ listFrom.times }}成绩</h2></div>
      <el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column type="index" label="" width="60" align="center" />
        <el-table-column label="队伍信息" align="center" />
        <el-table-column label="队手信息" align="center" />
        <el-table-column type="index" label="" width="100" align="center" />
      </el-table>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border stripe :header-cell-style="{background:'rgb(229, 229, 229)',color:'#606266'}">

        <el-table-column type="index" label="序号" width="60" align="center" />

        <el-table-column prop="groupANum" label="编号" align="center" />
        <el-table-column prop="groupARealname" label="队员" align="center" />
        <el-table-column label="级别" width="120" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.groupALevel" />
          </template>
        </el-table-column>
        <el-table-column prop="groupAScore" label="分数" align="center" />

        <el-table-column prop="groupBNum" label="编号" align="center"  />
        <el-table-column prop="groupBRealname" label="队员" align="center" />
        <el-table-column label="级别" width="120" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.groupBLevel" />
          </template>
        </el-table-column>
        <el-table-column prop="groupBScore" label="分数" align="center" />
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="fsjs(scope.row)">计算 </el-button>
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
      cqlsList: [
        { val: '第一轮', lab: '第一轮' },
        { val: '第二轮', lab: '第二轮' },
        { val: '第三轮', lab: '第三轮' },
        { val: '第四轮', lab: '第四轮' },
        { val: '第五轮', lab: '第五轮' },
        { val: '第六轮', lab: '第六轮' }
      ],
      loading: false,
      currentPage: 1,
      tableData1: [],
      total: 1,
      source: { times: '第一轮' },
      groupALevel: '',
      groupBLevel: '',
      tableData: [],
      listFrom: {
        page: 1,
        limit: 10,
        times: '第一轮'
      }
    }
  },
  created() {
    this.getListData()
  },
  methods: {

    // 获取数据源列表
    getListData() {
      this.$store.dispatch('cq/matchlist', this.listFrom).then(res => {
        this.tableData = res.page.list
        this.total = res.page.totalCount
        this.dcbgshow = false
      })
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
    },

    inquire() {
      this.getListData()
    },
    fsjs(row) {
      if (row.groupALevel != null && row.groupBLevel != null) {
        this.$store.dispatch('cjlr/cjupdate', row).then(res => {
          if (res.code == 0) {
            this.$message({
              message: '计算成功',
              type: 'success'
            })
            this.getListData()
          } else {
            this.$message({
              type: 'warning',
              message: res.msg
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请填写比赛级别！'
        })
      }
    }

  }
}
</script>

<style>
.el-table__empty-block{display: none !important;}
</style>
