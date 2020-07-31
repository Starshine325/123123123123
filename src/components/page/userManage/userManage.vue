<template>
  <div style="background-color:#fff;margin:10px;padding-top:40px">
    <div style="margin-top: 15px; overflow: hidden;">
      <el-input
        placeholder="可搜索用户手机号查询"
        v-model="textPhone"
        style="width:300px;float:right;margin-right:300px"
        @change="Search"
      >
        <el-button slot="append" icon="el-icon-search" @click="find"> </el-button>
      </el-input>
    </div>
    <el-table :data="tableData" border style="margin-left:50px;width:79%;margin-top:20px">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="id" label="用户ID" ></el-table-column>
      <el-table-column prop="phone" label="手机号" ></el-table-column>
      <el-table-column prop="address" label="微信名" ></el-table-column>
      <el-table-column prop="address" label="取件数" ></el-table-column>
      <el-table-column prop="address" label="寄件数"></el-table-column>
      <el-table-column prop="createTime" label="注册时间" ></el-table-column>
      <el-table-column prop="address" label="操作" >
        <div slot-scope="scope"> 
            <el-button type="text" @click="goDetail(scope.row)">查看详情</el-button>
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
      style="text-align:center"
    ></el-pagination>
  </div>
</template>

<script>
import { User } from '../../../api'
export default {
  data() {
    return {
      textPhone: "",
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 10
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData(){
      User.getUserList({"pageNum": this.pageNum,"pageSize": this.pageSize,param3:this.textPhone}).then(res=>{
        console.log(res)
        this.tableData =res.data.list
      })
    },
    //搜索
    find(){
      this.getData()
    },
    //搜素
    Search(){
      if(this.textPhone == ''){
        this.getData()
      }
    },
    //查看详情
    goDetail(row){
      this.$router.push({
        path:'/userManageDetail',
        query:{id:row.id}
      })
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style>
</style>