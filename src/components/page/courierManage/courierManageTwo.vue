<template>
  <div style="background-color:#fff;height:800px;margin:10px;padding:80px">
    <el-table :data="tableData" border style="width:70%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="快递员姓名"></el-table-column>
      <el-table-column prop="logisticsName" label="快递公司"></el-table-column>
      <el-table-column prop="number" label="工号"></el-table-column>
      <el-table-column prop="area" label="所属区域"></el-table-column>
      <el-table-column prop="status" label="认证状态">
            <div slot-scope="scope">
                <span v-if="scope.row.status == 0">待认证</span>
                <span v-if="scope.row.status == 1">认证中</span>
                <span v-if="scope.row.status == 2">认证成功</span>
                <span v-if="scope.row.status == 3">认证失败</span>
                <span v-if="scope.row.status == 4">重新认证</span>
            </div>
      </el-table-column>
      <el-table-column prop="outMoney" label="投件支出">

      </el-table-column>
      <el-table-column prop="putMoney" label="寄件收入"></el-table-column>
      <el-table-column prop="address" label="操作">
        <div slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row.id)">查看详情</el-button>
        </div>
      </el-table-column>
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
import { courier } from '../../../api/index'
export default {
  data() {
    return {
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
       courier.getCourierList({pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
         console.log(res)
        this.total = res.data.total
        this.tableData = res.data.list
      })
    },
    changeSize(val) {
      this.pageSize = val;
      this.getData();
    },
    changeNum(val) {
      this.pageNum = val;
      this.getData();
    },
    //查看详情
    goDetail(row) {
      console.log(row)
      this.$router.push({path:'/courierMessageDetails',query:{id:row}})
    }
  }
};
</script>

<style>
</style>