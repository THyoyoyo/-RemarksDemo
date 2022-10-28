export interface RemarkItemVo {
    date: string,
    content: string,
    timeEnd: string,
    state: number,

}


export interface RemarkForm {
    content: string,
    timeEnd: string
}


export interface ChangeStateVo {
    state: number,
    key: number
}