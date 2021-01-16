export const navigateTo = (url: string): void => {
  uni.navigateTo({
    url,
  });
};

export const navigateBack = (delta: number = 1): void => {
  uni.navigateBack({ delta });
};

export const showToast = (
  title: string,
  icon: "success" | "loading" | "none" | undefined = "none"
): void => {
  uni.showToast({ title, icon });
};
