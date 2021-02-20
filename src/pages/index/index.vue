<template>
  <view>
    <top />
    <view class="body">
      <announcement />
      <all-tasks style="margin-top: 64rpx;" />
      <status style="margin-top: 96rpx;" />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Top from "./components/Top/index.vue";
import Announcement from "./components/Announcement/index.vue";
import AllTasks from "./components/AllTasks/index.vue";
import Status from "./components/Status/index.vue";
import store from "@/store";
import { ActionTypes } from "@/enums/actionTypes";

export default defineComponent({
  components: { Top, Announcement, AllTasks, Status },
  setup() {
    return {};
  },
  onShow() {
    store.dispatch(ActionTypes.getCount);
  },
});
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  height: 400upx;
}

.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}

.body {
  margin-top: 64rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
