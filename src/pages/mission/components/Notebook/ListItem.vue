<template>
  <view class="list-item item">
    <view class="item__title">
      <view class="title">
        {{ data.title }}
      </view>
      <uni-icons
        v-if="isMyPost"
        type="more-filled"
        size="18"
        color="#999999"
        @tap="handleClickEdit"
      />
    </view>
    <view class="item__content">
      <view class="text">
        {{ data.content }}
      </view>
      <scroll-view
        scroll-x
        class="images"
      >
        <image
          v-for="(path, index) in images"
          :key="index"
          class="images-item"
          :src="path"
          mode="aspectFill"
          @click="handlePreviewPhoto(index)"
        />
      </scroll-view>
    </view>
    <view class="item__footer">
      <view class="author">
        {{ data.name }}
      </view>
      <view class="time">
        {{ data.createAt }}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { requestDeleteMemo } from "@/api/mission";
import { Memo } from "@/api/types/models";
import { ActionTypes } from "@/enums/actionTypes";
import {
  hideLoading,
  navigateTo,
  showLoading,
  showToast,
} from "@/utils/helper";
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    caseId: {
      type: Number,
      default: null,
    },
    data: {
      type: Object as PropType<Memo>,
      default: null,
    },
  },
  setup(props) {
    const store = useStore();

    const images = computed(() => {
      if (!props.data.imgUrl) return [];

      return JSON.parse(props.data.imgUrl);
    });

    const isMyPost = computed(() => {
      const myId = store.getters.userInfo.id;
      return props.data.role === "volunteer" && props.data.volunteerId === myId;
    });

    // 点击图片进行预览
    const handlePreviewPhoto = (index: number) => {
      uni.previewImage({
        urls: images.value,
        current: index.toString(),
      });
    };

    // 点击小圆点
    const handleClickEdit = () => {
      uni.showActionSheet({
        itemList: ["编辑", "删除"],
        success: (res: { tapIndex: number }) => {
          if (res.tapIndex === 0) {
            handleEdit();
          }
          if (res.tapIndex === 1) {
            handleDelete();
          }
        },
      });
    };

    const handleEdit = () => {
      navigateTo("/pages/editNote/index", {
        id: props.data.id,
        caseID: props.caseId,
      });
    };

    const handleDelete = async () => {
      showLoading();
      try {
        await requestDeleteMemo({
          memoId: props.data.id!,
        });
        store.dispatch(ActionTypes.getCurrentMissionNotes);
        showToast("删除成功", "success");
      } catch (e) {
        console.error(e);
      }
      hideLoading();
    };

    return {
      images,
      handlePreviewPhoto,
      isMyPost,
      handleClickEdit,
      handleEdit,
      handleDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-item {
  box-sizing: border-box;
  width: 670rpx;
  padding: 20rpx;
  border: 1rpx solid $uni-text-color-placeholder;
  border-radius: 2rpx;
  background-color: #ffffff;
  box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.2);
  margin-bottom: 16rpx;

  .item {
    &__title {
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      .title {
        flex: 1;
      }
    }

    &__content {
      margin-top: 16rpx;

      .images {
        width: 100%;
        margin-top: 8rpx;
        white-space: nowrap;

        &-item {
          border-radius: 10rpx;
          margin-right: 8rpx;
          width: 160rpx;
          height: 120rpx;
        }
      }
    }

    &__footer {
      margin-top: 16rpx;
      color: $uni-text-color-darkgrey;
      font-size: $uni-font-size-sm;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
