<template>
  <view
    v-if="currentMissionInfo"
    class="map"
  >
    <tabs @select="handleTabClick" />
    
    <map
      id="map"
      class="map__content"
      enable-3D
      enable-traffic
      show-location
      show-scale
      :min-scale="12"
      :max-scale="18"
      :subkey="mapSettings.key"
      :circles="circles"
      :markers="markers"
      @updated="handleMapUpdated"
      @regionchange="handleRegionChange"
      @markertap="handleMarkerClick"
    />
    <view class="map-action">
      <view
        class="map-action-button"
        @click="handleBackToCurrentPosition"
      >
        B
      </view>
      <view
        class="map-action-button"
        @click="handleTestPosition"
      >
        T
      </view>
    </view>

    <place-info-modal
      v-model:value="showPlaceInfoModal"
      :place-data="placeInfoData"
    />

    <u-popup
      v-model:value="showPopup"
      mode="bottom"
      height="80%"
      :border-radius="20"
    >
      <view class="popup-wrapper safe-area-inset-bottom">
        <mission-information
          v-show="popupName === 'info'"
          :data="currentMissionInfo"
        />
        <chat
          v-show="popupName === 'chat'"
          :show="showPopup && popupName === 'chat'"
          :data="currentMissionInfo"
        />
        <face-recognition
          v-show="popupName === 'face'"
          :data="currentMissionInfo"
        />
      </view>
    </u-popup>
  </view>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
import mapSettings from "@/config/map";
import { searchPlacesNearby } from "@/api/tencentMap";
import PlaceInfoModal from "./components/PlaceInfoModal/index.vue";
import { IPlaceInfo } from "@/types/placeInfo";
import { useStore } from "vuex";
import { ICurrentMission } from "@/store/types";
import store from "@/store";
import { ActionTypes } from "@/enums/actionTypes";
import { navigateBack, showModal, showModalError } from "@/utils/helper";
import { Volunteer } from "@/api/types/models";
import { SocketStateTypes } from "@/enums/socketStateTypes";
import { MutationTypes } from "@/enums/mutationTypes";
import Tabs from "./components/Tabs/index.vue";
import UPopup from "@/components/UPopup/index.vue";
import MissionInformation from "@/components/MissionInformation/index.vue";
import FaceRecognition from "./components/FaceRecognition/index.vue";
import Chat from "./components/Chat/index.vue";
import { checkoutGroup, resetGroup } from "@/service/timService";

let mapContext: any;

const POLICE_STATION_MARKER_SIZE = 30;
const POLICE_STATION_MARKER_ID_START = 20000000;
const LOST_PLACE_MARKER_SIZE = 35;
const LOST_PLACE_MARKER_ID_START = 30000000;
const OFFEN_PLACE_MARKER_SIZE = 35;
const OFFEN_PLACE_MARKER_ID_START = 40000000;
const VOLUNTEER_MARKER_SIZE = 50;
const VOLUNTEER_MARKER_ID_START = 50000000;

const caseId = ref(0); // 案件 ID

