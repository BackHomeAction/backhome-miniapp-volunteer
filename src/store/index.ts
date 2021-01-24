import { createStore } from "vuex";

import user from "./modules/user";
import avatarCropper from "./modules/avatarCropper";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    avatarCropper,
  },
});
