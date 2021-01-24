<template>
  <view>
    <u-cell-group>
      <u-cell-item
        title="头像"
        :value-style="{display: 'flex', flexDirection:'row-reverse', alignItems: 'center'}"
      >
        <image
          :src="userInfo.avatarUrl"
          style="object-fit: cover; width: 96rpx; height: 96rpx; border-radius: 100%;"
        />
      </u-cell-item>
      <u-cell-item
        title="姓名"
        :value="userInfo.volunteerInformation.name"
        :arrow="false"
        hover-class="none"
      />
      <picker
        :range="sexRange"
        :range-key="'name'"
        :value="userInfo.volunteerInformation.sex - 1"
        @change="handleSexPickerChange"
      >
        <u-cell-item
          title="性别"
          :value="userInfo.volunteerInformation.sex && (userInfo.volunteerInformation.sex === 1 ? '男' : '女')"
        />
      </picker>
      <u-cell-item
        title="生日"
        :value="birthDay"
        :arrow="false"
        hover-class="none"
      />
    </u-cell-group>
    <u-cell-group title=" ">
      <u-cell-item
        title="手机号"
        :value="userInfo.phone"
        @click="handleEditPhoneNumber"
      />
      <u-cell-item
        title="身份证号"
        :value="IDCardWithoutLastFour"
        :arrow="false"
        hover-class="none"
      />
    </u-cell-group>
    <u-cell-group title=" ">
      <u-cell-item
        title="加入时间"
        :value="userInfo.volunteerInformation.registerTime"
        :arrow="false"
        hover-class="none"
      />
      <u-cell-item
        title="加入时长"
        :value="registerTimeFromNow"
        :arrow="false"
        hover-class="none"
      />
      <picker
        mode="region"
        :value="addressArray"
        @change="handleAddressPickerChange"
      >
        <u-cell-item
          title="常居地"
          :value="address"
        />
      </picker>
      <!-- <u-cell-item
        title="个人简介"
        value="新版本"
      /> -->
    </u-cell-group>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import UCellGroup from "@/components/UCellGroup/index.vue";
import UCellItem from "@/components/UCellItem/index.vue";
import { useStore } from "vuex";
import dayjs from "@/utils/dayjs";
import { requestUpdateInformation } from "@/api/user";
import authService from "@/service/authService";
import {
  hideLoading,
  navigateTo,
  showLoading,
  showToast,
} from "@/utils/helper";
import { VolunteerInformation } from "@/api/types/models";

const editUserInfo = async (params: VolunteerInformation) => {
  showLoading("请稍候");
  try {
    await requestUpdateInformation(params);
    await authService.getUserInfo();
    showToast("修改成功", "success");
  } catch (e) {
    console.log(e);
    hideLoading();
  }
};

const useShowInfo = () => {
  const store = useStore();

  const userInfo = computed(() => {
    return store.getters.userInfo;
  });

  const registerTimeFromNow = computed(() => {
    const time: string =
      userInfo.value &&
      userInfo.value.volunteerInformation &&
      userInfo.value.volunteerInformation.registerTime;

    return dayjs(time).fromNow(true);
  });

  const birthDay = computed(() => {
    const IDCard: string =
      userInfo.value &&
      userInfo.value.volunteerInformation &&
      userInfo.value.volunteerInformation.idcard;

    return (
      IDCard &&
      IDCard.substring(6, 10) +
        "-" +
        IDCard.substring(10, 12) +
        "-" +
        IDCard.substring(12, 14)
    );
  });

  const IDCardWithoutLastFour = computed(() => {
    const IDCard: string =
      userInfo.value &&
      userInfo.value.volunteerInformation &&
      userInfo.value.volunteerInformation.idcard;

    return IDCard && IDCard.slice(0, 14).padEnd(18, "*");
  });

  const address = computed(() => {
    const province =
      userInfo.value &&
      userInfo.value.volunteerInformation &&
      userInfo.value.volunteerInformation.province;
    const city =
      userInfo.value &&
      userInfo.value.volunteerInformation &&
      userInfo.value.volunteerInformation.city;
    const district =
      userInfo.value &&
      userInfo.value.volunteerInformation &&
      userInfo.value.volunteerInformation.district;

    return province && city && district
      ? `${province} ${city} ${district}`
      : "";
  });

  const addressArray = computed(() => {
    const province =
      userInfo.value &&
      userInfo.value.volunteerInformation &&
      userInfo.value.volunteerInformation.province;
    const city =
      userInfo.value &&
      userInfo.value.volunteerInformation &&
      userInfo.value.volunteerInformation.city;
    const district =
      userInfo.value &&
      userInfo.value.volunteerInformation &&
      userInfo.value.volunteerInformation.district;

    return [province, city, district];
  });

  return {
    userInfo,
    registerTimeFromNow,
    birthDay,
    IDCardWithoutLastFour,
    address,
    addressArray,
  };
};

const useEditSex = () => {
  const sexRange = [
    {
      id: 1,
      name: "男",
    },
    {
      id: 2,
      name: "女",
    },
  ];

  const handleSexPickerChange = async (e: any) => {
    const index = parseInt(e.detail.value, 10);
    const sex = sexRange[index].id;

    await editUserInfo({ sex });
  };

  return { sexRange, handleSexPickerChange };
};

const useEditAddress = () => {
  const handleAddressPickerChange = async (e: any) => {
    const arr = e.detail.value;
    await editUserInfo({
      province: arr[0],
      city: arr[1],
      district: arr[2],
    });
  };

  return { handleAddressPickerChange };
};

export default defineComponent({
  components: { UCellGroup, UCellItem },
  setup() {
    const handleEditPhoneNumber = () => {
      navigateTo("/pages/editPhoneNumber/index");
    };

    return {
      ...useShowInfo(),
      ...useEditSex(),
      ...useEditAddress(),
      handleEditPhoneNumber,
    };
  },
});
</script>

<style lang="scss" scoped></style>
