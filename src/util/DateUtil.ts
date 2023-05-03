import moment from "moment"

export function ADateNow():string{
    return `${moment().format('YYYY-MM-DD')}`
}
export const ATimeNow = () =>{
    return moment().format('HH:MM:SS')
}