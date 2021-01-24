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
        v-if="step === 1"
        :phone="smsForm.phone"
        :code="smsForm.code"
        sms-api="volunteer/getBindCode"
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
        v-if="step === 2"
        v-model="profileForm.name"
        placeholder="请输入姓名"
      />
      <u-input
        v-if="step === 2"
        v-model="profileForm.IDCard"
        placeholder="请输入身份证号"
        type="idcard"
        description="姓名和身份证号确认后不可更改，请仔细核对"
        maxlength="18"
      />
    </view>

    <view class="actions">
      <u-button
        type="primary"
        shape="circle"
        shadow
        :disabled="!isAllowNextStep"
        :loading="isLoading"
        open-type="getUserInfo"
        @getuserinfo="handleNextStep"
      >
        {{ step === 2 ? "确认提交" : "下一步" }}
      </u-button>
    </view>
  </view>
</template>

<script lang="ts">
import authService from "@/service/authService";
import { computed, defineComponent, reactive, ref } from "vue";
import UInput from "@/components/UInput/index.vue";
import UButton from "@/components/UButton/index.vue";
import SmsVerify from "@/components/SmsVerify/index.vue";
import {
  requestBindPhone,
  requestBindVolunteerInformation,
  requestUpdateWechatUserInfo,
} from "@/api/user";
import { navigateBack, showToast } from "@/utils/helper";
import store from "@/store";

const step = ref(1);

const useSmsVerify = () => {
  const smsForm = reactive({
    phone: "",
    code: "",
  });

  const handlePhoneChange = (val: string) => {
    smsForm.phone = val;
  };

  const handleCodeChange = (val: string) => {
    smsForm.code = val;
  };

  const verifyPhone = async () => {
    await requestBindPhone({
      phone: smsForm.phone,
      code: smsForm.code,
    });
  };

  return { smsForm, handlePhoneChange, handleCodeChange, verifyPhone };
};

const useProfileVerify = () => {
  const profileForm = reactive({
    name: "",
    IDCard: "",
  });

  const verifyProfile = async (userInfo: UniApp.GetUserInfoRes) => {
    await requestBindVolunteerInformation({
      name: profileForm.name,
      IDCard: profileForm.IDCard,
    });
    await requestUpdateWechatUserInfo({
      encryptedData: userInfo.encryptedData,
      iv: userInfo.iv,
    });
  };

  return { profileForm, verifyProfile };
};

export default defineComponent({
  components: { UButton, UInput, SmsVerify },
  setup() {
    const smsVerify = useSmsVerify();
    const profileVerify = useProfileVerify();
    const isLoading = ref(false);

    const handleNextStep = async (userInfoRes: any) => {
      const userInfo: UniApp.GetUserInfoRes = userInfoRes.detail;

      isLoading.value = true;
      if (step.value === 1) {
        try {
          await smsVerify.verifyPhone();
          step.value = 2;
        } catch (e) {
          console.log(e);
        }
      } else if (step.value === 2) {
        try {
          await profileVerify.verifyProfile(userInfo);
          showToast("验证成功", "success");
          await authService.getUserInfo();
          navigateBack();
        } catch (e) {
          console.log(e);
        }
      }
      isLoading.value = false;
    };

    const isAllowNextStep = computed(() => {
      if (step.value === 1) {
        return (
          smsVerify.smsForm.phone.length === 11 &&
          smsVerify.smsForm.code.length === 6
        );
      } else if (step.value === 2) {
        return (
          profileVerify.profileForm.name.length >= 2 &&
          profileVerify.profileForm.IDCard.length === 18
        );
      }
    });

    return {
      step,
      isAllowNextStep,
      handleNextStep,
      isLoading,
      ...smsVerify,
      ...profileVerify,
    };
  },
  onLoad(query) {
    if (query && query.step === "2") {
      step.value = 2;
    } else {
      step.value = 1;
    }
  },
  onUnload() {
    if (!store.getters.hasVolunteerInfo) {
      authService.logout();
    }
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
  transition: all 0.2s linear;
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
