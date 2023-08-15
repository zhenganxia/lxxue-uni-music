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
      recommendList: [],
      defaultImages: [
        {
          al: {
            name: "『1w+热评』欧美万评撩耳男声（单曲循环）",
            picUrl:
              "http://p1.music.126.net/xLDdcvX4nVVHePy8qcvYVQ==/109951163994703160.jpg?param=140y140",
          },
          id:'2049512697'
        },
        {
          al: {
            name: "戳爷/黄老板/断眉/萌德/骚姆/比伯/烟卷",
            picUrl:
              "http://p2.music.126.net/Izq2rrMzKPNaxmgg0O0KNA==/19155691579189685.jpg?param=140y140",
          },
          id:'2049512697'
        },
        {
          al: {
            name: "孙美琪疑案 第一集 欢迎回来（4.14开播 每周五更新）",
            picUrl:
              "http://p2.music.126.net/ATce5mCIf_GqCLBqJcmzTg==/109951165166142900.jpg?param=140y140",
          },
          id:'2049512697'
        },
      ],
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
    };
  },
  watch: {
    hotTop: {
      handler(newValue) {
          // 获取榜单详情
          this.topDetail(newValue.id);
      },
      immediate: true,
    },
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
      } else {
        this.recommendList = this.defaultImages
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
    padding: 20rpx 30rpx;
    display: flex;
    overflow-x: scroll;
  }

  .recommend-regs {
    display: flex;
    justify-content: space-between;
  }

  .margin-title {
    margin-left: 20rpx;
    margin-top: 20rpx;
  }

  .recommend-sing-title {
    font-weight: 600;
  }

  .margin-right {
    margin-right: 60rpx;
  }

  .swiper-slide-img {
    width: 200rpx;
    height: 100%;
    object-fit: contain;
    border-radius: 20rpx;
  }

  .reg-text {
    width: 100px;
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
  