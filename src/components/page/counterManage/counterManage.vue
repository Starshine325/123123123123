<template >
  <div style="background-color: white;overflow: hidden;padding:40px">
    <div style="width:70%">
      <el-button class="btn" @click="addExpress">新增快递柜</el-button>
    </div>
    <div style="clear:both"></div>
    <el-table :data="tableData" style="margin-left:40px;margin-top:20px">
      <el-table-column label="快递柜列表">
        <el-table-column type="index" label="编号" width="120">
          <div slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </div>
        </el-table-column>
        <el-table-column prop="code" label="快递柜编号" width="120"></el-table-column>
        <el-table-column prop="name" label="快递柜名称" width="120"></el-table-column>
        <el-table-column prop="area" label="所属区域" width="120"></el-table-column>
        <el-table-column prop="address" label="柜格使用情况" width="300">
          <el-table-column prop="address" label="大柜格" width="100"></el-table-column>
          <el-table-column prop="address" label="中柜格" width="100"></el-table-column>
          <el-table-column prop="address" label="小柜格" width="100"></el-table-column>
        </el-table-column>
        <el-table-column prop="status" label="设备状态" width="120">
          <div slot-scope="scope">
            <div v-if="scope.row.status == 0">在线</div>
            <div v-if="scope.row.status == 1">离线</div>
            <div v-if="scope.row.status == 2">异常</div>
          </div>
        </el-table-column>
        <el-table-column prop="sumPrice" label="收入总额" width="120"></el-table-column>
        <el-table-column prop="zip" label="操作" width="240">
          <div slot-scope="scope">
            <el-button type="text" @click="seeDetail(scope.row)">详情</el-button>
            <el-button type="text" style="color:green" @click="compile(scope.row)">编辑</el-button>
            <el-button type="text" style="color:red" @click="deleteList(scope.row)">删除</el-button>
          </div>
        </el-table-column>
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

    <el-dialog :title="titles" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="快递柜名称:">
          <el-input v-model="counterName" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="快递柜编号:">
          <el-input v-model="counterNum" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="所属区域:" prop="censusLand">
          <el-cascader
            v-model="ruleForm.censusLand"
            style="width:180px;width:270px"
            placeholder="请选择省市区"
            :key="isRescouseShow"
            :options="cascaderData1"
            @expand-change="censusLandChange"
            :props="{ value: 'id', label: 'name', children: 'cities' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="api接口密钥:">
          <el-input v-model="counterApi" style="width:270px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBox" v-if="onIf == 0">确 认</el-button>
        <el-button type="primary" @click="changeBox" v-if='onIf == 1'>修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let id = 0;
