<template>
  <div class="g-container">
     <el-form   v-model="listFrom" :inline="true" >
          <el-form-item label="业务系统名称:" prop="formInline.tableName">
            <el-input v-model="listFrom.ywxtmc" placeholder="请输入内容" clearable/>
          </el-form-item>
          <el-form-item label="数据库连接用户名：" prop="formInline.tableName">
             <el-input v-model="listFrom.ljyhm" placeholder="请输入内容" clearable/>
          </el-form-item>
          <el-form-item>
             <el-button icon="el-icon-search" type="primary" @click="inquire">查询</el-button>
          </el-form-item>
      </el-form> 
    <div class="m-buttons-row">
      <el-button icon="el-icon-circle-plus-outline" type="primary" @click="showDialog(0)">注册</el-button>
      <el-button icon="el-icon-delete" type="danger" @click="del">删除</el-button>
    </div>
    <div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border stripe
       :header-cell-style="{background:'rgb(229, 229, 229)',color:'#606266'}">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column prop="ywxtmc" label="业务系统名称"  align="center"/>
        <el-table-column prop="sjklx" label="数据库类型" align="center"  width="150"/>
        <el-table-column prop="ljurl" label="数据库连接字符串" align="center"/>
        <el-table-column prop="ljyhm" label="数据库连接用户名" align="center"/>
        <el-table-column prop="gxsj" label="最后修改时间" width="150" align="center" sortable/>
        <el-table-column label="是否启用 " width="120" align="center">
          <template slot-scope="scope"> 
            <el-switch v-model="scope.row.yhzt" :active-value="0"  active-color="#13ce66" :inactive-value="1"  inactive-color="#ff4949" @change="enable(scope.row)">            
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button class="mini-btn" type="success" icon="el-icon-time" circle title="测试" @click="linkStatus(scope.row)"/>
            <el-button class="mini-btn" type="primary" icon="el-icon-edit" circle title="编辑" @click="editData(scope.row)" />
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[ 10, 20, 30, 40, 50, 60]"
          :page-size="10"
          layout="prev, pager, next,total,sizes,jumper"
          :total="total">
        </el-pagination>  
    </div>
    
    
    <el-dialog :title="formName" :visible.sync="dialogFormVisible" width="550px" :close-on-click-modal="false">
      <el-form :model="source" style="width:520px" :rules="rules" ref="source">
        <el-form-item label="数据源名称" :label-width="formLabelWidth" prop="sjymc">
          <el-input v-model="source.sjymc" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数据库类型" :label-width="formLabelWidth"  prop="sjklx">
          <el-select v-model="source.sjklx" placeholder="请选择" class="w-full" @change="selectChange">
             <el-option
                v-for="item in sjklxList"
                :key="item.sjklx"
                :label="item.sjklx"
                :value="item.sjklx">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据库驱动" :label-width="formLabelWidth"  prop="sjkqd">
          <el-input v-model="source.sjkqd" autocomplete="off" value="item.sjkqd" disabled/>
        </el-form-item>
        <el-form-item label="数据库连接字符串" :label-width="formLabelWidth"  prop="ljurl">
          <el-input v-model="source.ljurl" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数据库连接用户名" :label-width="formLabelWidth"  prop="ljyhm">
          <el-input v-model="source.ljyhm" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数据库连接用户密码" :label-width="formLabelWidth"  prop="ljmm">
          <el-input :type="passwordType" name="password" v-model="source.ljmm" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数据库对象所有者" :label-width="formLabelWidth"  prop="dxssfl">

          <el-select v-model="source.dxssfl" placeholder="请选择" class="w-full">
            <el-option
                v-for="item in dxssflList"
                :key="item.id"
                :label="item.ywxtmc"
                :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog">取 消</el-button>
        <el-button type="primary" @click="save" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { formatDate } from "@/datetime/formatDate"

