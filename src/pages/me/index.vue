<template>
  <view>
    <top />
    <view class="actions">
      <u-button
        v-if="logged"
        type="primary"
        @click="handleLogout"
      >
        退出登录
      </u-button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import UButton from "@/components/UButton/index.vue";
import Top from "./components/Top/index.vue";
import { useStore } from "vuex";
import authService from "@/service/authService";

export default defineComponent({
  components: { UButton, Top },
  setup() {
    const store = useStore();
    console.log(store);

    const logged = computed(() => {
      return store.getters.logged;
    });

    const handleLogout = () => {
      authService.logout();
    };

    return { logged, handleLogout };
  },
});
</script>

<style lang="scss" scoped>
.actions {
  margin-top: 60px;
  text-align: center;
}
</style>
