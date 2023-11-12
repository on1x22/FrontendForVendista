export class Root {
  page_number!: number
  items_per_page!: number
  items_count!: number
  items!: Item[]
  success!: boolean
}

export class Item {
  id!: number
  name!: string
  parameter_name1!: string
  parameter_name2!: string
  parameter_name3!: string
  parameter_name4!: string
  parameter_name5: any
  parameter_name6: any
  parameter_name7: any
  parameter_name8: any
  str_parameter_name1?: string
  str_parameter_name2?: string
  parameter_default_value1!: number
  parameter_default_value2!: number
  parameter_default_value3!: number
  parameter_default_value4!: number
  parameter_default_value5: any
  parameter_default_value6: any
  parameter_default_value7: any
  parameter_default_value8: any
  str_parameter_default_value1?: string
  str_parameter_default_value2?: string
  visible!: boolean
}
