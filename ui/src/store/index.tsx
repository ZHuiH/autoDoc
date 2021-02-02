import {createStore} from "redux";
import {StoreData,Action,ACTION_TYPE, v2Data, v2Apis} from "./format";

function storeActive(store:StoreData | undefined,action:Action):StoreData{
    let NewStore=Object.assign({},store)
    let target=NewStore[action.key];
    switch(action.type){
        case ACTION_TYPE.SAVE: 
            NewStore.data=[action.content]
            NewStore.current=action.content
        break;
        case ACTION_TYPE.MERAGE:
            (NewStore[action.key] as any)=(target as Array<v2Data>).concat(action.content)
            break;
        case ACTION_TYPE.CHANGE:
            (NewStore[action.key] as v2Data|v2Apis)=action.content
            break;
        case ACTION_TYPE.COVER:
            (NewStore[action.key] as any)=action.content
            break;
    }
    return NewStore
}

export const store=createStore(storeActive);
