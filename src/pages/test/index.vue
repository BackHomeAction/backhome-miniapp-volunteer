<template>
  <view>
    <OldManSelector
      :mans="oldManList"
      @selected="handleManSelected"
    />
    <map
      id="map"
      class="map"
      :height="mapHeight"
      enable-3D
      enable-traffic
      show-location
      show-scale
      :subkey="mapSettings.key"
      :circles="testCircles"
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
      <view
        class="map-action-button"
        @click="handleTestOldManList(1)"
      >
        1
      </view>
      <view
        class="map-action-button"
        @click="handleTestOldManList(2)"
      >
        2
      </view>
      <view
        class="map-action-button"
        @click="handleTestOldManList(3)"
      >
        3
      </view>
    </view>

    <place-info-modal
      v-model:value="showPlaceInfoModal"
      :place-data="placeInfoData"
    />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from "vue";
import { navigateBack, showToast } from "@/utils/helper";
import OldManSelector from "./components/OldManSelector/index.vue";
import mapSettings from "@/config/map";
import { searchPlacesNearby } from "@/api/tencentMap";
import PlaceInfoModal from "./components/PlaceInfoModal/index.vue";

const testCircles = [
  {
    latitude: 39.065677,
    longitude: 117.111806,
    radius: 1000,
    strokeWidth: 2,
    color: "#0099ff",
    fillColor: "#00448025",
  },
];

// const testMarkers = [
//   {
//     id: 1,
//     latitude: 39.065677,
//     longitude: 117.111806,
//     title: "天津工业大学",
//     zIndex: "1",
//     iconPath: "/static/images/heart.png",
//     width: 40,
//     height: 40,
//     anchor: {
//       x: 0.5,
//       y: 1,
//     },
//     callout: {
//       content: "天津工业大学",
//       color: "#000000",
//       fontSize: 12,
//       borderRadius: 2,
//       bgColor: "#ffffff",
//       padding: 5,
//       display: "ALWAYS",
//     },
//   },
// ];

let mapContent: any;

const useMap = () => {
  mapContent = uni.createMapContext("map");

  const markers: Ref<any[]> = ref([]);

  const handleMapUpdated = async () => {
    console.info("map updated");
  };

  const handleBackToCurrentPosition = () => {
    mapContent.moveToLocation();
  };

  const handleTestPosition = () => {
    mapContent.moveToLocation({
      longitude: 117.111806,
      latitude: 39.065677,
    });
  };

  let policeStations: Array<any> = [];

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
      policeStations = res.data.data;
      markers.value = policeStations.map((ele: any, index) => {
        return {
          id: index,
          latitude: ele.location.lat,
          longitude: ele.location.lng,
          title: ele.title,
          zIndex: "1",
          iconPath: "/static/images/police_station.png",
          width: 30,
          height: 30,
          anchor: {
            x: 0.5,
            y: 1,
          },
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegionChange = (e: any) => {
    console.log(e);
    if (e.type === "end") {
      searchPoliceStationsNearby(
        e.detail.centerLocation.latitude,
        e.detail.centerLocation.longitude
      );
    }
  };

  const showPlaceInfoModal = ref(false);
  const placeInfoData = ref(null);

  const handleMarkerClick = (e: any) => {
    placeInfoData.value = policeStations[e.detail.markerId];
    console.log(placeInfoData.value);
    showPlaceInfoModal.value = true;
  };

  return {
    handleMapUpdated,
    handleBackToCurrentPosition,
    handleTestPosition,
    testCircles,
    markers,
    handleRegionChange,
    handleMarkerClick,
    showPlaceInfoModal,
    placeInfoData,
  };
};

const useOldManSelector = () => {
  const testOldManList = [
    {
      id: 1,
      name: "张正和",
      lostTime: "2021-01-16 12:50",
      avatarUrl: "https://i.loli.net/2021/01/16/fcbt465A31HeiMP.png",
    },
    {
      id: 2,
      name: "王德美",
      lostTime: "2021-01-15 23:50",
      avatarUrl: "https://i.loli.net/2021/01/16/7QL6jkX9IacSl4M.png",
    },
    {
      id: 3,
      name: "赵肖云",
      lostTime: "2021-01-16 22:39",
      avatarUrl: "https://i.loli.net/2021/01/16/o6n3zEFtwOKsBQ5.jpg",
    },
  ];

  const oldManList = reactive(testOldManList.slice(0));

  const handleManSelected = (man: any) => {
    showToast(`选中：${man.name}`);
  };

  const handleTestOldManList = (num: number) => {
    oldManList.splice(0, oldManList.length);
    testOldManList.slice(0, num).forEach((ele) => {
      oldManList.push(ele);
    });
    console.log(oldManList);
  };

  return { oldManList, handleManSelected, handleTestOldManList };
};

export default defineComponent({
  components: {
    OldManSelector,
    PlaceInfoModal,
  },
  setup() {
    uni.authorize({
      scope: "scope.userLocation",
      fail() {
        navigateBack();
      },
    });

    return { ...useMap(), ...useOldManSelector(), mapSettings };
  },
  onReady() {
    uni.getLocation({
      type: "gcj02",
      altitude: true,
      success: (data) => {
        console.log(data);
        mapContent.moveToLocation({
          longitude: data.longitude,
          latitude: data.latitude,
        });
      },
    });
  },
});
</script>

<style lang="scss" scoped>
#map {
  width: 750rpx;
  height: 100vh;
  position: absolute;
}

.map {
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
</style>
