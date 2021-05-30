<template>
  <view class="notebook">
    <view class="notebook__nav nav">
      <view
        class="nav__item"
        :class="{active: current === 1}"
        @click="current = 1"
      >
        案件工作簿 ({{ missionNote.length }})
      </view>
      <view
        class="nav__item"
        :class="{active: current === 2}"
        @click="current = 2"
      >
        共享工作簿 ({{ globalNote.length }})
      </view>
    </view>
    <view class="notebook__content">
      <view
        v-if="current === 1"
        class="list"
      >
        <view
          class="add"
          @tap="handleNew"
        >
          <uni-icons
            type="plus"
            size="24"
            color="#409eff"
          />
          <text style="margin-left: 8rpx">
            添加
          </text>
        </view>
        <list-item
          v-for="item in missionNote"
          :key="item.id"
          :data="item"
          :case-id="currentMission.missionInfo.id"
        />
      </view>
      <view
        v-if="current === 2"
        class="list"
      >
        <list-item
          v-for="item in globalNote"
          :key="item.id"
          :data="item"
          :case-id="currentMission.missionInfo.id"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { ActionTypes } from "@/enums/actionTypes";
import { ICurrentMission } from "@/store/types";
import { navigateTo } from "@/utils/helper";
import { computed, ComputedRef, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ListItem from "./ListItem.vue";

export default defineComponent({
  components: { ListItem },
  setup() {
    const store = useStore();
    const current = ref(1); // 1案件 2全局

    onMounted(() => {
      store.dispatch(ActionTypes.getCurrentMissionNotes);
    });

    // 这个案件
    const currentMission: ComputedRef<ICurrentMission> = computed(() => {
      return store.getters.currentMission;
    });

    const missionNote = computed(() => {
      if (!currentMission.value) return [];

      return currentMission.value.notes.filter((ele) => {
        return ele.isGlobal === 2;
      });
    });

    const globalNote = computed(() => {
      if (!currentMission.value) return [];

      return currentMission.value.notes.filter((ele) => {
        return ele.isGlobal === 1;
      });
    });

    const handleNew = () => {
      navigateTo("/pages/editNote/index", {
        caseID: currentMission.value.missionInfo!.id,
      });
    };

    return { currentMission, missionNote, globalNote, current, handleNew };
  },
});
</script>

<style lang="scss" scoped>
.notebook {
  padding-top: 10rpx;
  background-color: #ffffff;

  &__nav {
    display: flex;
    justify-content: space-around;
    color: $uni-text-color-darkgrey;

    .active {
      color: #000000;
      font-weight: bold;
    }
  }

  &__content {
    margin-top: 20rpx;

    .list {
      padding: 40rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .add {
        font-size: $uni-font-size-lg;
        color: $u-type-func;
        margin: -20rpx 0 20rpx 0;
      }
    }
  }
}
</style>
