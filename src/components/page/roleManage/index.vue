<template>
  <div style="background-color: white;overflow: hidden;padding:40px">
    <el-button type="success" plain style="width:138px;height:50px;margin-left:1000px" @click="addAdmin">新增管理员</el-button>
    <el-table :data="tableData" border style="width: 60%;margin-top:40px">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="password" label="管理员账号"></el-table-column>
      <el-table-column prop="rName" label="权限"></el-table-column>
      <el-table-column prop="address" label="操作">
        <div slot-scope="scope">
          <el-button type="text">重置密码</el-button>
          <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
        </div>
      </el-table-column>
    </el-table>

    <el-dialog title="新增管理员" :visible.sync="addDialog" width="30%" center>
      <div>
        <p style="width:100px;text-align:right;  display: inline-block;border;margin-right:20px">账号:</p>
        <el-input v-model="form.account" placeholder="请输入经销商账号" style="width:300px"></el-input>
      </div>
      <div>
        <p
          style="width:100px;text-align:right;  display: inline-block;border;margin-right:20px;margin-top:20px"
        >初始密码:</p>
        <el-input v-model="form.password" placeholder="请输入经销商账号" style="width:300px"></el-input>
      </div>
      <div>
        <p
          style="width:100px;text-align:right;  display: inline-block;border;margin-right:20px;margin-top:20px"
        >权限:</p>
        <el-select v-model="form.roleId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.rid"
            :label="item.rname"
            :value="item.rid"
            style="width:300px"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { jurisdiction } from "../../../api";
export default {
  data() {
    return {
      form: {},
      tableData: [],
      addDialog: false, //新增
      options: [], //权限列表
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      jurisdiction.getAllUser({ pageNum: 1, pageSize: 1000 }).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
      });
      jurisdiction.getAllRole().then(res=>{
        console.log(res)
        this.options =res.data
      })
    },
    //添加管理员
    addAdmin(){
      this.addDialog = true
    },
    //添加用户
    addUser() {
      jurisdiction.addPcUser(this.form).then((res) => {
        console.log(res);
        this.addDialog = false
        this.getData()
      });
    },
    //删除用户
    deleteUser(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          jurisdiction.deletePcUser({ param1 : row.id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.addDialog = false;
              this.getData();
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
  },
};
</script>

<style>
</style>