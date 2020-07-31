<template>
  <div style="background-color:#fff;margin:10px;padding:50px">
    <h2 style="text-align:center">用户详情页</h2>

    <div style="margin-top:20px">
      <h4>用户信息</h4>
      <div style="height:30px;height:30px;margin-top:30px;color:#ccc">
        <div style="width:100px;text-align: right;;display: inline-block">用户ID:</div>
        <div style="display: inline-block;margin-left:30px">{{userMessage.openId}}</div>
      </div>
      <div style="clear: both"></div>
      <div style="height:30px;height:30px;color:#ccc">
        <div style="width:100px;text-align: right;;display: inline-block">手机号:</div>
        <div style="display: inline-block;margin-left:30px">{{userMessage.phone}}</div>
      </div>
      <div style="height:30px;height:30px;color:#ccc">
        <div style="width:100px;text-align: right;;display: inline-block">微信名:</div>
        <div style="display: inline-block;margin-left:30px">{{userMessage.hometown}}</div>
      </div>
      <div style="height:30px;height:30px;color:#ccc">
        <div style="width:100px;text-align: right;;display: inline-block">注册时间:</div>
        <div style="display: inline-block;margin-left:30px">{{userMessage.createTime}}</div>
      </div>
      <div style="clear: both"></div>
    </div>
    <div style="width:100%;border:1px #ccc solid;margin-top:30px"></div>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:20px">
      <el-tab-pane label="用户取件列表" name="first">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="expressNumber" label="快递单号"></el-table-column>
          <el-table-column prop="logisticsName" label="快递公司"></el-table-column>
          <el-table-column prop="counterCode" label="快递柜编号"></el-table-column>
          <el-table-column prop="counterName" label="快递柜名称"></el-table-column>
          <el-table-column prop="location" label="所在柜格"></el-table-column>
          <el-table-column prop="status" label="状态">
            <div slot-scope="scope">
                <p v-if="scope.row.status == 0">待揽件</p>
                <p v-if="scope.row.status == 1">寄件成功</p>
                <p v-if="scope.row.status == 2">拒绝揽件</p>
                <p v-if="scope.row.status == 3">已取消</p>
            </div>
          </el-table-column>
          <el-table-column prop="userName" label="收件人"></el-table-column>
          <el-table-column prop="pickUpTime" label="入柜时间"></el-table-column>
          <el-table-column prop="address" label="操作"></el-table-column>
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
      </el-tab-pane>
      <el-tab-pane label="用户寄件列表" name="second">
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="mailNumber" label="寄件订单"></el-table-column>
          <el-table-column prop="createTime" label="下单时间"></el-table-column>
          <el-table-column prop="userName" label="寄件人"></el-table-column>
          <el-table-column prop="type" label="寄件方式">
            <div slot-scope="scope">
                <p v-if="scope.row.type == 0">快递柜寄件</p>
                <p v-if="scope.row.type == 1">上门取件</p>
            </div>
          </el-table-column>
          <el-table-column prop="counterName" label="快递公司"></el-table-column>
          <el-table-column prop="userName" label="快递员"></el-table-column>
          <el-table-column prop="postage" label="邮费"></el-table-column>
          <el-table-column prop="status" label="状态">
            <div slot-scope="scope">
                <p v-if="scope.row.status == 0">待揽件</p>
                <p v-if="scope.row.status == 1">寄件成功</p>
                <p v-if="scope.row.status == 2">拒绝揽件</p>
                <p v-if="scope.row.status == 3">已取消</p>
            </div>
          </el-table-column>
          <el-table-column prop="location" label="快递柜格"></el-table-column>
          <el-table-column prop="expressNumber" label="快递单号"></el-table-column>
          <el-table-column prop="uponTime" label="揽件时间"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="pageNum2"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total2"
          style="text-align:center"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { User } from '../../../api'
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      tableData2: [],
      pageNum: 1,
      pageSize: 10,
      total: 10,
      pageNum2: 1,
      pageSize2: 10,
      total2: 10,
      userMessage:{}
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData(){
      //获取用户信息
        User.getUserDetail({param1:this.$route.query.id}).then(res=>{
          console.log(res)
          this.userMessage =res.data
        })
        //获取用户取件列表
        User.getUserPieceList({pageNum:this.pageNum,pageSize:this.pageSize,param1:this.$route.query.id}).then(res=>{
          console.log(res)
          this.total =res.data.total
          this.tableData =res.data.list
        })
        //获取用户寄件列表
        User.getUserSendPieceList({pageNum:this.pageNum,pageSize:this.pageSize,param1:this.$route.query.id}).then(res=>{
          console.log(res)
          this.total2 =res.data.total2
          this.tableData2 =res.data.list
        })
    },
    handleClick(tab, event) {

    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSizeChange2() {},
    handleCurrentChange2() {}
  }
};
</script>

<style>
.a {
  overflow: hidden;
  display: inline-block;
  clear: both;
  text-align: right;
}
.el-table__header th {
  border: 1px rgb(192, 188, 188) solid;
}
</style>