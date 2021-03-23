class Handle{
    static set(store: StoreData, content: SetStoreData):StoreData{
        let keys=Object.keys(content) as Array<keyof StoreData>
        for(let i=0;i<keys.length;i++){
            let k=keys[i]
            let data=content[k];
            if(data){
                (store[k] as any)=data;
            }
        }
        return store;
    }
}

export function initData(store: StoreData | undefined):StoreData{
    if(store!==undefined){
        return Object.assign({},store)
    } 
    return {
        //data: [],
        current: {
            title:"",
            version:"",   
            content:[],
            globalTags:""
        },
        view:"none",
        currentGroup: {
            apis:[],
            group:""
        }
    }
}

export function  getHandler(key:ACTION_TYPE):StoreHandles | null{
    return Handle[key] ?? null;
}