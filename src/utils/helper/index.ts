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
  icon: "success" | "loading" | "none" | undefined = "none"
) => {
  uni.showToast({ title, icon });
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
