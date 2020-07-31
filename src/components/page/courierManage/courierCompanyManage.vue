<template>
  <div style="background-color:white;padding:30px">
    <div style="width:50%">
      <el-button class="btn" @click="addExpress">新增快递公司</el-button>
    </div>
    <div style="clear: both;"></div>

    <el-table :data="tableData" border style="width: 50%;margin-top:20px">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="logisticsName" label="快递公司"></el-table-column>
      <el-table-column prop="logoImage" label="LOGO">
        <div slot-scope="scope">
          <img :src="scope.row.logoImage" style="width:100px;height:100px" alt />
        </div>
      </el-table-column>
      <el-table-column prop="courierAllCount" label="快递员数量"></el-table-column>
      <el-table-column prop="address" label="操作">
        <div slot-scope="scope">
          <el-button type="text" @click="redact(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteCompany(scope.row)">删除</el-button>
          <el-button type="text" @click="changeDetail(scope.row)">详情</el-button>
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

    <!--编辑框-->
    <el-dialog title="新增快递公司" :visible.sync="centerDialogVisible" width="30%" center>
      <div style="padding-left:80px">
        公司名称:
        <el-input v-model="cityName" placeholder="请输入内容" style="width:200px;margin-left:20px"></el-input>
      </div>
      <div style="display:flex;padding-left:85px">
        <div style="display: inline-block;flex:2;line-height:160px;overflow: hidden;">公司LOGO:</div>
        <el-upload
          class="avatar-uploader"
          action="http://192.168.0.21:8091/image/productImage/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          style="display: inline-block;flex:6;margin-top:20px"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div style="margin-left:40px">计件标准:</div>
      <table class="ZTable" style="margin-left:20px">
        <tr>
          <th id="0">重量</th>
          <th id="1">大格口</th>
          <th id="2">中格口</th>
          <th id="3">小格口</th>
        </tr>
        <tr>
          <th>1KG以内</th>
          <th v-for="(item,index) in one" :key="index">
            <input
              v-model="one[index]"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
              style="wdith:100%;height:100%;border:none;text-align:center; outline:none "
            />
          </th>
        </tr>
        <tr>
          <th>1-2KG</th>
          <th v-for="(item,index) in two" :key="index">
            <input
              v-model="two[index]"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
              style="wdith:100%;height:100%;border:none;text-align:center; outline:none"
            />
          </th>
        </tr>
        <tr>
          <th>2-3KG</th>
          <th v-for="(item,index) in three" :key="index">
            <input
              v-model="three[index]"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
              style="wdith:100%;height:100%;border:none;text-align:center; outline:none"
            />
          </th>
        </tr>
        <tr>
          <th>3-4KG</th>
          <th v-for="(item,index) in four" :key="index">
            <input
              v-model="four[index]"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
              style="wdith:100%;height:100%;border:none;text-align:center; outline:none"
            />
          </th>
        </tr>
        <tr>
          <th>4-5KG</th>
          <th v-for="(item,index) in five" :key="index">
            <input
              v-model="five[index]"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
              style="wdith:100%;height:100%;border:none;text-align:center; outline:none"
            />
          </th>
        </tr>
        <tr>
          <th>5-6KG</th>
          <th v-for="(item,index) in six" :key="index">
            <input
              v-model="six[index]"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
              style="wdith:100%;height:100%;border:none;text-align:center; outline:none"
            />
          </th>
        </tr>
        <tr>
          <th>6-7KG</th>
          <th v-for="(item,index) in seven" :key="index">
            <input
              v-model="seven[index]"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
              style="wdith:100%;height:100%;border:none;text-align:center; outline:none"
            />
          </th>
        </tr>
      </table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import paging from "../../common/paging";
