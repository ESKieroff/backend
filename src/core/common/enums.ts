/* eslint-disable @typescript-eslint/no-unused-vars */
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum Role {
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  PUBLIC = 'PUBLIC',
  ERP = 'ERP',
  API = 'API',
  SYSTEM = 'SYSTEM',
  ANONYMOUS = 'ANONYMOUS'
}

export enum Person_Type {
  COSTUMER = 'COSTUMER',
  SUPPLIER = 'SUPPLIER'
}

export enum Origin {
  RAW_MATERIAL = 'RAW_MATERIAL',
  MADE = 'MADE'
}

enum Price_Type {
  COST = 'COST',
  SALE = 'SALE'
}

export enum Production_Status {
  CREATED = 'CREATED',
  SCHEDULED = 'SCHEDULED',
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  STOPPED = 'STOPPED',
  CANCELED = 'CANCELED'
}

enum Stock_Moviment {
  INPUT = 'INPUT',
  TRANSIT = 'TRANSIT',
  OUTPUT = 'OUTPUT'
}

export enum Unit_Measure {
  UN = 'UN',
  KG = 'KG',
  L = 'L',
  GR = 'GR',
  ML = 'ML',
  PC = 'PC'
}
