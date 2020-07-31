<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageNum"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    style="text-align:center;margin-top:15px"
  ></el-pagination>
</template>

<script>
export default {
  data() {
    return {};
  },
  created(){
  },
  props:{
      pageSize:{
          type:Number,
          default:10
      },
      pageNum:{
          type:Number,
          default:1
      },
      total:{
          type:Number,
          default:0
      }
  },
  methods:{
      handleSizeChange(val){
        console.log(val)
        this.$emit("changeSize",val)
      },
      handleCurrentChange(val){
        this.$emit('changeNum',val)
      }
  }
};
</script>

<style>
</style>