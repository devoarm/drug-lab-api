export interface drugVnFromHosType {
  drug_name: string
  units: string
  strength: string
  unitprice: number
  id: string
  icode: string
  qty: number
  drugusage: string
  vstdate: string
  vsttime: string
  rxtime: string
  hcode: string
  dep_code: string
  pttype: string
  staff: string
  item_no: number
  sum_price: number
  cost: number
  index: number
  stale?: number
}

export interface PatientType {
  fullname: string
  hos_guid: string
  vn: string
  hn: string
  vstdate: string
  pttype: string
  cid: string
  department: string
}
export interface VnType {
  vn: string
  vstdate: string
}

export interface DrugBackLogsAddType {
  fullname: String
  hn: String
  cid: String
  vn: String
  vstdate: String
  opitemrece: drugVnFromHosType[]
}
