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
      @select="handleDropDownChange"
    />
    <view class="content">
      <view style="width: 100vw">
        <empty
          v-if="!isLoading && (!taskList || !taskList.length)"
          message="没有搜索结果"
        />
      </view>
      
      <item
        v-for="item in taskList"
        :key="item.id"
        :data="item"
        @tap="handleClickItem(item.id ? item.id : 0)"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, computed } from "vue";
import DropDown from "@/components/DropDown/index.vue";
import Item from "./components/Item/index.vue";
import { requestGetOpenMissions } from "@/api/mission";
import { Case } from "@/api/types/models";
import Empty from "@/components/Empty/index.vue";
import { navigateTo } from "@/utils/helper";
import { useStore } from "vuex";

// 下拉菜单选项
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
// 下拉菜单对应的值
const optionsMap = [
  [500, 1000, 3000, 5000, 10000],
  [6, 12, 24, 48, 72],
];
// 当前选中的选项
const options = reactive({
  distance: 5000,
  timeDiff: 72,
});
// 任务列表
const taskList: Ref<Array<Case>> = ref([]);
// 是否加载中
const isLoading = ref(true);

// 搜索
const search = async () => {
  const store = useStore();

  uni.showNavigationBarLoading();
  isLoading.value = true;

  const currentLocation = computed(() => {
    return store.getters.location;
  });

  try {
    const res = await requestGetOpenMissions({
      ...options,
      ...currentLocation.value,
    });
    if (res.data.data) {
      taskList.value = res.data.data;
    }
  } catch (e) {}

  uni.hideNavigationBarLoading();
  isLoading.value = false;
};

export default defineComponent({
  components: { DropDown, Item, Empty },
  setup() {
    // 下拉菜单改变时触发事件
    const handleDropDownChange = (e: any) => {
      options.distance = optionsMap[0][e.contentActiveIndexList[0].index];
      options.timeDiff = optionsMap[1][e.contentActiveIndexList[1].index];
      search();
    };

    // 跳转到详情页面
    const handleClickItem = (id: number) => {
      navigateTo("/pages/missionInformation/index", { id });
    };

    return {
      dropdownOptions,
      taskList,
      handleDropDownChange,
      handleClickItem,
      isLoading,
    };
  },
  onShow() {
    search();
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
