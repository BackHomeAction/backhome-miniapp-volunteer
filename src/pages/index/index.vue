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
    <button @click="jumpToTest">
      test
    </button>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { navigateTo } from "@/utils/helper";

export default defineComponent({
  setup() {
    const jumpToTest = () => {
      navigateTo("/pages/test/index");
    };

    return {
      title: "hello",
      jumpToTest,
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
