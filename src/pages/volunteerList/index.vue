<template>
  <view> 
    <view class="head">
      <view class="first-text">
        救援队实时信息一览表
      </view>
      <view class="second-text">
        实名登记、尽职尽责
      </view>
    </view>
    <view class="table">
      <view class="table-row">
        <picker
          mode="region"
          :value="addressArray"
          @change="handleAddressPickerChange"
        >
          <view class="table-item table-item-address">
            所在地区
            <text
              class="iconfont icon-show-more"
              style="color: #979797"
            />
          </view>
        </picker>
        <view class="table-item table-item-name">
          姓名
        </view>
        <view class="table-item table-item-action">
          详细信息
        </view>
      </view>
      <empty
        v-if="!isLoading && (!volunteerList || !volunteerList.length)"
        message="没有搜索结果"
      />
      <view
        v-for="item in volunteerList"
        :key="item.id"
        class="table-row"
      >
        <view class="table-item table-item-address">
          {{ `${item.city}-${item.district}` }}
        </view>
        <view class="table-item table-item-name">
          {{ item.name }}
        </view>
        <view class="table-item table-item-action red">
          查看详情
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { requestGetVolunteers } from "@/api/volunteer";
import { JavaList, VolunteerInformation } from "@/api/types/models";
import Empty from "@/components/Empty/index.vue";

const useAddress = () => {
  const isLoading = ref(false);
  const store = useStore();

  const userInfo = computed(() => {
    return store.getters.userInfo;
  });

  const myAddressArray = computed(() => {
    const province = userInfo?.value?.volunteerInformation?.province;
    const city = userInfo?.value?.volunteerInformation?.city;
    const district = userInfo?.value?.volunteerInformation?.district;

    return [province, city, district];
  });

  const addressArray = ref(myAddressArray.value);

  const handleAddressPickerChange = async (e: any) => {
    addressArray.value = e.detail.value;
    getVolunteerList();
  };

  const volunteerList = ref<JavaList<VolunteerInformation>>();

  const getVolunteerList = async () => {
    uni.showNavigationBarLoading();
    isLoading.value = true;
    try {
      const res = await requestGetVolunteers({
        province: addressArray.value[0],
        city: addressArray.value[1],
        district: addressArray.value[2],
      });
      volunteerList.value = res.data.data;
    } catch (e) {
      console.log(e);
    }
    uni.hideNavigationBarLoading();
    isLoading.value = false;
  };

  onMounted(() => {
    console.log(myAddressArray.value);
    getVolunteerList();
  });

  return { addressArray, handleAddressPickerChange, volunteerList, isLoading };
};

export default defineComponent({
  components: { Empty },
  setup() {
    return { ...useAddress() };
  },
});
</script>

<style lang="scss" scoped>
.head {
  height: 170rpx;
  width: 750rpx;
  background-color: #a20a0a;
  padding-top: 32rpx;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .first-text {
    height: 56rpx;
    font-size: 40rpx;
    color: #ffffff;
    line-height: 56rpx;
  }

  .second-text {
    height: 34rpx;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 34rpx;
    margin-top: 32rpx;
  }
}

.table {
  width: 750rpx;
  font-size: 32rpx;

  &-row {
    height: 96rpx;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;

    &:nth-child(even) {
      background-color: #e4e4e4;
    }
  }

  &-item {
    height: 96rpx;
    line-height: 96rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    justify-content: center;

    &-address {
      width: 260rpx;
    }
    &-name {
      min-width: 120rpx;
      flex: 1;
    }
    &-action {
      width: 180rpx;
      &.red {
        color: $uni-color-primary;
      }
    }
  }
}
</style>
