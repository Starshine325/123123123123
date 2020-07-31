import axios from 'axios';
// let token = 'FDA1D6F956F4703545BAF2ABAA31F185'; //测试token
// let token = localStorage.token; //实时token,登录取值
//axios不允许自定义cookie
// axios.defaults.withCredentials=true;//让ajax携带cookie ，axios默认不能携带cokie,
//无论是cookie或者token都需要匹配后端的框架进行设置
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //配置请求头
const service = axios.create({
        baseURL: 'http://192.168.0.21:8091/', //刘
        // baseURL: 'http://192.168.0.21:8091/', //涛
        // baseURL: 'http://192.168.3.24:8082/', //本地
        //全局域名只需要在这里进行切换，请求方法统一放在api的index.js里，页面只需引入然后使用
        timeout: 5000
    })
    //请求拦截器
service.interceptors.request.use(config => {
    //首先判断是否有token才能发起请求
    // config.headers.token = localStorage.getItem("token")
    config.headers.token = localStorage.getItem('itoken')
    if (localStorage.getItem('itoken')) {
        return config;
    } else {
        alert('请求不存在或请求非法')
    }
}, error => {
    console.log(error);
    return Promise.reject();
})

//响应拦截器
service.interceptors.response.use(response => {
    if (response.status === 200) {
        //此处状态吗需要根据实际项目进行设置,后端有些时候返回的状态吗是不一样的
        if (response.data.code == 401) {
            alert(response.data.message)
        } else if (response.data.code == 403) {
            alert(response.data.message)
        } else {
            return response.data;
        }
    } else {
        Promise.reject();
    }
}, error => {
    console.log(error);
    return Promise.reject();
})

export default service;