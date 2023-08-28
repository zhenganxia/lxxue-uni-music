<template>
  <!-- 热歌榜 -->
  <view class="discover-recommend">
    <view class="flex-between margin-title">
      <view class="flex-start">
        <p class="recommend-sing-title">{{ name || "热歌榜" }}</p>
        <!-- <uni-icons type="right" size="18" @click="recommendMore" /> -->
      </view>
      <!-- <view class="good-icon" style="margin-right: 18px" @click="allSongsList">
        <uni-icons type="more-filled" size="18" @click="allSongsList" />
      </view> -->
    </view>
    <view class="recommend-reg">
      <view v-for="(item, index) in recommendList" :key="index"
        :class="{ 'margin-right': index !== recommendList.length - 1 }" >
        <view class="reg-text">
          <img :src="item.al.picUrl" alt="" class="swiper-slide-img" @click="topSong(item)" />
          <view >
            <view class="reg-text-name">{{ item.al.name }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getPlayDetail } from "@/api/discover.js";
import defaultImages from './config'
export default {
  props: {
    hotTop: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      name: "",
      recommendList: defaultImages,
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
    };
  },
  mounted() {
    this.topDetail()
  },
  methods: {
    async topDetail() {
      const res = await getPlayDetail({ id:'3778678'});
      const { code, playlist } = res.data;
      // console.log('222222222222222222222222',playlist)
      if(playlist?.tracks&&playlist?.tracks.length>0) {
        if (code === 200) {
          const { name, tracks } = playlist;
          this.name = name;
          this.recommendList = tracks;
        }
      } 
    },
    topSong(al) {
      // 点击图片播放歌曲
      uni.navigateTo({
        url: `/pages/music/index`,
      });
      uni.setStorageSync('musicId', al.id)
      uni.setStorageSync('musicIdList', JSON.stringify([]))
    },
    allSongsList() {
      uni.navigateTo({
        url: '/pages/discover/container/recommend/index'
      });
    },
    recommendMore() {
      uni.navigateTo({
        url: '/pages/discover/container/recommend/index'
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.discover-recommend {
  .recommend-reg {
    // padding: 20rpx 30rpx;
    width: 690rpx;
    margin:0 auto;
    display: flex;
    overflow-x: scroll;
  }

  .recommend-regs {
    display: flex;
    justify-content: space-between;
  }

  .margin-title {
    margin: 25rpx 32rpx;
  }

  .recommend-sing-title {
    font-weight: 600;
  }

  .margin-right {
    margin-right: 60rpx;
  }

  .swiper-slide-img {
    width: 190rpx;
    height: 100%;
    object-fit: contain;
    border-radius: 20rpx;
  }

  .reg-text {
    width: 190rpx;
    .reg-text-name{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }
  }

  .good-icon {
    transform: rotate(90deg);
  }

  ::-webkit-scrollbar {
    /* 可以滑动不展示滚动条 */
    display: none;
  }
}</style>
  