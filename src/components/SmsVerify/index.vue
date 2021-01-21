<template>
  <view class="sms">
    <view class="phone">
      <view class="district">
        +86
      </view>
      <u-input
        v-model="phone"
        type="number"
        placeholder="请输入手机号"
        style="flex: 1"
      />
    </view>
    <view class="code">
      <message-input
        mode="bottomLine"
        :maxlength="6"
        :width="60"
        :font-size="36"
        inactive-color="#C7C7CC"
        active-color="#799351"
        style="margin-left: -5rpx"
      />
      <u-button
        size="medium"
        type="success"
      >
        获取验证码
      </u-button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UInput from "../UInput/index.vue";
import UButton from "../UButton/index.vue";
import MessageInput from "../MessageInput/index.vue";

export default defineComponent({
  components: { UInput, UButton, MessageInput },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.phone {
  display: flex;

  .district {
    padding-top: 22rpx;
    font-size: $uni-font-size-lg;
    line-height: 88rpx;
    margin-right: 40rpx;
  }
}

.code {
  margin-top: 50rpx;
  display: flex;
  justify-content: space-between;
}
</style>
