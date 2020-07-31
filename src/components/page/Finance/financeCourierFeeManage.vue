<template >
  <div style="background-color:#fff;height:800px;margin:10px;padding-top:40px">
    <div class="TopText">
      <p>快递员单次投件费用管理</p>
      <p>快递员累计投件费用 <span style="color:Coral;margin-left:20px">￥{{sumMoney}}</span></p>
    </div>

    <div>
      <div class="box">
       <span style="font-size:20px"> 大格口</span>
        <el-input v-model="Big" placeholder="请输入内容" style="width:300px;margin-left:80px"></el-input>
      </div>
      <div class="box">
       <span style="font-size:20px"> 中格口</span>
        <el-input v-model="center" placeholder="请输入内容" style="width:300px;margin-left:80px"></el-input>
      </div>
      <div class="box">
       <span style="font-size:20px"> 小格口</span>
        <el-input v-model="small" placeholder="请输入内容" style="width:300px;margin-left:80px"></el-input>
      </div>
    </div>
       <el-button type="primary" plain class="BBtn" @click="changeSure">保存修改</el-button>
  </div>
</template>

<script>
import { fincance } from '../../../api'
export default {
  data() {
    return {
      Big: "",
      center:'',
      small:'',
      sumMoney:''
    };
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
        fincance.getCourierCost({}).then(res=>{
          this.Big =res.data.moneyList[0].content,
          this.center =res.data.moneyList[1].content,
          this.small = res.data.moneyList[2].content,
          this.sumMoney= res.data.sumMoney
        })
    },
    changeSure(){
      fincance.putCourierCost([{id:1,content:this.Big},{id:2,content:this.center},{id:3,content:this.small}]).then(res=>{
          if(res.code ==200){
           this.$message({
          message: '修改成功',
          type: 'success'
        });
            this.getData()
          }
      })
    },
  }
};
</script>

<style>
.BBtn {
    margin-left: 200px;
    margin-top: 80px;
    width: 160px;
    height: 45px;
}
.box {
    height:50px;
    padding-left: 180px;
    margin-top: 20px;
    line-height: 50px;
}
.TopText {
  width: 100%;
  height: 50px;
  display: flex;
}
.TopText p {
  font-size: 25px;
  flex: 1;
  margin-left: 180px;
  line-height: 50px;
}
</style>