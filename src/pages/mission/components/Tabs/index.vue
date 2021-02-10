<template>
  <view class="tabs">
    <view
      class="tabs-item"
      @click="handleClick('info')"
    >
      <image
        class="tabs-item-image"
        src="@/static/images/map/tab_info.png"
      />
      <view class="tabs-item-text">
        走失信息
      </view>
    </view>
    <view
      class="tabs-item"
      @click="handleClick('chat')"
    >
      <image
        class="tabs-item-image"
        src="@/static/images/map/tab_chat.png"
      />
      <view class="tabs-item-text">
        队伍沟通
      </view>
    </view>
    <view
      class="tabs-item"
      @click="handleClick('face')"
    >
      <image
        class="tabs-item-image"
        src="@/static/images/map/tab_face.png"
      />
      <view class="tabs-item-text">
        人脸识别
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["select"],
  setup(props, { emit }) {
    const handleClick = (name: string) => {
      emit("select", name);
    };

    return { handleClick };
  },
});
</script>

<style lang="scss" scoped>
.tabs {
  box-sizing: border-box;
  position: absolute;
  top: 48rpx;
  left: 16rpx;
  width: 718rpx;
  height: 160rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 64rpx;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90rpx;

    &-image {
      width: 90rpx;
      height: 90rpx;
      object-fit: fill;
    }

    &-text {
      margin-top: 8rpx;
      font-size: 20rpx;
      color: #000000;
      line-height: 28rpx;
    }
  }
}
</style>
