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
  keywords: string;
  status: number;
  deptId: number;
}

/**
 * 用户分页列表项声明
 */
export interface UserType {
  id: string;
  username: string;
  nickname: string;
  mobile: string;
  gender?: number;
  avatar: string;
  email: string | null;
  status: number;
  deptName: string | null;
  roleNames: string | null;
  createTime: string | null;
}
