import { Case } from "@/api/types/models";
import { Module } from "vuex";
import { IPathRecord, MissionState, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";
import {
  requestAcceptCase,
  requestGetCases,
  requestGetFaceIdentificationRecords,
  requestGetMyCases,
  requestGetMyUncheckedCases,
  requestGetTrace,
  requestGetVolunteerCases,
  requestGetVolunteersInCase,
  requestRefuseCase,
} from "@/api/mission";
import simplify from "simplify-js";

const SIMPLIFY_TOLERANCE = 0.00001;

const Mission: Module<MissionState, RootState> = {
  state: {
    myMissions: [],
    myMissionIDs: new Set(),
    myUncheckedMissions: [],
    myAllMissions: [],
    currentMission: {
      missionInfo: null,
      teamMembers: [],
      onlineTeamMembers: [],
      faceRecognitionHistory: [],
      paths: new Map(),
    },
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
    [MutationTypes.SET_MY_ALL_MISSIONS]: (
      state,
      myAllMissions: typeof state.myAllMissions
    ) => {
      state.myAllMissions = myAllMissions;
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
    [MutationTypes.SET_CURRENT_MISSION_INFO]: (
      state,
      currentMissionInfo: typeof state.currentMission.missionInfo
    ) => {
      state.currentMission.missionInfo = currentMissionInfo;
      console.debug(state);
    },
    [MutationTypes.SET_CURRENT_MISSION_MEMBERS]: (
      state,
      currentMissionMembers: typeof state.currentMission.teamMembers
    ) => {
      state.currentMission.teamMembers = currentMissionMembers;
      state.currentMission.onlineTeamMembers = currentMissionMembers.filter(
        (item) => item?.online === 1
      );
      console.debug(state);
    },
    [MutationTypes.UPDATE_MISSION_VOLUNTEER_LOCATION]: (
      state,
      params: { volunteerId: number; latitude: number; longitude: number }
    ) => {
      // 更新 teamMembers
      const index1 = state.currentMission.teamMembers.findIndex(
        (item) => item.id === params.volunteerId
      );
      if (index1 >= 0) {
        state.currentMission.teamMembers[index1].latitude = params.latitude;
        state.currentMission.teamMembers[index1].longitude = params.longitude;
        state.currentMission.teamMembers[index1].online = 1;
        // 更新 onlineTeamMembers
        const index2 = state.currentMission.onlineTeamMembers.findIndex(
          (item) => item.id === params.volunteerId
        );
        if (index2 >= 0) {
          state.currentMission.onlineTeamMembers[index2].latitude =
            params.latitude;
          state.currentMission.onlineTeamMembers[index2].longitude =
            params.longitude;
          state.currentMission.onlineTeamMembers[index2].online = 1;
        } else {
          // 如果没在 onlineTeamMembers 里找到，说明这个志愿者是新上线的，需要把他加入 onlineTeamMembers 中
          state.currentMission.onlineTeamMembers.push(
            state.currentMission.teamMembers[index1]
          );
        }
      }
      console.debug(state);
    },
    [MutationTypes.UPDATE_MISSION_VOLUNTEER_OFFLINE]: (
      state,
      volunteerId: number
    ) => {
      // 更新 teamMembers
      const index1 = state.currentMission.teamMembers.findIndex(
        (item) => item.id === volunteerId
      );
      if (index1 >= 0) {
        state.currentMission.teamMembers[index1].latitude = 0;
        state.currentMission.teamMembers[index1].longitude = 0;
        state.currentMission.teamMembers[index1].online = 2;
        // 更新 onlineTeamMembers
        const index2 = state.currentMission.onlineTeamMembers.findIndex(
          (item) => item.id === volunteerId
        );
        if (index2 >= 0) {
          state.currentMission.onlineTeamMembers.splice(index2);
        }
      }
      console.debug(state);
    },
    [MutationTypes.SET_FACE_RECOGNITION_HISTORY]: (
      state,
      faceRecognitionHistory: typeof state.currentMission.faceRecognitionHistory
    ) => {
      state.currentMission.faceRecognitionHistory = faceRecognitionHistory;
      console.debug(state);
    },
    [MutationTypes.SET_CURRENT_MISSION_PATH]: (
      state,
      data: Array<{
        caseId: number;
        nowCase: number;
        trackPoints: Array<IPathRecord>;
        volunteerId: number;
      }>
    ) => {
      state.currentMission.paths.clear();
      data.map((ele) => {
        // 对路径进行压缩
        const arr = simplify(
          ele.trackPoints.map((p) => {
            return { x: p.longitude, y: p.latitude };
          }),
          SIMPLIFY_TOLERANCE
        );
        state.currentMission.paths.set(
          ele.volunteerId,
          arr.map((p) => {
            return { longitude: p.x, latitude: p.y };
          })
        );
      });
      console.debug(state);
    },
    [MutationTypes.UPDATE_CURRENT_MISSION_PATH]: (
      state,
      paths: Array<IPathRecord>
    ) => {
      // 找出数组中存在的 id
      const volunteerIds: Array<number> = [];
      paths.map((path) => {
        if (volunteerIds.indexOf(path.volunteerId) !== -1) {
          volunteerIds.push(path.volunteerId);
        }
      });
      const tempMap: Map<number, Array<any>> = new Map();
      // 将对应 id 的数据写入临时数组并进行压缩
      paths.map((path) => {
        if (tempMap.has(path.volunteerId)) {
          tempMap.get(path.volunteerId)?.push(path);
        } else {
          tempMap.set(path.volunteerId, [path]);
        }
      });
      tempMap.forEach((paths, id) => {
        const arr = simplify(
          paths.map((p) => {
            return { x: p.longitude, y: p.latitude };
          }),
          SIMPLIFY_TOLERANCE
        );
        state.currentMission.paths.set(
          id,
          arr.map((p) => {
            return { longitude: p.x, latitude: p.y };
          })
        );
      });
      console.debug(state);
      // state.currentMission.paths = paths;
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
    [ActionTypes.getMyAllMissions]: ({ commit, rootState }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          if (!rootState.user.userInfo?.id) return;

          const res = await requestGetVolunteerCases({
            volunteerId: rootState.user.userInfo.id,
          });
          if (res.data.data) {
            commit(MutationTypes.SET_MY_ALL_MISSIONS, res.data.data);
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
    [ActionTypes.getCurrentMissionInfo]: (
      { commit },
      params: { id: number }
    ) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetCases({
            id: params.id,
          });
          if (res.data.data) {
            commit(MutationTypes.SET_CURRENT_MISSION_INFO, res.data.data[0]);
            resolve();
          } else {
            reject();
          }
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    [ActionTypes.getCurrentMissionMembers]: (
      { commit },
      params: { id: number }
    ) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetVolunteersInCase({
            caseId: params.id,
          });
          if (res.data.data) {
            commit(MutationTypes.SET_CURRENT_MISSION_MEMBERS, res.data.data);
            resolve();
          } else {
            reject();
          }
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    [ActionTypes.getCurrentMissionFaceRecognitionHistories]: (
      { commit },
      params: { oldManId: number }
    ) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetFaceIdentificationRecords({
            oldManId: params.oldManId,
          });
          if (res.data.data) {
            commit(MutationTypes.SET_FACE_RECOGNITION_HISTORY, res.data.data);
            resolve();
          } else {
            reject();
          }
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    [ActionTypes.clearCurrentMission]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          commit(MutationTypes.SET_CURRENT_MISSION, {
            missionInfo: null,
            teamMembers: [],
            onlineTeamMembers: [],
            faceRecognitionHistory: [],
            paths: new Map(),
          });
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
    [ActionTypes.getCurrentMissionPaths]: async (
      { commit },
      params: { id: number }
    ) => {
      const res = await requestGetTrace({
        caseId: params.id,
      });
      if (res.data.data) {
        console.log(res.data.data);
        commit(MutationTypes.SET_CURRENT_MISSION_PATH, res.data.data);
      }
    },
    [ActionTypes.initCurrentMission]: (
      { state, dispatch },
      params: { id: number }
    ) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          // 清空选中的案件信息
          await dispatch(ActionTypes.clearCurrentMission);
          // 获取选中的案件信息
          await Promise.all([
            dispatch(ActionTypes.getCurrentMissionInfo, params),
            dispatch(ActionTypes.getCurrentMissionMembers, params),
            dispatch(ActionTypes.getCurrentMissionPaths, params),
          ]);
          await dispatch(
            ActionTypes.getCurrentMissionFaceRecognitionHistories,
            { oldManId: state.currentMission.missionInfo?.oldMan?.id }
          );
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
    myMissionIDs: (state) => state.myMissionIDs,
    myUncheckedMissions: (state) => state.myUncheckedMissions,
    myAllMissions: (state) => state.myAllMissions,
    currentMission: (state) => state.currentMission,
  },
};

export default Mission;
