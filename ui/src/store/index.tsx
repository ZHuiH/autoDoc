import {createStore} from "redux";
import {getHandler,initData} from "./handle"

function storeActive(store:StoreData | undefined,action:Action):StoreData{
    let handle=getHandler(action.type);
    let newStore=initData(store);
    if(handle && action.content){
        newStore=handle(newStore,action.content)
    }
    return  newStore;
}

export const store=createStore(storeActive);
