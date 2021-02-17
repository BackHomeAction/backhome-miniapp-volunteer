<template>
  <view class="bottom">
    <view class="volunteers">
      volunteers
    </view>
    <view class="edit">
      <view class="image">
        <view class="icon" />
      </view>
      <textarea
        v-model="inputText"
        class="input"
        placeholder="输入消息…"
        auto-height
        confirm-type="send"
        :maxlength="-1"
        disable-default-padding
        @confirm="handleConfirmInput"
      />
      <u-button
        class="send"
        :disabled="!inputText"
        size="mini"
        type="primary"
        custom-style="height: 62rpx; line-height: 62rpx; padding: 0 24rpx; margin-left: 16rpx;"
        @click="sendTextMessage"
      >
        发送
      </u-button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import UButton from "@/components/UButton/index.vue";
import tim from "@/utils/tim";
import TIM from "tim-wx-sdk";
import { Case } from "@/api/types/models";
import { useStore } from "vuex";

const inputText = ref("");

const useInput = () => {
  const isIOS = () => {
    return uni.getSystemInfoSync().platform === "ios";
  };

  const handleConfirmInput = (e: any) => {
    console.log(e);
  };

  return { inputText, isIOS, handleConfirmInput };
};

const useChat = (data: Case) => {
  const store = useStore();

  const sendTextMessage = async () => {
    const message = tim.createTextMessage({
      to: store.getters.tim.groupIDsMap.get(`case_${data.id}`),
      conversationType: TIM.TYPES.CONV_GROUP,
      payload: {
        text: inputText.value,
      },
    });
    tim.sendMessage(message);
  };

  return { sendTextMessage };
};

export default defineComponent({
  components: { UButton },
  props: {
    data: {
      type: Object as PropType<Case>,
      default: null,
    },
  },
  setup(props) {
    return { ...useInput(), ...useChat(props.data) };
  },
});
</script>

<style lang="scss" scoped>
.volunteers {
  width: 750rpx;
  height: 100rpx;
  background: #f8f8f8;
}

.edit {
  width: 750rpx;
  min-height: 80rpx;
  background: #f8f8f8;
  border: 1rpx solid #dddddd;
  display: flex;
  padding: 10rpx 16rpx;
  box-sizing: border-box;
  align-items: flex-end;

  .image {
    box-sizing: border-box;
    padding-right: 24rpx;

    .icon {
      width: 56rpx;
      height: 56rpx;
      background-image: url("@/static/images/chat/image.png");
      background-size: cover;
    }
  }

  .input {
    flex: 1;
    background: #ffffff;
    border-radius: 8rpx;
    border: 2rpx solid #dddddd;
    padding: 10rpx;
    line-height: 36rpx;
  }
}
</style>