export default {
  data() {
    return {
      loading:false,
      passwordType:"password",
      currentPage: 1,
      total:1,
      multipleSelection: [],
      type: 1, // 1添加，2修改
      formName:"",
      yhzt:'',
      dialogFormVisible: false,
      source: {
        sjymc:'',
        sjklx:'',
        sjkqd:'',
        ljurl:'',
        ljyhm:'',
        ljmm:'',
        dxssfl:'',        
      },//注册
      rules: {
          sjymc: [
            { required: true, message: '请输入数据源名称', trigger: 'blur' },
          ],
          sjklx: [
            { required: true, message: '请选择数据库类型', trigger: 'change' },
          ], 
          ljyhm: [
            { required: true, message: '请输入数据库连接用户名', trigger: 'blur' },
          ],

          
          ljurl:[
            {required: true, message: '请输入连接字符串', trigger: 'blur'}
          ],
          ljmm: [
            { required: true, message: '请输入数据库连接用户密码', trigger: 'blur' },
          ],
          dxssfl: [
            { required: true, message: '请输入数据库对象所有者', trigger: 'change' },
          ],
        },
      sjklxList:[],//数据库类型
      dxssflList:[],//对象所属者
      formLabelWidth: '150px',
      tableData: [],
      listFrom:{
        page:1,
        limit:10,
        ywxtmc:'',
        ljyhm:'',
      }
    }
  },
  created(){
    this.getListData();
    
  },
  methods: {

    //获取数据源列表
    getListData(){
       
       
        let self = this;
        this.$store.dispatch('datasource/datasourceListData', this.listFrom)
        .then(res => {
                self.tableData=res.list;
                self.total=res.totals;
                
                  for (let i = 0; i < self.tableData.length; i++) {
                      let date1=self.tableData[i].gxsj
                      if(date1){
                        let date = new Date(date1);
                        self.tableData[i].gxsj  = formatDate(date, 'yyyy-MM-dd');
                      }else{
                        let date2=self.tableData[i].jlsj
                        if(date2){
                        let date3 = new Date(date2);
                        self.tableData[i].gxsj  = formatDate(date3, 'yyyy-MM-dd');
                        }
                      }
                      let arr = self.tableData[i].business.ywxtmc;
                      self.tableData[i].ywxtmc = arr
                  }
            })
            .catch(() => {
            })
    },
    //分页
      handleSizeChange(val) {
        this.listFrom.limit=val
        this.getListData()
      },
      handleCurrentChange(val) {
        this.currentPage=val
         this.listFrom.page=val
         this.getListData()
      },
     
    //查询
    inquire(){
      this.getListData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //是否启用
    enable(row){
  this.$confirm('是否启用', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {



          const enabledata={
              id:row.id,
              yhzt: row.yhzt
            }
          this.$store.dispatch('datasource/enable', enabledata).then(res=>{
                this.$message({
                message: res.message,
                type: 'success',
                offset:200
              })
            })
           

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          });   
          if(row.yhzt==0){
              row.yhzt=1
            } else if(row.yhzt==1){
              row.yhzt=0
            }       
        });
  
    },
     //注册数据源
    showDialog(type) { 
      this.getListData();
      this.formName ="注册数据源";
      this.dialogFormVisible = !this.dialogFormVisible;
      this.source={ 
        sjymc:'',
        sjklx:'',
        sjkqd:'',
        ljurl:'',
        ljyhm:'',
        ljmm:'',
        dxssfl:'',     
         };
      this.type=type;
     this.getdatabb();
    },


    getdatabb(){
       //数据库类型
        this.$store.dispatch('datasource/getDatabase').then(res=>{
          this.sjklxList =res ;
        })
        //数据库对象所属者
        this.$store.dispatch('datasource/getBusiness').then(res=>{
            this.dxssflList = res 
        })
    },

    selectChange(val){
      for(let i=0;i<this.sjklxList.length;i++){
        if(val==this.sjklxList[i].sjklx){
          // this.source.ljurl = this.sjklxList[i].ljurl;
          this.source.sjkqd = this.sjklxList[i].sjkqd;
          this.source.lxid = this.sjklxList[i].id;
        }
      }
    },

     //修改数据源
    editData(row){
      this.formName =" 修改数据源";
      this.dialogFormVisible = !this.dialogFormVisible
      this.type=1;
      this.getdatabb();
      this.source.id=row.id
      this.source.sjymc=row.sjymc
      this.source.sjklx=row.sjklx
      this.source.sjkqd=row.sjkqd
      this.source.ljurl=row.ljurl
      this.source.ljyhm=row.ljyhm
      this.source.ljmm=row.ljmm
      this.source.dxssfl=row.dxssfl   
      this.source.lxid = row.dxssfl
      
    },
    save() {
      this.$refs.source.validate((valid) => {
          if (valid) {
            if (this.type == 0) {
              this.source.category=0;
              this.loading=true;
              this.$store.dispatch('datasource/editSource',this.source).then(res=>{
                 this.loading=false;
                  this.getListData()
                  this.dialogFormVisible = false;
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                 
              })
            } else if (this.type == 1) {
              this.source.category=1;
              this.$store.dispatch('datasource/editSource',this.source).then(res=>{
                this.getListData()
                  this.dialogFormVisible = false;
                  this.$message({
                  message: res.message,
                  type: 'success'
                })
              })
            }
          } else { 
            return false;
          }
        });
      
    },
    //连接状态
    // linkStatus
    linkStatus(row){
      if(row.yhzt==1){
         this.$message({
            message: "请启用该用户",
            type: 'warning'
          })
      }else if(row.yhzt==0){
        let  data=row;
        this.$store.dispatch('datasource/linkStatus',data).then(res=>{
          if(res.code==1000){
            this.$message({
              message: res.message,
              type: 'success'
            })
          }else{
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })

      }
        
    },

    del() {
      if (this.multipleSelection.length == 0) {
         
        this.$message({
          message: '请勾选你需要删除的数据',
          type: 'warning',
          offset: 200
        })
      } 
      else {

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.multipleSelection.forEach(item => {
            this.tableData.forEach((d, i) => {
              if (item.id == d.id) {
                const deletelist = {
                  id:item.id 
                }
                
                  this.$store.dispatch('datasource/deleteData',deletelist).then(res=>{
                      this.$message({
                          message:"删除成功",
                          type: 'success',
                          offset: 200
                        })
                        this.getListData()
                  })
                }
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
     },
  
  
  
  
  }

}
</script>

<style>
</style>
