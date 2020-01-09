<style scoped>
.filter-label{text-align: right;font-size: 16px;padding-right:20px }
.bor-tom{border-bottom:1px solid black ;}
.bor-top{margin-top:20px; }
</style> 
<template>
  <div class="g-container">

    <el-form   v-model="listFrom" :inline="true" >
          <el-form-item label="用户名:" prop="formInline.tableName">
            <el-input v-model="userSearch.uname" placeholder="请输入用户名" clearable  />
          </el-form-item>
          <el-form-item label="手机号：" prop="formInline.tableName">
             <el-input v-model="userSearch.umobile" placeholder="请输入手机号" clearable  />
          </el-form-item>
          <el-form-item label="添加时间:" prop="formInline.tableName">
             <el-date-picker
                v-model="userSearch.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
          </el-form-item>
          <el-form-item>
             <el-button icon="el-icon-search" type="primary" @click="userSearchList">查询</el-button>
          </el-form-item>
      </el-form> 
 
    <div class="m-buttons-row bor-top">
      <el-button icon="el-icon-plus" type="primary" @click="openUser">开通用户</el-button>
    </div>
    <div>
      <el-table border :header-cell-style="{background:'rgb(229, 229, 229)',color:'#606266'}" stripe 
        ref="multipleTable"
        :data="tableData"
      >
        <el-table-column
          width="80"
          align="center"
          type="index"
          label="序号"
        />
        <el-table-column
          prop="yhm"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="sjh"
          label="手机号"
          width="160"
          align="center"
        />
        <el-table-column
          prop="yx"
          label="邮箱"
          align="center"
        />
        <el-table-column
          prop="roleNames"
          label="角色名称"
          align="center"
        />
        <el-table-column sortable
          prop="jlsj"
          label="添加时间"
          align="center"
        />
         <el-table-column
         label="是否启用"
         width="120"
         align="center"
          >
           <template slot-scope="scope"> 
            <el-switch v-model="scope.row.yhzt"  :active-value="0"  active-color="#13ce66" 
             :inactive-value="1"  inactive-color="#ff4949" @change="changeYHZT(scope.row)">            
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="name"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            
            <el-button class="mini-btn" type="primary" icon="el-icon-edit" circle title="编辑" @click="editData(scope.row)" />
            <el-button class="mini-btn" v-if="scope.row.jlzt==0" type="danger" icon="el-icon-delete" circle title="删除"  @click="del(scope.row)"></el-button>
            <el-button class="mini-btn" v-if="scope.row.jlzt==1" type="success" icon="el-icon-check" circle title="恢复"   @click="recoverUser(scope.row)"></el-button>
            
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[5, 10, 20, 30, 40, 50, 60]"
          :page-size="10"
          layout="prev, pager, next,total,sizes,jumper"
          :total="total">
        </el-pagination> 
    </div>

    <el-dialog :title="formName" :visible.sync="dialogFormVisible" width="580px" :close-on-click-modal="false">

      <el-form :model="source" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="yhm">
            <el-input v-model="source.yhm"></el-input>
          </el-form-item>
          <el-form-item label="手机号"  required>
            <el-input v-model="source.sjh"  @blur="blur1()"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="yx">
            <el-input v-model="source.yx"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="mm">
            <el-input text="password" type="password" v-model="source.mm" autocomplete="off" placeholder="默认密码是：654321"/>请填写6位以上的密码
          </el-form-item> 
          <el-form-item label="用户角色"  required>
            <el-checkbox-group v-model="roleIds">
              <el-checkbox v-for="item in jsList" :label="item.id" :key="item.id"  >{{item.roleName}}</el-checkbox> 
            </el-checkbox-group>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">保存</el-button>
          </el-form-item>
        </el-form>

    </el-dialog>

  </div>
</template>

