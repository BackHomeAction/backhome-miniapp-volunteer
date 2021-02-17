import { Module } from "vuex";
import { TimState, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";
import dayjs from "@/utils/dayjs";

function formatTime(date: string | Date) {
  if (dayjs(date).isToday()) {
    return dayjs(date)
      .format("A HH:mm")
      .replace("PM", "下午")
      .replace("AM", "上午");
  }
  return dayjs(date).format("MM-YY");
}

const Tim: Module<TimState, RootState> = {
  state: {
    isSdkReady: false, // TIM SDK 初始化状态
    myInfo: {}, // 个人信息
    allConversation: [], // 所有的conversation
    currentConversationID: "", // 当前聊天对话ID
    currentConversation: {}, // 当前聊天对话信息
    currentMessageList: [], // 当前聊天消息列表
    nextReqMessageID: "", // 下一条消息标志
    isCompleted: false, // 当前会话消息是否已经请求完毕
    isLoading: false, // 是否正在请求
    groupIDsMap: new Map(), // 群名 -> 群 ID 的 Map
  },

  mutations: {
    [MutationTypes.SET_TIM_SDK_READY]: (state, payload) => {
      state.isSdkReady = payload;
      console.debug("TIM state:", state);
    },
    [MutationTypes.SET_TIM_MY_INFO]: (state, payload) => {
      state.myInfo = payload;
      console.debug("TIM state:", state);
    },
    [MutationTypes.SET_TIM_MY_GROUPS]: (state, payload) => {
      payload.map((item: any) => {
        state.groupIDsMap.set(item.name, item.groupID);
      });
      state.myInfo = payload;
      console.debug("TIM state:", state);
    },
    [MutationTypes.SET_TIM_ALL_CONVERSATION]: (state, list) => {
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].lastMessage &&
          typeof list[i].lastMessage.lastTime === "number"
        ) {
          let date = new Date(list[i].lastMessage.lastTime * 1000);
          list[i].lastMessage._lastTime = formatTime(date);
        }
      }
      state.allConversation = list;
    },
  },

  actions: {},

  getters: {
    tim: (state) => state,
  },
};

export default Tim;
