
export interface UserLoginDetail {
  username: string,
  password: string
}

export interface CreateCompany {
  name: string;
  email: string;
  location: string;
  phoneNumber: string;
}

export interface ShowCompany {
  id: number;
  name: string;
  email: string;
  location: string;
  isActive?: boolean;
  phoneNumber: string;
  dateAdded: Date;
  addedBy? : string;
  orders? : string;
  account? : string;
}

export interface CreateRole {
  name: string;
  descriptions: string;
}

export interface ShowRole {
  id: number;
  name: string;
  description: string;
  dateAdded: Date;
}

export interface UserRole {
  user_id: number;
  role_id: number;
  role?: string;
  user?: string;
}

export interface CreateUser {
  fullName: string;
  email: string;
  password: string;
  companyId?: number;
}

export interface ShowUser {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  dateCreated: Date;
  isActive?: boolean;
  companyId?: number;
}

export interface CreateFood {
  id?:number
  name: string;
  ingredients: string;
  price: string;
  addedBy?: string;
  imagePath: File;
}


export interface ShowFood {
  id: number;
  name: string;
  ingredients: string;
  dateAdded: Date;
  price: number;
  addedBy: number;
  imagePath?: string;
}

export interface CreateOrder {
  foodId: number;
  totalNumber: number;
}

export interface ShowOrder {
  id: number;
  orderDate: Date;
  foodId: number;
  companyId: number;
  cost: number;
  totalNumber: number;
  riderId: number;
  userId: number;
  destination: string
  trackingStage: string;
  riderowner?: number;
  companyowner?: number;
  foods?: string;
}

export interface ShowFeedback {
  id:number;
  foodId: number;
  comment: string;
  stars: number;
  dateCommented: Date;
  commentedBy: number;
  foods?: string;
  cooment_by?: string;
}

export interface CreateRider {
  name: string;
  email: string;
  motorNumber: string;
  tellNumber: string;
}

export interface ShowRider {
  id:number;
  name: string;
  email: string;
  motorNumber: string;
  tellNumber: string;
  dateAdded: Date;
  addedBy: number;
  orders?: string;
  add_by?: string;
}

export interface CreatPayment {
  companyId: number;
  totalCost: number;
  amountPaid: number;
  balance: number;
  modifyBy: number;
  paymentType: string;
  paidBy: string;
  transactionId: string;
}

export interface ShowPayment {
  id: number;
  companyId: number;
  totalCost: number;
  amountPaid: number;
  balance: number;
  modifyBy: number;
  paymentType: string;
  paidBy: string;
  transactionId: string;
  datePaid: Date;
  company?: string;
}

export interface ShowCost{
  id: number;
  companyId: number;
  totalCost: number;
  company?: string;
  generatedBy: number;
  dateGenerated: Date;
}



export interface CreateAdmin {
  fullName: string;
  email: string;
  password: string;
}

export interface ShowAdmin {
  id:number;
  fullName: string;
  email: string;
  password?: string;
  isActive?: boolean;
}

export interface UserRole {
  user_id: number;
  role_id: number;
}


export enum UserRoleActions {
  'update'= 'Update',
  'create' = 'Create',
  'delete' = 'Delete'
}

export enum UploadStatus {
  Ready = 'Ready',
  Requested = 'Requested',
  Started = 'Started',
  Failed = 'Failed',
  Completed = 'Completed'
}

export interface PasswordRecover {
  token: string;
  new_password: string;
}

