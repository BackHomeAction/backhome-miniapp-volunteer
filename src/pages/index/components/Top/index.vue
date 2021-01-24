<template>
  <view
    class="top"
    :class="{'top--title': withTitle}"
    :style="{paddingTop: `${menuTop}px`}"
  >
    <view
      class="background background--red"
      :style="{
        height: withTitle ? `calc(${menuTop}px + 500rpx)` : null,
        clipPath: withTitle ? `circle(calc(${menuTop}px + 1600rpx) at 375rpx calc(-${menuTop}px + -1100rpx))` : null
      }"
    />
    <view
      class="title"
      :style="{lineHeight: `${menuHeight}px`}"
    >
      归家行动
    </view>
    <swiper
      class="swiper"
      indicator-dots
      autoplay
    >
      <swiper-item class="swiper-item" />
      <swiper-item class="swiper-item" />
      <swiper-item class="swiper-item" />
      <swiper-item class="swiper-item" />
    </swiper>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {},
  setup() {
    const menuTop = computed(() => {
      return uni.getMenuButtonBoundingClientRect().top;
    });

    const menuHeight = computed(() => {
      return uni.getMenuButtonBoundingClientRect().height;
    });

    return {
      menuTop,
      menuHeight,
    };
  },
  options: {
    styleIsolation: "shared",
  },
});
</script>

<style lang="scss" scoped>
.top--title {
  .box {
    margin-top: 80rpx;
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 750rpx;
  height: 432rpx;
  clip-path: circle(700rpx at 375rpx -250rpx);
  z-index: -1;

  &--red {
    background: $uni-color-primary;
  }
}

.title {
  font-size: $uni-font-size-xxl;
  color: #ffffff;
  margin-left: 39rpx;
}

.swiper {
  margin: 80rpx auto 20rpx auto;
  width: 672rpx;
  height: 320rpx;
  border-radius: 20rpx;
  overflow: hidden;

  &-item {
    background-color: azure;
  }
}
</style>
