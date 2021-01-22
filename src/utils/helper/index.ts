export const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
  });
};

export const navigateBack = (delta: number = 1) => {
  uni.navigateBack({ delta });
};

export const showToast = (
  title: string,
  icon: "success" | "loading" | "none" | undefined = "none",
  duration = 1
) => {
  uni.showToast({ title, icon, duration: duration * 1000 });
};

export const switchTab = (url: string) => {
  uni.switchTab({
    url,
  });
};

export const showModalError = (content = "未知错误") => {
  uni.showModal({
    title: "错误",
    content,
    showCancel: false,
  });
};

export const showLoading = (title = "加载中") => {
  uni.showLoading({
    title,
  });
};

export const hideLoading = () => {
  uni.hideLoading();
};
