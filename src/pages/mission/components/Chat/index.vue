<template>
  <view class="body">
    <scroll-view
      class="conversation"
      :style="{height: `calc(${windowHeight*0.8}px - env(safe-area-inset-bottom) - 186rpx - 30rpx)`}"
      scroll-y
      scroll-anchoring
    >
      <view
        v-for="item in messageList"
        :key="item.ID"
        class="message"
      >
        <bubble :data="item" />
      </view>
    </scroll-view>
    <view class="bottom">
      <bottom :data="data" />
    </view>
  </view>
</template>

<script lang="ts">
import { Case } from "@/api/types/models";
import { defineComponent, PropType, computed } from "vue";
import { useStore } from "vuex";
import Bottom from "./Bottom.vue";
import Bubble from "./Bubble.vue";

export default defineComponent({
  components: { Bottom, Bubble },
  props: {
    data: {
      type: Object as PropType<Case>,
      default: null,
    },
  },
  setup() {
    const store = useStore();

    const windowHeight = uni.getSystemInfoSync().windowHeight;

    const messageList = computed(() => {
      console.log(store.getters.tim.currentMessageList);
      return store.getters.tim.currentMessageList;
    });

    return { windowHeight, messageList };
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