const useMap = () => {
  const store = useStore();
  mapContext = uni.createMapContext("map");

  // 这个案件
  const currentMission: ComputedRef<ICurrentMission> = computed(() => {
    return store.getters.currentMission;
  });
  // 这个案件的案件信息
  const currentMissionInfo = computed(() => {
    return currentMission.value.missionInfo;
  });
  // 派出所位置
  const policeStations: Ref<Array<any>> = ref([]);
  // 老人常去地点
  const offenPlaces = computed(() => {
    return currentMissionInfo.value?.oldMan?.offerPlace
      ? JSON.parse(currentMissionInfo.value?.oldMan?.offerPlace)
      : [];
  });
  // 志愿者列表
  const volunteers: ComputedRef<Array<Volunteer>> = computed(() => {
    return currentMission.value.teamMembers;
  });
  // 在线志愿者列表
  const onlineVolunteers: ComputedRef<Array<Volunteer>> = computed(() => {
    return currentMission.value.onlineTeamMembers;
  });

  // 老人走失位置
  const lostPlace = computed(() => {
    return {
      name: currentMissionInfo.value?.place
        ? currentMissionInfo.value?.place
        : "",
      latitude: currentMissionInfo.value?.latitude
        ? currentMissionInfo.value?.latitude
        : 0,
      longitude: currentMissionInfo.value?.longitude
        ? currentMissionInfo.value?.longitude
        : 0,
      address: currentMissionInfo.value?.address
        ? currentMissionInfo.value?.address
        : "",
      province: currentMissionInfo.value?.province
        ? currentMissionInfo.value?.province
        : "",
      city: currentMissionInfo.value?.city
        ? currentMissionInfo.value?.city
        : "",
      district: currentMissionInfo.value?.district
        ? currentMissionInfo.value?.district
        : "",
    };
  });
  // 搜索圆域
  const circles = computed(() => {
    return [
      {
        latitude: lostPlace.value?.latitude,
        longitude: lostPlace.value?.longitude,
        radius: 5000,
        strokeWidth: 2,
        color: "#0099ff",
        fillColor: "#00448015",
      },
    ];
  });
  // 地图渲染事件
  const handleMapUpdated = async () => {
    console.info("map updated");
  };
  // 设置视野中心为自己的位置
  const handleBackToCurrentPosition = () => {
    mapContext.moveToLocation();
  };
  // 设置视野中心为走失位置
  const handleTestPosition = () => {
    mapContext.moveToLocation({
      longitude: lostPlace.value.longitude,
      latitude: lostPlace.value.latitude,
    });
  };
  // 搜索附近派出所
  const searchPoliceStationsNearby = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const res = await searchPlacesNearby({
        keyword: "派出所",
        latitude,
        longitude,
        radius: 5000,
      });
      policeStations.value = res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
  // 视野区域变化事件
  const handleRegionChange = (e: any) => {
    console.debug(e);
    if (e.type === "end") {
      searchPoliceStationsNearby(
        e.detail.centerLocation.latitude,
        e.detail.centerLocation.longitude
      );
    }
  };
  // 动态计算 markers
  const markers = computed(() => {
    let res: any[] = [];
    // 加入走失地点
    res = res.concat([
      {
        id: LOST_PLACE_MARKER_ID_START,
        latitude: lostPlace.value.latitude,
        longitude: lostPlace.value.longitude,
        title: lostPlace.value.name,
        zIndex: 100,
        iconPath: "/static/images/map/lost_place.png",
        width: LOST_PLACE_MARKER_SIZE,
        height: LOST_PLACE_MARKER_SIZE,
        anchor: {
          x: 0.5,
          y: 1,
        },
      },
    ]);
    // 加入派出所
    res = res.concat(
      policeStations.value.map((ele: any, index: number) => {
        return {
          id: POLICE_STATION_MARKER_ID_START + index,
          latitude: ele.location.lat,
          longitude: ele.location.lng,
          title: ele.title,
          zIndex: 1,
          iconPath: "/static/images/map/police_station.png",
          width: POLICE_STATION_MARKER_SIZE,
          height: POLICE_STATION_MARKER_SIZE,
          anchor: {
            x: 0.5,
            y: 1,
          },
        };
      })
    );
    // 加入老人常去地点
    res = res.concat(
      offenPlaces.value.map((ele: any, index: number) => {
        return {
          id: OFFEN_PLACE_MARKER_ID_START + index,
          latitude: ele.latitude,
          longitude: ele.longitude,
          title: ele.name,
          zIndex: 10,
          iconPath: "/static/images/map/offen_place.png",
          width: OFFEN_PLACE_MARKER_SIZE,
          height: OFFEN_PLACE_MARKER_SIZE,
          anchor: {
            x: 0.5,
            y: 1,
          },
        };
      })
    );
    // 加入志愿者
    res = res.concat(
      onlineVolunteers.value.map((ele, index: number) => {
        return {
          id: VOLUNTEER_MARKER_ID_START + index,
          latitude: ele.latitude,
          longitude: ele.longitude,
          title: ele.volunteerInformation?.name,
          zIndex: 5,
          iconPath: ele.avatarUrl
            ? `https://fwwb2020-fc-aliyun.tgucsdn.com/volunteer_avatar/get?url=${ele.avatarUrl}`
            : "",
          width: VOLUNTEER_MARKER_SIZE,
          height: VOLUNTEER_MARKER_SIZE,
          anchor: {
            x: 0.5,
            y: 1,
          },
        };
      })
    );
    console.debug(res);
    return res;
  });

  const showPlaceInfoModal = ref(false); // 是否展示地点信息弹框
  const placeInfoData: Ref<null | IPlaceInfo> = ref(null); // 地点信息数据
  // markar 点击事件
  const handleMarkerClick = (e: any) => {
    const markerId = e.detail.markerId;
    // 判断是否为派出所
    if (
      markerId >= POLICE_STATION_MARKER_ID_START &&
      markerId < POLICE_STATION_MARKER_ID_START + 10000000
    ) {
      const index = markerId % POLICE_STATION_MARKER_ID_START;
      const placeData = policeStations.value[index];
      placeInfoData.value = {
        address: placeData.address,
        location: {
          lat: placeData.location.lat,
          lng: placeData.location.lng,
        },
        tel: placeData.tel,
        title: placeData.title,
        type: "policeStation",
      };
      console.log(placeInfoData.value);
      showPlaceInfoModal.value = true;
    }
    // 判断是否为老人常去地点
    if (
      markerId >= OFFEN_PLACE_MARKER_ID_START &&
      markerId < OFFEN_PLACE_MARKER_ID_START + 10000000
    ) {
      const index = markerId % OFFEN_PLACE_MARKER_ID_START;
      const placeData = offenPlaces.value[index];
      placeInfoData.value = {
        address: placeData.address,
        location: {
          lat: placeData.latitude,
          lng: placeData.longitude,
        },
        title: placeData.name,
        type: "policeStation",
      };
      console.log(placeInfoData.value);
      showPlaceInfoModal.value = true;
    }
    // 判断是否为老人走失地点
    if (
      markerId >= LOST_PLACE_MARKER_ID_START &&
      markerId < LOST_PLACE_MARKER_ID_START + 10000000
    ) {
      const placeData = lostPlace.value;
      placeInfoData.value = {
        address: placeData.address,
        location: {
          lat: placeData.latitude,
          lng: placeData.longitude,
        },
        title: placeData.name,
        type: "lostPlace",
      };
      console.log(placeInfoData.value);
      showPlaceInfoModal.value = true;
    }
  };

  return {
    handleMapUpdated,
    handleBackToCurrentPosition,
    handleTestPosition,
    circles,
    markers,
    handleRegionChange,
    handleMarkerClick,
    showPlaceInfoModal,
    placeInfoData,
    currentMissionInfo,
  };
};

