<template>
  <view>
    <view class="volunteers">
      <image
        v-for="item in teamMembers"
        :key="item.id"
        :src="item.avatarUrl"
        class="item"
        @tap="handleClickVolunteer(item)"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType } from "vue";
import { Case, Volunteer } from "@/api/types/models";
import { useStore } from "vuex";

const useList = () => {
  const store = useStore();

  const teamMembers: ComputedRef<Volunteer> = computed(() => {
    return store.getters.currentMission.teamMembers;
  });

  return { teamMembers };
};

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Case>,
      default: null,
    },
  },
  emits: ["selected"],
  setup(props, { emit }) {
    const handleClickVolunteer = (item: Volunteer) => {
      emit("selected", item);
    };
    return { ...useList(), handleClickVolunteer };
  },
});
</script>

<style lang="scss" scoped>
.volunteers {
  box-sizing: border-box;
  width: 750rpx;
  height: 76rpx;
  background: #f8f8f8;
  padding: 0 68rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .item {
    width: 60rpx;
    height: 60rpx;
    border-radius: 100%;
  }
}
</style>
