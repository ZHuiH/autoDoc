/**
 * response
 */
type responseProps = {
    data: Array<ApiResponse>
}

/**
 * header
 */

type methodColor = {
    get: string,
    put: string,
    delete: string,
    post: string,
    other: string,
}

type headerProrps = {
    method: keyof methodColor,
    path: string
}

/**
 * param
 */
interface paramUnit extends ApiParam {
    key?: string
    children?: Array<paramUnit>//重写children
}
type paramProps = {
    data: Array<paramUnit>
}

/**
 * description
 */
type descriptionProps = {
    content: string
    version?: string
    author?: string
    auth?: Array<ApiAuth>
}

/**
 * mock
 */
type mockProps = {
    params: Array<ApiParam>
    path: string
    method: Method
}

type mockState = {
    editType: '1' | '2' | '3'
    jsonData: string
    form: Array<any>
    response: any
}
