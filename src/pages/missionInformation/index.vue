<template>
  <view class="body safe-area-inset-bottom">
    <mission-information
      v-if="caseInfo"
      :data="caseInfo"
    />
    <view
      v-if="caseInfo"
      class="action"
    >
      <u-button
        v-if="checkIsInMission(caseInfo.id ? caseInfo.id : 0)"
        type="success"
        shadow
        shape="circle"
        @click="handleClickEnterMission"
      >
        进入搜救
      </u-button>
      <u-button
        v-if="!checkIsInMission(caseInfo.id ? caseInfo.id : 0)"
        type="primary"
        shadow
        shape="circle"
        @click="showAcceptModal = true"
      >
        加入任务
      </u-button>
    </view>

    <u-modal
      v-model="showAcceptModal"
      title="请补充信息"
      :async-close="true"
      show-cancel-button
      @confirm="handleAccept"
    >
      <form-item
        label="装备"
        :label-width="70"
      >
        <data-checkbox
          v-model="acceptForm.equipment"
          :localdata="equipmentStatusRange"
        />
      </form-item>
      <form-item
        label="交通"
        :label-width="70"
      >
        <data-checkbox
          v-model="acceptForm.traffic"
          :localdata="trafficStatusRange"
        />
      </form-item>
    </u-modal>
  </view>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  reactive,
  Ref,
  ref,
} from "vue";
import MissionInformation from "@/components/MissionInformation/index.vue";
import { Case } from "@/api/types/models";
import { requestGetCases } from "@/api/mission";
import { useStore } from "vuex";
import UButton from "@/components/UButton/index.vue";
import { navigateTo, showToast } from "@/utils/helper";
import { ActionTypes } from "@/enums/actionTypes";
import UModal from "@/components/UModal/index.vue";
import DataCheckbox from "@/components/DataCheckbox/index.vue";
import FormItem from "@/components/FormItem/index.vue";

const caseInfo: Ref<Case | null> = ref({});

const isLoading = ref(true);

const getCaseInfo = async (id: number) => {
  uni.showNavigationBarLoading();
  isLoading.value = true;
  try {
    const res = await requestGetCases({ id });
    if (res.data.data) {
      caseInfo.value = res.data.data[0];
      console.debug(caseInfo.value);
    }
  } catch (e) {
    console.log(e);
  }
  uni.hideNavigationBarLoading();
  isLoading.value = false;
};

const useTask = () => {
  const equipmentStatusRange = [
    {
      value: 1,
      text: "齐全",
    },
    {
      value: 2,
      text: "不齐全",
    },
  ];

  const trafficStatusRange = [
    {
      value: "驾车",
      text: "驾车",
    },
    {
      value: "骑行",
      text: "骑行",
    },
    {
      value: "步行",
      text: "步行",
    },
  ];

  const store = useStore();
  const showAcceptModal = ref(false);

  const acceptForm = reactive({
    equipment: 1,
    traffic: "驾车",
  });

  const handleAccept = async () => {
    try {
      await store.dispatch(ActionTypes.acceptMission, {
        item: caseInfo.value,
        equipment: acceptForm.equipment,
        traffic: acceptForm.traffic,
      });
      showToast("接受成功", "success");
    } catch (e) {
      console.log(e);
    }
    showAcceptModal.value = false;
  };

  return {
    showAcceptModal,
    handleAccept,
    acceptForm,
    equipmentStatusRange,
    trafficStatusRange,
  };
};

export default defineComponent({
  components: { MissionInformation, UButton, UModal, DataCheckbox, FormItem },
  setup() {
    const store = useStore();

    // 我加入的任务的 id 集合
    const myMissionIDs: ComputedRef<Set<number>> = computed(() => {
      return store.getters.myMissionIDs;
    });
    // 判断是否已加入该任务
    const checkIsInMission = (id: number) => {
      return myMissionIDs.value.has(id);
    };

    const handleClickEnterMission = () => {
      navigateTo("/pages/mission/index", { id: caseInfo?.value?.id });
    };

    return {
      caseInfo,
      checkIsInMission,
      handleClickEnterMission,
      ...useTask(),
    };
  },
  onLoad(option) {
    if (option && option.id) {
      getCaseInfo(option.id);
    }
  },
});
</script>

<style lang="scss" scoped>
.body {
  padding-bottom: 40rpx;
}

.action {
  margin-top: 30rpx;
  display: flex;
  justify-content: center;
}
</style>
