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
      subkey="PV7BZ-COYWP-LJKDK-V7W7V-OZQES-GYFWI"
      :circles="testCircles"
      :markers="testMarkers"
      @updated="handleMapUpdated"
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
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { navigateBack, showToast } from "@/utils/helper";
import OldManSelector from "./components/OldManSelector/index.vue";

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

const testMarkers = [
  {
    id: 1,
    latitude: 39.065677,
    longitude: 117.111806,
    title: "天津工业大学",
    zIndex: "1",
    iconPath: "/static/images/heart.png",
    width: 40,
    height: 40,
    anchor: {
      x: 0.5,
      y: 1,
    },
    callout: {
      content: "天津工业大学",
      color: "#000000",
      fontSize: 12,
      borderRadius: 2,
      bgColor: "#ffffff",
      padding: 5,
      display: "ALWAYS",
    },
  },
];

let mapContent: any;

const useMap = () => {
  mapContent = uni.createMapContext("map");

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

  return {
    handleMapUpdated,
    handleBackToCurrentPosition,
    handleTestPosition,
    testCircles,
    testMarkers,
  };
};

const useOldManSelector = () => {
  const oldManList = reactive([
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
  ]);

  const handleManSelected = (man: any) => {
    showToast(`选中：${man.name}`);
  };

  return { oldManList, handleManSelected };
};

export default defineComponent({
  components: {
    OldManSelector,
  },
  setup() {
    uni.authorize({
      scope: "scope.userLocation",
      fail() {
        navigateBack();
      },
    });
    return { ...useMap(), ...useOldManSelector() };
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
    bottom: 50rpx;
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
