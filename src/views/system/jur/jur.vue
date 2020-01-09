<template>
  <div class="g-container">
    <el-row class="m-filter-row">
      <el-col :span="4" align justify>
        <el-button icon="el-icon-search" type="primary" @click="openPermissions">开通权限</el-button>
      </el-col>
    </el-row>
    <div>
     <el-table
        :data="tableData"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="name"
      label="权限名称"
      >
    </el-table-column>
      
    <el-table-column
      prop="istype"
      label="权限分类"
       align="center"
      width="180">
       <template  slot-scope="scope">
          <div v-if="scope.row.istype==0" >菜单</div>
          <div v-if="scope.row.istype==1" >功能</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="path"
       align="center"
      label="权限路径">
    </el-table-column>
    <el-table-column
      prop="icon"
       align="center"
      label="图标">
    </el-table-column>
    <el-table-column
      prop="code"
       align="center"
      label="权限code">
    </el-table-column>
    <el-table-column
      prop="zindex"
       align="center"
      label="优先级">
    </el-table-column>
    <el-table-column
      label="操作"
       align="center">
      <template  slot-scope="scope">
            <el-button class="mini-btn" type="primary" icon="el-icon-edit" circle title="编辑" @click="editData(scope.row,scope.$index)" />
            <el-button class="mini-btn" type="danger" icon="el-icon-delete" circle title="删除" @click="delData(scope.row,scope.$index)"></el-button>
            <el-button class="mini-btn" type="success"  icon="el-icon-plus" circle title="添加子节点" @click="addDatazid(scope.row,scope.$index)" />  
      </template>
    </el-table-column>
  </el-table>
    </div>
    <el-dialog :title="formName" :visible.sync="dialogSetVisible" width="580px">
      <el-form :model="source" :label-width="formLabelWidth">
        <el-form-item label="权限名称:" >
          <el-input v-model="source.name"   />
        </el-form-item>
        <el-form-item label="权限分类:"   >
          <el-radio-group v-model="source.istype">
            <el-radio :label="0">菜单</el-radio>
            <el-radio :label="1">功能</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限路径:"  >
          <el-input v-model="source.path"   />
        </el-form-item>
        <el-form-item label="权限code:"  >
          <el-input v-model="source.code"   />
        </el-form-item>
        <el-form-item label="图标:"  >
          <el-input v-model="source.icon"   />
        </el-form-item>
        <el-form-item label="权限优先级:"  >
          <el-input v-model="source.zindex"  />
          请填写大于0的整数数字
        </el-form-item>
        <el-form-item label="文本域:"  >
          <el-input type="textarea" :rows="3" v-model="source.descpt" />
        </el-form-item>
        <el-button type="primary" @click="save" :loading="loading">提交</el-button>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
   
    return {
      loading:false,
    dialogSetVisible: false,
    formName:"",
    formLabelWidth:"120px",
    source:{
     
      name:'',
      istype:'',
      path:'',
      icon:'',
      code:'',
      zindex:'',
      descpt:'',

      type:'',
       pid: '',
    },
    tableData: [],
    }
  },
  created(){
    this.getTreeData()
  },
  methods: {


    //权限树
    getTreeData(){
       this.$store.dispatch('authorityMangement/permList').then(res=>{               
          let arr = res
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
              this.tableData = tree;
        })
    },
    openPermissions(){
      this.source={
        pid: '',
        name:'',
        istype:'',
        path:'',
        icon:'',
        code: '',
        zindex:'',
        descpt:'',
        type:'',
      };
      this.source.type = 1;
      this.source.pid  = 0;
      this.formName="添加权限";
      this.dialogSetVisible = !this.dialogSetVisible;
    },
    //编辑
    editData(row,index){
      let id=row.id;
      this.source.pid=row.id; 
      this.$store.dispatch('authorityMangement/getPerm',id).then(res=>{  
          this.source=res;
          this.source={
            id:res.id,
            pid:res.pid,
            name:res.name,
            istype:res.istype,
            path:res.path,
            icon:res.icon,
            code: res.code,
            zindex:res.zindex,
            descpt:res.descpt, 
          };
          this.source.type=0;
        }),
      this.formName="编辑权限";
      this.dialogSetVisible = !this.dialogSetVisible;
      
    },
    //添加子节点
    addDatazid(row){
      this.source={
        pid: '',
        name:'',
        istype:'',
        path:'',
        icon:'',
        code: '',
        zindex:'',
        descpt:'',
        type:'',
      }; 
      this.source.type=1;
      this.source.pid=row.id;
      this.formName="添加子节点";
      this.dialogSetVisible = !this.dialogSetVisible;

    },
    save() {
        var e_ipt=this.source.zindex;		
        var re = /^\+?[1-9]\d*$/;
        if(!re.test(e_ipt))
        {
          this.$message({
              message:"权限优先级请填写大于0的整数数字",
              type: 'warning'
            });
            return false;
        }
        this.loading = true
      this.$store.dispatch('authorityMangement/setPerm',this.source).then(res=>{ 
        this.loading = false
        if(res=="ok"){
            this.getTreeData();
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.dialogSetVisible = false;
        }else{
          this.$message({
              message: res,
              type: 'warning'
            })
        }
       });
      
    },
    delData(row,index){
        let id=row.id;
        this.$confirm('此操作将删除'+row.name+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { 
            this.$store.dispatch('authorityMangement/del',id).then(res=>{ 
              if(res=="ok"){
                this.getTreeData();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
                  
              }else{
                this.$message({
                    message: res,
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

    }
  }
}
</script>

<style>

</style>
