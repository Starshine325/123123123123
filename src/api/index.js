import request from '../utils/request';
//级联 -------------------------
export const cascade = {
    getone(query){
        return request({
            url:'/counter/selectCityList',
            method:'POST',
            data:query
        })
    }
}
//登录模块  ---------------------------------------------------------------
export const Login = {
    login(query){
        return request({
            url:'/GetToken?username='+query.username+'&password='+query.password+'&rememberMe='+query.rememberMe,
            method:'POST',
            data:query
        })
    }
};
//快递员管理 ----------------------------------------------
export const courier = {
    //获取快递员列表
    getCourierList(query){
        return request({
            url:'/courier/selectCourierList',
            method:'POST',
            data:query
        })
    },
    //快递员详情
    getCourierDetails(query){
        return request({
            url:'/courier/selectCourierDetail',
            method:'POST',
            data:query
        })
    },
    //快递员审核列表
    getCourierCheckList(query){
        return request({
            url:'/courier/selectCheckedCourierList',
            method:'POST',
            data:query
        })
    },
    //快递公司列表
    getExpressCompanyList(query){
        return request({
            url:'/courier/selectCourierServicesCompanyList',
            method:'POST',
            data:query
        })
    },
    //快递员认证
    putAttestation(query){
        return request({
            url:'/courier/courierAuthentication',
            method:'POST',
            data:query
        })
    },
    //快递员收支管理
    CourierPutPutMessage(query){
        return request({
            url:'/courier/selectCourierMoneyDetail',
            method:'POST',
            data:query
        })
    },
    //添加快递公司
    addExpressCompany(query){
        return request({
            url:'/courier/insertCompany',
            method:'POST',
            data:query
        })
    },
    //回显
    getExpressCompany(query){
        return request({
            url:'/courier/selectCourierServicesCompanyById',
            method:'POST',
            data:query
        })
    },
    putExpressCompany(query){
        return request({
            url:'/courier/updateCompany',
            method:'POST',
            data:query
        })
    },
    deleteExpressCompany(query){
        return request({
            url:'/courier/deleteCompany',
            method:'POST',
            data:query
        })
    }
};
//快递单---------------------------------------------------------------------------------
export const expressWaybill = {
    //存件
    getSaveExpressWaybill(query){
        return request({
            url:'/express/selectSaveExpressList',
            method:'POST',
            data:query
        })
    },
    //寄件
    getMaillExpressWaybill(query){
        return request({
            url:'/express/selectMailExpressList',
            method:'POST',
            data:query
        })
    }
}
//前端快递柜显示屏管理 ------------------------------------------------
export const deliveryLocker = {
    //柜机分组
    getCourierBannerList(query){
        return request({
            url:'/group/courierBannerList',
            method:'POST',
            data:query
        })
    },
    //柜机列表 广告  固定广告
    getBannelList(query){
        return request({
            url:'/banner/courierBannerList',
            method:'POST',
            data:query
        })
    },
    //添加快递柜
    addDeliveryLocker(query){
        return request({
            url:"/banner/insertBanner",
            method:'POST',
            data:query
        })
    },
    //删除广告
    deleteBannel(query){
        return request({
            url:'/banner/deleteBannerById',
            method:'POST',
            data:query
        })
    },
    //修改
    changeBannel(query){
        return request({
            url:'/banner/updateBannerById',
            method:'POST',
            data:query
        })
    },
    //小程序获取获取列表
    appGetBannel(query){
        return request({
            url:'/banner/appletBannerList', 
            method:'POST',
            data:query
        })
    },
    //删除分组下面的柜机
    deleteGroupExpress(query){
        return request({
            url:'/group/deleteCounterById',
            method:'POST',
            data:query
        })
    },
    //添加分组 
    addGroupList(query){
        return request({
            url:'/group/insertCabinet',
            method:'POST',
            data:query
        })
    },
    //文章修改
    putArticle(query){
        return request({
            url:'/banner/updateArticle',
            method:'POST',
            data:query
        })
    }
}
//用户管理 --------------------------------------------------------------
export const User = {
    getUserList(query){
        return request({
            url:'/management/selectUserList',
            method:'POST',
            data:query
        })
    },
    //用户详情
    getUserDetail(query){
        return request({
            url:'/management/selectUserById',
            method:'POST',
            data:query
        })
    },
    //用户取件列表
    getUserPieceList(query){
        return request({
            url:'/management/selectUserSaveExpressList',
            method:'POST',
            data:query
        })
    },
    //获取用户寄件列表
    getUserSendPieceList(query){
        return request({
            url:'/management/selectUserMailExpressList',
            method:'POST',
            data:query
        })
    }
}
//快递柜管理 -------------------------------------------------------------
export const expressCabinet = {
    //快递柜列表
    getcabintList(query){
        return request({
            url:'/counter/selectCounterList',
            method:'POST',
            data:query
        })
    },
    //删除快递柜
    deleteCabinet(query){
        return request({
            url:'/counter/deleteCounterById',
            method:'POST',
            data:query
        })
    },
    //添加快递柜
    addCabint(query){
        return request({
            url:'/counter/toAddCounter',
            method:'POST',
            data:query
        })
    },
    //点击编辑回显
    putCabint(query){
        return request({
            url:'/counter/selectCounterById',
            method:'POST',
            data:query
        })
    },
    //编辑
    realyPutcabint(query){
        return request({
            url:'/counter/updateCounterById',
            method:'POST',
            data:query
        })
    },
    //快递柜明细
    expressCabintDetail(query){
        return request({
            url:'/counter/selectCounterDetailByLog',
            method:'POST',
            data:query
        })
    },
    //快递柜详情
    getCabintDetail(query){
        return request({
            url:'/counter/selectCounterDetail',
            method:'POST',
            data:query
        })
    },
    //删除快递柜分组
    deleteExpressGroup(query){
        return request({
            url:'/group/deleteCabinetById',
            method:'POST',
            data:query
        })
    }
}
//经销商管理-----------------------------------------------------------
export const dealer = {
    //获取经销商列表
    getDealerList(query){
        return request({
            url:'/management/selectAgentList',
            method:'POST',
            data:query
        })
    },
    //获取默认柜机列表
    getDefalutCabint(query){
        return request({
            url:'/group/selectCounterByGroup',
            method:'POST',
            data:query
        })
    },
    //新增分销商
    addDealer(query){
        return request({
            url:'/management/addAgent',
            method:'POST',
            data:query
        })
    },
    //删除经销商
    deleteDealer(query){
        return request({
            url:'/management/deleteAgent',
            method:'POST',
            data:query
        })
    },
    //编辑经销商
    putCompileDealer(query){
        return request({
            url:'/management/updateAgent',
            method:'POST',
            data:query
        })
    },
    //经销商详情
    getDealerDetail(query){
        return request({
            url:'/management/selectAgentDetails',
            method:'POST',
            data:query
        })
    },
    //经销商密码
    putDealerPassword(query){
        return request({
            url:'/management/updateAgentPassword',
            method:'POST',
            data:query
        })
    },
    //获取经销商关联机列表
    getDealerRelecanceList(query){
        return request({
            url:'/management/selectAgentRelevanceCounter',
            method:'POST',
            data:query
        })
    },
    //获取流水
    getDealerWhaterList(query){
        return request({
            url:'/management/selectAgentCounterOutMoney',
            method:'POST',
            data:query
        })
    }
}
//权限管理
export const jurisdiction  = {
    //获取所有用户
        getAllUser(query){
            return request({
                url:'/pcUser/findAll',
                method:'POST',
                data:query
            })
        },
    //添加用户
    addPcUser(query){
        return request({
            url:'/pcUser/add',
            method:'POST',
            data:query
        })
    },
    //删除用户
    deletePcUser(query){
        return request({
            url:'/pcUser/deleteById',
            method:'POST',
            data:query
        })
    },
    //查询所有角色
    getAllRole(query){
        return request({
            url:'/pcUser/findAllRole',
            method:'POST',
            data:query
        })
    }
}
//财务管理---------------------------------------------------------------------------------
export const fincance = {
    //快递员投件费用
    getCourierCost(query){
        return request({
            url:'/setting/selectSpecificationMoney',
            method:'POST',
            data:query
        })
    },
    //快递员投件费用设置
    putCourierCost(query){
        return request({
            url:'/setting/settingSpecificationMoney',
            method:'POST',
            data:query
        })
    },
    //经销商分润比例
    getDealarCost(query){
        return request({
            url:'/setting/selectAgentProfitList',
            method:'POST',
            data:query
        })
    },
    //财务管理-经销商分润比例修改
    putDealarCost(query){
        return request({
            url:'/setting/settingAgentProfit',
            method:'POST',
            data:query
        })
    },
    //echarts图表
    getEcharts(query){
        return request({
            url:'/finance/selectFinanceTitle',
            method:'POST',
            data:query
        })
    },
    //财务明细
    getEchartsList(query){
        return request({
            url:'/finance/selectFinanceDetail',
            method:'POST',
            data:query
        })
    }
}