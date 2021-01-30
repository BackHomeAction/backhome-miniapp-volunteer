<template>
  <view>
    <view
      v-for="(vf,index) in vol.inform"
      :key="index"
    >
      <view :class="index%2?'white':'gray'">
        <view class="where">
          <view style="height: 44rpx;">
            {{ vf.space }}市-{{ vf.city }}区
          </view>
        </view>
        <view class="name">
          <view style="height: 44rpx;">
            {{ vf.name }}
          </view>
        </view>
        <view
          class="more"
          @click="checkinform(vf.id)"
        >
          <view style="height: 44rpx;">
            查看更多
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    //这里之后要做一个新页面的跳转！！！！
    function checkinform(num: number) {
      wx.showToast({
        title: "您选中的ID是:" + num,
      });
    }
    let vol = reactive({
      inform: [
        { space: "北京", city: "朝阳", name: "张三", id: 1 },
        { space: "北京", city: "昌平", name: "孙二", id: 2 },
        { space: "北京", city: "海淀", name: "罗翔", id: 3 },
        { space: "北京", city: "东城", name: "王五", id: 4 },
        { space: "北京", city: "西城", name: "赵六", id: 5 },
      ],
    });
    return { vol, checkinform };
  },
});
</script>

<style lang="scss" scoped>
@mixin all-use($width) {
  width: $width;
  height: 44rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 44rpx;
  display: flex;
  justify-content: center;
}
.gray {
  width: 750rpx;
  height: 96rpx;
  background: #e4e4e4;
  display: flex;
  align-items: center;
  .where {
    margin-left: 5rpx;
    @include all-use(230rpx);
  }
  .name {
    @include all-use(104rpx);
    margin-left: 94rpx;
  }
  .more {
    margin-left: 168rpx;
    @include all-use(128rpx);
    color: #a20a0a;
  }
}
.white {
  width: 750rpx;
  height: 96rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
  .where {
    margin-left: 5rpx;
    @include all-use(230rpx);
  }
  .name {
    @include all-use(104rpx);
    margin-left: 94rpx;
  }
  .more {
    margin-left: 168rpx;
    @include all-use(128rpx);
    color: #a20a0a;
  }
}
</style>
