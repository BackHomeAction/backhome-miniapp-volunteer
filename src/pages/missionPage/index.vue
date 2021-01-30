<template>
  <view>
    <view class="list-card">
      <list />
    </view>
  <!-- <button class="button" type="warn" @click="navigate()">返回主页</button> -->
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import List from "./components/List/index.vue";
import { provide } from "vue";
export default defineComponent({
  components: { List },
  setup() {
    const information = reactive({
      informs: [
        {
          name: "张正和",
          age: 75,
          where: "天津市·西青区",
          space: "天津市水上公园",
          distance: 1,
        },
        {
          name: "李桂花",
          age: 92,
          where: "天津市·东丽区",
          space: "天津市滨海机场",
          distance: 1,
        },
        {
          name: "王力刚",
          age: 85,
          where: "天津市·河东区",
          space: "天津市河东区政府",
          distance: 2,
        },
      ],
    });
    // function navigate(){
    // uni.switchTab({
    //   url:'/pages/me/index'
    // })
    // }
    provide("infGet", information);
    return { information };
  },
});
</script>

<style lang="scss" scoped>
.list-card {
  width: 750rpx;
  height: 320rpx;
  display: flex;
  justify-content: center;
  margin-top: 48rpx;
}
.button {
  width: 256rpx;
  height: 60rpx;
  background: #a20a0a;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 30rpx;
  margin-top: 80rpx;
  text-align: center;
  line-height: 60rpx;
}
</style>
