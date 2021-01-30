<template>
  <view
    v-if="announcements && announcements.length"
    class="box"
    @click="handleClickAnnounce"
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
          @change="handleSwiperChange"
        >
          <swiper-item
            v-for="item in announcements"
            :key="item.id"
            @click="handleSwiperItemClick(item.id)"
          >
            <view class="first-text">
              <view class="announce-text">
                {{ item.title }}
              </view>
            </view>
            <view class="second-text">
              <view class="abstract-text">
                {{ item.description }}
              </view>
            </view> 
          </swiper-item> 
        </swiper> 
      </view>  
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { navigateTo } from "@/utils/helper";
import { useStore } from "vuex";
import { ActionTypes } from "@/enums/actionTypes";

export default defineComponent({
  setup() {
    const store = useStore();
    const step = ref(0);

    function handleClickAnnounce() {
      const num = ref(0);
      num.value = step.value;
      navigateTo("/pages/announce/index", { id: num.value });
    }

    function handleSwiperChange(event: { detail: { current: number } }) {
      step.value = event.detail.current;
    }

    store.dispatch(ActionTypes.getAnnouncements);

    const announcements = computed(() => {
      console.log(store.getters.announcements);
      return store.getters.announcements;
    });

    const handleSwiperItemClick = (id: number) => {
      navigateTo("/pages/announcement/index", { id });
    };

    return {
      handleClickAnnounce,
      announcements,
      handleSwiperChange,
      handleSwiperItemClick,
    };
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
    .second-text {
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
