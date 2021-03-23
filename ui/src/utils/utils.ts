import axios,{AxiosRequestConfig,AxiosResponse} from "axios";
import {message} from "antd";

//设置超时
axios.defaults.timeout = 10000;
//跨域请求
axios.defaults.withCredentials = true;
//请求拦截器
axios.interceptors.request.use((config:AxiosRequestConfig):AxiosRequestConfig=>{
    message.loading('加载中',0);
    return config;
});
//返回拦截器
axios.interceptors.response.use((response:AxiosResponse):any=>{
    message.destroy();
    if(response.status !== 200){
        message.error('请求失败！');
        return [];
    }
    return response.data;
});

class Utils{
    //请求
    static request(method:Method,url:string,data?:any,headers?:any):Promise<any>{
        let config:AxiosRequestConfig={
            url:url,
            method:method,
            headers:headers
        };
        method=="get"? config.params=data : config.data=data
        message.destroy();
        return axios.request(config).then(res=>res).catch(e=>{
            message.error('请求失败！');
            console.log(e)
        })
    }

    //新增
    static addQuery(key:string,value:string|number){
        let search=document.location.search;
        if(search.length<1){
            this.setQuery(key,value);
            return;
        }
        let regexp= new RegExp(`${key}=[\\w\\d.]*`);
        let url=search;
        if(search.match(regexp)){
            //匹配到就替换
            url=search.replace(regexp,`${key}=${value}`);
        }else{
            //匹配不到就加入
            url+=`&${key}=${value}`
        }
        window.history.pushState(null,'',url);
    }
    //设置
    static setQuery(key:string,value:string|number){
        window.history.pushState(null,'',`?${key}=${value}`);
    }
    //获取
    static getQuery(key:string){
        let query=new URLSearchParams(document.location.search);
        return query.get(key);
    }
    static getQueryStr(){
        return document.location.search;
    }
}

export default Utils;