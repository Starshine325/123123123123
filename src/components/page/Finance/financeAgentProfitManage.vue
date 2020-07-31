<template  >
  <div style="background-color:#fff;height:800px;margin:10px;padding-top:40px">
    <div class="TopText">
      <p>经销商分润比例管理</p>
      <p>经销商累计分润 
          <span style="color:Coral;margin-left:35px">￥{{sumMoney}}</span>
      </p>
    </div>
    <div>
        <div class="cetbox">
            <span>快递柜投件分润比例</span>
            <el-input v-model="content" placeholder="请输入内容" style="width:300px;margin-left:80px"></el-input>
        </div>
         <div class="cetbox">
            <span>快递柜寄件存放服务费分润比例</span>
            <el-input v-model="conCost" placeholder="请输入内容" style="width:300px;margin-left:80px"></el-input>
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
      content: '',
      conCost:'',
      sumMoney:''
    };
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      fincance.getDealarCost({}).then(res=>{
        this.content  =res.data.moneyList[0].content,
        this.conCost = res.data.moneyList[1].content,
        this.sumMoney = res.data.sumMoney
      })
    },
    changeSure(){
      fincance.putDealarCost([{id:1,content:this.content},{id:2,content:this.conCost}]).then(res=>{
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
.cetbox {
    margin-top: 20px;
    padding-left: 90px;
}
.cetbox span {
    margin-top: 20px;
    display: inline-block;
    width: 280px;
    text-align: right;
    font-size: 20px;
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