import { expressCabinet, cascade } from "../../../api";
export default {
  data() {
    return {
      form: {},
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 10,
      centerDialogVisible: false,
      titles: "新增快递柜",
      counterName: "",
      counterNum: "",
      counterRegion: "", //活动区域
      counterApi: "",
      ruleForm: {
        censusLand: "" // 双向绑定
      },
      cascaderData1: [] ,// 户籍省 一级菜单
      isRescouseShow:0,
      onIf:'0',
      changeId:''
    };
  },
  created() {
    this.getData();
    this.getAllMe();
  },
  methods: {
    getData() {
      expressCabinet
        .getcabintList({ pageNum: this.pageNum, pageSize: this.pageSize })
        .then(res => {
          this.tableData = res.data.list;
        });
    },

    //新增快递公司
    addExpress() {
       this.getAllMe();
      this.centerDialogVisible = true;
      this.counterName = '';
      this.counterNum = '';
      this.counterApi = '';
      this.onIf = '0'
    },
    //添加确定按钮
    addBox() {
      console.log(this.ruleForm.censusLand);

      var obj = {
        name: this.counterName,
        code: this.counterNum,
        provinceId: this.ruleForm.censusLand[0],
        cityId: this.ruleForm.censusLand[1],
        countyId: this.ruleForm.censusLand[2],
        api: this.counterApi
      };
      expressCabinet.addCabint(obj).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.getData();
          this.centerDialogVisible = false;
        }
      });
    },
    //编辑
    compile(row) {
      this.changeId = row.id
      this.onIf = '1'
      this.centerDialogVisible = true;
      expressCabinet.putCabint({ param1: row.id }).then(resopnse => {
        this.counterNum = resopnse.data.code
        this.counterApi = resopnse.data.api
        this.counterName =resopnse.data.name
        new Promise((resolve, reject) => {
          let val = [resopnse.data.provinceId];
          let idArea;
          let sizeArea;
          if (!val) {
            idArea = null;
            sizeArea = 0;
          } else if (val.length === 1) {
            idArea = val[0];
            sizeArea = val.length; // 3:一级 4:二级 6:三级
          }
          cascade
            .getone({ param1: resopnse.data.provinceId })
            .then(res => {
              if (sizeArea === 1) {
                // 点击一级 加载二级 市
                this.cascaderData1.map((value, i) => {
                  if (value.id === val[0]) {
                    if (!value.cities.length) {
                      value.cities = res.data.map((value, i) => {
                        return {
                          id: value.id,
                          name: value.name,
                          cities: []
                        };
                      });
                    }
                  }
                });
              }
              resolve(res);
              err => {
                reject(err);
              };
            }).then(data => {
              // 通过他们去获取第三级的
              this.getCensusLand([resopnse.data.provinceId, resopnse.data.cityId]); // 户口所在地
              this.ruleForm.censusLand = [resopnse.data.provinceId, resopnse.data.cityId, resopnse.data.countyId];
            });
        }) 
      });
    },
    //编辑确定
    changeBox(){
      let obj = {
        name:this.counterName,
        code:this.counterNum,
        provinceId:this.ruleForm.censusLand[0],
        cityId:this.ruleForm.censusLand[1],
        countyId:this.ruleForm.censusLand[2],
        api:this.counterApi
      }
        expressCabinet.realyPutcabint(obj).then(res=>{
          if(res.code == 200){
            this.centerDialogVisible =false
            this.getData()
          }
        })
    },
    //删除快递柜
    deleteList(row) {
      this.$confirm("确认删除快递柜名称, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          expressCabinet.deleteCabinet({ param1: row.id }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getData();
            } else {
              this.$message({
                type: "info",
                message: "删失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查看详情
    seeDetail(row) {
      this.$router.push({
        path:'/counterDetail',
        query:{id:row.id}
      })
    },
    handleSizeChange() {},
    handleCurrentChange() {},

    // 户籍所在地-选中后下一级
    censusLandChange(val) {
      this.getCensusLand(val);
    },
    getAllMe() {
      //获取第一层
      cascade.getone({ param1: 100000 }).then(res => {
        res.data.forEach(item => {
          item.cities = [];
          ++this.isRescouseShow
        });
        this.cascaderData1 = res.data;
      });
    },
    // 户籍所在地
    getCensusLand(val) {
      let idArea;
      let sizeArea;
      if (!val) {
        idArea = null;
        sizeArea = 0;
      } else if (val.length === 1) {
        idArea = val[0];
        sizeArea = val.length; // 3:一级 4:二级 6:三级
      } else if (val.length === 2) {
        idArea = val[1];
        sizeArea = val.length; // 3:一级 4:二级 6:三级
      }

      cascade.getone({ param1: idArea }).then(res => {
        if (sizeArea === 1) {
          // 点击一级 加载二级 市
          this.cascaderData1.map((value, i) => {
            if (value.id === val[0]) {
              if (!value.cities.length) {
                value.cities = res.data.map((value, i) => {
                  return {
                    id: value.id,
                    name: value.name,
                    cities: []
                  };
                });
              }
            }
          });
        } else if (sizeArea === 2) {
          // 点击二级 加载三级 区
          this.cascaderData1.map((value, i) => {
            if (value.id === val[0]) {
              value.cities.map((value, i) => {
                if (value.id === val[1]) {
                  if (!value.cities.length) {
                    value.cities = res.data.map((value, i) => {
                      return {
                        id: value.id,
                        name: value.name
                      };
                    });
                  }
                }
              });
            }
          });
        }
      });
    }
  }
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
</style>