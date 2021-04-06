<template>
  <view
    class="top top--title"
    :style="{paddingTop: `${menuTop}px`}"
  >
    <view
      class="background background--red"
      :style="{
        height: `calc(${menuTop}px + 500rpx)` ,
        clipPath: `circle(calc(${menuTop}px + 1600rpx) at 375rpx calc(-${menuTop}px + -1100rpx))` 
      }"
    />
    <view
      class="title"
      :style="{lineHeight: `${menuHeight}px`}"
    >
      我的任务
    </view>
    <view class="list">
      <view
        v-if="!taskList || !taskList.length"
        class="empty"
        :style="{
          marginTop: `calc(${menuTop}px + 250rpx)` ,
        }"
      >
        <empty
          message="暂时还没有你的任务哦，去任务大厅看看吧～"
        />
      </view>
      <item
        v-for="item in myUncheckedTaskList"
        :key="item.id"
        :data="item"
        status="unchecked"
      />
      <item
        v-for="item in myTaskList"
        :key="item.id"
        :data="item"
        status="checked"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useTop } from "@/uses/useTop";
import Item from "./components/Item/index.vue";
import store from "@/store";
import { ActionTypes } from "@/enums/actionTypes";
import { useStore } from "vuex";
import Empty from "@/components/Empty/index.vue";

const useTaskList = () => {
  const store = useStore();

  const myUncheckedTaskList = computed(() => {
    return store.getters.myUncheckedMissions || [];
  });

  const myTaskList = computed(() => {
    return store.getters.myMissions || [];
  });

  const taskList = computed(() => {
    return [...myUncheckedTaskList.value, ...myTaskList.value];
  });

  return { myUncheckedTaskList, myTaskList, taskList };
};

export default defineComponent({
  components: { Item, Empty },
  setup() {
    return { ...useTop(), ...useTaskList() };
  },
  onShow() {
    store.dispatch(ActionTypes.getMyUncheckedMissions);
    store.dispatch(ActionTypes.getMyMissions);
  },
});
</script>

<style lang="scss" scoped>
.top--title {
  .list {
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

.list {
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.box {
  box-sizing: border-box;
  width: 686rpx;
  height: 320rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  padding: 0 20rpx;
  margin-bottom: 48rpx;
}
</style>