const usePopup = () => {
  const showPopup = ref(false);
  const popupName: Ref<"info" | "chat" | "face"> = ref("info");

  const handleTabClick = (name: "info" | "chat" | "face") => {
    popupName.value = name;
    showPopup.value = true;
  };

  return { showPopup, popupName, handleTabClick };
};

/**
 * 案件订阅回调处理
 *
 * @param {string} res
 * @memberof WebsocketService
 */
const newCaseInfoCallback = async (res: any) => {
  const data = JSON.parse(res.body);
  console.log("Websocket case subscription callback data:", data);
  if (data.status === SocketStateTypes.MISSION_INFO_CHANGED) {
    await store.dispatch(ActionTypes.initCurrentMission, {
      id: caseId.value,
    });
    showModal("提示", "案件信息发生变化，请您留意！");
  } else if (data.status === SocketStateTypes.VOLUNTEER_LOCATION_CHANGED) {
    store.commit(MutationTypes.UPDATE_MISSION_VOLUNTEER_LOCATION, data.data);
  } else if (data.status === SocketStateTypes.VOLUNTEER_OFFLINE) {
    store.commit(MutationTypes.UPDATE_MISSION_VOLUNTEER_OFFLINE, data.data);
  } else if (data.status === SocketStateTypes.MISSION_TIMEOUT) {
    showModal("提示", "案件已超时！");
    navigateBack();
  } else if (
    data.status === SocketStateTypes.VOLUNTEER_JOIN_MISSION ||
    data.status === SocketStateTypes.VOLUNTEER_QUIT_MISSION
  ) {
    await store.dispatch(ActionTypes.getCurrentMissionMembers, {
      id: caseId.value,
    });
  }
};

export default defineComponent({
  components: {
    PlaceInfoModal,
    Tabs,
    UPopup,
    MissionInformation,
    FaceRecognition,
    Chat,
  },
  setup() {
    return { ...useMap(), mapSettings, ...usePopup() };
  },
  onLoad(query: { id: string }) {
    caseId.value = parseInt(query.id, 10);
  },
  async onReady() {
    uni.showNavigationBarLoading();
    // 初始化 store 数据
    try {
      await store.dispatch(ActionTypes.initCurrentMission, {
        id: caseId.value,
      });
      // 设置视野中心为走失位置
      mapContext.moveToLocation({
        longitude: store.getters.currentMission.missionInfo.longitude,
        latitude: store.getters.currentMission.missionInfo.latitude,
      });
      // 启动 socket 订阅
      store.getters.ws.subscribe(`/case/${caseId.value}`, newCaseInfoCallback);
      // 切换当前 TIM 群组到该任务
      checkoutGroup(caseId.value);
    } catch (e) {
      console.log(e);
      showModalError("加载任务信息失败");
      navigateBack();
    }
    uni.hideNavigationBarLoading();
  },
  onUnload() {
    console.debug("map unload");
    store.dispatch(ActionTypes.clearCurrentMission);
    // 取消 socket 订阅
    store.getters.ws.unsubscribe(`/case/${caseId.value}`);
    // 重置当前 TIM 群组
    resetGroup();
  },
});
</script>

<style lang="scss" scoped>
.map {
  width: 750rpx;
  height: 100vh;
  position: relative;

  &__content {
    width: 750rpx;
    height: 100vh;
  }

  &-action {
    position: fixed;
    left: 50rpx;
    bottom: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &-button {
      width: 100rpx;
      height: 100rpx;
      background-color: #ffffff;
      border-radius: 100%;
      border: 2px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5rpx;
    }
  }
}

.popup-wrapper {
  padding-top: 30rpx;
}
</style>
