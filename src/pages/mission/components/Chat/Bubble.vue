<template>
  <view class="bubble">
    {{ data && JSON.stringify(data) }}
  </view>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<any>,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>
