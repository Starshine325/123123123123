<template>
  <div style="background-color: white;overflow: hidden;padding:40px">
    <el-row>
      <el-col :span="8">
        <div>
          <p>快递柜详情信息</p>
          <table class="bigTab" style="margin-top:20px">
            <tr>
              <td>快递柜名称</td>
              <td>{{message.name}}</td>
            </tr>
            <tr>
              <td>快递柜编号</td>
              <td>{{message.code}}</td>
            </tr>
            <tr>
              <td>所属区域</td>
              <td>{{message.area}}</td>
            </tr>
            <tr>
              <td>api接口秘钥</td>
              <td>{{message.api}}</td>
            </tr>
            <tr>
              <td>设备状态</td>
              <td v-if="message.status == 0">在线</td>
              <td v-if="message.status == 1">离线</td>
              <td v-if="message.status == 2">异常</td>
            </tr>
            <tr>
              <td>总收入额</td>
              <td>{{message.sumPrice}}</td>
            </tr>
          </table>
        </div>
      </el-col>
      <el-col :span="16">
        <div>
          <p>快递柜格口状态</p>
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 40%;margin-top:30px">
      <el-table-column prop="createTime" label="时间"></el-table-column>
      <el-table-column prop="detail" label="明细名称"></el-table-column>
      <el-table-column prop="price" label="收入"></el-table-column>
    </el-table>
    <paging
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @changeSize="changeSize"
      @changeNum="changeNum"
    />
  </div>
</template>

<script>
import paging from "../../common/paging";
import { expressCabinet } from "../../../api";
export default {
  data() {
    return {
      message: "",
      tableData: [],
      pageNum: 1,
      pageSize: 2,
      total: 10
    };
  },
  components: {
    paging
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      //获取柜机详细信息
      expressCabinet.getCabintDetail({param1:this.$route.query.id}).then(res=>{
        console.log(res)
        this.message =res.data.counterDetailList[0]
      })
      //获取列表
      expressCabinet
        .expressCabintDetail({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          param1: this.$route.query.id
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.list;
        });
    },
    changeSize(val) {
      this.pageSize = val;
      this.getData();
    },
    changeNum(val) {
      this.pageNum = val;
      this.getData();
    }
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
  background-color: #ccc;
  text-align: center;
  border: 1px solid black;
}
.bigTab > tr > td:last-child {
  width: 200px;
  height: 60px;
  border: 1px solid black;
  padding-left: 15px;
}
</style>