<template>
  <div class="g-container">
    <el-form v-model="listFrom" :inline="true">
      <el-form-item label="小组编号:" prop="formInline.tableName">
        <el-input v-model="listFrom.num" placeholder="请输入小组编号" clearable />
      </el-form-item>
      <el-form-item label="学校名称：" prop="formInline.tableName">
        <el-input v-model="listFrom.school" placeholder="请输入学校名称" clearable />
      </el-form-item>
      <el-form-item label="队员姓名：" prop="formInline.tableName">
        <el-input v-model="listFrom.realName" placeholder="请输入队员姓名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="inquire">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="m-buttons-row">
      <el-button icon="el-icon-circle-plus-outline" type="primary" @click="showDialog( )">新增</el-button>
      <el-button icon="el-icon-delete" type="danger" @click="del">删除</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
        :header-cell-style="{background:'rgb(229, 229, 229)',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="num" label="小组编号" width="120" align="center" />
        <el-table-column prop="school" label="学校名称" align="center" />
        <el-table-column prop="realName" label="队员姓名" align="center" />
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button class="mini-btn" type="primary" icon="el-icon-edit" circle title="编辑" @click="editData(scope.row)" />
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

    <el-dialog :title="formName" :visible.sync="dialogFormVisible" width="550px" :close-on-click-modal="false">
      <el-form ref="source" :model="source" style="width:520px" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="小组编号：" prop="num">
          <el-input v-model="source.num" autocomplete="off" :disabled="disabled" @change="bdbhcf" />
        </el-form-item>
        <el-form-item label="学校名称：" prop="school">
          <el-input v-model="source.school" autocomplete="off" />
        </el-form-item>
        <el-form-item label="队员姓名：" prop="realName">
          <el-input v-model="source.realName" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="formName" :visible.sync="dialogFormVisible1" width="550px" :close-on-click-modal="false">
      <el-form ref="source" :model="source" style="width:520px" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="小组编号：" prop="num">
          <el-input v-model="source.num" autocomplete="off" :disabled="disabled" @change="bdbhcf" />
        </el-form-item>
        <el-form-item label="学校名称：" prop="school">
          <el-input v-model="source.school" autocomplete="off" />
        </el-form-item>
        <el-form-item label="队员姓名：" prop="realName">
          <el-input v-model="source.realName" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { formatDate } from '@/datetime/formatDate'

export default {
  data() {
    return {
      loading: false,
      disabled: false,
      currentPage: 1,
      total: 1,
      multipleSelection: [],
      formName: '',
      dialogFormVisible: false, dialogFormVisible1: false,
      source: {
        id: '',
        num: '',
        school: '',
        realName: ''
      }, // 注册
      rules: {
        num: [
          { required: true, message: '请输入小组编号', trigger: 'blur' }
          // { required: true, message: '请输入小组编号', trigger: 'blur' },
        ],
        school: [
          // { required: true, message: '请输入学校名称', trigger: 'blur' },
          { required: true, message: '请输入小组编号', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入队员姓名', trigger: 'blur' }
          // { required: true, message: '请输入队员姓名', trigger: 'blur' },
        ]
      },
      formLabelWidth: '120px',
      tableData: [],
      type: '',
      listFrom: {
        page: 1,
        limit: 10,
        num: '',
        school: '',
        realName: ''
      }
    }
  },
  created() {
    this.getListData()
  },
  methods: {
    // 获取数据列表
    getListData() {
      this.$store.dispatch('xxlr/memberlist', this.listFrom).then(res => {
        this.tableData = res.page.list
        this.total = res.page.totalCount
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

    // 查询
    inquire() {
      this.getListData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 新增人员
    showDialog() {
      this.disabled = false
      this.formName = '录入人员信息'
      this.dialogFormVisible = !this.dialogFormVisible

      this.dialogFormVisible1 = false
      this.source = {
        num: '',
        school: '',
        realName: ''
      }
      this.type = 0
    },
    bdbhcf() {
      for (var i = 0; i < this.tableData.length; i++) {
        var numdata1 = this.tableData[i].num
        var numdata2 = this.source.num
        if (numdata1 == numdata2) {
          this.source.num = ''
          this.$message({
            type: 'warning',
            message: '队伍编号重复请重新输入'
          })
        }
      }
    },
    // 修改数据源
    editData(row) {
      this.formName = ' 修改人员信息'
      this.disabled = true
      this.dialogFormVisible1 = !this.dialogFormVisible1
      this.source.num = row.num
      this.source.school = row.school
      this.source.realName = row.realName
      this.source.id = row.id
      this.type = 1
    },

    save() {
      this.$refs.source.validate((valid) => {
        if (valid) {
          if (this.type == 1) {
            this.$store.dispatch('xxlr/memberupdate', this.source).then(res => {
              if (res.code == 0) {
                this.getListData()
                this.dialogFormVisible = false
                this.dialogFormVisible1 = false
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } if (res.code == 500) {
                this.$message({
                  message: res.msg + '无法新增或删除队伍信息',
                  type: 'warning'
                })
              }
            })
          } else if (this.type == 0) {
            this.$store.dispatch('xxlr/membersave', this.source).then(res => {
              if (res.code == 0) {
                this.getListData()
                this.dialogFormVisible = false
                this.dialogFormVisible1 = false
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              } if (res.code == 500) {
                this.$message({
                  message: res.msg + '无法新增或删除队伍信息',
                  type: 'warning'
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },

    del() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请勾选你需要删除的数据',
          type: 'warning'
        })
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var arrDelete = []
          this.multipleSelection.forEach(item => {
            this.tableData.forEach((d, id) => {
              if (item.id == d.id) {
                arrDelete.push(item.id)
              }
            })
          })

          this.$store.dispatch('xxlr/memberdelete', arrDelete).then(res => {
            if (res.code == 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getListData()
            }
            if (res.code == 500) {
              this.$message({
                message: res.msg + '无法新增或删除队伍信息',
                type: 'warning'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }

  }
}
</script>

<style>
</style>
