<template>
  <view class="top">
    <view class="background background--linear" />
    <view class="box">
      <view class="left">
        <view class="avatar avatar--nologin" />
      </view>
      <view class="right">
        <view class="name">
          {{ logged ? "xxx" : "志愿者" }}
          <view class="tag tag--nologin">
            未登录
          </view>
        </view>
        <button
          v-if="!logged"
          class="login-btn"
          hover-class="none"
          @click="handleLogin"
        >
          <view class="login-btn-text">
            去登录
            <text
              class="iconfont icon-arrow-right"
            />
          </view>
        </button>
        <view class="divider" />
        <view class="tasks">
          <view class="task">
            <view class="task-number">
              {{ logged ? "xx" : "0" }}
            </view>
            <view class="task-description">
              正在进行
            </view>
          </view>
          <view class="task">
            <view class="task-number">
              {{ logged ? "xx" : "0" }}
            </view>
            <view class="task-description">
              历史任务
            </view>
          </view>
          <view class="task">
            <view class="task-number">
              {{ logged ? "xx" : "0" }}
            </view>
            <view class="task-description">
              共计参与
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import authService from "@/service/authService";

const useLogin = () => {
  const logged = false;

  const handleLogin = () => {
    authService.login();
  };

  return { handleLogin };
};

export default defineComponent({
  setup() {
    return { ...useLogin() };
  },
  options: {
    styleIsolation: "shared",
  },
});
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 750rpx;
  height: 432rpx;
  clip-path: circle(700rpx at 375rpx -250rpx);
  z-index: -1;

  &--linear {
    background: #a20a0a
      linear-gradient(180deg, rgba(255, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
  }
}

.box {
  margin: 120rpx auto 20rpx auto;
  width: 672rpx;
  height: 320rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  display: flex;

  .left {
    box-sizing: border-box;
    width: 202rpx;
    padding: 32rpx 0 0 42rpx;

    .avatar {
      width: 128rpx;
      height: 128rpx;
      border-radius: 100%;

      &--nologin {
        background: #666666;
      }
    }
  }

  .right {
    padding: 52rpx 0 18rpx 0;

    .name {
      font-size: $uni-font-size-lg;
      font-weight: $uni-font-weight-bold;
      color: #000000;
      line-height: 44rpx;

      .tag {
        border-radius: 16rpx;
        font-size: 16rpx;
        font-weight: $uni-font-weight-base;
        line-height: 32rpx;
        padding: 0 24rpx;
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-left: 14rpx;
        vertical-align: middle;

        &--nologin {
          background: #d0d0d0;
        }
      }
    }

    .login-btn {
      margin-top: 16rpx;
      padding: 0;
      border-radius: 10rpx;
      border: 2rpx solid #979797;
      color: #000000;
      position: relative;
      display: inline-block;
      background-color: #ffffff;

      &-text {
        font-size: 18rpx;
        font-weight: $uni-font-weight-base;
        line-height: 40rpx;
        margin: 0 5rpx 0 15rpx;

        .icon-arrow-right {
          vertical-align: middle;
          font-size: 26rpx;
          line-height: 40rpx;
          color: #979797;
        }
      }

      &::after {
        border: none;
      }
    }
  }

  .divider {
    width: 416rpx;
    height: 2rpx;
    background-color: #979797;
    margin: 20rpx 0;
  }

  .tasks {
    width: 416rpx;
    display: flex;

    .task {
      flex-shrink: 1;
      width: 100%;

      &-number {
        font-size: 44rpx;
        color: #000000;
        line-height: 60rpx;
      }
      &-description {
        font-size: 24rpx;
        color: #000000;
        line-height: 34rpx;
      }
    }
  }
}
</style>
