<template>
  <view class="box">
    <view
      class="header"
    >
      <view
        v-if="getHoursFromTime(data.startTime) <= 24"
        class="badge badge--red"
      >
        紧急
      </view>
      <view
        v-if="getHoursFromTime(data.startTime) > 24 && getHoursFromTime(data.startTime) <= 48"
        class="badge badge--yellow"
      >
        优先
      </view>
      <view
        v-if="getHoursFromTime(data.startTime) > 48"
        class="badge badge--green"
      >
        正常
      </view>
    </view>
    <view
      v-if="data.oldMan"
      class="content"
    >
      <view class="man">
        <image
          class="man-photo"
          :src="data.oldMan.identificationPhoto"
          mode="aspectFill"
        />
        <view class="man-info">
          <view class="man-info-row">
            <view class="man-info-row-name">
              {{ data.oldMan.name }}
            </view>
            <view class="man-info-row-age">
              {{ manAge }} 岁
            </view>
          </view>
          <view
            class="man-info-row"
            style="margin: 16rpx 0 8rpx 0"
          >
            <view class="man-info-row-address">
              {{ `${data.city}·${data.district}` }}
            </view>
            <view
              class="man-info-row-showmore"
              @click="handleClickShowmore"
            >
              查看更多
              <text
                class="iconfont icon-arrow-right"
              />
            </view>
          </view>
        </view>
      </view>
      <view class="divider" />
      <view class="description">
        <view class="description-row">
          <view class="description-row-icon icon-time" />
          <view class="description-row-time">
            {{ data.startTime && getCalendarTime(data.startTime) }}
          </view>
        </view>
        <view
          class="description-row"
          style="margin-top: 16rpx;"
        >
          <view class="description-row-icon icon-point" />
          <view class="description-row-address">
            走失于 {{ data.place }}
          </view>
          <view
            v-if="currentLocation && currentLocation.longitude && currentLocation.latitude && data.longitude && data.latitude"
            class="description-row-distance"
          >
            距离 {{ (getDistanceFromMe([data.longitude, data.latitude], "km")).toFixed(1) }} km
          </view>
        </view>
      </view>
      <view
        class="divider"
        style="margin-bottom: 0"
      />
      <view class="action">
        <view
          v-if="status === 'checked'"
          class="action-text"
          @click="handleClickEnterMission"
        >
          进入搜救
          <text
            class="iconfont icon-arrow-right"
          />
        </view>
        <u-button
          v-if="status === 'unchecked'"
          type="primary"
          size="mini"
          shape="circle"
          class="action-button"
          custom-style="height: 42rpx; line-height: 42rpx; padding: 0 30rpx"
          @click="showRefuseModal = true"
        >
          拒绝
        </u-button>
        <u-button
          v-if="status === 'unchecked'"
          type="success"
          size="mini"
          shape="circle"
          class="action-button"
          custom-style="height: 42rpx; line-height: 42rpx; padding: 0 30rpx"
          @click="showAcceptModal = true"
        >
          接受
        </u-button>
      </view>
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
    <u-modal
      v-model="showRefuseModal"
      title="请确认"
      content="是否确认拒绝该任务？"
      :async-close="true"
      show-cancel-button
      @confirm="handleRefuse"
    />
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { useTime } from "@/uses/useTime";
import UButton from "@/components/UButton/index.vue";
import { navigateTo, showToast } from "@/utils/helper";
import { Case } from "@/api/types/models";
import dayjs from "@/utils/dayjs";
import UModal from "@/components/UModal/index.vue";
import { ActionTypes } from "@/enums/actionTypes";
import { useStore } from "vuex";
import DataCheckbox from "@/components/DataCheckbox/index.vue";
import FormItem from "@/components/FormItem/index.vue";
import { useLocation } from "@/uses/useLocation";

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

const useTask = (item: Case) => {
  const store = useStore();
  const showAcceptModal = ref(false);
  const showRefuseModal = ref(false);

  const acceptForm = reactive({
    equipment: 1,
    traffic: "驾车",
  });

  const handleAccept = async () => {
    try {
      await store.dispatch(ActionTypes.acceptMission, {
        item,
        equipment: acceptForm.equipment,
        traffic: acceptForm.traffic,
      });
      showToast("接受成功", "success");
    } catch (e) {
      console.log(e);
    }
    showAcceptModal.value = false;
  };

  const handleRefuse = async () => {
    try {
      await store.dispatch(ActionTypes.refuseMission, { item });
      showToast("拒绝成功", "success");
    } catch (e) {
      console.log(e);
    }
    showRefuseModal.value = false;
  };

  return {
    showAcceptModal,
    showRefuseModal,
    handleAccept,
    handleRefuse,
    acceptForm,
    equipmentStatusRange,
    trafficStatusRange,
  };
};

