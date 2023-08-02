<template>
    <view class="panel-icon" >
          <view class="flex-start panel-name">
            <uni-icons type="contact-filled" size="30" color="#f4adad"></uni-icons>
            <view class="name">anLike</view>
          </view>
          <view class="panel-out flex-center" @click="goOut">
            <p>登出</p>
          </view>
        </view>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        goOut() {
            uni.clearStorageSync();
            uni.showToast({
            title: '登出成功',
            icon: 'none',
          });
        }
    }
};
</script>

<style scoped lang="scss">
//  .panel {
//     background-color: red;

//   }
  .panel-icon {
      padding-top: 20rpx;
      background-color:rgb(249, 247, 247);
      height: 100%;
    }
    .panel-name {
        margin-left: 20rpx;
  }
  .panel-out {
    padding: 20rpx 10rpx;
    background-color: #fff;
    border-radius: 8rpx;
    width: 90%;
    margin:0 auto;
    margin-top: 20rpx;
  }
</style>
