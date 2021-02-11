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
            :class="{red: item.result && item.result > 0.8}"
          >
            {{ item.result && `${Math.round(item.result * 100)}%` }}
          </view>
          <view
            class="table-item table-item-time"
          >
            {{ item.time }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { requestGetFaceIdentificationRecords } from "@/api/mission";
import { Face, JavaList } from "@/api/types/models";
import { defineComponent, ref } from "vue";
import Empty from "@/components/Empty/index.vue";

const isLoading = ref(true);
const historyList = ref<JavaList<Face>>();

const getHistory = async (caseId: number) => {
  isLoading.value = true;
  uni.showNavigationBarLoading();
  try {
    const res = await requestGetFaceIdentificationRecords({ caseId });
    if (res.data.data) {
      historyList.value = res.data.data;
    }
  } catch (e) {
    console.log(e);
  }
  isLoading.value = false;
  uni.hideNavigationBarLoading();
};

const handlePreviewImage = (path: string) => {
  uni.previewImage({
    urls: path,
  });
};

export default defineComponent({
  components: { Empty },
  setup() {
    return {
      isLoading,
      historyList,
      handlePreviewImage,
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
    height: 96rpx;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;

    &:nth-child(even) {
      background-color: #e4e4e4;
    }
  }

  &-item {
    height: 96rpx;
    line-height: 96rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    justify-content: center;

    &-photo {
      width: 240rpx;

      .image {
        width: 200rpx;
        height: 200rpx;
        margin: 16rpx;
      }
    }

    &-similarity {
      min-width: 120rpx;
      flex: 1;

      &.red {
        color: $uni-color-primary;
      }
    }

    &-time {
      width: 260rpx;
    }
  }
}
</style>