<script>  
import { getAdmin} from '@/utils/auth'  
import { formatDate } from "@/datetime/formatDate"
export default {
  data() {
    return {
      loading:false,
      roleIds:[],
       source: {
          yhm: '',
          sjh: '',
          yx: '',
          mm: '', 
        },
        rules: {
          
          yhm: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          
           yx: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          
          mm: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 105, message: '请填写6位以上的密码', trigger: 'blur' }
          ],
          
           
        },
  
      formName:'', 
      multipleSelection: [],  
      type: 1, // 1是添加 2是修改
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
       jlsj:'',
      roleNames:"",
        yx:"",
        sjh:'',
        yhm:'',
      },
      currentPage2:1,
      total:1,
      userSearch:{ },
      yhm:'',
      listFrom:{
        page:1,
        limit:20
      },
      tableData: [],
      jsList:[],
      userid:null,
    }
  },
  
  created(){
    this.getUserList()
   this.yhm = getAdmin(); 
  },
  methods: {
    blur1(){
      var phone =this.source.sjh;
          if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
            this.$message({
              message:" 手机号码有误，请重新填写",
              type: 'warning'
            });  
              return false; 
          } 
    },
 
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
             var phone =this.source.sjh;
          if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
            this.$message({
              message:" 手机号码有误，请重新填写",
              type: 'warning'
            });  
              return false; 
          } else  {
               this.loading=true
              this.source.roleIds=this.roleIds;
              this.$store.dispatch('userManagement/setUser',this.source).then(res=>{  
                this.loading=false
                  if(res=="ok"){
                    this.$message({
                        message: "添加成功",
                        type: 'success'
                    })
                    this.getUserList()
                    this.dialogFormVisible = !this.dialogFormVisible;
                  }else{
                    this.$message({
                        message: res,
                        type: 'warning'
                    })
                    this.dialogFormVisible = true;
                  }
              }) 
            }
             
          } else { 
            return false;
          }
        });
      },
       

    //查询
    userSearchList(){
      if(this.userSearch.date==null){
          this.userSearch.insertTimeStart='';
          this.userSearch.insertTimeEnd='';
      } 
      let arr = this.userSearch.date;
      if(arr){
        let date1 = new Date(this.userSearch.date[0]);//.getTime();
        this.userSearch.insertTimeStart=formatDate(date1, 'yyyy-MM-dd'); 
        let date2 = new Date(this.userSearch.date[1]);//.getTime();
        this.userSearch.insertTimeEnd = formatDate(date2, 'yyyy-MM-dd'); ;
      }; 
      this.getUserList()
    },
    getUserList(){
          if(this.userSearch!=[]){
            this.listFrom=Object.assign(this.listFrom ,this.userSearch)
          }
          this.$store.dispatch('userManagement/getUserList',this.listFrom).then(res=>{   
          this.tableData=res.list;
          this.total=res.totals;
        })
    },
     //分页
      handleSizeChange(val) {
        this.listFrom.limit=val
        this.getUserList()
      },
      handleCurrentChange(val) {
        this.currentPage2=val
         this.listFrom.page=val
         this.getUserList()
      },

      //开通用户
      openUser(){
        this.source={};
        this.roleIds=[];
        this.userid=null;
        this.formName="开通用户";
        this.dialogFormVisible = !this.dialogFormVisible;
        this.getRoles();
      },
      //获取所有角色getUserAndRoles
      getRoles(){
        this.$store.dispatch('userManagement/getRoles').then(res=>{   
          this.jsList=res;
          this.total=res.totals;
        })

      },

       
      //获取用户角色getUserAndRoles
      getUserAndRoles(){
        this.$store.dispatch('userManagement/getUserAndRoles',this.userid).then(res=>{   
            this.jsList=res.roles;
            let jsList1=res.user.userRoles;
            let arr=[]
            for(let i=0;i<jsList1.length;i++){
              arr.push(jsList1[i].roleId)
         }
            this.roleIds=arr;
            this.total=res.totals;
        })

      },

      //改变用户状态
      changeYHZT(row){ 

        this.$confirm('是否初始化', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                let yhztListData={
                  id:row.id,
                  job:row.yhzt,
                  version:row.version
                }
                
                this.$store.dispatch('userManagement/setJobUser',yhztListData).then(res=>{
                  if(res=="ok"){
                      this.$message({
                          message: "操作成功",
                          type: 'success'
                      })
                    this.getUserList()
                  }
                  else{
                    this.$message({
                          message:res,
                          type: 'warning'
                      })
                      this.getUserList()
                  }
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
      //编辑
      editData(row){
        this.formName="编辑用户"

        if(row.yhzt==1){
            this.$message({
                  message: "该用户未启用",
                  type: 'warning'
                })
            return
        }
        if(row.jlzt==1){
          const h = this.$createElement;
          this.$message({
            message:h('p', null, [
            h('p', { style: 'color: red' }, '该用户已经删除，不可进行编辑；如需编辑，请先恢复用户状态。')
          ]),
            type: 'warning'
          })
          return
        }
        this.userid=row.id
        this.getUserAndRoles();
        this.source= {
            jlsj:row.jlsj,
            version:row.version,
            roleNames:row.roleNames,
            yx:row.yx,
            sjh:row.sjh,
            yhm:row.yhm,
            id:row.id,
            mm:row.mm
            }
            
        this.dialogFormVisible = !this.dialogFormVisible;
      },
      //删除
       del(row){
         if(row.yhm==this.yhm){
            this.$message({
              type: 'error',
              message: "删除用户不能是自己"
            });  
         }else{
            let deletelist={
                id:row.id,
                version:row.version
              }
              this.$confirm('此操作将'+row.yhm+'删除吗？, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$store.dispatch('userManagement/delUse',deletelist).then(res=>{
                    if(res=="ok"){
                      this.$message({
                        message: "删除成功",
                        type: 'success'
                      })
                      this.getUserList()
                    } 
                  })
                }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
         }
      },
      //恢复
      recoverUser(row){
         let recoverlist={
           id:row.id,
           version:row.version
         }
        this.$store.dispatch('userManagement/recoverUser',recoverlist).then(res=>{
             if(res=="ok"){
                this.$message({
                  message:"恢复成功",
                  type: 'success'
                })
                this.getUserList()
              }
          this.getUserList()
                  
       })

      },

    showDialog(type) {
      this.dialogFormVisible = !this.dialogFormVisible
    },
   
    
  }
}
</script>

<style>

</style>
