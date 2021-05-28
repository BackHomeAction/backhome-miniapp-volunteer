import { Module } from "vuex";
import { LocationState, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";

const Location: Module<LocationState, RootState> = {
  state: {
    location: {
      latitude: 0,
      longitude: 0,
    },
    record: {
      isRecording: true,
    },
  },

  mutations: {
    [MutationTypes.SET_LOCATION]: (state, location: typeof state.location) => {
      state.location = location;
      console.debug(state);
    },
    [MutationTypes.SET_PATH_RECORDING]: (state, isRecording: boolean) => {
      state.record.isRecording = isRecording;
      console.debug(state);
    },
  },

  actions: {},

  getters: {
    location: (state) => state.location,
    isRecordingPath: (state) => state.record.isRecording,
  },
};

export default Location;