import { courier } from "../../../api";
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 10,
      centerDialogVisible: false,
      imageUrl: "", //图片地址
      cityName: "", //公司名称
      storeData: [],
      one: [0, 0, 0],
      two: [0, 0, 0],
      three: [0, 0, 0],
      four: [0, 0, 0],
      five: [0, 0, 0],
      six: [0, 0, 0],
      seven: [0, 0, 0],
      sureStatus: 0, //0代表 新增添加 1代表编辑
      changeId: "",
    };
  },
  created() {
    this.getData();
  },
  components: {
    paging,
  },
  methods: {
    getData() {
      courier
        .getExpressCompanyList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.total = res.data.total;
          this.tableData = res.data.list;
        });
    },
    //删除按钮
    deleteCompany(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          courier.deleteExpressCompany({ param1: row.id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getData();
              this.centerDialogVisible = false;
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
      console.log(res);
      this.imageUrl =
        "http://192.168.0.21:8080/container/resource/image/a/" + res.data[0];
    },
    //点击新增快递公司按钮
    addExpress() {
      this.centerDialogVisible = true;
      this.sureStatus = 0;
      this.changeId = "";
      this.one = ["", "", ""];
      this.two = ["", "", ""];
      this.three = ["", "", ""];
      this.five = ["", "", ""];
      this.four = ["", "", ""];
      this.six = ["", "", ""];
      this.seven = ["", "", ""];
      this.imageUrl = "";
      this.cityName = "";
    },
    //新增确定按钮
    Sure() {
      let obj = {
        id: this.changeId,
        logisticsName: this.cityName,
        logoImage: this.imageUrl,
        specificationList: [
          { weightId: 1, specificationId: 1, price: this.one[0] },
          { weightId: 1, specificationId: 2, price: this.one[1] },
          { weightId: 1, specificationId: 3, price: this.one[2] },
          { weightId: 2, specificationId: 1, price: this.two[0] },
          { weightId: 2, specificationId: 2, price: this.two[1] },
          { weightId: 2, specificationId: 3, price: this.two[2] },
          { weightId: 3, specificationId: 1, price: this.three[0] },
          { weightId: 3, specificationId: 2, price: this.three[1] },
          { weightId: 3, specificationId: 3, price: this.three[2] },
          { weightId: 4, specificationId: 1, price: this.four[0] },
          { weightId: 4, specificationId: 2, price: this.four[1] },
          { weightId: 4, specificationId: 3, price: this.four[2] },
          { weightId: 5, specificationId: 1, price: this.five[0] },
          { weightId: 5, specificationId: 2, price: this.five[1] },
          { weightId: 5, specificationId: 3, price: this.five[2] },
          { weightId: 6, specificationId: 1, price: this.six[0] },
          { weightId: 6, specificationId: 2, price: this.six[1] },
          { weightId: 6, specificationId: 3, price: this.six[2] },
          { weightId: 7, specificationId: 1, price: this.seven[0] },
          { weightId: 7, specificationId: 2, price: this.seven[1] },
          { weightId: 7, specificationId: 3, price: this.seven[2] },
        ],
      };
      // if (
      //   this.IfLength([
      //     this.one,
      //     this.two,
      //     this.three,
      //     this.four,
      //     this.five,
      //     this.six,
      //     this.seven,
      //   ]) == 11
      // ) {
      //   this.$message({
      //     message: "请将表格补充完整",
      //     type: "warning",
      //   });
      // } else {
        if (this.sureStatus == 0) {
          courier.addExpressCompany(obj).then((res) => {
            if (res.code == 200) {
              this.getData();
              this.centerDialogVisible = false;
            }
          });
        }
        if (this.sureStatus == 1) {
          courier.putExpressCompany(obj).then((res) => {
            if (res.code == 200) {
              this.getData();
              this.centerDialogVisible = false;
            }
          });
        }
      // }
    },
    IfLength(str) {
      let obj = [];
      let arr = [];
      for (var i = 0; i < str.length; i++) {
        for (var j = 0; j < str[i].length; j++) {
          obj.push(str[i][j]);
        }
      }
      console.log(obj);
      for (var i = 0; i < obj.length; i++) {
        if (obj[i] === "") {
          return "11";
        }
      }
      return 2;
    },
    // 编辑
    redact(row) {
      this.changeId = row.id;
      this.sureStatus = 1;
      this.one = [];
      this.two = [];
      this.three = [];
      this.five = [];
      this.four = [];
      this.six = [];
      this.seven = [];
      this.centerDialogVisible = true;
      courier.getExpressCompany({ param1: row.id }).then((res) => {
        console.log(res);
        this.cityName = res.data.logisticsName;
        this.imageUrl = res.data.logoImage;
        res.data.specificationList[0].forEach((element) => {
          this.one.push(element.price);
        });
        res.data.specificationList[1].forEach((res) => {
          this.two.push(res.price);
        });
        res.data.specificationList[2].forEach((res) => {
          this.three.push(res.price);
        });
        res.data.specificationList[3].forEach((res) => {
          this.four.push(res.price);
        });
        res.data.specificationList[4].forEach((res) => {
          this.five.push(res.price);
        });
        res.data.specificationList[5].forEach((res) => {
          this.six.push(res.price);
        });
        res.data.specificationList[6].forEach((res) => {
          this.seven.push(res.price);
        });
      });
    },
    changeSize(val) {
      this.pageSize = val;
      this.getData();
    },
    changeNum(val) {
      this.pageNum = val;
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
.ZTable tr th {
  width: 70px;
  height: 50px;
  border: 1px #ccc solid;
}
.ZTable {
  border-collapse: collapse;
}
</style>