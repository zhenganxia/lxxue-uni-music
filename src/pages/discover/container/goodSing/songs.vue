<!-- 歌手歌曲 -->
<template>
    <scroll-view scroll-y @scrolltolower="scroll" scroll-with-animation :refresher-enabled="true">
      <view class="attention">
        <view class="attention-content">
          <view class="container"> </view>
          <view class="sign">
            <view class="sign-header flex-between" @click="playSing('')">
              <view class="flex-start">
                <view class="sign-icon-imag">
                  <image style="width: 100%; height: 100%" mode="aspectFill" :src="bofang"></image>
                </view>
                <view> 播放全部 </view>
              </view>
            </view>
          </view>
          <view class="attention-scroll">
            <view v-for="(item, index) in articalAllSongs" :key="index" class="attention-sing">
              <view class="flex-between">
                <view class="flex-start">
                  <view style="margin-top:40rpx" class="flex-start">
                    <view class="reg-text-name">
                        <span >{{ item.name }}</span>
                    </view>
                    <span class="reg-text">{{ item.ar[0].name }}</span>
                  </view>
                </view>
                <view class="flex-start">
                  <view class="list-play" @click="playSing(item.id)">
                    <image style="width: 100%; height: 100%" mode="aspectFill" :src="listPlay"></image>
                  </view>
                  <view class="good-icon">
                    <uni-icons type="more-filled" size="18" />
                  </view>
                </view>
              </view>
            </view>
  
          </view>
  
        </view>
      </view>
    </scroll-view>
  </template>
  
  <script>
  import bofang from "@/static/imgSvg/24gf-playCircle.svg";
  import listPlay from "@/static/imgSvg/playSquare.svg";
  import { getArtistsSongs } from "@/api/discover.js";
  import {pageInfo} from '@/utils/tool'
  import defaultImages from './config'
  
  export default {
    name: "Attention",
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        list: [
          {
            text: "歌曲名"
          },
          {
            icon: "refreshempty",
            // path: "recommendation",
            // active: "fm",
          },
          {
            icon: "list",
            // path: "message",
            // active: "cloud",
          }
        ],
        initList: [], // 初始所有数据
        articalAllSongs: [],
        paddingBottomHeight: 0,
        bofang,
        listPlay,
        value: "",
        active: "",
        title: "Hello",
      };
    },
    onLoad(row) {
      if(row.id) {[
        this.getArtistsList(row.id)
      ]}
    },
    created() {
      uni.getSystemInfo({
        success: function (res) {
          let model = ["X", "XR", "XS", "11", "12", "13", "14", "15"];
          model.forEach((item) => {
            //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
            if (
              res.model.indexOf(item) != -1 &&
              res.model.indexOf("iPhone") != -1
            ) {
              that.paddingBottomHeight = 40;
            }
          });
        },
      });
    },
    methods: {
      // 滚动底部触发
      scroll() {
          const info = JSON.parse(this.initList)
        const {currentInfo,nextNum} = pageInfo(this.pageSize, this.pageNum, info)
        this.pageNum = nextNum
        // 当初始数据和当前数据长度相同不再获取数据
        if (this.articalAllSongs.length === info.length) return
        this.articalAllSongs = [...this.articalAllSongs, ...currentInfo]
      },
      async getArtistsList(id) {
        const cookie = uni.getStorageSync("cookie");
        if (cookie) {
          // 推荐歌曲
          const res = await getArtistsSongs({ id });
          const { songs, code } = res?.data;
          if (code === 200) {
            this.initList = JSON.stringify(songs)
            // 首次取前10条数据
            const {currentInfo,nextNum} = pageInfo(10, 1, songs)
            this.pageNum = nextNum
            this.articalAllSongs = currentInfo
          }
        } else {
            this.articalAllSongs = defaultImages.songAtricSongs
        }
      },
      playSing(id) {
        uni.navigateTo({
          url: `/pages/music/index`,
        });
        uni.setStorageSync('musicId', id)
        uni.setStorageSync('musicIdList', JSON.stringify( JSON.parse(this.initList)))
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .attention {
    .attention-content {
        height: calc(100vh - 100rpx); //calc()是动态计算函数  上边距和下边距为 40 +62  综合要大于40+62 否则无法滑动
      padding-left: 40rpx;
      padding-right: 40rpx;
  
      .swiper-slide-img {
        width: 100rpx;
        height: 100rpx;
        border-radius: 6px;
        margin-right: 30rpx;
        margin-bottom: 30rpx;
      }
  
      .good-icon {
        transform: rotate(90deg);
      }
  
      .attention-scroll {
        padding-top: 40px;
      }
  
      .attention-sing {
        width: 100%;
        height: 150rpx;
      }
    }
  
    .sign {
      position: fixed;
      background: #ffffff;
      width: 100%;
      z-index: 800;
      height: 80rpx;
      padding-top: 20rpx ;
      .sign-header {
        .sign-icon-imag {
          width: 60rpx;
          height: 60rpx;
          margin-right: 20rpx;
        }
      }
  
      .sign-title {
        margin-right: 10px;
      }
    }
  
    .list-play {
      width: 50rpx;
      height: 50rpx;
      margin-right: 20rpx;
    }
  
    // .bottom {
    //   position: fixed;
    //   bottom: 0;
    //   left: 0;
    //   display: flex;
    //   justify-content: space-around;
    //   align-items: center;
    //   width: 100%;
    //   height: 100rpx;
    //   background-color: #ffffff;
    // }
  
    // .bottom-item {
    //   flex: 1;
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    //   justify-content: center;
    // }
    .reg-text-name {
        margin: 20rpx;
        width: 250rpx;
        text-align: left;
    }
    .reg-text {
        margin: 20rpx;
    }
  }
  </style>
  