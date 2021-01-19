<template>
  <view>
    <top />
    <view class="actions">
      <u-button
        type="primary"
      >
        112233
      </u-button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UButton from "@/components/UButton/index.vue";
import Top from "./components/Top/index.vue";

export default defineComponent({
  components: { UButton, Top },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.actions {
  margin-top: 60px;
  text-align: center;
}
</style>
