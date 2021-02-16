import { Module } from "vuex";
import { TimState, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";

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
  },

  actions: {},

  getters: {
    tim: (state) => state,
  },
};

export default Tim;
