export interface ReqParams {
  username: string;
  password: string;
}

export interface ReqAuth {
  auths: string[];
  modules: string[];
  is_admin?: 0 | 1;
}

export interface ResResult {
  data?: ResResultData;
  status: string | '';
  headers: object;
}
export interface ResResultData {
  code: number;
  data: any;
  msg: string;
}

/**
 * 用户查询参数
 */
export interface UserQuery extends PageQuery {
  searchValue: string;
}

/**
 * 用户分页列表项声明
 */
export interface UserType {
  id: string;
  name: string;
  idCard: string;
  phoneNumber: string;
  companyName: string;
  isLegalPerson: string;
  city: string;
  maritalStatus: string;
  annualIncome: string;
}
