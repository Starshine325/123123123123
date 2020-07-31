<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.menuList">
          <el-submenu :index="item.url" :key="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.menuList">
              <el-submenu v-if="subItem.menuList" :index="subItem.url " :key="subItem.url">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.menuList"
                  :key="i"
                  :index="threeItem.url"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.url" :key="subItem.url">{{ subItem.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.url" :key="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      //这个位置的items需要根据原型图和返回的路由确定，是不是导航栏路由加个标识进行判定，是导航栏的push到items里进行遍历
      // items: [
      //   {
      //     icon: "el-icon-lx-cascades",
      //     url: "/dashboard",
      //     title: "财务总览"
      //   },
      //   {
      //     icon: "el-icon-lx-cascades",
      //     url: "/financeCourierFeeManage",
      //     title: "快递员投件费用管理"
      //   },
        
      //   {
      //     icon: "el-icon-lx-cascades",
      //     url: "/financeAgentProfitManage",
      //     title: "经销商分润比例管理"
      //   },
      //   {
      //     icon: "el-icon-lx-cascades",
      //     url: "/courierManageTwo",
      //     title: "快递员管理"
      //   },
      //   {
      //     icon: "el-icon-lx-cascades",
      //     url: "/courierCertificationManage",
      //     title: "快递员认证管理"
      //   },
      //   {
      //     icon: "el-icon-lx-cascades",
      //     url: "/courierCompanyManage",
      //     title: "快递公司管理"
      //   },
      //   {
      //     icon: "el-icon-lx-cascades",
      //     url: "/counterManage",
      //     title: "快递柜管理"
      //   },
      //    {
      //     icon: "el-icon-lx-cascades",
      //     url: "/expressDeliverySaveManage",
      //     title: "存件列表"
      //   },
      //    {
      //     icon: "el-icon-lx-cascades",
      //     url: "/expressDeliveryMailManage",
      //     title: "寄件列表"
      //   },
      //   {
      //     icon: "el-icon-lx-cascades",
      //     url: "/userManage",
      //     title: "用户管理"
      //   },
      //   {
      //     icon: "el-icon-lx-cascades",
      //     url: "/agentManage",
      //     title: "经销商管理"
      //   },
      //    {
      //     icon: "el-icon-lx-cascades",
      //     url: "/configCounterManage",
      //     title: "快递柜显示屏前端配置"
      //   },
      //    {
      //     icon: "el-icon-lx-cascades",
      //     url: "/configAppletsManage",
      //     title: "小程序端前端配置"
      //   },
      //   {
      //     icon: "el-icon-lx-cascades",
      //     url: "/roleManage",
      //     title: "权限管理"
      //   },
      // ],
      items:JSON.parse(localStorage.getItem('delivery_locker_List'))
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });

  },
  methods: {}
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
