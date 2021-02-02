
// interface unit{
//     info        : infoFormat,
//     methods     : object
// }
export interface homeState{
    menuList    :   object|null,
    Origin      :   Object | null,
    navigation  ?:   Array<string>,
    current     :   any,
    index       :   string,
    name        :   string
    baseHost    :   string,
    title       :   string,
    version     :   string
}

// interface infoFormat{
//     descriptions    ?:   Array<string>,
//     author          ?:   string,
//     package         ?:   string,
//     version         ?:   string
//     url             ?:   string,
// }

export interface infoProps{
    title           :    string,
    descriptions    ?:   Array<string>,
    author          ?:   string,
    package         ?:   string,
    version         ?:   string,
    baseHost        ?:   string,
    mode            ?:   string
}

export interface methodProps{
    data     : object
}

export interface methodState{
    attr     : object
}

export interface paramFormat{
    description     : string,
    name            : string,
    required        ?: boolean,
    type            : string
    default         ?: string|null
}

export interface ApiProps{
    item             ?: Array<any>,
    baseHost         ?: string,
    requestExample   ?: (request:object,data:any)=>void
}

export interface ApiState{
    color             : object,
    requestConfig     : any 
}

export interface UrlParam{
    method          :   string,
    path            :   string,
    description     ?:  string,
}

export interface nodeParam{
    name      :   string,
    type      :   string,
    child     :   Array<nodeParam>,
}

