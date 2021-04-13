<template>
  <view>
    <swiper
      class="wrapper"
      indicator-dots
    >
      <swiper-item>
        <div class="content">
          <div class="tip__text">
            第一步：点击顶部走失信息或底部卡片中的查看更多查看走失人详细信息
          </div>
          <image
            class="tip__image"
            src="https://fwwb2020-common.tgucsdn.com/images/tips/%E8%AF%A6%E7%BB%86%E4%BF%A1%E6%81%AF.gif"
          />
        </div>
      </swiper-item>
      <swiper-item>
        <div class="content">
          <div class="tip__text">
            第二步：点击顶部队伍沟通与搜救队中的其他成员沟通
          </div>
          <image
            class="tip__image"
            src="https://fwwb2020-common.tgucsdn.com/images/tips/%E9%98%9F%E4%BC%8D%E8%81%8A%E5%A4%A9.gif"
          />
        </div>
      </swiper-item>
      <swiper-item>
        <div class="content">
          <div class="tip__text">
            第三步：点击顶部人脸识别拍摄或上传照片并且查看比对结果
          </div>
          <image
            class="tip__image"
            src="https://fwwb2020-common.tgucsdn.com/images/tips/%E4%BA%BA%E8%84%B8%E8%AF%86%E5%88%AB.gif"
          />
        </div>
      </swiper-item>
      <swiper-item>
        <div class="content">
          <div class="tip__text">
            定位切换：点击上方小箭头定位自己所在位置，下方圆靶定位走失位置
          </div>
          <image
            class="tip__image"
            src="https://fwwb2020-common.tgucsdn.com/images/tips/%E5%AE%9A%E4%BD%8D%E5%88%87%E6%8D%A2.gif"
          />
        </div>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 1350rpx;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36rpx;

  .tip {
    &__text {
      font-size: 36rpx;
      font-weight: 400;
      color: #000000;
      line-height: 50rpx;
      letter-spacing: 1rpx;
    }

    &__image {
      margin-top: 16rpx;
      width: 512rpx;
      height: 1108rpx;
    }
  }
}
</style>
