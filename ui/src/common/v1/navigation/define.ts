
export interface headerProps{
    item       ?:  Array<string>|null,
    activePage ?:  (path:string)=>void,
    search     ?:  (value:string)=>void
}

export interface headerState{
    current      :  string,
    protocol     :  string
}

export interface menuProps{
    item      ?:  any,
    replace   ?:  (key:string,data:any)=>void
}

export interface menuState{
    current      :  string
}