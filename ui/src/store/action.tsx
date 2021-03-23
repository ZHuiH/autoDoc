import {store} from "./index"

function dispatch(action:Action){
    return store.dispatch(action)
}

enum ACTION_TYPE{
    SET="set"
}

export  class StoreActive{

    static set(data:SetStoreData){
        
        let keys=Object.keys(data);
        if(keys.length <=0){
            return;
        }
        dispatch({
            type:ACTION_TYPE.SET,
            content:data,
        });
    }

    // export function merage<k extends keyof StoreData>(key:k,content:any){
    //     dispatch({
    //         type:ACTION_TYPE.MERAGE,
    //         content:content,
    //         key:key,
    //     });
    // }

    // export function change<k extends keyof StoreData>(key:k,content:any){
    //     dispatch({
    //         type:ACTION_TYPE.CHANGE,
    //         content:content,
    //         key:key,
    //     });
    // }

    // export function splice<k extends keyof StoreData>(key:k,index:number){
    //     let content=store.getState().data;
    //     content.splice(index,1);
    //     dispatch({
    //         type:ACTION_TYPE.COVER,
    //         content:content,
    //         key:key,
    //     });
    // }

}
