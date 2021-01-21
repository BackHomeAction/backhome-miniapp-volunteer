<template>
  <view class="page">
    <view
      class="step"
      :class="[
        step === 1 ? 'step--show' : ''
      ]"
    >
      <view class="title">
        绑定手机号
      </view>
      <sms-verify
        :phone="form1.phone"
        :code="form1.code"
        :send-sms="handleSendSMS"
        @phoneChange="handlePhoneChange"
        @codeChange="handleCodeChange"
      />
    </view>
    <view
      class="step"
      :class="[
        step === 2 ? 'step--show' : ''
      ]"
    >
      <view class="title">
        绑定个人身份信息
      </view>
      <u-input
        v-model="form2.name"
        placeholder="请输入姓名"
      />
      <u-input
        v-model="form2.IDCard"
        placeholder="请输入身份证号"
        type="idcard"
        description="姓名和身份证号确认后不可更改，请仔细核对"
      />
    </view>

    <view class="actions">
      <u-button
        type="primary"
        shape="circle"
        shadow
        @click="handleNextStep"
      >
        {{ step === 2 ? "确认提交" : "下一步" }}
      </u-button>
    </view>
  </view>
</template>

<script lang="ts">
import authService from "@/service/authService";
import { defineComponent, reactive, ref } from "vue";
import UInput from "@/components/UInput/index.vue";
import UButton from "@/components/UButton/index.vue";
import SmsVerify from "@/components/SmsVerify/index.vue";

const step = ref(1);

export default defineComponent({
  components: { UButton, UInput, SmsVerify },
  setup() {
    const form1 = reactive({
      phone: "",
      code: "",
    });

    const form2 = reactive({
      name: "",
      IDCard: "",
    });

    const handleNextStep = () => {
      if (step.value === 1) {
        step.value = 2;
      } else if (step.value === 2) {
        step.value = 1;
      }
    };

    return { step, form1, form2, handleNextStep };
  },
  onLoad(query) {
    if (query && query.step === "2") {
      step.value = 2;
    }
  },
  onUnload() {
    authService.logout();
  },
});
</script>

<style lang="scss" scoped>
.page {
  position: relative;
}

.title {
  font-size: $uni-font-size-xxl;
  margin-bottom: 50rpx;
}

.actions {
  position: absolute;
  top: 750rpx;
  left: 0;
  box-sizing: border-box;
  width: 100vw;
  text-align: center;
}

.step {
  opacity: 0;
  transition: all 0.3s linear;
  padding: 72rpx;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100vw;

  &--show {
    opacity: 1;
  }
}
</style>
