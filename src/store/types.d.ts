export interface RootState {
  version?: string;
}

export interface UserState {
  logged: boolean;
  hasUserInfo: boolean;
  userinfo?: null | {
    address?: string; // 详细地址
    city?: string; // 城市
    country?: string; // 国家
    district?: string; // 区
    id?: number; // ID
    idcard?: string;
    name?: string; // 姓名
    province?: string; // 省份
    sex?: number; // 性别
    volunteerId?: number;
  }
}
