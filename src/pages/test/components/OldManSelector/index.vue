<template>
  <view class="selector">
    <view class="list">
      <view
        v-for="(item, index) in mans"
        :key="item.id"
        class="man"
        :class="{selected: index===selected}"
        @click="handleClickMan(index)"
      >
        <image
          :src="item.avatarUrl"
          class="man-avatar"
        />
        <view class="man-info">
          <view class="man-info-name">
            {{ item.name }}
          </view>
          <view class="man-info-time">
            {{ item.lostTime }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, PropType } from "vue";

const selected = ref(0);

export default defineComponent({
  props: {
    mans: {
      type: Array,
      require: true,
      default: () => {
        return [];
      },
    },
  },
  emits: ["selected"],
  setup(props, { emit }) {
    const handleClickMan = (index: number) => {
      selected.value = index;
      emit("selected", props.mans[index]);
    };

    return { selected, handleClickMan };
  },
});
</script>

<style lang="scss" scoped>
.selector {
  box-sizing: border-box;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 10vw;
}

.list {
  .man {
    position: absolute;
    width: 160rpx;
    height: 160rpx;
    line-height: 40rpx;
    border-radius: 30rpx;
    background-color: rgba(255, 255, 255, 0.75);
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 100);
    flex-shrink: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-content: space-between;
    transition: all 0.2s ease-in-out;

    &.selected {
      width: 390rpx;
    }

    &:not(.selected) {
      margin-left: calc(390rpx + 40rpx);
    }

    &-avatar {
      width: 130rpx;
      height: 130rpx;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
      border-radius: 100%;
    }

    &-info {
      opacity: 0;
      line-height: 60rpx;
      margin-right: 10rpx;
      transition: all 0.1s linear;
      transition-delay: 0.1s;
      position: absolute;

      &-name {
        border-bottom: 1px solid #ebedf0;
      }

      &-time {
        font-size: $uni-font-size-sm;
      }
    }

    &.selected {
      .man-info {
        position: relative;
        opacity: 1;
        display: block;
        opacity: 1;
      }
    }
  }
}
</style>
