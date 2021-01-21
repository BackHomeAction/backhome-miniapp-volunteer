<template>
  <view class="sms">
    <view class="phone">
      <u-input
        v-model="phone"
        type="number"
        placeholder="请输入手机号"
      />
    </view>
    <view class="code">
      <message-input
        mode="bottomLine"
        :maxlength="6"
        :width="65"
        :font-size="36"
        inactive-color="#C7C7CC"
        active-color="#799351"
        style="margin-left: -3px"
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
.code {
  margin-top: 50rpx;
  display: flex;
  justify-content: space-between;
}
</style>
