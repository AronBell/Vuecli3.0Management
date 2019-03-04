import axios from 'axios';
import {Message, Loading } from 'element-ui';

let loading;
function startLoading() {
    loading = Loading.service({
        lock:true,
        test:'拼命加载中。。。',
        background:'rgba(0,0,0,0,7)'

    })  
}

function endLoading() {
    loading.close();
    
}

// 请求拦截
axios.interceptors.request.use(config => {
    startLoading();
    return config;
},error =>{
    return Promise.reject(error);
})

// 响应拦截
axios.interceptors.response.use(response => {
    // 结束加载动画
    endLoading();
    return response;
    // message消息提示
},error => {
    endLoading();
    Message.error(error.response.data);
    return Promise.reject(error);

})



export default axios;