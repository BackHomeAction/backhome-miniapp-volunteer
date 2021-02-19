<template>
  <view class="body">
    <scroll-view
      v-if="messageList && messageList.length"
      class="conversation"
      :style="{height: `calc(${windowHeight*0.8}px - env(safe-area-inset-bottom) - 130rpx - 30rpx - ${showVolunteerDetail ? '152rpx' : '0px'})`}"
      scroll-y
      scroll-anchoring
      scroll-with-animation
      :scroll-into-view="latestMessageID"
      @scrolltoupper="handleLoadPrevious"
      @tap.stop="handleHideVolunteerDetail"
    >
      <view style="padding: 24rpx 0; box-sizing: border-box;">
        <view
          v-for="(item, index) in messageList"
          :id="`message-${item.ID.slice(10)}`"
          :key="item.ID"
          class="message"
        >
          <view
            v-if="index === 0 || item.newtime !== messageList[index - 1].newtime"
            class="message-time"
          >
            {{ item.newtime }}
          </view>
          <bubble
            :data="item"
            @click-avatar="handleShowVolunteerDetail"
          />
        </view>
      </view>
    </scroll-view>
    <view
      class="bottom"
      :style="{'padding-bottom': showVolunteerDetail ? `calc(152rpx + env(safe-area-inset-bottom))` : 'env(safe-area-inset-bottom)'}"
    >
      <chat-input :data="data" />
      <volunteers
        :data="data"
        @selected="handleShowVolunteerDetail" 
      />
      <volunteer-detail
        :show="showVolunteerDetail"
        :volunteer="volunteerInfo"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { Case, Volunteer } from "@/api/types/models";
import { getMessageList } from "@/service/timService";
import { defineComponent, PropType, computed, ref, watch, Ref } from "vue";
import { useStore } from "vuex";
import Volunteers from "./Volunteers.vue";
import VolunteerDetail from "./VolunteerDetail.vue";
import ChatInput from "./ChatInput.vue";
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

const useVolunteerDetail = () => {
  const showVolunteerDetail = ref(false);
  const volunteerInfo: Ref<Volunteer | null> = ref(null);

  const handleShowVolunteerDetail = (volunteer: Volunteer) => {
    if (volunteerInfo.value && volunteerInfo.value === volunteer) {
      // 点击的就是已展开的，则自动收回
      handleHideVolunteerDetail();
      return;
    }
    volunteerInfo.value = volunteer;
    showVolunteerDetail.value = true;
  };

  const handleHideVolunteerDetail = () => {
    volunteerInfo.value = null;
    showVolunteerDetail.value = false;
  };

  return {
    showVolunteerDetail,
    volunteerInfo,
    handleShowVolunteerDetail,
    handleHideVolunteerDetail,
  };
};

export default defineComponent({
  components: { Volunteers, VolunteerDetail, ChatInput, Bubble },
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

    return {
      windowHeight,
      messageList,
      latestMessageID,
      handleLoadPrevious,
      ...useVolunteerDetail(),
    };
  },
});
</script>

<style lang="scss" scoped>
.body {
  position: fixed;
  bottom: 0;

  .message {
    &-time {
      display: flex;
      justify-content: center;
      font-size: 24rpx;
      color: #999898;
      margin-bottom: 36rpx;
    }
  }

  .bottom {
    background: #f8f8f8;
    position: relative;
    transition: padding 0.3s ease-in-out;
  }
}
</style>
