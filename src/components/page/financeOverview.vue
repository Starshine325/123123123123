<template style="background-color:#ccc">
  <div style="background-color:#fff;padding:30px">
    <div style="height:40px">
      <el-row style="float:left">
        <el-button @click="changeData(0)">昨日</el-button>
        <el-button style="margin-left:15px" @click="changeData(1)">本周</el-button>
        <el-button style="margin-left:15px" @click="changeData(2)">本月</el-button>
        <el-button style="margin-left:15px" @click="changeData(3)">本年</el-button>
      </el-row>
      <el-date-picker
        style="float:right"
        v-model="dTime"
        type="datetimerange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="dataSure"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
    </div>

    <div>
      <el-row :gutter="90">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="ALl">
              <div class="Bbox">
                <img
                  src="../../assets/img/t1.jpg"
                  alt
                  style="width:50%;height:50%;  border-radius: 50%"
                />
              </div>
              <div class="rBox">
                <p style="margin-bottom:25px">总收入</p>
                <p style="font-size:30px;">¥{{message.sumOutMoney}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="ALl">
              <div class="Bbox">
                <img
                  src="../../assets/img/t1.jpg"
                  alt
                  style="width:50%;height:50%;  border-radius: 50%"
                />
              </div>
              <div class="rBox">
                <p style="margin-bottom:25px">昨日收入</p>
                <p style="font-size:30px;">¥{{message.outMoney}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="ALl">
              <div class="Bbox">
                <img
                  src="../../assets/img/t1.jpg"
                  alt
                  style="width:50%;height:50%;  border-radius: 50%"
                />
              </div>
              <div class="rBox">
                <p style="margin-bottom:25px">总利润</p>
                <p style="font-size:30px;">¥{{message.sumProfit}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="ALl">
              <div class="Bbox">
                <img
                  src="../../assets/img/t1.jpg"
                  alt
                  style="width:50%;height:50%;  border-radius: 50%"
                />
              </div>
              <div class="rBox">
                <p style="margin-bottom:25px">昨日利润</p>
                <p style="font-size:30px;">¥{{message.Profit}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!--Echarts图标i-->
    <div
      id="main"
      style="width: 1000px;height:600px;margin-top:20px;border:1px #ccc solid;  border-radius: 10px; padding:30px"
    ></div>

    <div>
      <el-table :data="tableData" border style="width:90%;margin-top:20px" >
        <el-table-column prop="createTime" label="时间" ></el-table-column>
        <el-table-column prop="detail" label="明细名称" >
          <div slot-scope="scope">
              <span>{{scope.row.detail}}</span>
              <span v-if="scope.row.detailStatus == 0">(代投柜)</span>
              <span v-if="scope.row.detailStatus == 1">(代揽件)</span>
              <span v-if="scope.row.detailStatus == 2">(寄件成功)</span>
              <span v-if="scope.row.detailStatus == 3">(拒绝揽件)</span>
              <span v-if="scope.row.detailStatus == 4">(已取消)</span>
              <span v-if="scope.row.detailStatus == 5">(用户已支付待补运费)</span>
          </div>
        </el-table-column>
        <el-table-column prop="nameStatus" label="快递员收支" >
            <div slot-scope="scope">
              <span style="margin-right:30px">{{scope.row.courierName}}</span>
                <span v-if="scope.row.status == 0"> -</span>
                <span v-else>+</span>
                <span>¥{{scope.row.courierMoney}}</span>
            </div>
        </el-table-column>
        <el-table-column prop="idNumber" label="经销商收支">
          <div slot-scope="scope">
              <span style="margin-right:30px">{{scope.row.agentName}}</span>
                <span>+¥{{scope.row.courierMoney}}</span>
            </div>
        </el-table-column>
        <el-table-column prop="number" label="用户收支" >
           <div slot-scope="scope">
                <span v-if="scope.row.status == 2 || scope.row.status == 3"> -</span>
                <span>¥{{scope.row.userMoney}}</span>
            </div>
        </el-table-column>
        <el-table-column prop="realName" label="明细总额" >
          <div slot-scope="scope">
              <p>¥{{scope.row.sumMoney}}</p>
          </div>
        </el-table-column>
        <el-table-column prop="platformProfit" label="平台利润"></el-table-column>
      </el-table>
      <paging :pageNum='pageNum' :pageSize='pageSize' :total='total' @changeSize='changeSize' @changeNum='changeNum'/>
    </div>
  </div>
</template>

<script>
import { echarts } from "../../../node_modules/echarts/";
import paging from '../common/paging';
import { fincance } from '../../api/index'
export default {
  data() {
    return {
      dTime: "",
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:10,
      message:'',
      company:'',//公司
      echartsData:[],
      series:[],
      Num:0
    };
  },
  computed: {
  },
  components:{
    paging
  },
  created() {
    this.getData()
  },
  watch:{
    'echartsData' :function(){
      this.$nextTick(res=>{
        this.getEcharts()
      })
    }
  },
  methods: {
    
    getData(){
     fincance.getEcharts({param7:this.Num}).then(res=>{
       this.message = res.data
       this.company = []
       //获取公司
       this.message.companyLone.forEach((ele,index)=> {
         var Bdata=[]
          ele.companyLoneList.forEach(res=>{
              Bdata.push(Object.values(res))
           })
        Bdata = Bdata.toString().split(',').map(item => +item);
         this.company.push(ele.companyName.logisticsName)
          var newSeriers = {}
         newSeriers.name = ele.companyName.logisticsName
         newSeriers.type = 'line'
         newSeriers.stack = "总量"
         newSeriers.data = Bdata
         this.series.push(newSeriers)
       });
       //获取日期  data
       var newDates = []
      this.message.companyLone[0].companyLoneList.forEach(res=>{
        newDates.push(...Object.keys(res))
      })
      this.echartsData = JSON.parse(JSON.stringify(newDates)) 
     })
     
     //获取公司明细
     fincance.getEchartsList({pageNum:this.pageNum,pageSize:this.pageSize,param7:this.Num}).then(res=>{
       console.log(res)
       this.tableData = res.data.list
     })
    },
    changeData(item){
      this.Num = item
      this.company = ''
      this.echartsData=[],
      this.series=[],
      this.getData()
    },
    dataSure(){
          this.company = ''
      this.echartsData=[],
      this.series=[],
      fincance.getEcharts({param4:this.dTime[0],param5:this.dTime[1]}).then(res=>{
       this.message = res.data
       this.company = []
       //获取公司
       this.message.companyLone.forEach((ele,index)=> {
         var Bdata=[]
          ele.companyLoneList.forEach(res=>{
              Bdata.push(Object.values(res))
           })
        Bdata = Bdata.toString().split(',').map(item => +item);
         this.company.push(ele.companyName.logisticsName)
          var newSeriers = {}
         newSeriers.name = ele.companyName.logisticsName
         newSeriers.type = 'line'
         newSeriers.stack = "总量"
         newSeriers.data = Bdata
         this.series.push(newSeriers)
       });
       //获取日期  data
       var newDates = []
      this.message.companyLone[0].companyLoneList.forEach(res=>{
        newDates.push(...Object.keys(res))
      })
      this.echartsData = JSON.parse(JSON.stringify(newDates)) 
     })
      fincance.getEchartsList({pageNum:this.pageNum,pageSize:this.pageSize,param4:this.dTime[0],param5:this.dTime[1]}).then(res=>{
       console.log(res)
       this.tableData = res.data.list
     })
    },
    changeSize(val){
        this.pageSize = val
        this.getData()
    },
    changeNum(val){
      this.pageNum = val
      this.getData()
    },
    getEcharts() {
      var echarts = require("echarts");

        var myChart = echarts.init(document.getElementById("main"));
        var option = {
          title: {
            text: "快递公司存件数量折线图"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.company
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            data:this.echartsData
          },
          yAxis: {
            type: "value"
          },
          // series: [
          //   {
          //     name: "邮件营销",
          //     type: "line",
          //     stack: "总量",
          //     data: [120, 132, 101, 134, 90, 230, 210]
          //   },
          //   {
          //     name: "联盟广告",
          //     type: "line",
          //     stack: "总量",
          //     data: [220, 182, 191, 234, 290, 330, 310]
          //   },
          //   {
          //     name: "视频广告",
          //     type: "line",
          //     stack: "总量",
          //     data: [150, 232, 201, 154, 190, 330, 410]
          //   },
          //   {
          //     name: "直接访问",
          //     type: "line",
          //     stack: "总量",
          //     data: [320, 332, 301, 334, 390, 330, 320]
          //   },
          //   {
          //     name: "搜索引擎",
          //     type: "line",
          //     stack: "总量",
          //     data: [820, 932, 901, 934, 1290, 1330, 1320]
          //   }
          // ],
          series:this.series
        };
        myChart.setOption(option);
    }
  }
};
</script>


<style scoped>
.ALl {
  width: 100%;
  height: 100%;
  display: flex;
}
.Bbox {
  height: 100%;
  /* text-align: center; */
  flex: 0.8;
}
.rBox {
  height: 100%;
  flex: 1;
}
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}
</style>
