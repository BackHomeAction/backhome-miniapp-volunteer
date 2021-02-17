<template>
  <view class="body">
    <scroll-view
      class="conversation"
      :style="{height: `calc(${windowHeight*0.8}px - env(safe-area-inset-bottom) - 186rpx - 30rpx)`}"
      scroll-y
      scroll-anchoring
    >
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
    </scroll-view>
    <view class="bottom">
      <bottom :data="data" />
    </view>
  </view>
</template>

<script lang="ts">
import { Case } from "@/api/types/models";
import { defineComponent, PropType } from "vue";
import Bottom from "./Bottom.vue";

export default defineComponent({
  components: { Bottom },
  props: {
    data: {
      type: Object as PropType<Case>,
      default: null,
    },
  },
  setup() {
    const windowHeight = uni.getSystemInfoSync().windowHeight;

    return { windowHeight };
  },
});
</script>

<style lang="scss" scoped>
.body {
  position: relative;

  .bottom {
    position: fixed;
    bottom: env(safe-area-inset-bottom);
  }
}
</style>
