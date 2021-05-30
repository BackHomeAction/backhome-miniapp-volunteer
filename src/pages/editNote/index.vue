<template>
  <view class="body">
    <u-form>
      <u-form-item
        label="标题"
        required
      >
        <u-input
          v-model="form.title"
          placeholder="请输入标题"
        />
      </u-form-item>
      <u-form-item
        label="内容"
        required
      >
        <u-text-area
          v-model="form.content"
          placeholder="请输入内容"
        />
      </u-form-item>
      <u-form-item
        label="图片"
        border-bottom
        custom-style="padding-right: 0"
      >
        <scroll-view scroll-x>
          <view style="display: flex;">
            <photo-uploader
              :photos="photos"
              :max-upload="8"
              label="点击上传图片"
              @change="handlePhotoUploaded"
            />
          </view>
        </scroll-view>
      </u-form-item>
    </u-form>
    <view class="actions">
      <u-button
        type="primary"
        shadow
        shape="circle"
        :loading="isSaving"
        @click="handleSubmit"
      >
        保存
      </u-button>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref } from "vue";
import PhotoUploader from "@/components/PhotoUploader/index.vue";
import UButton from "@/components/UButton/index.vue";
import UForm from "@/components/UForm/index.vue";
import UFormItem from "@/components/UFormItem/index.vue";
import UInput from "@/components/UFormItem/components/UInput/index.vue";
import UTextArea from "@/components/UFormItem/components/UTextArea/index.vue";
import {
  hideLoading,
  navigateBack,
  showLoading,
  showModalSuccess,
  showModalError,
  showToast,
} from "@/utils/helper";
import { requestAddMemo, requestEditMemo, requestGetMemo } from "@/api/mission";
import { useStore } from "vuex";
import { ActionTypes } from "@/enums/actionTypes";

const DEFAULT_FORM = {
  title: "",
  content: "",
  imgUrl: "",
  isGlobal: 2,
};
const form = reactive({ ...DEFAULT_FORM });
const caseID = ref(0);
const editingID = ref(0);

const getInfo = async () => {
  showLoading();
  try {
    const res = await requestGetMemo({
      id: editingID.value,
    });
    form.title = res.data.data[0].title;
    form.content = res.data.data[0].content;
    form.imgUrl = res.data.data[0].imgUrl;
  } catch (e) {
    console.log(e);
  }
  hideLoading();
};

export default defineComponent({
  components: {
    PhotoUploader,
    UButton,
    UForm,
    UFormItem,
    UInput,
    UTextArea,
  },
  setup() {
    const store = useStore();
    const isSaving = ref(false);

    const handleSubmit = async () => {
      if (!form.title) {
        showToast("请输入标题");
        return;
      }
      if (!form.content) {
        showToast("请输入内容");
        return;
      }

      isSaving.value = true;
      try {
        if (editingID.value) {
          // 编辑
          await requestEditMemo({
            ...form,
            caseId: caseID.value,
            id: editingID.value,
          });
        } else {
          // 新建
          await requestAddMemo({ ...form, caseId: caseID.value });
        }
        store.dispatch(ActionTypes.getCurrentMissionNotes);
        await showModalSuccess("保存成功");
        navigateBack();
      } catch (e) {
        console.error(e);
      }
      isSaving.value = false;
    };

    const photos = computed(() => {
      try {
        return JSON.parse(form.imgUrl);
      } catch (e) {
        return [];
      }
    });

    const handlePhotoUploaded = (photoList: Array<string>) => {
      form.imgUrl = JSON.stringify(photoList);
    };

    return { isSaving, form, handleSubmit, photos, handlePhotoUploaded };
  },
  onLoad(query: { id: string; caseID: string }) {
    if (query.caseID) {
      caseID.value = parseInt(query.caseID, 10);
    } else {
      showModalError("请选择案件").then(() => {
        navigateBack();
      });
    }

    if (query.id) {
      editingID.value = parseInt(query.id, 10);
      uni.setNavigationBarTitle({
        title: "编辑工作簿",
      });
      getInfo();
    } else {
      editingID.value = 0;
      uni.setNavigationBarTitle({
        title: "新建工作簿",
      });
    }
  },
  onUnload() {
    Object.assign(form, DEFAULT_FORM);
  },
});
</script>

<style lang="scss" scoped>
.body {
  box-sizing: border-box;
  padding-bottom: 60rpx;
}

.actions {
  box-sizing: border-box;
  margin-top: 40rpx;
  text-align: center;
}
</style>
