<template>
  <view>
    <view class="body">
      <view class="oldman-image">
        <view
          v-for="(path,indexs) in image.path"
          :key="indexs"
        >
          <image
            style="border-radius: 10rpx;margin-right: 8rpx;width: 308rpx;height: 196rpx;"
            :src="path"
            @click="watchPhoto(indexs)"
          />
        </view>
      </view>
      <view
        v-for="(oldman,index) in oldManInf.item"
        :key="index"
      >
        <view
          class="infBorder"
          :class=" (((index+1)==5)||((index+1)==8)||((index+1)==10))?'margin':''"
        >
          <view class="box">
            <view class="item">
              {{ oldman }}
            </view>
            <view class="information">
              <view
                v-for="(inf,indexss) in oldManInf.inf[index]"
                :key="indexss"
                style="height: 44rpx;"
              >
                {{ inf }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { showToast } from "@/utils/helper";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    let image = reactive({
      path: [
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1158476907,3892787576&fm=15&gp=0.jpg",
        "https://dpic.tiankong.com/8w/1f/QJ6110198657.jpg?x-oss-process=style/794ws",
        "https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77094b36acaf2edde4c459a4861001e939019341.jpg",
        "https://dpic.tiankong.com/7z/zd/QJ6882014636.jpg@!350h",
      ],
    });
    function watchPhoto(index: string) {
      uni.previewImage({
        urls: [
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1158476907,3892787576&fm=15&gp=0.jpg",
          "https://dpic.tiankong.com/8w/1f/QJ6110198657.jpg?x-oss-process=style/794ws",
          "https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77094b36acaf2edde4c459a4861001e939019341.jpg",
          "https://dpic.tiankong.com/7z/zd/QJ6882014636.jpg@!350h",
        ],
        current: index,
      });
    }

    let oldManInf = reactive({
      item: [
        "姓名",
        "年龄",
        "性别",
        "家属联系方式",
        "身份证号",
        "身高",
        "体重",
        "其他体貌特征",
        "走失地点",
        "常去地点",
        "是否老年痴呆",
        "残疾情况",
      ],
      inf: [
        "博西格尔斯·伊丽莎白·杰夫",
        "94",
        "男",
        "13520158651",
        "11050219000525045X",
        "182",
        "80",
        "暂无",
        "商业街附近",
        "中央公园",
        "无",
        "暂无",
      ],
    });
    return { image, oldManInf, watchPhoto };
  },
  onLoad(option) {
    showToast("ID是：" + option?.id);
  },
});
</script>

<style lang="scss" scoped>
.margin {
  margin-top: 34rpx;
}
@mixin box-style {
  width: 750rpx;
  height: 88rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
}
@mixin large-font($left) {
  width: 208rpx;
  height: 44rpx;
  font-size: 32rpx;
  color: #000000;
  line-height: 44rpx;
  margin-left: $left;
}
@mixin small-font($left) {
  width: 467rpx;
  height: 44rpx;
  font-size: 32rpx;
  color: #979797;
  line-height: 44rpx;
  margin-left: $left;
  display: flex;
  justify-content: flex-end;
}
.oldman-image {
  width: 750rpx;
  height: 196rpx;
  display: flex;
  overflow: auto;
}
.infBorder {
  @include box-style;
  border-bottom: 2rpx solid #f0f0f0;
  .box {
    display: flex;
  }
  .item {
    @include large-font(20rpx);
  }
  .information {
    @include small-font(27rpx);
  }
}
</style>
