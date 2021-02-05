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
    static request=(method:string,url:string,param?:any):Promise<any>=>{
        let config:any={
            url:url,
            method:method,
            headers:{
                "content-type":"application/json; charset=UTF-8",
                "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyQWdlbnQiOiIwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiIsInRva2VuIjoiYjk1ZWJiNWJkMzFlMzc5Y2JlZDFmYzc1YjNhY2FmNTUiLCJjcmVhdGVUaW1lIjoxNTg5ODc4NzcxfQ.snBq4thmKvSJtnNOgEZKbVIW7HP1swsQvoclC_BKcqQ"
            },
            withCredentials:false,
            timeout: 30000,
        };
        if(param){
            if(method==='get'){
                config['params']=param;
            }else{
                config['data']=param;
            }
        }
        return new Promise((resolve,reject)=>{
            axios.request(config).then(res=>{
                if(res){
                    resolve(res);
                }
                reject(res);
            }).catch(err=>{
                message.destroy();
                message.error('请求失败！');
                reject(err);
            });
        });
    }

    static render='render';

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
    //删除
    // static removeQuery(key:string){
    //     let search=document.location.search;
    //     let regexp= new RegExp(`[\?\&]?${key}=[\\w\\d.]*`);
    //     let url=search.replace(regexp,'');
    //     console.log(url,regexp)
    //     if(url==='?'){
    //         url="";
    //     }
    //     window.history.pushState(null,'',url);
    // }
}

export default Utils;