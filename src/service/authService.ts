import { requestLogin } from "@/api/user";

const login = async (code: string) => {
  try {
    const res = await requestLogin({ code });
    uni.setStorageSync("token", res.data.token);
    uni.setStorageSync("refresh_token", res.data.refreshToken);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export default { login };
