<template>
  <view> 
    <view class="head">
      <view class="first-text">
        救援队实时信息一览表
      </view>
      <view class="sec-text">
        实名登记、尽职尽责
      </view>
    </view>
    <view class="body">
      <view class="nav-vol">
        <view
          class="vol-space"
          @click="showChange()"
        >
          所在地区
        </view>
        <view class="vol-name">
          姓名
        </view>
        <view class="vol">
          详细信息
        </view>
      </view>
      <peop />
    </view>
    <view
      v-if="show"
      class="select"
    >
      <view class="choose">
        <view class="item-box">
          <view
            v-for="(citys,index) in city.list"
            :key="index"
          >
            <view
              class="item"
              @click="selectCity(citys)"
            >
              <view style="height: 140rpx;">
                {{ citys }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import Peop from "./components/Peop/index.vue";

export default defineComponent({
  components: { Peop },
  setup() {
    const city = reactive({
      list: [
        "北京",
        "成都",
        "广州",
        "贵州",
        "福建",
        "临川",
        "兖州",
        "哈尔滨",
        "上海",
        "重庆",
      ],
    });

    function selectCity(event: any) {
      console.log(event);
      wx.showModal({
        title: "城市选择",
        content: "您确定选择" + " " + event + " " + "吗？",
        success(res) {
          if (res.confirm) {
            show.value = !show.value;
          } else if (res.cancel) {
            console.log("取消");
          }
        },
      });
    }

    const show = ref(false);

    function showChange() {
      show.value = !show.value;
      console.log(show.value);
    }

    return { showChange, show, selectCity, city };
  },
});
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 750rpx;
  height: 1460rpx;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  .choose {
    width: 700rpx;
    height: 900rpx;
    background-color: #ffffff;
    border-radius: 3ch;
    display: flex;
    justify-content: center;
    align-items: center;
    .item-box {
      width: 660rpx;
      height: 840rpx;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      overflow: auto;
      .item {
        width: 220rpx;
        height: 140rpx;
        font-size: 40rpx;
        color: #000000;
        line-height: 44rpx;
        text-align: center;
        line-height: 140rpx;
        box-sizing: border-box;
      }
    }
  }
}
@mixin voluse {
  width: 142rpx;
  height: 40rpx;
  font-size: 32rpx;
  color: #000000;
  line-height: 44rpx;
  line-height: 40rpx;
  text-align: center;
}
.head {
  height: 170rpx;
  width: 750rpx;
  background-color: #a20a0a;
  padding-top: 32rpx;
  z-index: 1;
  position: relative;
  .first-text {
    width: 400rpx;
    height: 56rpx;
    font-size: 40rpx;
    color: #ffffff;
    line-height: 56rpx;
    margin-left: 176rpx;
  }
  .sec-text {
    width: 216rpx;
    height: 34rpx;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 34rpx;
    margin-left: 266rpx;
    margin-top: 32rpx;
  }
}
.body {
  z-index: 1;
  position: relative;
  .nav-vol {
    width: 750rpx;
    height: 104rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    .vol-space {
      margin-left: 20rpx;
      @include voluse;
      width: 162rpx;
    }
    .vol-name {
      margin-left: 122rpx;
      @include voluse;
    }
    .vol {
      margin-left: 142rpx;
      @include voluse;
    }
  }
}
</style>
