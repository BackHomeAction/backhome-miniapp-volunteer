<template>
  <view class="selector">
    <view
      v-if="mans.length === 1"
      class="list list-one"
    >
      <view
        class="man selected"
        @click="handleClickMan(mans[0])"
      >
        <image
          :src="mans[0].avatarUrl"
          class="man-avatar"
        />
        <view class="man-info">
          <view class="man-info-name">
            {{ mans[0].name }}
          </view>
          <view class="man-info-time">
            {{ mans[0].lostTime }}
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="mans.length === 2"
      class="list list-two"
    >
      <view
        v-for="(item, index) in mans"
        :key="item.id"
        class="man"
        :class="{selected: index===selected}"
        @click="handleClickMan(item)"
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
    <view
      v-if="mans.length > 2"
      class="list list-three"
    >
      <view
        class="man selected"
        @click="handleClickMan(mans[selected])"
      >
        <image
          :src="mans[selected].avatarUrl"
          class="man-avatar"
        />
        <view class="man-info">
          <view class="man-info-name">
            {{ mans[selected].name }}
          </view>
          <view class="man-info-time">
            {{ mans[selected].lostTime }}
          </view>
        </view>
      </view>
      
      <view
        class="man man-more"
        @click="showMore = !showMore"
      >
        <uni-icons
          type="more-filled"
          size="36"
        />
        <view
          class="other-mans"
          :class="{show:showMore}"
        >
          <view
            v-for="item in mansWithoutSelected"
            :key="item.id"
            class="man"
            @click="handleClickMan(item)"
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
    </view>
  </view>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  PropType,
  computed,
} from "vue";

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
    const handleClickMan = (item: any) => {
      selected.value = props.mans.indexOf(item);
      emit("selected", props.mans[selected.value]);
    };

    const showMore = ref(false);

    const mansWithoutSelected = computed(() => {
      const { mans } = props;
      return mans
        .slice(0, selected.value)
        .concat(mans.slice(selected.value + 1));
    });

    return { selected, showMore, mansWithoutSelected, handleClickMan };
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
  padding: 10vw 10vw 0 10vw;
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
      margin-left: 430rpx;
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

.list-one {
  display: flex;
  justify-content: center;
  align-items: center;

  .man {
    position: relative;
  }
}

.list-three {
  .man-more {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .other-mans {
      position: absolute;
      top: 160rpx;
      left: 0;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: scale(1, 0) translate(0, -70%);
      transition: all 0.2s ease-in-out;

      .man {
        position: relative;
        margin: 20rpx 0 0 0;
      }

      &.show {
        opacity: 1;
        transform: scale(1, 1) translate(0, 0);
        height: auto;
      }
    }
  }
}
</style>
