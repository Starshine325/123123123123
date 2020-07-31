<template>
  <div style="background-color:white;padding:30px">
    <div style="width:50%">
      <el-button class="btn" @click="addExpress">新增经销商</el-button>
    </div>
    <div style="clear: both;"></div>

    <el-table :data="tableData" border style="width: 60%;margin-top:20px">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="userName" label="经销商账号"></el-table-column>
      <el-table-column prop="sumCounter" label="关联柜机数量"></el-table-column>
      <el-table-column prop="sumPrice" label="收入总额"></el-table-column>
      <el-table-column prop="createTime" label="注册时间"></el-table-column>
      <el-table-column prop="zip" label="操作">
        <div slot-scope="scope">
          <el-button type="text" @click="seeDetail(scope.row)">详情</el-button>
          <el-button type="text" style="color:green" @click="compile(scope.row)">编辑</el-button>
          <el-button type="text" style="color:red" @click="deleteDecale(scope.row)">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="text-align:center;margin-top:10px"
    ></el-pagination>

    <!-- 编辑经销商-->
    <el-dialog :title="changeStatus==0 ? '新增经销商':'编辑经销商' " :visible.sync="centerDialogVisible" width="30%" center>
      <div v-if="changeStatus == 0">
        <p
          style="width:100px;text-align:right;  display: inline-block;border;margin-right:20px"
        >经销商账号:</p>
        <el-input v-model="form.userName" placeholder="请输入经销商账号" style="width:300px"></el-input>
      </div>
      <div v-if="changeStatus == 1">
        <p
          style="width:100px;text-align:right;  display: inline-block;border;margin-right:20px"
        >经销商账号:</p>
        <p style="display: inline-block">{{changeName}}</p>
      </div>
      <div v-if="changeStatus == 0">
        <p
          style="width:100px;text-align:right;  display: inline-block;border;margin-right:20px;margin-top:10px"
        >初始密码:</p>
        <el-input v-model="form.password" placeholder="请输入初始密码" style="width:300px"></el-input>
      </div>
      <div style="display:flex;margin-top:10px">
        <div
          style="text-align:right; margin-right:20px;flex:1;margin-top:10px;margin-left:5px"
        >关联柜机:</div>
        <div style="flex:5">
          <el-select
            v-model="selecta"
            multiple
            placeholder="请选择"
            filterable
            style="width:300px"
          >
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="affirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dealer } from "../../../api";
export default {
  data() {
    return {
      options: [],
      form: {},
      selecta:[],
      centerDialogVisible: false,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 10,
      imageUrl: "", //图片地址
      cityName: "", //公司名称
      changeStatus:0,//0代表新增  1 代表编辑
      changeName:'',
      changeId:''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      //获取分销商列表
      dealer
        .getDealerList({ pageNum: this.pageNum, pageSize: this.pageSize })
        .then((res) => {
          console.log(res);
          this.total = res.data.total;
          this.tableData = res.data.list;
        });
      //获取默认柜机列表
      dealer.getDefalutCabint({}).then((res) => {
        console.log(res);
        this.options = res.data;
      });
    },
    //确定按钮
    affirm() {
      console.log(this.form.counterList);
      if(this.changeStatus == 0){
        this.form.counterList =this.selecta
        dealer.addDealer(this.form).then((res) => {
        console.log(res);
        this.centerDialogVisible = false;
        if (res.code == 200) {
          this.getData();
        }
      });
      }
      if(this.changeStatus == 1){
          let obj ={
            id:this.changeId,
            userName:this.changeName,
            counterList:this.selecta
          }
          dealer.putCompileDealer(obj).then(res=>{
            console.log(res)
            if(res.code ==200){
              this.centerDialogVisible = false
              this.getData()
            }
          })
      }
     
    },
    //编辑按钮
    compile(row){
      this.selecta = []
      this.changeId =row.id
      this.changeName = row.userName
      this.form.counterList =[]
       if(row.counterIdList !=null){
         row.counterIdList.split(',').forEach((res,index) => {
        this.$set(this.selecta,index,Number(res))
      });
       }else {
         this.selecta =[]
       }
      
      this.changeStatus =1
      this.centerDialogVisible = true
    },
    //取消按钮
    cancel() {
      this.centerDialogVisible =false
    },
    //详情
    seeDetail(row) {
      this.$router.push({
        path: "agentManageDetail",
        query: {
          id: row.id,
        },
      });
    },
    //删除
    deleteDecale(row) {
      this.$confirm("此操作将永久删除经销商, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          dealer.deleteDealer({ param1: row.id }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            this.getData()

            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //上传图片成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //点击新增快递公司按钮
    addExpress() {
      this.changeStatus = 0
      this.form={}
      this.selecta = ''
      this.centerDialogVisible = true;
    },
    handleSizeChange(res) {
      this.pageSize = res;
      this.getData();
    },
    handleCurrentChange(res) {
      this.pageNum = res;
      this.getData();
    },
  },
};
</script>

<style>
.btn {
  width: 150px;
  height: 46px;
  border: rgb(85, 124, 7) 1px solid;
  color: rgb(85, 124, 7);
  border-radius: 10px;
  float: right;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 120px;
  margin-left: 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>