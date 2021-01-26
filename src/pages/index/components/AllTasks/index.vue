<template>
  <view class="box" @click="missionRoom()">
    <view class="border">
		<image style="width: 100rpx;height: 100rpx;" src="../../../../static/images/room.png" mode=""></image>
	  <view class="text">
      <view class="first-text">
        <view style="height: 56rpx;">任务大厅</view>
      </view>
      <view class="sec-text">
        <view style="height: 34rpx;">在这里查看目前所有任务信息</view>
      </view>
    </view>
  </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {navigateTo} from "@/utils/helper"
export default defineComponent({
  setup() {
    function missionRoom(){
      navigateTo("/pages/missionPage/index")
    }
    return {missionRoom};
  },
});
</script>

<style lang="scss" scoped>
.box {
  width: 672rpx;
  height: 186rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  .border{
	  width: 526rpx;
	  height: 100rpx;
	  margin-left: 32rpx;
    display: flex;
    .text{
      width: 312rpx;
      height: 100rpx;
      margin-left: 114rpx; 
      .first-text{ 
        width: 312rpx;
        height: 56rpx; 
        font-size: 40rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 56rpx;
        letter-spacing: 10rpx;
        display: flex;
        justify-content: center;
      }
      .sec-text{ 
        width: 312rpx;
        height: 34rpx;
        margin-top: 16rpx; 
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #979797;
        line-height: 34rpx;
      }
    }
  }
}
</style>
