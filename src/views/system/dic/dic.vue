<template>
  <div class="g-container"> 
    <div class="m-buttons-row">
      <el-button icon="el-icon-plus" type="primary" @click="showDialog(1)">添加</el-button>
      <el-button icon="el-icon-edit" type="success" @click="refresh">刷新索引</el-button> 
    </div>
    <div>
      <el-table :header-cell-style="{background:'rgb(229, 229, 229)',color:'#606266'}" stripe 
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          type="index"
          label="序号"
          width="55"
          align="center"
        />
        <el-table-column
          prop="typeName"
          label="类型名称"
          align="center"
        />
        <el-table-column
          prop="typeCode"
          label="类型编码"
          align="center"
        />
        <el-table-column sortable
          prop="lxjlsj"
          label="记录时间"
          align="center"
        />
        <el-table-column  label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button class="mini-btn" type="primary" icon="el-icon-edit" circle title="编辑" @click="editData(scope.row)" />
            <el-button class="mini-btn" type="danger" icon="el-icon-delete" circle title="删除" @click="del(scope.row,scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5,10, 20, 30, 40, 50, 60]"
          :page-size="10"
          layout="prev, pager, next,total,sizes,jumper"
          :total="totals">
        </el-pagination>
    </div>

  
<el-dialog title="添加业务字典项" :visible.sync="dialogFormVisible" width="520px">
      <el-row>
          <el-form :model="form" :label-width="formLabelWidth" :rules="rules" ref="sourcelist">
            <el-form-item label="类型名称"  prop="typeName">
              <el-input v-model="form.typeName"   />
            </el-form-item>
         
            <el-form-item label="类型编码" prop="typeCode" >
              <el-input v-model="form.typeCode"  />
            </el-form-item>
            <el-form-item label="键"  prop="dKey">
              <el-input v-model="form.dKey" />
            </el-form-item>
            <el-form-item label="值"  prop="dValue">
              <el-input v-model="form.dValue"   />
            </el-form-item>
          </el-form>
      </el-row>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="addsjzd">确 定</el-button>
      </div>
    </el-dialog>



