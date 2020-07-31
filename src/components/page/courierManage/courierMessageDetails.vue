<template>
  <div style="background-color:white;border-radius:5px;padding:30px">
    <p style="text-align:center;font-size:25px">快递员详情页</p>
    <table class="bigTab">
      <tr>
        <td>快递员姓名</td>
        <td>{{message.name}}</td>
      </tr>
      <tr>
        <td>快递公司</td>
        <td>{{message.logisticsName}}</td>
      </tr>
      <tr>
        <td>工号</td>
        <td>{{message.idNumber}}</td>
      </tr>
      <tr>
        <td>所属区域</td>
        <td>{{message.area}}</td>
      </tr>
      <tr>
        <td>认证状态</td>
        <td>
          {{message.status}}
          <el-button
            class="el-icon-edit"
            @click="authentication"
          ></el-button>
        </td>
      </tr>
      <tr>
        <td style="height:80px">工牌照片</td>
        <td style="height:80px">
          <img src="../../../assets/img/t2.jpg" style="width:65px;height:65px" alt />
        </td>
      </tr>
    </table>
    <div style="margin-top:30px">
      <p style="display:inline-block;font-size:20px">
        支出金额:
        <span style="color:red">￥20,000</span>
      </p>
      <p style="display:inline-block;font-size:20px;margin-left:50px">
        收入总额:
        <span style="color:red">￥20,000</span>
      </p>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="createTime" label="时间" width="180"></el-table-column>
      <el-table-column prop="detail" label="明细名称" width="180"></el-table-column>
      <el-table-column prop="price" label="收入流水" width="180">
        <div slot-scope="scope">
            <p v-if="scope.row.status==0"> -{{scope.row.price}} </p>
            <p v-if="scope.row.status > 0">{{scope.row.price}} </p>
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
    ></el-pagination>

    <el-dialog title="修改认证状态" :visible.sync="centerDialogVisible" width="30%" center>
      <div style="width:400px;margin-left:200px">
        <el-radio-group v-model="opinion" size="medium">
          <div style="padding:10px">
            <el-radio border label="认证通过" style="wdith:100px"></el-radio>
          </div>
          <div style="padding:10px">
            <span>认证失败</span>
            <el-radio border label="认证失败" style="wdith:100px"></el-radio>
          </div>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Sure">确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { courier } from "../../../api";
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 10,
      id: this.$route.query.id,
      message: {},
      centerDialogVisible: false,
      opinion: "" //通过是否
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      //快递员详情
      courier.getCourierDetails({ param1: this.id }).then(res => {
        console.log(res);
        this.message = res.data;
        switch (this.message.status) {
          case 0:
            this.message.status = "待认证";
            break;
          case 1:
            this.message.status = "认证中";
            break;
          case 2:
            this.message.status = "认证成功";
            break;
          case 3:
            this.message.status = "认证失败";
            break;
          case 4:
            this.message.status = "重新认证";
            break;
        }
      });
      //快递员收支表
      courier.CourierPutPutMessage({pageNum:this.pageNum,pageSize:this.pageSize,param1:this.id}).then(res=>{
        console.log(res)
        this.tableData = res.data.list
      })
    },
    //认证
    authentication() {
      this.centerDialogVisible = true;
      console.log(this.opinion);
      // courier.putAttestation({param1:this.id,param7})
    },
    //认证确认按钮
    Sure() {
      console.log(this.opinion);
      if (this.opinion == "认证通过") {
        var sta = 2;
      }
      if (this.opinion == "认证失败") {
        var sta = 3;
      }
      courier.putAttestation({ param1: this.id, param7: sta }).then(res => {
        this.centerDialogVisible = false;
        if (res.code == 200) {
          this.getData();
        }
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style>
.bigTab {
  border-collapse: collapse;
}
.bigTab > tr > td:first-child {
  width: 120px;
  height: 60px;
  background-color: blanchedalmond;
  text-align: center;
  border: 1px solid black;
}
.bigTab > tr > td:last-child {
  width: 200px;
  height: 60px;
  border: 1px solid black;
  padding-left: 15px;
}
.el-radio--medium.is-bordered {
  width: 150px;
}
.el-icon-edit:before {
  color: red;
}
.el-button--small {
  border: none;
}
</style>