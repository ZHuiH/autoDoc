type Method = 'get' | 'post' | 'put' | 'delete'
type ParamType = 'object' | 'string' | 'int' | 'date' | 'float' | 'any' | 'file'
type viewType = 'info' | 'code' | 'api' | 'none'
/**
 * fileData
 */

type ApiAuth = {
    source: 'body' | 'header',
    name: string
    defalut: string
}

type ApiCode = {
    code: number
    description: string
}

type ApiParam = {
    name: string
    type: ParamType
    required: boolean
    default: any
    description: string
    children: Array<ApiParam>
}

type ApiResponse = {
    code: number
    param: Array<ApiParam>
    description: string
}

type ApiInfo = {
    author?: string
    auth?: Array<ApiAuth>
    version?: string
    param?: Array<ApiParam>
    response?: Array<ApiResponse>
    method: Method
    path: string
    description: string
}

type FileDataContent = {
    apis: Array<ApiInfo>,
    group: string
}

type FileGlobalTags = {
    code?: Array<any>
    baseHost?: string
}

type FileData = {
    title: string
    version: string
    content: Array<FileDataContent>
    globalTags: FileGlobalTags
}


/**
 * store Data
 */

declare enum ACTION_TYPE {
    SET = "set"
}



type StoreData = {
    //data:Array<FileData>
    view: viewType,
    current: FileData
    currentGroup: FileDataContent
}

type SetStoreData = {
    //data:Array<FileData>
    view?: viewType,
    current?: FileData
    currentGroup?: FileDataContent
}

type Action = {
    type: ACTION_TYPE
    content: SetStoreData
}

type StoreHandles = (store: StoreData, action: SetStoreData) => StoreData
