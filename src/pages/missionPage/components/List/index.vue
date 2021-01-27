<template>
  <view>
    
    
    <view v-for="(inf,index) in infGet.informs">
<view class="body" style="margin-top: 48rpx;">
  <view class="confirm-page" v-if="confirms"></view>
  <view class="reject-page" v-if="rejects"></view>
  <view class="box" v-if="show" >
  <view class="on-box">
     <image style="width: 100rpx; height: 100rpx;border-radius: 50%;" src="../../../../static/images/people.png" mode=""></image>
   <view class="box-border">
     <view class="text-box">
       <view class="name">{{inf.name}}</view>
       <view class="age">{{inf.age}}</view>
     </view>
     <view class="inform-box">
       <view class="space">
         <view style="width: 104rpx;height: 22rpx; font-size: 16rpx;font-family:PingFangSC-Regular,PingFang SC;font-weight: 400; color: #FFFFFF;line-height: 25rpx;margin-left: 15rpx;">{{inf.where}}</view>
       </view>
       <view class="more">查看更多 ></view>
     </view>
   </view>
  </view>
  <view class="line"></view>
  <view class="un-box">
    <view class="time">
      <image style="width: 24rpx;height: 28rpx;margin-top: 3rpx;" src="../../../../static/images/time.png" mode="" ></image>
      <view class="time-text"> &nbsp; 15:45</view>
    </view>
    <view class="space-text">
      <view style="width: 20rpx;height:20rpx;border-radius: 50%;background-color: #FFA36C;margin-top: 18rpx;"></view>
      <view class="space-text-detail">走失于 {{inf.space}}</view>
       <view class="space-text-detail " style="font-size: 24rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #666666;line-height: 34rpx;">距离您:{{inf.distance}}KM</view>
    </view>
  </view>
  <view class="line" style="margin-top: 10rpx;"></view>
  </view>
  <view class="button">
    <button type="warn" class="confirm" @click="reject()">拒绝</button>
    <button type="primary" class="confirm" @click="confirm()">接受</button>
     
     </view>
</view>
   </view>
<button class="buttons" type="warn" @click="navigate()">返回主页</button>
</view>

</template>

<script lang="ts">
import { defineComponent,ref,reactive } from "vue";
import {navigateTo} from "@/utils/helper"
import { inject } from "vue";
export default defineComponent({
  
  
  setup() {
    const infGet = inject("infGet");
    const show=ref(true)
    const confirms=ref(false)
    const rejects=ref(false)
    function reject(){
      wx.showToast({
        title:'已拒绝'
      })
    }
    function confirm(){
      wx.showToast({
        title:'已接受'
      })
    }
    function navigate(){
    uni.switchTab({
      url:'/pages/me/index'
    })
    }
    return {reject,confirm,show,confirms,rejects,navigate,infGet};
  },
});
</script>

<style lang="scss" scoped>
  
  .body{
    
    width: 686rpx;
    height: 320rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
    border-radius: 10rpx; 
    border: 1px solid rgba($color: #ffffff, $alpha: 0.0); 
    .on-box{
      height: 100rpx;
      width: 404rpx; 
      margin-left: 32rpx;
      margin-top: 32rpx;
     display: flex;
     
     .box-border{ 
      width: 272rpx;
      height: 100rpx;
       margin-left: 32rpx;
      .text-box{
        width: 272rpx;
        height: 44rpx;
        display: flex;
        .name{
          width: 96rpx;
          height: 44rpx;
          font-size: 32rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          line-height: 44rpx;
           }
          .age{
            width: 44rpx;
            height: 28rpx;
            font-size: 20rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 28rpx;
            margin-left: 24rpx;
            margin-top: 12rpx;
        } 
      } .inform-box{
       width: 272rpx;
        height: 22rpx;
       
        margin-top: 8rpx;
        display: flex;
        .space{
         width: 128rpx;
         height: 32rpx;
         background: #409EFF;
         border-radius: 16rpx;
         display: flex;
         align-items: center;
        }
        .more{
          width: 128rpx;
          height: 32rpx;
          border-radius: 10rpx;
          border: 2rpx solid #979797;
          margin-left: 16rpx;
          text-align: center; 
          font-size: 18rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
          line-height: 26rpx;
        }
      }
      }
    }
   .line{
     width: 646rpx;
     height: 2rpx;
     background-color: #E4E4E4;
     margin-left: 20rpx;
     margin-top: 18rpx;
   }
   .un-box{
     width: 646rpx;
     height: 84rpx;
     
     margin-top: 14rpx;
     margin-left: 20rpx;
     .time{
       width: 646rpx;
       height: 34rpx;
       display: flex;
       .time-text{
         width: 186rpx;
         height: 34rpx;
         font-size: 24rpx;
         font-family: PingFangSC-Regular, PingFang SC;
         font-weight: 400;
         color: #000000;
         line-height: 34rpx;
         margin-left: 18rpx;
       }
     }
     .space-text{
       display: flex;
       .space-text-detail{
         width: 296rpx;
         height: 34rpx;
         font-size: 24rpx;
         font-family: PingFangSC-Regular, PingFang SC;
         font-weight: 400;
         color: #000000;
         line-height: 34rpx;
         margin-top: 9rpx;
         margin-left: 18rpx;
       }
     } 
   }
   .button{
     width: 300rpx;
     height: 42rpx; 
     display: flex;
     margin-left: 370rpx;
     margin-top: 10rpx;
   .confirm{
     width: 128rpx;
     height: 42rpx; 
     border-radius: 30rpx; 
     font-size: 24rpx;
     font-family: PingFangSC-Regular, PingFang SC;
     font-weight: 400;
     color: #FFFFFF;
     line-height: 34rpx; 
     line-height: 42rpx;
          }
        }
  }
  .buttons{
    width: 256rpx;
    height: 60rpx; 
    border-radius: 30rpx;     
    margin-top: 80rpx;
    text-align: center;
    line-height: 60rpx;
  }
</style>
