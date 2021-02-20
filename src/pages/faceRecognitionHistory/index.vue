<template>
  <view>
    <view class="table">
      <view class="table-row">
        <view class="table-item table-item-photo">
          照片
        </view>
        <view class="table-item table-item-similarity">
          相似度
        </view>
        <view class="table-item table-item-time">
          上传时间
        </view>
      </view>
      <empty
        v-if="!isLoading && (!historyList || !historyList.length)"
        message="没有上传记录"
      />
      <view v-if="!isLoading && historyList && historyList.length">
        <view
          v-for="item in historyList"
          :key="item.id"
          class="table-row"
        >
          <view class="table-item table-item-photo">
            <image
              v-if="item.imgUrl"
              :src="item.imgUrl"
              class="image"
              mode="aspectFit"
              @click="handlePreviewImage(item.imgUrl ? item.imgUrl : '')"
            />
          </view>
          <view
            class="table-item table-item-similarity"
            :class="{red: item.result && item.result > 80}"
          >
            {{ item.result && `${item.result.toFixed(1)}%` }}
          </view>
          <view
            class="table-item table-item-time"
          >
            {{ item.time && parseDateTime(item.time.toString()) }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Face, JavaList } from "@/api/types/models";
import { computed, ComputedRef, defineComponent, ref } from "vue";
import Empty from "@/components/Empty/index.vue";
import { useTime } from "@/uses/useTime";
import store from "@/store";
import { ActionTypes } from "@/enums/actionTypes";
import { useStore } from "vuex";

const isLoading = ref(true);

const getHistory = async (caseId: number) => {
  isLoading.value = true;
  uni.showNavigationBarLoading();
  await store.dispatch(ActionTypes.getCurrentMissionFaceRecognitionHistories, {
    id: caseId,
  });
  isLoading.value = false;
  uni.hideNavigationBarLoading();
};

const handlePreviewImage = (path: string) => {
  uni.previewImage({
    urls: [path],
  });
};

export default defineComponent({
  components: { Empty },
  setup() {
    const store = useStore();

    const historyList: ComputedRef<JavaList<Face>> = computed(() => {
      return store.getters.currentMission.faceRecognitionHistory;
    });

    return {
      isLoading,
      historyList,
      handlePreviewImage,
      ...useTime(),
    };
  },
  onLoad(query: { id: string }) {
    getHistory(parseInt(query.id, 10));
  },
});
</script>

<style lang="scss" scoped>
.table {
  width: 750rpx;
  font-size: 32rpx;

  &-row {
    min-height: 96rpx;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:nth-child(even) {
      background-color: #e4e4e4;
    }
  }

  &-item {
    min-height: 96rpx;
    line-height: 96rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    justify-content: center;

    &-photo {
      width: 232rpx;

      .image {
        width: 200rpx;
        height: 200rpx;
        margin: 16rpx;
      }
    }

    &-similarity {
      min-width: 60rpx;
      flex: 1;

      &.red {
        color: $uni-color-primary;
      }
    }

    &-time {
      width: 350rpx;
    }
  }
}
</style>
