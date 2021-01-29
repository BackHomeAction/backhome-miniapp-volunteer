<template>
  <view>
    <view
      v-for="(inf,index) in infGet.informs"
      :key="index"
    >
      <view
        class="body"
        style="margin-top: 48rpx;"
      >
        <view
          v-if="confirms"
          class="confirm-page"
        />
        <view
          v-if="rejects"
          class="reject-page"
        />
        <view
          v-if="show"
          class="box"
        >
          <view class="sda" />
          <view class="on-box">
            <image
              style="width: 100rpx; height: 100rpx;border-radius: 50%;"
              src="../../../../static/images/people.png"
              mode=""
            />
            <view class="box-border">
              <view class="text-box">
                <view class="name">
                  {{ inf.name }}
                </view>
                <view class="age">
                  {{ inf.age }}
                </view>
              </view>
              <view class="inform-box">
                <view class="space">
                  <view style="width: 104rpx;height: 22rpx; font-size: 16rpx;font-family:PingFangSC-Regular,PingFang SC;font-weight: 400; color: #FFFFFF;line-height: 25rpx;margin-left: 15rpx;">
                    {{ inf.where }}
                  </view>
                </view>
                <view class="more">
                  查看更多 >
                </view>
              </view>
            </view>
          </view>
          <view class="line" />
          <view class="un-box">
            <view class="time">
              <image
                style="width: 24rpx;height: 28rpx;margin-top: 3rpx;"
                src="../../../../static/images/time.png"
                mode=""
              />
              <view class="time-text">
                &nbsp; 15:45
              </view>
            </view>
            <view class="space-text">
              <view style="width: 20rpx;height:20rpx;border-radius: 50%;background-color: #FFA36C;margin-top: 18rpx;" />
              <view class="space-text-detail">
                走失于 {{ inf.space }}
              </view>
              <view
                class="space-text-detail "
                style="font-size: 24rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #666666;line-height: 34rpx;"
              >
                距离您:{{ inf.distance }}KM
              </view>
            </view>
          </view>
          <view
            class="line"
            style="margin-top: 10rpx;"
          />
        </view>
        <view class="button">
          <button
            type="warn"
            class="confirm"
            @click="reject()"
          >
            拒绝
          </button>
          <button
            type="primary"
            class="confirm"
            @click="confirm()"
          >
            接受
          </button>
        </view>
      </view>
    </view>
    <button
      class="buttons"
      type="warn"
      @click="navigate()"
    >
      返回主页
    </button>
  </view>
</template>

<script lang="ts">
import { showToast, switchTab } from "@/utils/helper";
import { defineComponent, ref } from "vue";
import { inject } from "vue";
export default defineComponent({
  setup() {
    const infGet = inject("infGet");
    const show = ref(true);
    const confirms = ref(false);
    const rejects = ref(false);
    function reject() {
      showToast("已拒绝");
    }
    function confirm() {
      showToast("已接受");
    }
    function navigate() {
      switchTab("/pages/me/index");
    }
    return { reject, confirm, show, confirms, rejects, navigate, infGet };
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
.body {
  @include wh(686rpx, 320rpx, 0, 0);
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  border: 1px solid rgba($color: #ffffff, $alpha: 0);
  .on-box {
    @include wh(404rpx, 100rpx, 32rpx, 32rpx);
    display: flex;
    .box-border {
      @include wh(272rpx, 100rpx, 0, 32rpx);
      .text-box {
        @include wh(272rpx, 44rpx, 0, 0);
        display: flex;
        .name {
          @include wh(96rpx, 44rpx, 0, 0);
          @include font(32rpx, #000000, 44rpx);
        }
        .age {
          @include wh(44rpx, 28rpx, 12rpx, 24rpx);
          @include font(20rpx, #666666, 28rpx);
        }
      }
      .inform-box {
        @include wh(272rpx, 22rpx, 8rpx, 0);
        display: flex;
        .space {
          @include wh(128rpx, 32rpx, 0, 0);
          background: #409eff;
          border-radius: 16rpx;
          display: flex;
          align-items: center;
        }
        .more {
          @include wh(128rpx, 32rpx, 0, 16rpx);
          border-radius: 10rpx;
          border: 2rpx solid #979797;
          text-align: center;
          @include font(18rpx, #000000, 26rpx);
        }
      }
    }
  }
  .line {
    @include wh(646rpx, 2rpx, 18rpx, 20rpx);
    background-color: #e4e4e4;
  }
  .un-box {
    @include wh(646rpx, 84rpx, 14rpx, 20rpx);
    .time {
      @include wh(646rpx, 34rpx, 0, 0);
      display: flex;
      .time-text {
        @include wh(186rpx, 34rpx, 0, 18rpx);
        @include font(24rpx, #000000, 34rpx);
      }
    }
    .space-text {
      display: flex;
      .space-text-detail {
        @include wh(296rpx, 34rpx, 9rpx, 18rpx);
        @include font(24rpx, #000000, 34rpx);
      }
    }
  }
  .button {
    @include wh(300rpx, 42rpx, 10rpx, 370rpx);
    display: flex;
    .confirm {
      @include wh(128rpx, 42rpx, 0, 0);
      border-radius: 30rpx;
      @include font(24rpx, #000000, 42rpx);
    }
  }
}
.buttons {
  width: 256rpx;
  height: 60rpx;
  border-radius: 30rpx;
  margin-top: 80rpx;
  text-align: center;
  line-height: 60rpx;
}
</style>
