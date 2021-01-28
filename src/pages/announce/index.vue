<template>
  <view>
    <view class="name">
      <view style="height: 66rpx;">
        {{ message.announce[0].name }}
      </view>
    </view>
    <view class="from">
      <view style="height:34rpx;">
        发布人:{{ message.announce[0].from }}
      </view>
    </view>
    <view class="time">
      <view style="height: 34rpx;">
        发布于:{{ message.announce[0].time }}
      </view>
    </view>
    <view class="content">
      <view style="width: 650rpx;height: 1020rpx;">
        {{ message.announce[0].content }}
      </view>
    </view>
  </view>
</template> 

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  setup() {
    let message = reactive({
      announce: [
        {
          name: "申请成为志愿者的公告",
          from: "归家行动官方",
          time: "2021-01-24 18:12",
          content: `广大市民朋友们:
           社会的进步离不开文明，文明的社会离不开志愿者“奉献、
           友爱、互助、进步”的志愿服务精神。志愿服务是一种无私奉献
           价值观念的体现。志愿服务活动是社会发展和时代进步的需要。
           为倡导社区志愿服务行动，发挥志愿服务者的力量。
           一、招募的基本条件:
           1、社会各界爱心人士，身体健康，能吃苦耐劳;
           2、热心社会公益事业，具有奉献精神，志愿无偿提供人道服
           务，不计报酬;
           3、遵纪守法，品行良好，诚实守信;
           4、积极参加社区各类志愿活动。
           二、享有的基本权力:
           参加社区志愿者的培训活动;
           获得从事志愿者服务活动相关的宣传资料和证明材料及必要
           的工作条件;
           工作优秀者可获得社区志愿服务先进工作者;
           有志愿加入和退出志愿者组织的自由。
           三、从事的主要工作:
           志愿者根据社区居民实际需要和城市精细化管理的需要，协
           助社区围绕精神文明建设开展各项社会公益宣传、传播志愿服务精神、公益服务、爱心救助、心理疏导、应急救援、健康关怀、环境保护、筹资捐募、社区服务、为孤、老、病、残、困等弱势群体提供救助、服务和咨询等活动，关注留守儿童成长，协助社区开展丰富多彩喜闻乐见的文体活动。
           人生因奉献而精彩，社会因关爱而和谐。让我们踊跃参与到
           社区志愿者招募行动中来，汇聚起爱的力量，为更多需要帮助的
           人们撑起一片蓝天，共创和谐社区、共享美好生活!`,
        },
      ],
    });
    return { message };
  },
  onLoad(option: any) {
    console.log("获取的ID:" + option.id);
  },
});
</script>

<style lang="scss" scoped>
@mixin wh($width, $heigh, $top, $left) {
  width: $width;
  height: $heigh;
  margin-top: $top;
  margin-left: $left;
  display: flex;
  justify-content: center;
}
@mixin font($size, $color, $lineh) {
  font-size: $size;
  color: $color;
  line-height: $lineh;
}
.name {
  @include wh(750rpx, 66rpx, 48rpx, 0);
  @include font(48rpx, #000000, 66rpx);
}
.from {
  @include wh(750rpx, 34rpx, 16rpx, 0);
  @include font(24rpx, #979797, 34rpx);
}
.time {
  @include font(24rpx, #979797, 34rpx);
  @include wh(750rpx, 34rpx, 16rpx, 0);
}
.content {
  @include font(24rpx, #000000, 34rpx);
  @include wh(750rpx, 1020rpx, 30rpx, 0);
}
</style>
