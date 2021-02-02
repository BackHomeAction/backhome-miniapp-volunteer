<template>
  <view>
    <drop-down
      active-color="#A20A0A"
      :options="dropdownOptions"
      :bg-color="{header:'#fbfbfb', content:'#fbfbfb'}"
      :default-index-list="[{
        headerIndex: 0, 
        index: 3        
      }, {
        headerIndex: 1,
        index: 4
      }]"
    />
    <view class="content">
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
import DropDown from "@/components/DropDown/index.vue";
import Item from "./components/Item/index.vue";

const dropdownOptions = [
  {
    header: "距离",
    contents: ["≤ 500 m", "≤ 1 km", "≤ 3 km", "≤ 5 km", "≤ 10 km"],
  },
  {
    header: "发布时间",
    contents: ["6 小时内", "12 小时内", "1 天内", "2 天内", "3 天内"],
  },
];

const testList = [
  {
    id: 1,
    imageUrl: "https://i.loli.net/2021/02/03/sT8SQbqOgKcVGjw.png",
    district: "西青区",
    postTime: "2021-01-25 14:43",
  },
  {
    id: 2,
    imageUrl: "https://i.loli.net/2021/02/03/TEqU169A3wjKPDx.png",
    district: "南开区",
    postTime: "2021-01-25 14:43",
  },
  {
    id: 3,
    imageUrl: "https://i.loli.net/2021/02/03/sT8SQbqOgKcVGjw.png",
    district: "西青区",
    postTime: "2021-01-25 14:43",
  },
  {
    id: 4,
    imageUrl: "https://i.loli.net/2021/02/03/TEqU169A3wjKPDx.png",
    district: "南开区",
    postTime: "2021-01-25 14:43",
  },
  {
    id: 5,
    imageUrl: "https://i.loli.net/2021/02/03/sT8SQbqOgKcVGjw.png",
    district: "西青区",
    postTime: "2021-01-25 14:43",
  },
];

export default defineComponent({
  components: { DropDown, Item },
  setup() {
    const taskList = ref(testList.slice(0));
    return { dropdownOptions, taskList };
  },
});
</script>

<style lang="scss" scoped>
.content {
  box-sizing: border-box;
  padding: 140rpx 36rpx 0 36rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
