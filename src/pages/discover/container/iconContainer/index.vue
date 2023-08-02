<template>
  <view class="discover-icon-container">
    <view
      v-for="(item, index) in defaultImages"
      :key="index"
      :class="{ 'margin-right': index !== defaultImages.length - 1 }"
      @click="toDiscover(item)"
    >
      <view class="reg-icon">
        <view class="reg-icon-imag">
          <image 
          style="width: 100%; 
          height:100%;" 
          mode="aspectFill" 
          :src="item.icon"
          @error="imageError"
          ></image>
        </view>
      </view>
      <view class="reg-icon">
        <p class="reg-text">{{ item.title }}</p>
      </view>
    </view>
  </view>
</template>
  <script>
  import weixuanze from "@/static/imgSvg/FM_weixuanze.svg"
  import meirituijian from "@/static/imgSvg/meirituijian.svg"
  import bofangxiaodianshi from "@/static/imgSvg/bofangqi-bofangxiaodianshi.svg"
  import bofanggedan from "@/static/imgSvg/bofanggedan.svg"
  import paihang from "@/static/imgSvg/paihang.svg"
  import tushu from "@/static/imgSvg/tushu.svg"
  import gedanbiaoqian from "@/static/imgSvg/gedanbiaoqian.svg"
  import tingge from "@/static/imgSvg/tingge.svg"
  
export default {
  data() {
    return {
      // src: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
      meirituijian,
      bofangxiaodianshi,
      bofanggedan,
      paihang,
      weixuanze,
      tingge,
      gedanbiaoqian,
      defaultImages: [
        {
          title: "Ann Like",
          url: "/pages/annLike/index",
          icon:paihang
        },
        {
          title: "每日推荐",
          url: "/pages/discover/container/recommend/index",
          icon:meirituijian
        },
        {
          title: "歌单",
          url: "/pages/songList/index",
          icon:bofanggedan
        },
        {
          title: "私人FM",
          url: "",
          icon:bofangxiaodianshi
        },
        {
          title: "有声书",
          url: "",
          icon:tushu
        },
        {
          title: "数字专辑",
          url: "",
          icon:gedanbiaoqian
        },
        {
          title: "直播",
          url: "",
          icon:weixuanze
        },
        {
          title: "关注新歌",
          url: "",
          icon:tingge
        },
      ],
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
    };
  },
  computed:{
    // imgUrl() {
    //   return (item) => {
    //     // 动态渲染拼接图片
    //     return  require(`@/static/imgSvg/${item.icon}.svg`) 
    //   };
    // },
  },
  methods: {
    // changeIndicatorDots(e) {
    //     this.indicatorDots = !this.indicatorDots
    // },
    // changeAutoplay(e) {
    //     this.autoplay = !this.autoplay
    // },
    // intervalChange(e) {
    //     this.interval = e.target.value
    // },
    // durationChange(e) {
    //     this.duration = e.target.value
    // }
    toDiscover(item) {
      uni.navigateTo({
        url: item.url , // 携带参数可以拼接在后面 ?id=1 引用数据类型转JSON字符串
      });
    },
    imageError() {

    }
  },
};
</script>
  <style lang="scss" scoped>
.discover-icon-container {
  padding: 20rpx 30rpx;
  display: flex;
  /* overflow-y: hidden; */
  overflow-x: scroll;
}
.icon-containers {
  display: flex;
  justify-content: space-between;
}

.margin-right {
  margin-right: 18rpx;
}
.reg-icon {
  width: 100rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &-imag {
     width: 70rpx;
     height: 70rpx;
    //  color:red;
  }
}

.reg-text {
  font-size: 12rpx;
  margin-top: 10rpx;
}
::-webkit-scrollbar {
  /* 可以滑动不展示滚动条 */
  display: none;
}
::v-deep .van-icon, .van-icon:before {
    color:red;
}
</style>
  