<template>
  <div style="background-color: white;overflow: hidden;padding:40px">
    <h3 style="text-align:center">快递柜显示屏前端配置管理</h3>

    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="position: relative">
        <el-tab-pane
          :label="item.name"
          :name="item.stringId"
          v-for="(item,index) in courireList"
          :key="index"
        >
          <!--待机轮播广告管理------------------------------------------------------------------------------------------------->
          <div style="width:54.5%;position: relative;">
            <el-table :data="tableData" style="width:100%">
              <el-table-column label="待机轮播广告管理" style="position: relative">
                <el-table-column type="index" label="排序" width="120">
                  <div slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                    <span style="margin-left:5px">({{scope.row.weight}})</span>
                  </div>
                </el-table-column>
                <el-table-column prop="advertisingName" label="广告名称" width="120"></el-table-column>
                <el-table-column prop="city" label="广告类型" width="120">
                  <div slot-scope="scope">
                    <p v-if="scope.row.advertisingType === 0 ">图片</p>
                    <p v-if="scope.row.advertisingType === 1 ">视频</p>
                  </div>
                </el-table-column>
                <el-table-column prop="image" label="图片/视频" width="180">
                  <div slot-scope="scope">
                    <img
                      :src="scope.row.image"
                      alt
                      v-if="scope.row.advertisingType == 0 "
                      style="width:100px;height:100px"
                    />
                    <video
                      :src="scope.row.image"
                      v-if="scope.row.advertisingType == 1 "
                      style="width:100px;height:100px"
                    ></video>
                  </div>
                </el-table-column>
                <el-table-column prop="status" label="广告位置" width="120">
                  <div slot-scope="scope">
                    <p v-if="scope.row.status == 0">柜机首页广告</p>
                    <p v-if="scope.row.status == 1">柜机待机广告</p>
                    <p v-if="scope.row.status == 2">小程序用户端首页广告</p>
                    <p v-if="scope.row.status == 3">小程序条幅图</p>
                    <p v-if="scope.row.status == 4">柜机寄件流程图</p>
                  </div>
                </el-table-column>
                <el-table-column prop="groupId" label="柜机分组" width="120">
                  <div slot-scope="scope">
                    <p @click="text(scope)">{{activeNameTitle}}</p>
                  </div>
                </el-table-column>
                <el-table-column prop="zip" label="操作" width="180">
                  <div slot-scope="scope">
                    <el-button
                      type="text"
                      style="color:green"
                      @click="changeAwait(scope.row,'1')"
                    >编辑</el-button>
                    <el-button type="text" style="color:red" @click="deletes(scope.row)">删除</el-button>
                  </div>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-button type="text" class="addBannel" @click="addAwaitBannel(1)">+新增待机轮播广告</el-button>
          </div>

          <!--首页固定广告位--------------------------------------------------------------------------------->
          <div style="width:41%;position: relative;margin-top:50px">
            <el-table :data="tableData2">
              <el-table-column prop="date" label="首页固定广告位">
                <el-table-column prop="name" label="排序" width="120">
                  <div slot-scope="scope">
                    <span>{{index+1}}</span>
                    <span style="margin-left:5px">({{scope.row.weight}})</span>
                  </div>
                </el-table-column>
                <el-table-column prop="address" label="图片/视频" width="180">
                  <div slot-scope="scope">
                    <img
                      :src="scope.row.image"
                      alt
                      v-if="scope.row.advertisingType == 0 "
                      style="width:100px;height:100px"
                    />
                    <video
                      :src="scope.row.image"
                      v-if="scope.row.advertisingType == 1 "
                      style="width:100px;height:100px"
                    ></video>
                  </div>
                </el-table-column>
                <el-table-column prop="status" label="广告位置" width="120">
                  <div slot-scope="scope">
                    <p v-if="scope.row.status == 0">柜机首页广告</p>
                    <p v-if="scope.row.status == 1">柜机待机广告</p>
                    <p v-if="scope.row.status == 2">小程序用户端首页广告</p>
                    <p v-if="scope.row.status == 3">小程序条幅图</p>
                    <p v-if="scope.row.status == 4">柜机寄件流程图</p>
                  </div>
                </el-table-column>
                <el-table-column prop="zip" label="柜机分组" width="120">
                  <div slot-scope="scope">
                    <p @click="text(scope)">{{activeNameTitle}}</p>
                  </div>
                </el-table-column>
                <el-table-column prop="zip" label="操作" width="180">
                  <div slot-scope="scope">
                    <el-button
                      type="text"
                      style="color:green"
                      @click="changeAwait(scope.row,'0')"
                    >编辑</el-button>
                    <el-button type="text" style="color:red" @click="deletes(scope.row,)">删除</el-button>
                  </div>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-button type="text" class="addBannel" @click="addAwaitBannel(0)">+新增首页固定广告位</el-button>
          </div>
        </el-tab-pane>
        <el-button type="primary" plain class="addList" @click="cablintBannel = true">柜机广告分组管理</el-button>
      </el-tabs>

      <!--编辑广告-->

      <el-dialog
        :title="this.fsTitle == 0? '编辑广告':'新增广告'"
        :visible.sync="awaitChange"
        width="30%"
        center
      >
        <el-form ref="form" :model="form" abel-width="80px">
          <el-form-item label="广告名称">
            <el-input v-model="formName" style="width:210px"></el-input>
          </el-form-item>
          <el-form-item label="广告名称" v-if="fsTitle == 1">
            <p>柜机待机广告</p>
          </el-form-item>
          <el-form-item label="广告名称" v-if="fsTitle == 2">
            <p>首页固定广告位</p>
          </el-form-item>
          <el-form-item label="广告位置" v-if="fsTitle == 0">
            <el-select v-model="formLocation" placeholder="请选择广告区域">
              <el-option label="柜机首页广告" value="0"></el-option>
              <el-option label="柜机待机广告" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="柜机分组" v-if="fsTitle == 2 || fsTitle == 1">
            <p>{{activeNameTitle}}</p>
          </el-form-item>
          <el-form-item label="柜机分组" v-if="fsTitle == 0">
            <el-select v-model="formGroup" placeholder="请选择广告区域">
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item,index) in courireList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="添加图片">
            <el-upload
              class="avatar-uploader"
              action="http://192.168.0.21:8091/image/productImage/upload"
              list-type="picture-card"
              :limit="1"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="添加视频">
            <el-upload
              class="avatar-uploader"
              action="http://192.168.0.21:8091/image/productImage/upload"
              v-bind:on-progress="uploadVideoProcess"
              v-bind:on-success="handleVideoSuccess"
              v-bind:before-upload="beforeUploadVideo"
              v-bind:show-file-list="false"
            >
              <video
                v-if="videoForm.showVideoPath !='' && !videoFlag"
                v-bind:src="videoForm.showVideoPath"
                class="avatar video-avatar"
                controls="controls"
                style="width:359px"
              >您的浏览器不支持视频播放</video>
              <i
                v-else-if="videoForm.showVideoPath =='' && !videoFlag"
                class="el-icon-plus avatar-uploader-icon"
              ></i>
              <el-progress
                v-if="videoFlag == true"
                type="circle"
                v-bind:percentage="videoUploadPercent"
                style="margin-top:7px;"
              ></el-progress>
            </el-upload>
            <el-button type="info" round style="margin-left:60px" @click="deleVideo">删除视频</el-button>
          </el-form-item>
          <p style="color:red">图片视频只能选择一个</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="canel">取 消</el-button>
          <el-button type="primary" @click="addSure" v-if="fsTitle == 1 || fsTitle == 2">确 定</el-button>
          <el-button type="primary" @click="changeSure" v-if="fsTitle == 0">修改</el-button>
        </span>
      </el-dialog>

      <!--柜机广告分组管理-->
      <el-dialog title="柜机广告分组管理" :visible.sync="cablintBannel" width="30%" center>
        <el-collapse v-model="chooseq" accordion>
          <div class="sdiv" v-for="(item,index) in courireList" :key="index">
            <el-collapse-item :title="item.name" :name="item.id">
              <div
                v-for="(items,indexs) in item.counterList"
                :key="indexs"
                style="position: relative"
              >
                {{items.name}}
                <!-- <span > </span> -->
                <el-button
                  style="position:absolute;top:0;right:30px;border:none"
                  class="el-icon-delete"
                  @click="deleteCounter(items.id)"
                ></el-button>
              </div>
            </el-collapse-item>
            <el-button class="xdiv" @click="deleteBannelGroup(item.id)" v-if="item.id != 1">X</el-button>
          </div>
        </el-collapse>
        <el-button type="text" v-if="addGroupStatus == 0" @click="addGroup">+新增分组</el-button>
        <div style="width:100%;text-align:center" v-if="addGroupStatus == 1">
          <el-input v-model="ExpressName" placeholder="请输入柜机名称" style="width:400px;margin-top:5px"></el-input>
          <el-select v-model="defuleBox" filterable  multiple placeholder="请选择需要添加的柜机" style="margin-top:20px;width:400px;" >
            <el-option
              v-for="item in defauleExpress"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button style="width:200px;margin-top:20px" @click="addExpressSure" type="primary">确定添加柜机分组</el-button>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cablintBannel = false">取 消</el-button>
          <el-button type="primary" @click="cablintBannel = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { deliveryLocker, expressCabinet,dealer} from "../../../api/index";
