<template>
  <div style="background-color: white;overflow: hidden;padding:40px;padding-left:180px">
    <h3 style="margin-left:30%">小程序端前端配置管理</h3>
    <div style="width:56%;position: relative;">
      <el-table :data="tableData" border>
        <el-table-column prop="date" label="小程序首页轮播广告">
          <el-table-column type="index" label="排序"></el-table-column>
          <el-table-column prop="advertisingName" label="广告名称"></el-table-column>
          <el-table-column prop="image" label="图片/视频">
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
          <el-table-column prop="address" label="广告位置">
            <div slot-scope="scope">
              <p v-if="scope.row.status == 0">柜机首页广告</p>
              <p v-if="scope.row.status == 1">柜机待机广告</p>
              <p v-if="scope.row.status == 2">小程序用户端首页广告</p>
              <p v-if="scope.row.status == 3">小程序条幅图</p>
              <p v-if="scope.row.status == 4">柜机寄件流程图</p>
            </div>
          </el-table-column>
          <el-table-column prop="link" label="跳转链接"></el-table-column>
          <el-table-column prop="address" label="操作">
            <div slot-scope="scope">
              <el-button type="text" @click="change(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteAdv(scope.row)">删除</el-button>
            </div>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-button type="text" class="addBannel" @click="addAwaitBannel(1)">+新增待机轮播广告</el-button>
    </div>

    <el-table :data="fixTableData" border style="width: 70%;margin-top:50px">
      <el-table-column prop="date" label="小程序固定位置广告">
        <el-table-column type="index" label="排序"></el-table-column>
        <el-table-column prop="advertisingName" label="广告名称"></el-table-column>
        <el-table-column prop="address" label="图片/视频">
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
        <el-table-column prop="address" label="广告位置">
          <div slot-scope="scope">
            <p v-if="scope.row.status == 0">柜机首页广告</p>
            <p v-if="scope.row.status == 1">柜机待机广告</p>
            <p v-if="scope.row.status == 2">小程序用户端首页广告</p>
            <p v-if="scope.row.status == 3">小程序条幅图</p>
            <p v-if="scope.row.status == 4">柜机寄件流程图</p>
          </div>
        </el-table-column>
        <el-table-column prop="link" label="跳转链接"></el-table-column>
        <el-table-column prop="address" label="操作">
          <div slot-scope="scope">
            <el-button type="text" @click="change(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteAdv(scope.row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table-column>
    </el-table>

    <el-table :data="articelTable" border style="width: 40%;margin-top:50px">
      <el-table-column prop="date" label="小程序文章管理">
        <el-table-column type="index" label="排序"></el-table-column>
        <el-table-column prop="type" label="文章名称">
            <div slot-scope="scope">
                <p v-if='scope.row.type == 0'>快递柜服务协议</p>
                <p v-if='scope.row.type == 1'>保管服务费计费规则</p>
                <p v-if='scope.row.type == 2'>寄件服务条款</p>
                <p v-if='scope.row.type == 3'>常见问题</p>
                <p v-if='scope.row.type == 4'>反馈建议</p>
                <p v-if='scope.row.type == 5'>关于我们</p>
                <p v-if='scope.row.type == 6'>隐私协议</p>
                <p v-if='scope.row.type == 7'>快递员用户注册协议</p>
            </div>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <div slot-scope="scope">
            <el-button type="text" @click="articelChange(scope.row)">编辑</el-button>
          </div>
        </el-table-column>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="diaStatus== 0?'新增广告':'编辑广告'"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="广告名称">
          <el-input v-model="advName" style="width:210px"></el-input>
        </el-form-item>
        <el-form-item label="广告位置" v-if="diaStatus == 0">
          <p>快递柜显示屏待机轮播广告</p>
        </el-form-item>
        <el-form-item label="广告位置" v-if="diaStatus == 1">
          <el-select v-model="advLocation" placeholder="请选择广告区域">
            <el-option label="柜 机 首 页 广 告" value="2"></el-option>
            <el-option label="小 程 序 固 定 位 置 广 告" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转地址">
          <el-input v-model="advLink" style="width:210px"></el-input>
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
          <el-button
            type="info"
            round
            style="margin-left:60px;margin-top:10px"
            @click="handleRemove"
            v-if="diaStatus == 1"
          >删除图片</el-button>
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
        <el-button>取 消</el-button>
        <el-button type="primary" @click="addAdv" v-if="diaStatus == 0">添加</el-button>
        <el-button type="primary" @click="changeAdv" v-if="diaStatus == 1">修改</el-button>
      </span>
    </el-dialog>

    <!--文章管理-->
    <el-dialog title="小程序文章编辑" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
                <p v-if='articleName == 0'>快递柜服务协议</p>
                <p v-if='articleName == 1'>保管服务费计费规则</p>
                <p v-if='articleName == 2'>寄件服务条款</p>
                <p v-if='articleName == 3'>常见问题</p>
                <p v-if='articleName == 4'>反馈建议</p>
                <p v-if='articleName == 5'>关于我们</p>
                <p v-if='articleName == 6'>隐私协议</p>
                <p v-if='articleName == 7'>快递员用户注册协议</p>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="articleMessage" style="width:400px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click='articleAffirm'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deliveryLocker } from "../../../api/index.js";
