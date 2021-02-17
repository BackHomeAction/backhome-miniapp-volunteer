import store from "@/store";
import tim from "@/utils/tim";
import TIM from "tim-wx-sdk";

export const sendGroupTextMessage = async (caseId: number, text: string) => {
  const message = tim.createTextMessage({
    to: store.getters.tim.groupIDsMap.get(`case_${caseId}`),
    conversationType: TIM.TYPES.CONV_GROUP,
    payload: {
      text,
    },
  });
  await tim.sendMessage(message);
};

export const sendGroupImageMessage = async (caseId: number) => {
  uni.chooseImage({
    count: 1,
    success: async (file) => {
      const message = tim.createImageMessage({
        to: store.getters.tim.groupIDsMap.get(`case_${caseId}`),
        conversationType: TIM.TYPES.CONV_GROUP,
        payload: {
          file,
        },
      });
      await tim.sendMessage(message);
    },
  });
};
