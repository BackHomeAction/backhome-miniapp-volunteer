<template>
  <view
    class="box"
    @click="announce"
  >
    <view class="border">
      <image
        style="width: 100rpx;height: 100rpx;"
        src="../../../../static/images/announce.png"
      />
      <view class="text">
        <swiper
          style="width: 100%; height: 100%;"
          :indicator-dots="false"
          :vertical="true"
          :autoplay="true"
          :interval="3000"
          :duration="1000"
          @change="pageChange"
        >
          <swiper-item
            v-for="(inf,index) in massage.inform"
            :key="index"
          >
            <view class="first-text">
              <view class="announce-text">
                {{ inf.announce }}
              </view>
            </view>
            <view class="sec-text">
              <view class="abstract-text">
                {{ inf.abstract }}
              </view>
            </view> 
          </swiper-item> 
        </swiper> 
      </view>  
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { navigateTo } from "@/utils/helper";
export default defineComponent({
  setup() {
    const step = ref(0);
    function announce() {
      const num = ref(0);
      num.value = step.value;
      navigateTo("/pages/announce/index", { id: num.value });
    }
    function pageChange(event: { detail: { current: number } }) {
      console.log(event.detail.current);
      step.value = event.detail.current;
      console.log(step.value);
    }
    let massage = reactive({
      inform: [
        {
          announce: "关于申请成为志愿者的说明",
          abstract: "申请者志愿者前必读",
          id: 1,
        },
        {
          announce: "关于合理解决XXX的问题",
          abstract: "请仔细阅读并完成",
          id: 2,
        },
      ],
    });
    return { announce, massage, pageChange };
  },
});
</script>

<style lang="scss" scoped>
@mixin wh($width: 0rpx, $heigh: 0rpx, $top: 0rpx, $left: 0) {
  width: $width;
  height: $heigh;
  margin-top: $top;
  margin-left: $left;
}
@mixin font($font, $color, $lineh) {
  font-size: $font;
  color: $color;
  line-height: $lineh;
}
.box {
  @include wh(672rpx, 144rpx, 0, 0);
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  display: flex;
}
.border {
  @include wh(550rpx, 100rpx, 22rpx, 32rpx);
  display: flex;
  .text {
    @include wh(384rpx, 100rpx, 0rpx, 66rpx);
    .first-text {
      @include wh(384rpx, 44rpx, 0, 0);
      display: flex;
      justify-content: center;
      .announce-text {
        height: 44rpx;
        @include font(32rpx, #000000, 44rpx);
      }
    }
    .sec-text {
      @include wh(384rpx, 34rpx, 16rpx, 0);
      display: flex;
      justify-content: center;
      .abstract-text {
        height: 34rpx;
        @include font(24rpx, #979797, 34rpx);
      }
    }
  }
}
</style>
