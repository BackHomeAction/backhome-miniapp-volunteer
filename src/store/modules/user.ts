import { Module } from "vuex";
import { UserState, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";

const user: Module<UserState, RootState> = {
  state: {
    logged: false,
    hasUserInfo: false,
  },

  mutations: {
    [MutationTypes.SET_LOGIN]: (state, logged) => {
      state.logged = logged;
      console.log(state);
    },
  },

  actions: {},

  getters: {
    logged: (state) => state.logged,
    hasUserInfo: (state) => state.hasUserInfo,
  },
};

export default user;
