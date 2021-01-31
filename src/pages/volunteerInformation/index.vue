<template>
  <view v-if="!isLoading">
    <view
      class="background"
      :class="[`background--${backgroundColor}`]"
    />
    <view
      class="box"
    >
      <volunteer-information-box
        status="user"
        :user-info="information"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { requestGetVolunteerByID } from "@/api/volunteer";
import { defineComponent } from "vue";
import VolunteerInformationBox from "@/components/VolunteerInformationBox/index.vue";

const backgroundColorList = ["gray", "orange", "green"];

export default defineComponent({
  components: { VolunteerInformationBox },
  setup() {
    return {};
  },
  data() {
    return {
      isLoading: false,
      information: {},
      backgroundColor: "gray",
    };
  },
  mounted() {
    this.setBackgroundColor();
  },
  methods: {
    setBackgroundColor() {
      // 随机设置一种背景颜色
      const index = Math.floor(Math.random() * backgroundColorList.length);
      this.backgroundColor = backgroundColorList[index];
    },
    async getVolunteerInfo(informationID: number) {
      uni.showNavigationBarLoading();
      this.isLoading = true;
      try {
        const res = await requestGetVolunteerByID({
          informationId: informationID,
        });
        if (res.data.data) {
          this.information = res.data.data;
        }
        console.log(this.information);
      } catch (e) {
        console.log(e);
      }
      uni.hideNavigationBarLoading();
      this.isLoading = false;
    },
  },
  onLoad(query: { informationID: string }) {
    this.getVolunteerInfo(parseInt(query.informationID, 10));
  },
});
</script>

<style lang="scss" scoped>
.box {
  margin-top: 120rpx;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 750rpx;
  height: 432rpx;
  clip-path: circle(700rpx at 375rpx -250rpx);
  z-index: -1;

  &--gray {
    background: #666666;
  }
  &--orange {
    background: #fea36d;
  }
  &--green {
    background: #799351;
  }
}

.title {
  font-size: $uni-font-size-xxl;
  color: #ffffff;
  margin-left: 39rpx;
}
</style>
