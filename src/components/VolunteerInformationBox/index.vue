<template>
  <view
    class="box"
  >
    <view class="left">
      <view
        class="avatar"
        :class="{'avatar--nologin': status === 'unlogin' || !avatarUrl}"
        :style="{backgroundImage: status !== 'unlogin' && avatarUrl ? `url(${avatarUrl})` : null}"
      />
      <view
        v-if="status === 'unlogin'"
        class="tag tag--nologin"
      >
        未登录
      </view>
      <view
        v-if="status !== 'unlogin' && registerTimeFromNow"
        class="tag tag--time"
      >
        {{ `加入 ${registerTimeFromNow}` }}
      </view>
    </view>
    <view class="right">
      <view class="name">
        {{ status !== 'unlogin' && name ? name : "志愿者" }}
        <view
          v-if="status !== 'unlogin'"
          class="sex-icon"
          :class="[sex === 1 ? 'sex-icon-man' : sex === 2 ? 'sex-icon-woman' : '']"
        />
      </view>
        
      <button
        v-if="status === 'unlogin'"
        class="action-btn"
        hover-class="none"
        @click="handleLogin"
      >
        <view class="action-btn-text">
          去登录
          <text
            class="iconfont icon-arrow-right"
          />
        </view>
      </button>
      <button
        v-if="status === 'user'"
        class="action-btn"
        @click="handleClickPhone"
      >
        <view class="action-btn-text">
          TEL: {{ phone }}
          <text
            class="iconfont icon-arrow-right"
          />
        </view>
      </button>
      <button
        v-if="status === 'me'"
        class="action-btn"
        @click="handleEditProfile"
      >
        <view class="action-btn-text">
          修改个人信息
          <text
            class="iconfont icon-arrow-right"
          />
        </view>
      </button>

      <view class="divider" />
      <view class="tasks">
        <view
          class="task"
        >
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
        <view
          v-if="status === 'me'"
          class="task"
        >
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import authService from "@/service/authService";
import dayjs from "@/utils/dayjs";
import { navigateTo } from "@/utils/helper";

const useLogin = () => {
  const handleLogin = () => {
    authService.login(true);
  };

  return { handleLogin };
};

export default defineComponent({
  props: {
    status: {
      type: String as PropType<"unlogin" | "me" | "user">,
      default: "unlogin",
    },
    userInfo: {
      type: Object,
      default: undefined,
    },
  },
  setup(props) {
    const name = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.volunteerInformation?.name
        : props?.userInfo?.name;
    });

    const sex = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.volunteerInformation?.sex
        : props?.userInfo?.sex;
    });

    const registerTimeFromNow = computed(() => {
      const time =
        props.status === "me"
          ? props?.userInfo?.volunteerInformation?.registerTime
          : props?.userInfo?.registerTime;

      return dayjs(time).fromNow(true);
    });

    const avatarUrl = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.avatarUrl
        : props?.userInfo?.volunteer?.avatarUrl;
    });

    const phone = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.phone
        : props?.userInfo?.volunteer?.phone;
    });

    const handleEditProfile = () => {
      navigateTo("/pages/editProfile/index");
    };

    const handleClickPhone = () => {
      uni.makePhoneCall({
        phoneNumber: phone.value,
      });
    };

    return {
      ...useLogin(),
      name,
      sex,
      registerTimeFromNow,
      avatarUrl,
      phone,
      handleEditProfile,
      handleClickPhone,
    };
  },
});
</script>

<style lang="scss" scoped>
.tag {
  border-radius: 16rpx;
  font-size: 16rpx;
  font-weight: $uni-font-weight-base;
  line-height: 32rpx;
  padding: 0 16rpx;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  &--nologin {
    background: #d0d0d0;
  }

  &--time {
    background: #f6eec9;
  }
}

.box {
  margin: 0 auto 20rpx auto;
  width: 672rpx;
  height: 320rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  display: flex;

  .left {
    box-sizing: border-box;
    width: 202rpx;
    padding: 32rpx 32rpx 0 42rpx;
    text-align: center;

    .avatar {
      width: 128rpx;
      height: 128rpx;
      border-radius: 100%;
      background-size: cover;

      &--nologin {
        background: #666666;
      }
    }

    .tag {
      margin-top: 16rpx;
    }
  }

  .right {
    padding: 52rpx 0 18rpx 0;

    .name {
      font-size: $uni-font-size-lg;
      font-weight: $uni-font-weight-bold;
      color: #000000;
      line-height: 44rpx;

      .sex-icon {
        display: inline-block;
        margin-left: 10rpx;
        width: 24rpx;
        height: 24rpx;
        background-image: url("@/static/images/profile/man.png");
        background-size: cover;

        &-man {
          background-image: url("@/static/images/profile/man.png");
        }
        &-woman {
          background-image: url("@/static/images/profile/woman.png");
        }
      }
    }

    .action-btn {
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
