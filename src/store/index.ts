import { createStore } from "vuex";

import user from "./modules/user";
import avatarCropper from "./modules/avatarCropper";
import announcement from "./modules/announcement";
import location from "./modules/location";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    avatarCropper,
    announcement,
    location,
  },
});
