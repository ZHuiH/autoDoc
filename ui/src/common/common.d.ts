
type headerState = {
    files: Array<string>
    current: number
}



interface MenuState extends FileData {
    view: viewType
    // index:number
}