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
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import mapSettings from "@/config/map";
import { searchPlacesNearby } from "@/api/tencentMap";
import PlaceInfoModal from "./components/PlaceInfoModal/index.vue";
import { IPlaceInfo } from "@/types/placeInfo";

const POLICE_STATION_MARKER_SIZE = 30;
const POLICE_STATION_MARKER_ID_START = 20000000;
const LOST_PLACE_MARKER_SIZE = 35;
const LOST_PLACE_MARKER_ID_START = 30000000;
const OFFEN_PLACE_MARKER_SIZE = 35;
const OFFEN_PLACE_MARKER_ID_START = 40000000;

const testOffenPlacesString = `[{"name":"泉州市鲤城区人民政府","latitude":24.90776719,"longitude":118.586915069,"address":"福建省泉州市鲤城区庄府巷24","province":"福建省","city":"泉州市","district":"鲤城区"},
{"name":"泉州市第五中学(城东校区)-西南门","latitude":24.905981438,"longitude":118.649490641,"address":"福建省泉州市丰泽区毓才街北50米","province":"福建省","city":"泉州市","district":"丰泽区"},
{"name":"泉州实验中学圣湖校区","latitude":24.903847698,"longitude":118.615859839,"address":"福建省泉州市丰泽区圣湖路106号","province":"福建省","city":"泉州市","district":"丰泽区"}]`;

let mapContent: any;
const policeStations: Ref<Array<any>> = ref([]);
const offenPlaces: Ref<Array<any>> = ref(JSON.parse(testOffenPlacesString));
const lostPlace: Ref<any> = ref({
  name: "圣湖小区",
  latitude: 24.902521349,
  longitude: 118.616191184,
  address: "福建省泉州市丰泽区圣湖路与丰泽街交界口旁",
  province: "福建省",
  city: "泉州市",
  district: "丰泽区",
});
const circles: Ref<Array<any>> = ref([
  {
    latitude: 24.902521349,
    longitude: 118.616191184,
    radius: 5000,
    strokeWidth: 2,
    color: "#0099ff",
    fillColor: "#00448015",
  },
]);

const useMap = () => {
  mapContent = uni.createMapContext("map");

  const handleMapUpdated = async () => {
    console.info("map updated");
  };

  const handleBackToCurrentPosition = () => {
    mapContent.moveToLocation();
  };

  const handleTestPosition = () => {
    // 设置视野中心为走失位置
    mapContent.moveToLocation({
      longitude: lostPlace.value.longitude,
      latitude: lostPlace.value.latitude,
    });
  };

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

  const handleRegionChange = (e: any) => {
    console.debug(e);
    if (e.type === "end") {
      searchPoliceStationsNearby(
        e.detail.centerLocation.latitude,
        e.detail.centerLocation.longitude
      );
    }
  };

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
      policeStations.value.map((ele: any, index) => {
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
      offenPlaces.value.map((ele: any, index) => {
        return {
          id: OFFEN_PLACE_MARKER_ID_START + index,
          latitude: ele.latitude,
          longitude: ele.longitude,
          title: ele.name,
          zIndex: 2,
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
    console.debug(res);
    return res;
  });

  const showPlaceInfoModal = ref(false);
  const placeInfoData: Ref<null | IPlaceInfo> = ref(null);

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
  };
};

export default defineComponent({
  components: {
    PlaceInfoModal,
  },
  setup() {
    return { ...useMap(), mapSettings };
  },
  onReady() {
    // 初始化视野中心为走失位置
    mapContent.moveToLocation({
      longitude: lostPlace.value.longitude,
      latitude: lostPlace.value.latitude,
    });
  },
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
