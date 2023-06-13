export interface ReqFollowType {
  fullname: string
  hn: string
  cid: string
  visit: Visit[]
}

export interface Visit {
  opitemrece: Opitemrece[]
  vn: string
}

export interface Opitemrece {
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
}
