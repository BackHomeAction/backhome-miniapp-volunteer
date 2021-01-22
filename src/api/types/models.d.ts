/* eslint-disable */
// @ts-nocheck
// generated by free-swagger-client

export type JavaMap<T, U> = Record<string, U>;

export type JavaList<T> = Array<T>;
export interface ResponseData<T> {
  data?: T; // 返回数据
  message?: string; // 状态信息
  refreshToken?: string; // refreshToken
  state?: number; // 状态码
  token?: string; // accessToken
}
export interface Admin {
  city?: string; // 管理员管辖区所在市
  district?: string; // 管理员管辖区
  id?: number; // 管理员ID
  password?: string;
  province?: string; // 管理员管辖区所在省
  role?: string; // 管理员角色
  roleId?: number; // 管理员角色ID
  userName?: string;
}
export interface BindVolunteerInformation {
  IDCard?: string; // 身份证号
  name?: string; // 姓名
}
export interface Family {
  avatarUrl?: string; // 头像
  city?: string; // 城市
  country?: string; // 国家
  id?: number; // 家属ID
  name?: string; // 姓名
  nickName?: string; // 昵称
  phone?: string; // 手机号
  province?: string; // 省份
  sex?: number; // 性别
  state?: number; // 账号状态
}
export interface FamilyAvatarUrl {
  avatarUrl?: string; // 头像链接
}
export interface FamilyInformation {
  code?: string; // 短信验证码
  name?: string; // 姓名
  phone?: string; // 手机号
}
export interface FamilyLoginCode {
  code?: string; // 从微信获取的code
}
export interface FamilyRefreshToken {
  refreshToken?: string; // refreshToken
}
export interface FamilyUserinfo {
  encryptedData?: string; // 加密字符串
  iv?: string; // 从微信获取的iv
}
export interface Volunteer {
  avatarUrl?: string; // 头像
  id?: number; // 志愿者ID
  nickName?: string; // 昵称
  phone?: string; // 手机号
  state?: number; // 用户状态
  volunteerInformation?: VolunteerInformation; // 志愿者信息
}
export interface VolunteerAvatarUrl {
  avatarUrl?: string; // 头像链接
}
export interface VolunteerBindPhone {
  code?: string; // 验证码
  phone?: string; // 手机号
}
export interface VolunteerInformation {
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
export interface VolunteerLoginCode {
  code?: string; // 从微信获取的code
}
export interface VolunteerRefreshToken {
  refreshToken?: string; // refreshToken
}
export interface volunteerUserInfo {
  encryptedData?: string; // 加密字符串
  iv?: string; // 从微信获取的iv
}
export interface zzzzzzzzzzzzzzz {
  encryptedData?: string; // 加密字符串
  iv?: string; // 从微信获取的iv
}
