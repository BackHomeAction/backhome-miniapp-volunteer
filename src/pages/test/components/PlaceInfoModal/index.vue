<template>
  <view class="modal">
    <s-popup
      v-model:value="showModal"
      custom-class="place-info-popup"
      position="bottom"
    >
      <view
        v-if="placeData"
        class="wrapper"
      >
        <view class="title">
          {{ placeData.title }}
        </view>
        <view class="address">
          <!-- TODO: 目前距离计算原点为地图中心点，后续需改成实时位置 -->
          距你 {{ (placeData._distance/1000).toFixed(2) }} 公里 <span class="divider">|</span> {{ placeData.address }}
        </view>
        <view
          v-if="placeData.tel && placeData.tel.length"
          class="phone"
          @click="makePhoneCall(placeData.tel)"
        >
          <uni-icons
            type="phone-filled"
            size="14"
            color="#999"
            class="phone-icon"
          />
          {{ placeData.tel }}
        </view>
        <view class="action">
          <button @click="handleClickRoutePlan">
            路线
          </button>
        </view>
      </view>
    </s-popup>
  </view>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import sPopup from "@/components/s-popup/index.vue";
import mapSettings from "@/config/map";

interface PlaceData {
  ad_info: {
    adcode: number;
    province: string;
    city: string;
    district: string;
  };
  address: string;
  category: string;
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  tel: string;
  title: string;
  type: number;
  _distance: number;
}

export default defineComponent({
  components: {
    sPopup,
  },
  props: {
    value: {
      type: Boolean,
      require: true,
      default: false,
    },
    placeData: {
      type: Object as PropType<PlaceData>,
      require: true,
      default: null,
    },
  },
  emits: ["input"],
  data() {
    return {
      showModal: false,
    };
  },
  watch: {
    value() {
      this.updateVisible();
    },
    showModal() {
      this.$emit("input", this.showModal);
    },
  },
  methods: {
    updateVisible() {
      this.showModal = this.value;
    },
    makePhoneCall(tel: string) {
      uni.makePhoneCall({
        phoneNumber: tel,
      });
    },
    handleClickRoutePlan() {
      let plugin = requirePlugin("routePlan");
      let key = mapSettings.key; //使用在腾讯位置服务申请的key
      let referer = mapSettings.appName; //调用插件的app的名称
      let endPoint = JSON.stringify({
        //终点
        name: this.placeData.title,
        latitude: this.placeData.location.lat,
        longitude: this.placeData.location.lng,
      });
      wx.navigateTo({
        url:
          "plugin://routePlan/index?key=" +
          key +
          "&referer=" +
          referer +
          "&endPoint=" +
          endPoint +
          `&themeColor=${mapSettings.color}` +
          "&navigation=1",
      });
    },
    // handleClickNavigation() {
    //   uni.openLocation({
    //     latitude: this.placeData.location.lat,
    //     longitude: this.placeData.location.lng,
    //     name: this.placeData.title,
    //     address: this.placeData.address,
    //   });
    // },
  },
  options: {
    styleIsolation: "shared",
  },
});
</script>

<style lang="scss" scoped>
.modal ::v-deep .s-popup-wrap {
  border-radius: 20rpx 20rpx 0 0;
}

.wrapper {
  $gap: ($uni-font-size-sm / 2);

  padding: 30rpx 30rpx 60rpx 30rpx;

  .title {
    font-size: $uni-font-size-lg;
    font-weight: $uni-font-weight-bold;
  }

  .address {
    margin-top: $gap;
    font-size: $uni-font-size-sm;
    font-weight: $uni-font-weight-thin;

    .divider {
      color: $uni-text-color-grey;
      margin: 0 $gap;
    }
  }

  .phone {
    margin-top: $gap;
    color: $uni-text-color-grey;
    font-size: $uni-font-size-sm;

    .phone-icon {
      margin-right: $gap;
    }
  }
}
</style>
