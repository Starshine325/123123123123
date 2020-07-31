<template>
  <div class="bigDiv">
    <div class="topDiv">
      <div>
        <div>
          快递单号:
          <el-input
            v-model="expressNumber"
            placeholder="请输入快递单号或手机号"
            style="width:180px;margin-left:65px"
          ></el-input>
        </div>
        <!-- <div>
          手机号:
          <el-input
            v-model="expressPhone"
            placeholder="请输入收件人手机号"
            style="width:180px;margin-left:80px;margin-top:5px"
          ></el-input>
        </div>-->
        <div>
          时间:
          <el-date-picker
            v-model="expressTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss" 
            style="margin-left:95px;margin-top:5px"
          ></el-date-picker>
        </div>
      </div>
      <div>
        <span style="font-weight:700;margin-left:15px">状态:</span>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          style="display: inline-block;margin-left:20px"
        >全选</el-checkbox>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
          style="display: inline-block;margin-left:40px"
        >
          <el-checkbox v-for="item in cities" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>

        <div class="resetBtn">
          <el-button size="medium" @click="reset">重置</el-button>
          <el-button size="medium" style="margin-left:80px" @click="selectCourier">查询</el-button>
        </div>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;margin-top:30px">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="mailNumber" label="寄件订单号"></el-table-column>
      <el-table-column prop="createTime" label="下单时间"></el-table-column>
      <el-table-column prop="userName" label="寄件人"></el-table-column>
      <el-table-column prop="name" label="寄件方式"></el-table-column>
      <el-table-column prop="logisticsName" label="快递公司"></el-table-column>
      <el-table-column prop="name" label="快递员"></el-table-column>
      <el-table-column prop="name" label="邮费"></el-table-column>
      <el-table-column prop="status" label="状态">
        <div slot-scope="scope">
             <p v-if="scope.row.status == 0">待揽件</p>
             <p v-if="scope.row.status == 1">寄件成功</p>
           </div>
      </el-table-column>
      <el-table-column prop="name" label="快递柜格"></el-table-column>
      <el-table-column prop="uponTime" label="揽件时间"></el-table-column>
      <el-table-column prop="name" label="快递单号"></el-table-column>
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
import { expressWaybill } from "../../../api";
export default {
  data() {
    return {
      tableData: [],
      expressNumber: "", //快递单号
      expressTime: "", //时间
      checkAll: false,
      cities: [
        {
          id: 0,
          name: "待揽件"
        },
        {
          id: 1,
          name: "寄件成功"
        }
      ],
      isIndeterminate: false,
      checkedCities: [],
      pageNum: 1,
      pageSize: 10,
      total: 10
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
        if(this.checkedCities.length == 2 || this.checkedCities.length == 0){
        var a= ''
      }else {
        var a= this.checkedCities.toString()
      }
      var obj ={
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        param3:this.expressNumber,
        param4:'',
        param5:'',
        param7:a
      }
      expressWaybill.getMaillExpressWaybill(obj).then(res => {
        console.log(res);
        this.tableData =res.data.list
      });
    },
    //重置
    reset(){
      this.expressNumber = '',
      this.expressTime = '',
      this.checkedCities=[]
        this.isIndeterminate = false
      this.checkAll =false
      this.getData()
    },
    //查询
    selectCourier(){
      this.getData()
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    //多选按钮
    handleCheckAllChange(val) {
      this.checkedCities = val ? [0,1] : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style>
.resetBtn {
  margin-top: 20px;
  margin-left: 15px;
}
.resetBtn button {
  width: 143px;
  height: 36px;
}
.bigDiv {
  background-color: white;
  padding: 70px;
}
.topDiv {
  border: 1px #ccc solid;
  border-radius: 15px;
  width: 70%;
  height: 60px;
  display: flex;
  padding: 25px;
  padding-left: 50px;
  padding-right: 50px;
  overflow: hidden;
}
.topDiv div {
  flex: 1;
}
</style>