export default {
  data() {
    return {
      centerDialogVisible: false,
      articleName:'',
      articleMessage:'',
      articleId:'',
      diaStatus: 0,
      form: {},
      tableData: [],
      fixTableData: [],
      articelTable: [],
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: "",
      },
      imageUrl: "",
      dialogVisible: false,
      advName: "",
      advLocation: "",
      advLink: "",
      changeId: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      deliveryLocker.appGetBannel({ param7: "0" }).then((res) => {
        console.log(res);
        this.articelTable = res.data.appletArticle;
        this.tableData = res.data.bannerHomePageList;
        this.fixTableData = res.data.bannerAwaitList;
      });
    },
    //文章管理确定按钮
    articelChange(row) {
      console.log(row)
      this.centerDialogVisible = true;
      this.articleName = row.type
      this.articleMessage =row.content
      this.articleId = row.id
    },
    //文章确定按钮
    articleAffirm(){
      deliveryLocker.putArticle({id:this.articleId,content :this.articleMessage}).then(res=>{
        console.log(res)
          this.centerDialogVisible = false 
          this.$message({
            message:'修改成功',
            data:'success'
          })
      })
    },
    //添加
    addAdv() {
      console.log(this.imageUrl, this.videoForm.showVideoPath);
      if (this.imageUrl != "" && this.videoForm.showVideoPath != "") {
        this.$message({
          message: "图片/视频 二选一",
          type: "warning",
        });
        return;
      }
      if (this.imageUrl != "") {
        var advertisingType = 0;
        var image = this.imageUrl;
      }
      if (this.videoForm.showVideoPath != "") {
        var advertisingType = 1;
        var image = this.videoForm.showVideoPath;
      }
      let obj = {
        type: 1,
        status: 2,
        advertisingName: this.advName,
        advertisingType,
        link: this.advLink,
        image,
      };
      deliveryLocker.addDeliveryLocker(obj).then((res) => {
        if (res.code == 200) {
          this.dialogVisible = false;
          this.getData();
        }
      });
    },
    //删除广告
    deleteAdv(row) {
      console.log("1");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deliveryLocker.deleteBannel({ param1: row.id }).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.dialogVisible = false;
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
    //编辑 最上边
    change(row) {
      console.log(row);
      this.changeId = row.id;
      this.dialogVisible = true;
      this.advName = row.advertisingName;
      this.advLink = row.link;
      this.diaStatus = 1;
      this.advLocation = row.status.toString();
      if (row.advertisingType == 0) {
        this.imageUrl = row.image;
      } else {
        this.videoForm.showVideoPath = row.image;
      }
    },
    //编辑确定
    changeAdv(row) {
      console.log(this.advLocation);
      if (this.imageUrl != "" && this.videoForm.showVideoPath != "") {
        this.$message({
          message: "图片/视频 二选一",
          type: "warning",
        });
        return;
      }
      if (this.imageUrl != "") {
        var advertisingType = 0;
        var image = this.imageUrl;
      }
      if (this.videoForm.showVideoPath != "") {
        var advertisingType = 1;
        var image = this.videoForm.showVideoPath;
      }
      var strs = {
        id: this.changeId,
        image,
        advertisingName: this.advName,
        advertisingType,
        link: this.advLink,
        status: this.advLocation,
        type: 1,
      };
      deliveryLocker.changeBannel(strs).then((res) => {
        if (res.code == 200) {
          this.dialogVisible = false;
          this.$message("修改成功");
          this.getData();
        }
      });
    },
    //新增待机轮播
    addAwaitBannel() {
      this.diaStatus = 0;
      this.dialogVisible = true;
      this.advLink = "";
      this.advName = "";
      this.imageUrl = "";
      this.videoForm.showVideoPath = "";
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
    //上传图片
    handleAvatarSuccess(res) {
      console.log(res);
      this.imageUrl =
        "http://192.168.0.21:8080/container/resource/image/a/" + res.data[0];
      console.log(this.imageUrl);
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      console.log(res);
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      //后台上传地址
      if (res.code == 200) {
        this.videoForm.showVideoPath =
          "http://192.168.0.21:8080/container/resource/image/a/" + res.data;
      } else {
        this.$message(res.Message);
      }
    },
    deleVideo() {
      this.videoForm.showVideoPath = "";
    },
    //删除图片
    handleRemove() {
      this.imageUrl = "";
    },
  },
};
</script>

<style>
.addBannel {
  position: absolute;
  top: 6px;
  right: 5px;
  color: green;
  border: 0;
}
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