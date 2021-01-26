<template>
  <view class="box" @click="announce" >
   <view class="border">
    <image style="width: 100rpx;height: 100rpx;" src="../../../../static/images/announce.png" mode=""></image>
	    
	       <view class="text">
           <swiper style="width: 100%; height: 100%;" :indicator-dots="false"  :vertical="true" :autoplay="true" :interval="3000" :duration="1000" @change="pageChange">
             <swiper-item v-for="(inf,index) in massage.inform">
              <view class="first-text">
                <view class="announce-text">{{inf.announce}}</view>
              </view>
              <view class="sec-text">
                <view class="abstract-text">{{inf.abstract}}</view>
              </view>
             </swiper-item> 
           </swiper> 
        </view>
	
    
  </view>
  </view>
</template>

<script lang="ts">
import { defineComponent,ref,reactive } from "vue";
import {navigateTo} from "@/utils/helper"
export default defineComponent({
  setup() {
    const step=ref(0)
     function announce(){
       const num=ref(0)
       num.value=step.value
       navigateTo('/pages/announce/index',{id:num.value})
     }
     function pageChange(event){
       console.log(event.detail.current)
       step.value=event.detail.current;
        console.log(step.value)
     }
     let massage=reactive({
       inform:[
         {announce:'关于申请成为志愿者的说明',abstract:'申请者志愿者前必读',id:1},
         {announce:'关于合理解决XXX的问题',abstract:'请仔细阅读并完成',id:2}
       ]
     })
    return { announce,massage,pageChange };
  },
});
</script>

<style lang="scss" scoped>
.box {
  width: 672rpx;
  height: 144rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  display: flex ;
  .border{
	    width: 550rpx;
      height: 100rpx;
      margin-top: 22rpx;
      margin-left: 32rpx;
      display: flex;
      .text{
        width: 384rpx;
        height: 100rpx;
        margin-left: 66rpx;
        .first-text{
          width: 384rpx;
          height: 44rpx;
          display: flex;
          justify-content: center;
            .announce-text{
              height: 44rpx;
              font-size: 32rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #000000;
              line-height: 44rpx;
            }
        }
        .sec-text{
          margin-top: 16rpx;
          width: 384rpx;
          height: 34rpx;
          display: flex;
          justify-content: center;
          .abstract-text{
            height: 34rpx;
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #979797;
            line-height: 34rpx;
          }
        }
      }
  }
}
</style>
