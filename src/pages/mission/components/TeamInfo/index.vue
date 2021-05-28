<template>
  <view class="team-info">
    <view class="box">
      <view
        class="box__item item"
        @click.stop="showList = !showList"
      >
        <view class="item__circle">
          <view class="circle__text text">
            <text class="text text-large">
              {{ onlineTeamMembers.length }}
            </text>
            <text class="text text-divider">
              /
            </text>
            <text class="text">
              {{ teamMembers.length }}
            </text>
          </view>
        </view>
        <view class="item__label">
          小队信息
        </view>
      </view>
    </view>

    <!-- 小队信息弹出框 -->
    <view
      class="info"
      :class="{show: showList}"
    >
      <view
        v-for="item in teamMembers"
        :key="item.id"
        class="volunteer"
        @tap="handleClick(item)"
      >
        <image
          :src="item.avatarUrl"
          class="volunteer__avatar"
        />
        <view class="volunteer__info">
          <view class="row">
            <view class="name">
              {{ item.volunteerInformation.name }}
            </view>
            <view
              v-if="checkOnline(item)"
              class="badge badge-online"
            />
          </view>
          <view
            v-if="getPathColor(item.id)"
            class="path"
          >
            <view class="row">
              <view>轨迹：</view>
              <view
                class="path__indicator"
                :style="{backgroundColor: getPathColor(item.id)}"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Volunteer } from "@/api/types/models";
import { computed, ComputedRef, defineComponent, inject, ref } from "vue";
import { useStore } from "vuex";

const useList = () => {
  const store = useStore();
  const showList = ref(false);

  const teamMembers: ComputedRef<Array<Volunteer>> = computed(() => {
    return store.getters.currentMission.teamMembers;
  });

  const onlineTeamMembers: ComputedRef<Array<Volunteer>> = computed(() => {
    return store.getters.currentMission.onlineTeamMembers;
  });

  const checkOnline = (volunteer: Volunteer) => {
    return onlineTeamMembers.value.some((item) => item.id === volunteer.id);
  };

  return { teamMembers, onlineTeamMembers, checkOnline, showList };
};

export default defineComponent({
  props: {
    polylines: {
      type: Object,
      default: null,
    },
  },
  emits: ["open"],
  setup(props, { emit }) {
    const getPathColor = (id: number) => {
      const res = props.polylines.find((ele: any) => {
        return ele.volunteerID === id;
      });
      if (res) {
        return res.color;
      } else {
        return null;
      }
    };

    const handleClick = (item: Volunteer) => {
      emit("open", item);
    };

    return {
      ...useList(),
      getPathColor,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.team-info {
  position: fixed;
  right: 17rpx;
  top: 240rpx;
}

.box {
  // width: 160rpx;
  // height: 160rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  padding: 10rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .item {
    width: 130rpx;
    background-size: cover;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__circle {
      width: 120rpx;
      height: 120rpx;
      border-radius: 100%;
      background-color: #64b1ff;
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        color: #ffffff;
        font-size: $uni-font-size-base;

        &-divider {
          margin: 0 2rpx;
        }

        &-large {
          font-size: $uni-font-size-xl;
        }
      }
    }

    &__label {
      margin-top: 5rpx;
      text-align: center;
      font-size: $uni-font-size-sm;
    }

    & + & {
      margin-top: 20rpx;

      &::after {
        position: absolute;
        /* #ifndef APP-NVUE */
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        border-top: 1px solid #e4e4e4;
        /* #endif */
        right: 0;
        left: 0;
        top: -10rpx;
        transform: scaleY(0.5);
        margin: 0 -4rpx;
      }
    }
  }
}

.info {
  position: absolute;
  top: 210rpx;
  right: 0;
  opacity: 0;
  transform: scale(1, 0) translate(0, -100%);
  transition: all 0.2s ease-in-out;
  filter: drop-shadow(2rpx 4rpx 8rpx rgba(0, 0, 0, 0.5));
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 10rpx;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  max-height: 750rpx;

  &.show {
    opacity: 1;
    transform: scale(1, 1) translate(0, 0);
    height: auto;
  }

  &::after {
    content: " ";
    margin: 0;
    border-width: 0 15rpx 26rpx 15rpx;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
    padding: 0;
    width: 0;
    height: 0;
    right: 60rpx;
    top: -20rpx;
    position: absolute;
  }

  .volunteer {
    padding: 10rpx;
    display: flex;
    align-items: center;
    width: 260rpx;
    position: relative;

    &__avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 100%;
    }

    &__info {
      box-sizing: border-box;
      margin-left: 16rpx;
      flex: 1;

      .row {
        display: flex;
        align-items: center;
      }

      .badge {
        margin-left: 16rpx;
        width: 16rpx;
        height: 16rpx;
        border-radius: 100%;

        &-online {
          background-color: #73fe46;
        }
      }

      .name {
        font-size: $uni-font-size-base;
      }
      .path {
        color: $uni-text-color-darkgrey;
        font-size: $uni-font-size-sm;

        &__indicator {
          width: 80rpx;
          height: 8rpx;
          border-radius: 20rpx;
        }
      }
    }
  }
}
</style>
