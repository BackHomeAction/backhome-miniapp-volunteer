<template>
  <view class="map">
    <map
      id="map"
      class="map__content"
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
    </view>

    <place-info-modal
      v-model:value="showPlaceInfoModal"
      :place-data="placeInfoData"
    />
  </view>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import mapSettings from "@/config/map";
import { searchPlacesNearby } from "@/api/tencentMap";
import PlaceInfoModal from "./components/PlaceInfoModal/index.vue";

const POLICE_STATION_SIZE = 30;

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
          iconPath: "/static/images/map/police_station.png",
          width: POLICE_STATION_SIZE,
          height: POLICE_STATION_SIZE,
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

export default defineComponent({
  components: {
    PlaceInfoModal,
  },
  setup() {
    return { ...useMap(), mapSettings };
  },
  // onReady() {
  //   uni.getLocation({
  //     type: "gcj02",
  //     altitude: true,
  //     success: (data) => {
  //       console.log(data);
  //       mapContent.moveToLocation({
  //         longitude: data.longitude,
  //         latitude: data.latitude,
  //       });
  //     },
  //   });
  // },
});
</script>

<style lang="scss" scoped>
.map {
  width: 750rpx;
  height: 100vh;
  position: absolute;

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
</style>
