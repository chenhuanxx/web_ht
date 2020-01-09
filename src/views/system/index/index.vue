<template>
  <div class="g-container">
    <div class="m-buttons-row">
      <el-button icon="el-icon-plus" type="primary" @click="showDialog(1)">添加</el-button>
    </div>
    <div>
      <el-table border :header-cell-style="{background:'rgb(229, 229, 229)',color:'#606266'}" stripe 
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column  type="index"  width="55" label="序号"  align="center"/>
        <el-table-column  prop="code"  label="角色代码"   align="center"/>
        <el-table-column  prop="roleName"  label="角色名称"   align="center"/>
        <el-table-column  prop="descpt" label="角色描述"  align="center" />
        <el-table-column sortable  prop="jlsj" label="添加时间"   align="center"/>
        <el-table-column  label="操作"  align="center"  width="155" >
            <template  slot-scope="scope">
              <el-button class="mini-btn" type="primary" icon="el-icon-edit" circle title="编辑" @click="upDate(scope.row)" />
              <el-button class="mini-btn" type="danger" icon="el-icon-delete" circle title="删除" @click="del(scope.row,scope.$index)"></el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="formName" :visible.sync="dialogFormVisible" width="520px" :close-on-click-modal="false">
      <el-form :model="form" :label-width="formLabelWidth" :rules="rules" ref="source">
        <el-form-item label="角色名称:"  prop="roleName">
          <el-input v-model="form.roleName"  />
        </el-form-item>
        <el-form-item label="角色编号:"  prop="code">
          <el-input v-model="form.code"  />
        </el-form-item>
        <el-form-item label="角色描述:" prop="descpt">
          <el-input v-model="form.descpt"   />
        </el-form-item>
         <el-form-item label="权限:"  required>
            <el-tree
              :data="dataTree"
              show-checkbox
              default-expand-all
              :check-strictly="true"
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
              >
            </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="save" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/datetime/formatDate"
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      loading:false,
      dataTree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      formName:'',
      dialogFormVisible: false,
      type: '1',
      input1: '',
      input2: '',
      formLabelWidth: '120px',
      rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ],   
          code: [
            { required: true, message: '请输入角色编号', trigger: 'blur' },
          ],
          descpt:[
            {required: true, message: '请输入角色描述', trigger: 'blur'}
          ],  
        },
      form: {
        roleName:"",
        code:"",
        descpt:"",

      },
      checked:[],
      tableData: [],
      arrlistD:[],
    }
  },
  created(){
    this.getListData()
  },
  methods: {
    getListData(){
      let self = this;
        this.$store.dispatch('roleManagement/getRoleList').then(res=>{     
          this.tableData = res;
          for (let i = 0; i < self.tableData.length; i++) {
              let date=self.tableData[i].jlsj;
              let date1 = new Date(date).getTime();
              self.tableData[i].jlsj  = formatDate(date1, 'yyyy-MM-dd hh:mm:ss');                
          }
        })

    },
    //权限树
    getTreeData(){
       this.$store.dispatch('roleManagement/findPerms').then(res=>{               
          let arr = res
          this.getdataTree(arr); 
        })
    },

    //重组树
    getdataTree(arr){
      var tree = arr.filter(v => v.pId == 0);
              tree.map(v => {
                // 查找二级
                v.children = arr.filter(({ pId }) => pId == v.id);
                if (v.children.length == 0) delete v.children;
                else {
                  v.children.map(item => {
                  // 查找三级
                    item.children = arr.filter(({ pId }) => pId == item.id);
                    if (item.children.length == 0) delete item.children;
                  });
                }
              });
              this.dataTree = tree
              
    },

    showDialog(type) {
      this.formName="开通角色";
      this.form={};
      
      this.getTreeData();
      if (type) {
        this.type = type
      }
      this.dialogFormVisible = !this.dialogFormVisible
    },

    //获取选中的id
    getCheckedKeys1(){
        // var rad=''
        // var ridsa = this.$refs.tree.getCheckedKeys().join(',');// 获取当前的选中的数据[数组] -id, 把数组转换成字符串      
        // var ridsb = this.$refs.tree.getHalfCheckedNodes();// 获取当前的选中的数据{对象}
        // ridsb.forEach(ids=>{//获取选中的所有的父级id
        //   rad+=','+ids.pId
        // })
        // rad=rad.substr(1); // 删除字符串前面的','
        // var rids=rad+','+ridsa;
        // var arr=rids.split(',');//  把字符串转换成数组
        // arr=[...new Set(arr)]; // 数组去重
        // rids=arr.join(',');// 把数组转换成字符串
        // this.checked=arr;
        //  console.log()
         this.checked=this.$refs.tree.getCheckedKeys()
      },
    save() {
      this.$refs.source.validate((valid) => {
          if (valid) {
             if (this.type == 1) {
              this.getCheckedKeys1();
              this.form.layuiTreeCheck=this.checked;
              this.loading=true;
              this.$store.dispatch('roleManagement/addRole',this.form).then(res=>{   
                this.loading=false;
                if(res == "ok"){
                  this.getListData();
                  this.$message({
                    message: "添加成功！请退出登录后重新进入",
                    type: 'success'
                  })
                  
                  this.dialogFormVisible = !this.dialogFormVisible
                }else {
                    this.$message({
                      message: res,
                      type: 'warning'
                    })
                }
              
              })
     
      }else if(this.type==2){
              this.getCheckedKeys1();
              this.form.layuiTreeCheck=this.checked;
                this.loading=true;
                this.$store.dispatch('roleManagement/setRole',this.form).then(res=>{ 
                  this.loading=false;
                    if(res == "ok"){
                      this.getListData();
                        this.$message({
                          message: "修改成功！请退出登录后重新进入",
                          type: 'success'
                        })
                      
                        this.dialogFormVisible = !this.dialogFormVisible
                      }else {
                          this.$message({
                            message: res,
                            type: 'warning'
                          })
                      }
                })
              } 

          } else { 
            return false;
          }
        });


     
    },
    //编辑
    upDate(row){
      this.type=2;
      this.formName="编辑角色";
      this.form.id = row.id ;
       this.form.roleName = row.roleName ;
       this.form.code = row.code ;
       this.form.descpt = row.descpt ;
      this.$store.dispatch('roleManagement/getRoleListByid',this.form).then(res=>{  
          let perms = res.mapList.perms;
          this.getdataTree(perms);
          let roleDetail = res.mapList.roleDetail;
          this.form={
              roleName:roleDetail.roleName,
              code:roleDetail.code,
              descpt:roleDetail.descpt,
              layuiTreeCheck:[],
              }
          this.form.id = row.id ;
          let rolePerms =res.mapList.roleDetail.rolePerms;
          let arr=[];
          for(var i = 0; i<rolePerms.length ;i++){
              arr.push(rolePerms[i].permissionId);
          }
        //后台获取的被选中的权限id
          let arr2=[]
          for(var i = 0; i<rolePerms.length ;i++){
              let arrList={};
              if(rolePerms[i].permissionId){
                arrList.id = rolePerms[i].permissionId;
                arr2.push(arrList);
              }
          }
          JSON.parse(JSON.stringify(arr2));
          this.$refs.tree.setCheckedNodes(arr2);
          this.arrlistD=arr2
          setTimeout(()=>{ this.$refs.tree.setCheckedNodes(this.arrlistD)},500);
      })
      
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    //删除
    del(row) {
      this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                let id=row.id
                this.$store.dispatch('roleManagement/delRole',id).then(res=>{   
                  if(res="ok"){
                    this.getListData()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                      })
                    
                  }
              })

          
          }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
        
      }
    
    
  }
}
</script>

<style>

</style>
