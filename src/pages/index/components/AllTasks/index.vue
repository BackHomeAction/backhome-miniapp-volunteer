<template>
  <view
    class="box"
    @click="handleClickMissionRoom()"
  >
    <view class="border">
      <image
        style="width: 100rpx;height: 100rpx;"
        src="../../../../static/images/room.png"
        mode=""
      />
      <view class="text">
        <view class="first-text">
          <view style="height: 56rpx;">
            任务大厅
          </view>
        </view>
        <view class="second-text">
          <view style="height: 34rpx;">
            在这里查看目前所有任务信息
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { navigateTo } from "@/utils/helper";
export default defineComponent({
  setup() {
    function handleClickMissionRoom() {
      navigateTo("/pages/oldManInformation/index", { id: 22 });
    }
    return { handleClickMissionRoom };
  },
});
</script>

<style lang="scss" scoped>
@mixin style($width: 0, $height: 0, $left: 0, $top: 0) {
  width: $width;
  height: $height;
  margin-left: $left;
  margin-top: $top;
}
@mixin font($font, $color, $lineh) {
  font-size: $font;
  color: $color;
  line-height: $lineh;
}
.box {
  @include style(672rpx, 186rpx, 0, 0);
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  .border {
    @include style(526rpx, 100rpx, 32rpx, 0);
    display: flex;
    .text {
      @include style(312rpx, 100rpx, 114rpx, 0);
      .first-text {
        width: 312rpx;
        height: 56rpx;
        @include font(40rpx, #000000, 56rpx);
        letter-spacing: 10rpx;
        display: flex;
        justify-content: center;
      }
      .second-text {
        width: 312rpx;
        height: 34rpx;
        margin-top: 16rpx;
        @include font(24rpx, #979797, 34rpx);
      }
    }
  }
}
</style>