export default defineComponent({
  components: { UButton, UModal, DataCheckbox, FormItem },
  props: {
    data: {
      type: Object as PropType<Case>,
      default: undefined,
    },
    status: {
      type: String as PropType<"checked" | "unchecked">,
      default: "unchecked",
    },
  },
  setup(props) {
    const handleClickShowmore = () => {
      navigateTo("/pages/missionInformation/index", { id: props.data.id });
    };

    const handleClickEnterMission = () => {
      navigateTo("/pages/mission/index", { id: props.data.id });
    };

    // 计算案发天数
    const getHoursFromTime = (time: string) => {
      return dayjs().diff(time, "hour");
    };

    // 计算年龄
    const manAge = computed(() => {
      return parseInt(dayjs(props?.data?.oldMan?.birthDate).fromNow(), 10);
    });

    return {
      ...useTime(),
      handleClickShowmore,
      handleClickEnterMission,
      manAge,
      ...useTask(props.data),
      ...useLocation(),
      getHoursFromTime,
    };
  },
});
</script>


<style lang="scss" scoped>
.box {
  box-sizing: border-box;
  width: 686rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  margin-bottom: 48rpx;
}

.divider {
  margin: 20rpx 0;
  background-color: #e4e4e4;
  display: block;
  width: 100%;
  height: 1px;
  transform: scale(1, 0.5);
}

.header {
  height: 32rpx;
  display: flex;
  justify-content: flex-end;

  .badge {
    width: 96rpx;
    height: 32rpx;
    background: #ffa36c;
    border-radius: 10rpx 10rpx 10rpx 0rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20rpx;
    font-weight: 400;
    color: #303133;
    line-height: 28rpx;
    color: #ffffff;

    &--red {
      background: #f5222d;
    }
    &--yellow {
      background: #ffa36c;
    }
    &--green {
      background: #799351;
    }
  }
}

.content {
  padding: 0 20rpx;

  .man {
    padding: 0 10rpx;
    width: 100%;
    display: flex;
    align-items: flex-end;

    &-photo {
      width: 100rpx;
      height: 100rpx;
      border-radius: 100%;
    }

    &-info {
      margin-left: 32rpx;
      display: flex;
      flex-direction: column;

      &-row {
        display: flex;
        align-items: flex-end;

        &-name {
          font-size: 32rpx;
          font-weight: 400;
          color: #000000;
          line-height: 1;
        }

        &-age {
          margin-left: 24rpx;
          font-size: 20rpx;
          font-weight: 400;
          color: #666666;
          line-height: 1;
        }

        &-address {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 12rpx;
          height: 32rpx;
          background: #409eff;
          border-radius: 16rpx;
          color: #ffffff;
          font-size: 16rpx;
        }

        &-showmore {
          margin-left: 16rpx;
          box-sizing: border-box;
          height: 32rpx;
          border-radius: 10rpx;
          border: 2rpx solid #979797;
          font-size: 16rpx;
          font-weight: 400;
          color: #000000;
          display: flex;
          padding: 0 9rpx 0 18rpx;
          display: flex;
          align-items: center;

          .icon-arrow-right {
            font-size: 28rpx;
            font-weight: normal;
            color: #979797;
            line-height: 28rpx;
          }
        }
      }
    }
  }

  .description {
    padding: 0 10rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 24rpx;
    font-weight: 400;
    color: #000000;
    line-height: 1;

    &-row {
      display: flex;
      align-items: center;
      width: 100%;

      &-icon {
        width: 20rpx;
        height: 20rpx;
        margin-right: 16rpx;

        &.icon-time {
          background-image: url("@/static/images/myMission/time.png");
          background-size: cover;
          background-position: 50% 50%;
        }

        &.icon-point {
          border-radius: 100%;
          background: #ffa36c;
        }
      }

      &-distance {
        color: #666666;
        margin-left: 16rpx;
      }
    }
  }

  .action {
    padding: 8rpx 0 10rpx 10rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 48rpx;

    &-text {
      font-size: 24rpx;
      font-weight: 400;
      color: #000000;
      display: flex;
      align-items: center;
      height: 45rpx;
      line-height: 45rpx;

      .icon-arrow-right {
        line-height: 45rpx;
      }
    }

    &-button {
      margin-left: 16rpx;
    }
  }
}
</style>
