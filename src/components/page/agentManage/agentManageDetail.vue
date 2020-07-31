<template>
  <div style="background-color:#fff;margin:10px;padding:50px">
    <h2 style="text-align:center">经销商大佬</h2>

    <div style="margin-top:20px">
      <h4>用户信息</h4>
      <div style="height:30px;height:30px;margin-top:30px">
        <div
          style="width:100px;text-align: right;;display: inline-block;color:rgb(177, 164, 164)"
        >经销商账号:</div>
        <div style="display: inline-block;margin-left:30px">{{dealerMessage.userName}}</div>
        <!-- <div style="display: inline-block;margin-left:60px;color:red">重置密码</div> -->
        <el-button type="text" style="margin-left:60px" @click="changePassword">重置密码</el-button>
      </div>
      <div style="clear: both"></div>
      <div style="height:30px;height:30px">
        <div
          style="width:100px;text-align: right;;display: inline-block;color:rgb(177, 164, 164)"
        >注册时间:</div>
        <div style="display: inline-block;margin-left:30px">{{dealerMessage.createTime}}</div>
      </div>
      <div style="height:30px;height:30px">
        <div
          style="width:100px;text-align: right;;display: inline-block;color:rgb(177, 164, 164)"
        >关联机数量:</div>
        <div style="display: inline-block;margin-left:30px">{{dealerMessage.sumCounter}}台</div>
      </div>
      <div style="height:30px;height:30px">
        <div
          style="width:100px;text-align: right;;display: inline-block;color:rgb(177, 164, 164)"
        >收入总额:</div>
        <div style="display: inline-block;margin-left:30px">￥{{dealerMessage.sumPrice}}</div>
      </div>
      <div style="clear: both"></div>
    </div>
    <!-- <div style="width:100%;border:1px #ccc solid;margin-top:30px"></div> -->
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:20px">
      <el-tab-pane label="关联柜机列表" name="first">
        <el-table :data="tableData" style="margin-left:40px;margin-top:20px;width:80%">
          <el-table-column prop="name" label="编号"></el-table-column>
          <el-table-column prop="name" label="快递柜编号"></el-table-column>
          <el-table-column prop="province" label="快递柜名称" ></el-table-column>
          <el-table-column prop="city" label="快递柜地址"></el-table-column>
          <el-table-column prop="address" label="柜格使用情况" >
            <el-table-column prop="address" label="大柜格"></el-table-column>
            <el-table-column prop="address" label="中柜格"></el-table-column>
            <el-table-column prop="address" label="小柜格" ></el-table-column>
          </el-table-column>
          <el-table-column prop="zip" label="设备状态" ></el-table-column>
          <el-table-column prop="zip" label="收入总额"></el-table-column>
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

      <el-tab-pane label="收入流水" name="second">
        <el-table :data="tableData2" style="width:40%;margin-left:100px;padding-top:20px" border>
          <el-table-column prop="createTime" label="时间"></el-table-column>
          <el-table-column prop="name" label="关联柜机"></el-table-column>
          <el-table-column prop="detail" label="明细名称">
              <div slot-scope="scope">
                  <span>{{scope.row.detail}}</span>
                  <span v-if="scope.row.status == 0">待投柜</span>
                  <span v-if="scope.row.status == 1">待揽件</span>
                  <span v-if="scope.row.status == 2">寄件成功</span>
                  <span v-if="scope.row.status == 3">拒绝揽件</span>
                  <span v-if="scope.row.status == 4">已取消</span>
                  <span v-if="scope.row.status == 5">用户已支付待补运费</span>
              </div>
          </el-table-column>
          <el-table-column prop="address" label="收入流水"></el-table-column>
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

    <el-dialog title="重置密码" :visible.sync="centerDialogVisible" width="30%" center>
      <p style="padding-left:150px">
        密码:
        <el-input v-model="Password" style="width:200px;margin-left:35px"></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dealer } from "../../../api";
export default {
  data() {
    return {
      centerDialogVisible: false,
      Password: "",
      dealerMessage: {},
      activeName: "first",
      tableData: [],
      tableData2: [],
      pageNum: 1,
      pageSize: 10,
      total: 10,
      pageNum2: 1,
      pageSize2: 10,
      total2: 10,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      //获取经销商信息
      dealer.getDealerDetail({ param1: this.$route.query.id }).then((res) => {
        console.log(res);
        this.dealerMessage = res.data[0];
      });
      //获取经销商关联柜机列表
      dealer
        .getDealerRelecanceList({ pageNum:this.pageNum,pageSize:this.pageSize, param1: this.$route.query.id })
        .then((res) => {
          this.total = res.data.total
          console.log("关联机", res);
          this.tableData = res.data.list
        });
      dealer
        .getDealerWhaterList({ pageNum:this.pageNum2,pageSize:this.pageSize2, param1: this.$route.query.id })
        .then((res) => {
          this.total2 = res.data.total
          console.log("流水", res);
          this.tableData2=res.data.list
        });
    },
    //修改密码
    changePassword() {
      this.centerDialogVisible = true;
    },
    //修改确定按钮
    changeSure() {
      dealer
        .putDealerPassword({
          id: this.$route.query.id,
          password: this.Password,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.centerDialogVisible = false;
          }
        });
    },
    handleClick(tab, event) {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSizeChange2() {},
    handleCurrentChange2() {},
  },
};
</script>

<style>
.a {
  overflow: hidden;
  display: inline-block;
  clear: both;
  text-align: right;
}
</style>