<el-dialog :title="formname1" :visible.sync="dialogFormVisible1">
          <el-form :model="form1"  :label-width="formLabelWidth" :rules="rules2" ref="sourcelist2">
            <el-form-item label="键"  prop="dKey">
              <el-input v-model="form1.dKey" />
            </el-form-item>
            <el-form-item label="值"   prop="dValue">
              <el-input v-model="form1.dValue"  />
            </el-form-item>
          </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1=false">取 消</el-button>
        <el-button type="primary" @click="addJZ" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="修改业务字典项" :visible.sync="dialogFormVisible2" width="1000px">
      <el-row>
        <el-col :span="11">
          <el-form :model="form" :label-width="formLabelWidth" :rules="rules1" ref="sourcelist1">
            <el-form-item label="类型名称" prop="typeName">
              <el-input v-model="form.typeName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="类型编码" prop="typeCode" >
              <el-input v-model="form.typeCode" autocomplete="off" disabled/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11">
          <el-row style="margin-bottom:20px;">
            <el-button size="mini" icon="el-icon-plus" type="primary" @click="addJZShow" :loading="loading">添加</el-button>
          </el-row>
           <el-table
              :data="tableData1"
              border
              style="width: 100%"
              >
              <el-table-column
                prop="dKey"
                label="键"
                align="center"
              />
              <el-table-column
                prop="dValue"
                label="值"
                align="center"
              />
              <el-table-column  label="操作"  align="center">
                <template slot-scope="scope">
                  <el-button class="mini-btn" type="danger" icon="el-icon-delete" circle title="删除" @click="delDictId(scope.row)"></el-button>
                </template>
              </el-table-column>
             </el-table>
        </el-col>
      </el-row>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
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
       rules: {
          dKey: [
            { required: true, message: '请输入键', trigger: 'blur' },
          ],   
          dValue: [
            { required: true, message: '请输入值', trigger: 'blur' },
          ],
          typeName:[
            {required: true, message: '请输入类型名称', trigger: 'blur'}
          ], 
          typeCode:[
            {required: true, message: '请输入类型编码', trigger: 'blur'}
          ],  
        },
        rules1: {
          typeName:[
            {required: true, message: '请输入类型名称', trigger: 'blur'}
          ], 
          typeCode:[
            {required: true, message: '请输入类型编码', trigger: 'blur'}
          ],  
        },
        rules2: {
          dKey: [
            { required: true, message: '请输入键', trigger: 'blur' },
          ],   
          dValue: [
            { required: true, message: '请输入值', trigger: 'blur' },
          ],
         
        },
      multipleSelection: [],
      type: 1, // 1是添加 2是修改
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      formLabelWidth: '120px',
      currentPage: 1,
      totals:1,
      formList:{
        page:1,
        limit:20,
      },
      form1:{
        dKey:'',
        dValue:'',
        typeName: '',
        typeCode: '',

      },
      form: {
        typeName: '',
        typeCode: '',
        
      },
      listFrom:{
        typeCode:'',
      },
      
      tableData: [],
      tableData1: [],

      oldtypeName: '',
      oldtypeCode: '',
      formname1:'',
    }
  },
  created(){
    this.getlistData();
  },
  methods: { 
    //获取主数据
    getlistData(){
      let self = this;
      this.$store.dispatch('dictionaryManagement/getDictByWh',this.formList).then(res=>{
        if(res.code==200){
           self.tableData =res.set;
            self.totals = res.totals;
            for (let i = 0; i < self.tableData.length; i++) {
                  let date=self.tableData[i].lxjlsj;
                  let date1 = new Date(date).getTime();
                  self.tableData[i].lxjlsj  = formatDate(date1, 'yyyy-MM-dd hh:mm:ss');                
              }
        }
      })
    },
    //总汇分页
      handleSizeChange(val) {
        this.formList.limit=val
        this.getlistData()
      },
      handleCurrentChange(val) {
         this.currentPage=val
         this.formList.page=val
         this.getlistData()
      },
        //刷新
    refresh(){
      this.$store.dispatch('dictionaryManagement/refresh').then(res=>{
        if(res.code==1000){
          this.$message({
                message:res.message,
                type: 'success'
              })
              this.getlistData();
        }else{
          this.$message({
                message: res.message,
                type: 'warning'
              })
        }
      })
    },
 
    //添加
    showDialog( ) {
      this.form= {
        typeName: '',
        typeCode: '',
        dKey:'',
        dValue:'',
      };
      this.tableData1=[];
      this.dialogFormVisible = !this.dialogFormVisible
    },
    //添加键值
    addJZShow(){
      this.formname1="添加键值"
      this.dialogFormVisible1=true;
      this.form1.dKey="";
      this.form1.dValue="";
    },
 
   //添加键值确认
    addJZ(){ 
      this.$refs.sourcelist2.validate((valid) => {
          if (valid) {
            let arr1={}
            arr1.dKey=this.form1.dKey;
            arr1.dValue=this.form1.dValue
            
            this.$store.dispatch('dictionaryManagement/addDictJZ',this.form1).then(res=>{
              if(res.code==1000){
                this.$message({
                      message:'添加成功',
                      type: 'success'
                    })
                    this.tableData1.push(this.form1)
                    this.dialogFormVisible1=false;
              }else{
                this.$message({
                      message: res.message,
                      type: 'warning'
                    })
              }
            })
            } else { 
            return false;
          }
        });
      
      
    },
    //删除键值
    delDictId(row){ 

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           let len=this.tableData1.length;
            if(len>1){

                    let form={}
                    form.typeCode=this.form1.typeCode,
                    form.dKey=row.dKey,

                    this.$store.dispatch('dictionaryManagement/delDictId',form).then(res=>{   
                      if(res.code==1000){
                        this.$message({
                            message:res.message ,
                            type: 'success'
                          })

                          this.refresh();
                          this.getJZlist();

                      }
                      else{
                        this.$message({
                            message: res.message,
                            type: 'warning'
                          })
                      }
                    })
            }
            else{
              this.$message({
                    message: '键值只有一条记录，不能删除',
                    type: 'warning'
                  })
            } 



        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
    },

     addsjzd(){
        this.$refs.sourcelist.validate((valid) => {
          if (valid) {
            this.loading=true
                this.$store.dispatch('dictionaryManagement/addDict' ,this.form).then(res=>{
                      this.loading=false;
                      if(res.code==1000){
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                          }); 


                        this.$confirm('确定要刷新索引吗？, 是否继续?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => { 
                          this.refresh();
                        }).catch(() => {
                          this.$message({
                            type: 'info',
                            message: '已取消刷新索引'
                          });          
                        });
                        this.getlistData();
                        this.dialogFormVisible = !this.dialogFormVisible

                      }else{
                        this.$message({
                              message: res.message,
                              type: 'warning'
                            })
                      }
                })
            } else { 
            return false;
          }
        });
      
    },

  
    // 编辑
    editData(row){
      this.form1= {
        typeName: row.typeName,
        typeCode: row.typeCode,
        dKey:'',
        dValue:'',
      };
      this.oldtypeName=row.typeName;
      this.oldtypeCode=row.typeCode;
      this.tableData1= [];
      this.listFrom={
          typeCode:row.typeCode
        }
     this.getJZlist();

      this.form.typeName=row.typeName;
      this.form.typeCode=row.typeCode;
      this.dialogFormVisible2 = !this.dialogFormVisible2

    },

    //确认编辑
    save(){
      let arr={
        typeCode:this.oldtypeCode,
        typeName:this.oldtypeName,
        NewTypeCode:this.form.typeCode,
        NewTypeName:this.form.typeName,
      };

        this.$refs.sourcelist1.validate((valid) => {
                  if (valid) {
                    this.loading=true
                    this.$store.dispatch('dictionaryManagement/updateDict' ,arr).then(res=>{
                      this.loading=false
                      if(res.code==1000){
                        this.$message({
                              message:"修改成功",
                              type: 'success'
                            })
                      
                        this.refresh();
                          this.getlistData();
                        this.dialogFormVisible2 = !this.dialogFormVisible2

                      }else{
                        this.$message({
                              message: res.message,
                              type: 'warning'
                            })
                      }
                    })
                  } else { 
                return false;
              }
        });


      
    },
    


    //获取键值
    getJZlist(){
      this.tableData1=[];
       this.$store.dispatch('dictionaryManagement/getDictByJZ',this.listFrom).then(res=>{
            let arr1 =res;
            for (var item in arr1){
              let arr={
                dKey:item,
                dValue:arr1[item],
              }
              this.tableData1.push(arr)
             }
      })
    },



   //删除
    del(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let listFrom1={
              typeCode:row.typeCode
            }
            this.$store.dispatch('dictionaryManagement/delDictCode',listFrom1).then(res=>{   
              if(res.code==1000){
                this.$message({
                    message: res.message+ "刷新索引后生效",
                    type: 'success'
                  })
              }
              else{
                this.$message({
                    message: res.message,
                    type: 'warning'
                  })
              }
            }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },




  }
}
</script>

<style>

</style>
