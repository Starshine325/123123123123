import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


//最初所有路由
let allRouer = [{
    //这里定义的是前端已有的所有路由，也就是无论是否后端会返回或者我会显示的路由
    path: '/financeOverview',
    name: '财务总览',
    component: resolve => require(['../components/page/financeOverview.vue'], resolve)
},
{
    path: 'financeCourierFeeManage',
    name: '快递员投件费用管理',
    component: resolve => require(['../components/page/Finance/financeCourierFeeManage.vue'], resolve)
},
{
    path: 'financeAgentProfitManage',
    name: '经销商分润比例管理',
    component: resolve => require(['../components/page/Finance/financeAgentProfitManage.vue'], resolve)
},
{
    path: 'courierManageTwo',
    name: '快递员管理',
    component: resolve => require(['../components/page/courierManage/courierManageTwo.vue'], resolve)
},
{
    path: 'courierMessageDetails',
    name: '快递员详情',
    component: resolve => require(['../components/page/courierManage/courierMessageDetails.vue'], resolve)
},
{
    path: 'courierCertificationManage',
    name: '快递员认证管理',
    component: resolve => require(['../components/page/courierManage/courierCertificationManage.vue'], resolve)
},
{
    path: 'courierCompanyManage',
    name: '快递公司管理',
    component: resolve => require(['../components/page/courierManage/courierCompanyManage.vue'], resolve)
},
{
    path: 'expressCompanyDetails',
    name: '快递公司详情',
    component: resolve => require(['../components/page/courierManage/expressCompanyDetails.vue'], resolve)
},
{
    path: 'counterManage',
    name: '快递柜管理',
    component: resolve => require(['../components/page/counterManage/counterManage.vue'], resolve)
},
{
    path: 'counterDetail',
    name: '快递柜详情页',
    component: resolve => require(['../components/page/counterManage/counterDetail.vue'], resolve)
},
{
    path: 'expressDeliveryMailManage',
    name: '寄件列表',
    component: resolve => require(['../components/page/expressDeliveryManage/expressDeliveryMailManage.vue'], resolve)
},
{
    path: 'expressDeliverySaveManage',
    name: '存件列表',
    component: resolve => require(['../components/page/expressDeliveryManage/expressDeliverySaveManage.vue'], resolve)
},
{
    path: 'userManage',
    name: '用户管理',
    component: resolve => require(['../components/page/userManage/userManage.vue'], resolve)
},
{
    path: 'userManageDetail',
    name: '用户详情',
    component: resolve => require(['../components/page/userManage/userManageDetail.vue'], resolve)
},
{
    path: 'agentManage',
    name: '经销商管理',
    component: resolve => require(['../components/page/agentManage/agentManage.vue'], resolve)
},
{
    path: 'agentManageDetail',
    name: '经销商管理',
    component: resolve => require(['../components/page/agentManage/agentManageDetail.vue'], resolve)
},
{
    path: 'configCounterManage',
    name: '快递柜显示屏前端配置',
    component: resolve => require(['../components/page/configManage/configCounterManage.vue'], resolve)
},
{
    path: 'configAppletsManage',
    name: '小程序端前端配置',
    component: resolve => require(['../components/page/configManage/configAppletsManage.vue'], resolve)
},
{
    path: 'roleManage',
    name: '权限管理',
    component: resolve => require(['../components/page/roleManage/index.vue'], resolve)
},
]

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/financeOverview'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: {
            title: '总览'
        },
        children: allRouer
    },
    {
        path: '/login',
        name: '登录',
        component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
        path: '*',
        name: '404',
        component: resolve => require(['../components/page/404.vue'], resolve)
    }
    ]
})


export default router