export default {
  data() {
    return {
      form: {},
      activeNameTitle: "默认分组",
      activeName: "1",
      tableData: [],
      tableData2: [],
      courireList: [],
      awaitChange: false, //待机编辑窗口
      formName: "",
      formLocation: "",
      formGroup: "",
      fsTitle: 0, //编辑 0  待机 1  首页固定 2 ,
      courseStatus: "", //待机 1  首页 0
      imageUrl: "",
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: "",
      },
      changeId: "",
      typeStatus: "", //点击编辑  是待机 还是首页固定
      cablintBannel: false,
      chooseq: "1",
      defauleExpress:[],//添加分组 默认柜机
      defuleBox:[],//选中柜机
      ExpressName:'',//添加分组分组名称
      addGroupStatus:0,//0 新增分组  1 添加分组列表
    };
  },
  created() {
    this.getData();
  },
  watch: {
    activeName: function (newval) {
      console.log(this.courireList);
      for (var i = 0; i < this.courireList.length; i++) {
        if (this.courireList[i].stringId == newval) {
          this.activeNameTitle = this.courireList[i].name;
        }
      }

    },
  },
  methods: {
    //点击添加分组按钮\
    addGroup(){
      this.addGroupStatus =1,
      this.ExpressName = '',
      this.defuleBox = []
    },
    //添加分组确定按钮
    addExpressSure(){
      this.addGroupStatus = 0,
      console.log(this.defuleBox)
      deliveryLocker.addGroupList({name:this.ExpressName,groupCounterList:this.defuleBox}).then(res=>{
        console.log("添加分组有",res)
        if(res.code == 200){
          this.$message({
            message:'添加成功',
            type:'success'
          })
          this.getData()
        }
      })
    },
    deleteCounter(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deliveryLocker.deleteGroupExpress({ param1: id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getData();
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
    getData() {
      //获取柜机列表
      deliveryLocker.getCourierBannerList().then((res) => {
        console.log(res);
        this.courireList = res.data;
        console.log(this.courireList);
      });
      //柜机广告
      deliveryLocker.getBannelList({ param7: this.activeName }).then((res) => {
        console.log(res);
        this.tableData = res.data.bannerAwaitList;
        this.tableData2 = res.data.bannerHomePageList;
      });
      //获取默认分组柜机
      dealer.getDefalutCabint({}).then(res=>{
        console.log(res)
        this.defauleExpress = res.data
      })
    },
    //待机编辑
    changeAwait(row, sta) {
      console.log(row.id);
      this.changeId = row.id;
      this.fsTitle = 0;
      this.typeStatus = sta;
      this.awaitChange = true;
      this.formName = row.advertisingName;
      console.log(row.image.substr(row.image.length - 3, 3));
      if (
        row.image.substr(row.image.length - 3, 3) == "jpg" ||
        row.image.substr(row.image.length - 3, 3) == "png"
      ) {
        this.imageUrl = row.image;
        this.videoForm.showVideoPath = "";
      } else {
        this.videoForm.showVideoPath = row.image;
        this.imageUrl = "";
      }
      (this.formLocation = sta), (this.formGroup = 1);
    },
    //点击tab栏
    handleClick(row) {
      console.log(row);
      console.log(this.activeName);
      this.getData();
    },
    //删除光告
    deletes(row) {
      this.$confirm("确认删除广告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deliveryLocker.deleteBannel({ param1: row.id }).then((res) => {
            if (this.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //新增待机轮播广告管理
    addAwaitBannel(row) {
      (this.formName = ""),
        (this.imageUrl = ""),
        (this.videoForm.showVideoPath = "");
      this.videoForm.showVideoPath = "";
      this.awaitChange = true;
      this.courseStatus = row;
      if (row == 1) {
        this.fsTitle = 1;
        this.formLocation = "1";
      } else {
        this.fsTitle = 2;
        this.formLocation = "0";
      }
    },
    //新增确定按钮
    addSure() {
      console.log(this.imageUrl, this.videoForm.showVideoPath);
      if (this.imageUrl != "" && this.videoForm.showVideoPath != "") {
        this.$message("视频,图片只能上传一个");
        return;
      } else {
        if (this.imageUrl) {
          //  var  aimage = this.imageUrl.replace('http://192.168.0.21:8080/container/resource/image/a/','')
          var aimage = this.imageUrl;
          var advertisingType = 0;
        }
        if (this.videoForm.showVideoPath) {
          //  var aimage =this.videoForm.showVideoPath.replace('http://192.168.0.21:8080/container/resource/image/a/','')
          var advertisingType = 1;
          var aimage = this.videoForm.showVideoPath;
        }
      }
      let obj = {
        groupId: Number(this.activeName),
        image: aimage,
        status: this.courseStatus,
        advertisingName: this.formName,
        type: 0,
        advertisingType,
      };
      deliveryLocker.addDeliveryLocker(obj).then((res) => {
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.awaitChange =false
          this.getData()
        }
      });
    },
    //修改确定按钮
    changeSure(row) {
      if (this.imageUrl) {
        var aimage = this.imageUrl;
        var advertisingType = 0;
      }
      if (this.videoForm.showVideoPath) {
        var advertisingType = 1;
        var aimage = this.videoForm.showVideoPath;
      }
      let obj = {
        id: this.changeId,
        groupId: this.formGroup,
        image: aimage,
        advertisingType,
        type: 0,
        status: this.formLocation,
        advertisingName: this.formName,
      };
      deliveryLocker.changeBannel(obj).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.awaitChange = false;
          this.getData();
        }
      });
    },
    //取消按钮
    canel() {
      this.awaitChange = false;
      this.formName = "";
    },
    //首页广告添加
    firstBannel() {},
    //上传图片
    handleAvatarSuccess(res) {
      console.log(res);
      this.imageUrl =
        "http://192.168.0.21:8080/container/resource/image/a/" + res.data[0];
      console.log(this.imageUrl);
    },
    //删除图片
    handleRemove() {
      this.imageUrl = "";
    },
    // /删除分组
    deleteBannelGroup(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          expressCabinet.deleteExpressGroup({ param1: id }).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              deliveryLocker.getCourierBannerList().then((res) => {
                this.courireList = res.data;
                console.log(this.courireList);
              });
            }
          });
          this.getData()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1
      ) {
        this.$message("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$message("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      console.log(res);
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      //前台上传地址
      //if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      //} else {
      //     layer.msg("上传失败，请重新上传");
      //}

      //后台上传地址
      if (res.code == 200) {
        this.videoForm.showVideoPath =
          "http://192.168.0.21:8080/container/resource/image/a/" + res.data;
      } else {
        this.$message(res.Message);
      }
    },
    //没用的
    text() {},
    deleVideo() {
      this.videoForm.showVideoPath = "";
    },
  },
};
</script>

<style>
.sdiv {
  position: relative;
  padding-right: 50px;
}
.xdiv {
  position: absolute;
  top: 12px;
  right: 1px;
  width: 40px;
  height: 26px;
  border: 1px #ccc solid;
  line-height: 11px;
  font-size: 20px;
  
}
.addList {
  position: absolute;
  top: 5px;
  right: 2px;
  z-index: 100;
}
.addBannel {
  position: absolute;
  top: 6px;
  right: 5px;
  color: green;
  border: 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>