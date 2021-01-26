<template>
  <view class="body">
     <view class="block" @click="volList()">
       <view class="num">
         <view style="height: 84rpx;">{{onlineVol}}</view>
       </view>
       <view class="text">
         <view style="height: 40rpx;">在线志愿者</view>
       </view>
       </view>
        <view class="line"></view>
       <view class="block" style="margin-left: 30rpx;">
         <view class="num">
           <view style="height: 84rpx;">{{sumVol}}</view>
         </view>
         <view class="text">
           <view style="height: 40rpx;">志愿者总数</view>
         </view>
         </view>
           <view class="line"></view>
         <view class="block" style="margin-left: 30rpx;">
           <view class="num">
             <view style="height: 84rpx;">{{eventOn}}</view>
           </view>
           <view class="text">
             <view style="height: 40rpx;">开启案件数</view>
           </view>
           </view>
       
       
     </view>
  </view>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import {navigateTo} from "@/utils/helper"
export default defineComponent({
  setup() {
    function volList(){
      navigateTo("/pages/volList/index")
    }
    const onlineVol=ref(556)
    const sumVol=ref(56)
    const eventOn=ref(5356)
    return {onlineVol,sumVol,eventOn,volList};
  },
});
</script>

<style lang="scss" scoped>
.body {
    width: 670rpx;
    height: 140rpx;
    display: flex;
    
    .block{
      width: 182rpx;
      height: 140rpx;
      
     
     .num{
       width: 182rpx;
       height: 84rpx; 
       font-size: 60rpx;
       font-family: PingFangSC-Regular, PingFang SC;
       font-weight: 400;
       color: #000000;
       line-height: 84rpx;
       display: flex;
       justify-content: center;
     }
     .text{
       width: 182rpx;
       height: 40rpx;
       margin-top: 16rpx;
       font-size: 28rpx;
       font-family: PingFangSC-Regular, PingFang SC;
       font-weight: 400;
       color: #000000;
       line-height: 40rpx;
       display: flex;
       justify-content: center;
     }
    }
}
.line{
  width: 2rpx;
  height: 120rpx;
  margin-top: 10rpx;
  background-color: #979797;
  margin-left: 30rpx;
}
</style>
