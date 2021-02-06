<template>
  <view class="body">
    <mission-information
      v-if="caseInfo"
      :data="caseInfo"
    />
  </view>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import MissionInformation from "@/components/MissionInformation/index.vue";
import { Case } from "@/api/types/models";
import { requestGetCases } from "@/api/mission";

const caseInfo: Ref<Case | null> = ref({});

const isLoading = ref(true);

const getCaseInfo = async (id: number) => {
  try {
    const res = await requestGetCases({ id });
    if (res.data.data) {
      caseInfo.value = res.data.data[0];
      console.debug(caseInfo.value);
    }
  } catch (e) {
    console.log(e);
  }

  uni.showNavigationBarLoading();
  isLoading.value = true;
  uni.hideNavigationBarLoading();
  isLoading.value = false;
};

export default defineComponent({
  components: { MissionInformation },
  setup() {
    return { caseInfo };
  },
  onLoad(option) {
    if (option && option.id) {
      getCaseInfo(option.id);
    }
  },
});
</script>

<style lang="scss" scoped></style>
