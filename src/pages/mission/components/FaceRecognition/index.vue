<template>
  <view class="face">
    <view class="title">
      请点击下方区域上传照片
    </view>
    <view
      v-if="!imagePath"
      class="photo photo-empty"
      @click="handleSelectImage"
    >
      <text
        class="iconfont icon-picture"
      />
    </view>
    <image
      v-if="imagePath"
      :src="imagePath"
      class="photo photo-preview"
      mode="aspectFit"
      @click="handleSelectImage"
    />
    <view class="actions">
      <u-button
        class="button"
        type="primary"
        shadow
        shape="circle"
        custom-style="width: 280rpx;"
        :loading="isChecking"
        @click="checkFace"
      >
        校验
      </u-button>
      <u-button
        class="button"
        type="success"
        shadow
        shape="circle"
        custom-style="width: 280rpx;"
        @click="handleClickHistory"
      >
        查看历史结果
      </u-button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import UButton from "@/components/UButton/index.vue";
import { Case } from "@/api/types/models";
import { requestUploadImage } from "@/api/common";
import {
  navigateTo,
  showModal,
  showModalError,
  showToast,
} from "@/utils/helper";
import { requestFaceIdentification } from "@/api/mission";

const useUpload = (caseId?: number) => {
  const imagePath = ref("");
  const isChecking = ref(false);

  const handleSelectImage = () => {
    uni.chooseImage({
      count: 1,
      success: ({ tempFilePaths }) => {
        imagePath.value = tempFilePaths[0];
      },
    });
  };

  const uploadImage = async (path: string) => {
    try {
      const uploadRes = await requestUploadImage(path);
      console.log(uploadRes);
      if (uploadRes.data.status !== 200 || !uploadRes.data.data) {
        throw Error("上传图片失败");
      }
      return uploadRes.data.data;
    } catch (e) {
      console.log(e);
      showModalError("上传图片失败");
    }
  };

  const checkFace = async () => {
    if (!imagePath.value) {
      showToast("请选择图片");
      return;
    }

    isChecking.value = true;
    try {
      const imgUrl = await uploadImage(imagePath.value);
      const res = await requestFaceIdentification({ imgUrl });
      if (!res.data.data) {
        showModalError("人脸识别失败");
      } else if (res.data.data.result! < 0.8) {
        showModal(
          "比对未通过",
          `人脸匹配率：${(res.data.data.result! * 100).toFixed(1)}%`
        );
      } else {
        showModal(
          "比对通过",
          `人脸信息比对成功，等待家属确认。（匹配率：${(
            res.data.data.result! * 100
          ).toFixed(1)}%）`
        );
        imagePath.value = "";
      }
    } catch (e) {
      console.log(e);
    }
    isChecking.value = false;
  };

  return {
    imagePath,
    handleSelectImage,
    checkFace,
    isChecking,
  };
};

export default defineComponent({
  components: { UButton },
  props: {
    data: {
      type: Object as PropType<Case>,
      default: null,
    },
  },
  setup(props) {
    const handleClickHistory = () => {
      if (!props.data?.oldMan?.id) return;

      navigateTo("/pages/faceRecognitionHistory/index", {
        oldManId: props.data.oldMan.id,
      });
    };

    return {
      ...useUpload(props.data.id),
      handleClickHistory,
    };
  },
});
</script>

<style lang="scss" scoped>
.face {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 34rpx;
    font-weight: 500;
    color: #000000;
    line-height: 48rpx;
  }

  .photo {
    margin-top: 48rpx;
    width: 432rpx;
    height: 576rpx;

    &-empty {
      background: #d8d8d8;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon-picture {
        color: #959595;
        font-size: 120rpx;
      }
    }
  }

  .actions {
    margin-top: 48rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .button {
      & + .button {
        margin-top: 32rpx;
      }
    }
  }
}
</style>
