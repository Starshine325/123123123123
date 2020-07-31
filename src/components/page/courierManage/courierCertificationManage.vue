<template>
  <div style="background-color:white;padding:50px">
    <div
      style="width:90%;height:60px;border-radius:15px;border:1px solid #ccc;padding-left:80px;line-height:60px; overflow: hidden"
    >
      <span style="font-weight:700">状态</span>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        style="display: inline-block;margin-left:5px"
      >全选</el-checkbox>
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
        style="display: inline-block;margin-left:10px"
      >
        <el-checkbox v-for="item in cities" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" border style="margin-top:20px">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="快递员姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="快递地址" width="180"></el-table-column>
      <el-table-column prop="number" label="工号" width="180"></el-table-column>
      <el-table-column prop="workImage" label="工牌照片" width="180"></el-table-column>
      <el-table-column prop="area" label="所属区域" width="180"></el-table-column>
      <el-table-column prop="realName" label="实名认证" width="180"></el-table-column>
      <el-table-column prop="status" label="认证状态" width="180">
        <div slot-scope="scope">
          <span v-if="scope.row.status == 0">待认证</span>
          <span v-if="scope.row.status == 1">认证中</span>
          <span v-if="scope.row.status == 2">认证成功</span>
          <span v-if="scope.row.status == 3">认证失败</span>
          <span v-if="scope.row.status == 4">重新认证</span>
        </div>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="180">
        <div slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row.id)">查看详情</el-button>
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
      style="text-align:center;margin-top:20px"
    ></el-pagination>
  </div>
</template>

<script>
import { courier } from "../../../api";
export default {
  data() {
    return {
      tableData: [],
      checkAll: false,
      checkedCities: [],
      cities: [
        {
          id: 0,
          name: "待认证"
        },
        {
          id: 1,
          name: "认证中"
        },
        {
          id: 2,
          name: "认证成功"
        },
        {
          id: 3,
          name: "认证失败"
        },
         {
          id: 4,
          name: "重新认证"
        }
      ],
      isIndeterminate: false,
      pageSize: 10,
      pageNum: 1,
      total: 10
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      courier
        .getCourierCheckList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          param9: this.checkedCities
        })
        .then(res => {
          console.log(res)
          this.tableData = res.data.list;
        });
    },
    //认证
    goDetail(row) {
       this.$router.push({path:'/courierMessageDetails',query:{id:row}})
    },
    //分页
    handleSizeChange() {},
    handleCurrentChange() {},
    //多选按钮
    handleCheckAllChange(val) {
      this.checkedCities = val ? [0, 1, 2, 3] : [];
      this.isIndeterminate = false;
      this.getData()
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
        this.getData()
    }
  }
};
</script>

<style>
.a {
  overflow: hidden;
}
</style>