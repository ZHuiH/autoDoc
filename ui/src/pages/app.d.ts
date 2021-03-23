
/**
 * index
 */
interface homeState extends FileDataContent {
    title: string
    version: string
    view: viewType
    cancel: () => void
}

/**
 * code
 */
type codeState = {
    data: Array<ApiCode>
    cancel: () => void
}