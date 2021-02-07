import { Case } from "@/api/types/models";
import { Module } from "vuex";
import { MissionState, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";
import {
  requestAcceptCase,
  requestGetMyCases,
  requestGetMyUncheckedCases,
  requestRefuseCase,
} from "@/api/mission";

const Mission: Module<MissionState, RootState> = {
  state: {
    myMissions: [],
    myMissionIDs: new Set(),
    myUncheckedMissions: [],
    currentMission: {},
  },

  mutations: {
    [MutationTypes.SET_MY_MISSIONS]: (
      state,
      myMissions: typeof state.myMissions
    ) => {
      state.myMissions = myMissions;
      myMissions.map((item) => {
        if (item.id) {
          state.myMissionIDs.add(item.id);
        }
      });
      console.debug(state);
    },
    [MutationTypes.SET_MY_UNCHECKED_MISSIONS]: (
      state,
      myUncheckedMissions: typeof state.myUncheckedMissions
    ) => {
      state.myUncheckedMissions = myUncheckedMissions;
      console.debug(state);
    },
    [MutationTypes.SET_CURRENT_MISSION]: (
      state,
      currentMission: typeof state.currentMission
    ) => {
      state.currentMission = currentMission;
      console.debug(state);
    },
  },

  actions: {
    [ActionTypes.getMyMissions]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetMyCases();
          if (res.data.data) {
            commit(MutationTypes.SET_MY_MISSIONS, res.data.data);
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    [ActionTypes.getMyUncheckedMissions]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetMyUncheckedCases();
          if (res.data.data) {
            commit(MutationTypes.SET_MY_UNCHECKED_MISSIONS, res.data.data);
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    [ActionTypes.acceptMission]: (
      { dispatch },
      params: { item: Case; equipment: 1 | 2; traffic: string }
    ) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          if (!params.item.id) return;

          await requestAcceptCase({
            caseId: params.item.id,
            equipment: params.equipment,
            traffic: params.traffic,
          });
          // 刷新案件列表
          await Promise.all([
            dispatch(ActionTypes.getMyUncheckedMissions),
            dispatch(ActionTypes.getMyMissions),
          ]);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    [ActionTypes.refuseMission]: ({ dispatch }, params: { item: Case }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          if (!params.item.id) return;

          await requestRefuseCase({
            caseId: params.item.id,
          });
          // 刷新案件列表
          await Promise.all([
            dispatch(ActionTypes.getMyUncheckedMissions),
            dispatch(ActionTypes.getMyMissions),
          ]);
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
  },

  getters: {
    myMissions: (state) => state.myMissions,
    myUncheckedMissions: (state) => state.myUncheckedMissions,
    currentMission: (state) => state.currentMission,
  },
};

export default Mission;
