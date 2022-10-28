import moment from "moment"


export function getNowDate(dayNum?: number): string {

    if (dayNum) {
        return moment(new Date().getTime() + (1000 * 60 * 60 * 24 * dayNum)).format("YYYY-MM-DD HH:mm:ss")
    }
    return moment().format("YYYY-MM-DD HH:mm:ss")
}