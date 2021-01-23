<template>
  <view class="content">
    <image
      class="logo"
      src="../../static/logo.png"
    />
    <view>
      <text class="title">
        {{ title }}
      </text>
    </view>
    <button @click="jumpToTest('/pages/test/index')">
      test
    </button>
    <button @click="jumpToTest('/pages/me/index')">
      test2
    </button>
    <button @click="testGetInfo">
      testGetInfo
    </button>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { showModalError, switchTab } from "@/utils/helper";
import authService from "@/service/authService";
import { useStore } from "vuex";
import { requestGetUserInfo } from "@/api/user";

export default defineComponent({
  setup() {
    const store = useStore();

    const jumpToTest = (url: string) => {
      switchTab(url);
    };

    const testGetInfo = async () => {
      console.log(await requestGetUserInfo());
      // console.log(await requestGetUserInfo());
      // console.log(await requestGetUserInfo());
      // console.log(await requestGetUserInfo());
      // console.log(await requestGetUserInfo());
    };

    return {
      title: "hello",
      jumpToTest,
      testGetInfo,
    };
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
</style>
