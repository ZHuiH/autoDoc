import {ACTION_TYPE,Action,StoreData} from "./format"
import {store} from "./index"

function dispatch(action:Action){
    return store.dispatch(action)
}

export function save<k extends keyof StoreData>(key:k,content:any){
    dispatch({
        type:ACTION_TYPE.SAVE,
        content:content,
        key:key,
    });
}

export function merage<k extends keyof StoreData>(key:k,content:any){
    dispatch({
        type:ACTION_TYPE.MERAGE,
        content:content,
        key:key,
    });
}

export function change<k extends keyof StoreData>(key:k,content:any){
    dispatch({
        type:ACTION_TYPE.CHANGE,
        content:content,
        key:key,
    });
}

export function splice<k extends keyof StoreData>(key:k,index:number){
    let content=store.getState().data;
    content.splice(index,1);
    dispatch({
        type:ACTION_TYPE.COVER,
        content:content,
        key:key,
    });
}
