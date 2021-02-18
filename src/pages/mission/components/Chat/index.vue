<template>
  <view class="body">
    <scroll-view
      v-if="messageList && messageList.length"
      class="conversation"
      :style="{height: `calc(${windowHeight*0.8}px - env(safe-area-inset-bottom) - 186rpx - 30rpx)`}"
      scroll-y
      scroll-anchoring
      scroll-with-animation
      :scroll-into-view="latestMessageID"
      @scrolltoupper="handleLoadPrevious"
    >
      <view style="padding: 24rpx 0; box-sizing: border-box;">
        <view
          v-for="item in messageList"
          :id="`message-${item.ID.slice(10)}`"
          :key="item.ID"
          class="message"
        >
          <bubble :data="item" />
        </view>
      </view>
    </scroll-view>
    <view class="bottom">
      <bottom :data="data" />
    </view>
  </view>
</template>

<script lang="ts">
import { Case } from "@/api/types/models";
import { getMessageList } from "@/service/timService";
import { defineComponent, PropType, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import Bottom from "./Bottom.vue";
import Bubble from "./Bubble.vue";

const latestMessageID = ref("");

const handleLoadPrevious = async () => {
  try {
    const res = await getMessageList();
    latestMessageID.value = `message-${res.data.messageList[
      res.data.messageList.length - 1
    ].ID.slice(10)}`;
  } catch (e) {
    console.log(e);
  }
};

export default defineComponent({
  components: { Bottom, Bubble },
  props: {
    data: {
      type: Object as PropType<Case>,
      default: null,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();

    const windowHeight = uni.getSystemInfoSync().windowHeight;

    const messageList = computed(() => {
      return store.getters.tim.currentMessageList;
    });

    const scrollToBottom = () => {
      if (!messageList.value || !messageList.value.length) return;

      latestMessageID.value = `message-0`;
      setTimeout(() => {
        latestMessageID.value = `message-${messageList.value[
          messageList.value.length - 1
        ].ID.slice(10)}`;
      }, 300);
    };

    watch(messageList, () => {
      console.debug(messageList);
      if (!messageList.value || !messageList.value.length) return;

      latestMessageID.value = `message-${messageList.value[
        messageList.value.length - 1
      ].ID.slice(10)}`;
    });

    watch(
      () => props.show,
      () => {
        scrollToBottom();
      }
    );

    return { windowHeight, messageList, latestMessageID, handleLoadPrevious };
  },
});
</script>

<style lang="scss" scoped>
.body {
  position: relative;

  .bottom {
    position: fixed;
    bottom: 0;
  }
}
</style>
