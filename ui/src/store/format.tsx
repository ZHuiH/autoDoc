export type v2Data={
    title:string,
    version:string,   
    render:number,   
    content:Array<v2Apis>,   
}
export type v2Apis={
    apis:Array<any>,
    group:string
}

export type StoreData={
    data:Array<v2Data>
    current:v2Data
    currentGroup:v2Apis
}

export enum ACTION_TYPE{
    SAVE="save",
    MERAGE="merage",
    CHANGE="change",
    COVER="cover",
}
export type Action={
    type:ACTION_TYPE
    content:v2Data|any
    key: keyof  StoreData
}