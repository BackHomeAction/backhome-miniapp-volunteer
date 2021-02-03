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
        class="box"
      >
        无进行中的任务
      </view>
      <item
        v-for="item in taskList"
        :key="item.id"
        :data="item"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTop } from "@/uses/useTop";
import Item from "./components/Item/index.vue";

const testList = [
  {
    id: 1,
    photoUrl:
      "https://home-action.oss-cn-shanghai.aliyuncs.com/volunteer/4/9603feb5-96cc-49ca-b464-396e65321d52.jpg",
    name: "张正和",
    age: 75,
    city: "天津市",
    district: "西青区",
    lostAaddress: "天津市水上公园",
    time: "2021-02-03 17:23:00",
    status: 1, // 待接受
  },
  {
    id: 2,
    photoUrl:
      "https://home-action.oss-cn-shanghai.aliyuncs.com/volunteer/4/9603feb5-96cc-49ca-b464-396e65321d52.jpg",
    name: "张正和",
    age: 75,
    city: "天津市",
    district: "西青区",
    lostAaddress: "天津市水上公园",
    time: "2021-02-02 17:23:00",
    status: 2, // 进行中
  },
  {
    id: 3,
    photoUrl:
      "https://home-action.oss-cn-shanghai.aliyuncs.com/volunteer/4/9603feb5-96cc-49ca-b464-396e65321d52.jpg",
    name: "张正和",
    age: 75,
    city: "天津市",
    district: "西青区",
    lostAaddress: "天津市水上公园",
    time: "2021-02-01 17:23:00",
    status: 2, // 进行中
  },
];

export default defineComponent({
  components: { Item },
  setup() {
    const taskList = ref(testList.slice(0));

    return { ...useTop(), taskList };
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
