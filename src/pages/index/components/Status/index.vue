<template>
  <view class="body">
    <view
      class="block"
      @click="handleToVolunteerList()"
    >
      <view class="num">
        <view style="height: 84rpx;">
          {{ onlineVolunteerNumber }}
        </view>
      </view>
      <view class="text">
        <view style="height: 40rpx;">
          在线志愿者
        </view>
      </view>
    </view>
    <view class="line" />
    <view
      class="block"
      style="margin-left: 30rpx;"
    >
      <view class="num">
        <view style="height: 84rpx;">
          {{ totalVolunteerNumber }}
        </view>
      </view>
      <view class="text">
        <view style="height: 40rpx;">
          志愿者总数
        </view>
      </view>
    </view>
    <view class="line" />
    <view
      class="block"
      style="margin-left: 30rpx;"
    >
      <view class="num">
        <view style="height: 84rpx;">
          {{ openingTasks }}
        </view>
      </view>
      <view class="text">
        <view style="height: 40rpx;">
          开启案件数
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { navigateTo } from "@/utils/helper";

export default defineComponent({
  setup() {
    function handleToVolunteerList() {
      navigateTo("/pages/volunteerList/index");
    }

    const onlineVolunteerNumber = ref(556);
    const totalVolunteerNumber = ref(56);
    const openingTasks = ref(5356);

    return {
      onlineVolunteerNumber,
      totalVolunteerNumber,
      openingTasks,
      handleToVolunteerList,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin use($size) {
  width: 182rpx;
  height: 84rpx;
  font-size: $size;
  color: #000000;
  line-height: 84rpx;
  display: flex;
  justify-content: center;
}
.body {
  width: 670rpx;
  height: 140rpx;
  display: flex;
  .block {
    width: 182rpx;
    height: 140rpx;
    .num {
      @include use(60rpx);
    }
    .text {
      @include use(28rpx);
    }
  }
}
.line {
  width: 2rpx;
  height: 120rpx;
  margin-top: 10rpx;
  background-color: #979797;
  margin-left: 30rpx;
}
</style>
