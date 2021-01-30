import { createStore } from "vuex";

import user from "./modules/user";
import avatarCropper from "./modules/avatarCropper";
import announcement from "./modules/announcement";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    avatarCropper,
    announcement,
  },
});
