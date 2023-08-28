<template>
  <scroll-view scroll-x class="page"  @scrolltolower="scroll" scroll-with-animation :refresher-enabled="true">
    <view class="discover-good-sing">
      <view class="flex-between margin-title">
        <view class="flex-start">
          <p class="good-sing-title">热门歌手</p>
          <!-- <view class="flex-start good-sing-play">
            <uni-icons type="forward" size="15"></uni-icons>
            <p>查看</p>
          </view> -->
        </view>
        <!-- <view class="margin-right good-icon" @click="allSongsList">
          <uni-icons type="more-filled" size="18" />
        </view> -->
      </view>
      <view class="good-reg flex-start">
        <view v-for="(item, index) in articles" :key="index" :class="{ 'margin-right': index !== articles.length - 1 }"
          class="good-item">
          <view class="flex-between" @click="topSong(item)">
            <view class="flex-start">
              <!-- <view class="swiper-slide-img" > -->
                <img :src="item.picUrl" alt="" class="swiper-slide-img"/>
              <!-- </view> -->
              <view>
                <p class="reg-text">{{ item.name }}</p>
                <p  style="font-size:15rpx;margin-left: 10rpx;">{{ item.alias[0] }}</p>
              </view>
            </view>
            <!-- <view class="good-item-play" >
              <uni-icons type="forward" size="15"></uni-icons>
            </view> -->
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>
<script>
import { getArtists } from "@/api/discover.js";
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
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
      articles: [],
      initArticles: [],
      offset: 0,
      limit: 10
    };
  },
  created() {
    this.getArtistsList()
  },
  methods: {
    scroll() {
      this.getArtistsList(this.offset, this.limit)
    },
    async getArtistsList(offset = 0, limit = 10) {
      const res = await getArtists({ offset, limit });
      const { code, artists } = res.data
      if (code === 200) {
        this.articles = [...this.articles, ...artists]
      } else {
        this.articles = defaultImages.songs
      }
      this.offset = offset + 1
      if (offset === 0) {
        // 首次获取数据
        this.initArticles = JSON.stringify(this.articles)
      }
    },
    filterArray(data) {
      const arr = []
      const obj = {}
      data.forEach(item => {
        if (!obj[item.id]) {
          arr.push(item)
          obj[item.id] = true
        }
      });
      return arr
    },
    topSong(row) {
      // 点击图片播放歌曲
      uni.navigateTo({
        url: `/pages/discover/container/goodSing/songs?id=${row.id}`,
      });
    },
    allSongsList() {
      uni.navigateTo({
        url: '/pages/discover/container/recommend/index'
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.discover-good-sing {
  width: 690rpx;
  margin:0 auto;
  .good-sing-play {
    padding: 6rpx;
    background-color: rgb(231, 228, 228);
    border-radius: 15rpx;
    margin-left: 10rpx;
    font-size: 14rpx;
  }

  .good-sing-title {
    font-weight: 600;
  }

  .good-reg {
    height: 780rpx;
    flex-direction: column;
    flex-wrap: wrap;

    .good-item {
      width: 95%;
  .swiper-slide-img {
        width: 160rpx;
        height: 100%;
        object-fit: contain;
        border-radius: 20rpx;
        margin: 10rpx;
      }

      .reg-text {
        font-weight: 500;
        font-size: 30rpx;
        margin-left: 10rpx;
      }

      .reg-text-name {
        font-size: 16rpx;
        margin: 10rpx 10rpx 1rpx 0;
      }

      .good-item-play {
        padding: 5rpx 8rpx;
        border-radius: 10rpx;
        border: 2rpx solid;
        color: rgb(156, 153, 153);
      }
    }
  }

  .margin-title {
    margin: 25rpx 0
  }

  .margin-right {
    margin-right: 18rpx;
  }

  .good-icon {
    transform: rotate(90deg);
  }

}</style>
