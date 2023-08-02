<!-- 每日推荐 -->
<template>
  <scroll-view scroll-y  @scrolltolower="scroll" scroll-with-animation>
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
          <view v-for="(item, index) in recommendList" :key="index" class="attention-sing">
            <view class="flex-between">
              <view class="flex-start">
                <view>
                  <image :src="item.al.picUrl" alt="" class="swiper-slide-img" />
                </view>
                <view>
                  <p class="reg-text">{{ item.name }}</p>
                  <p class="reg-text">{{ item.ar[0].name }}</p>
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
      <!-- <cover-view
      class="bottom"
      :style="{ 'padding-bottom': paddingBottomHeight + 'rpx' }"
      >
      <view> 歌曲名 </view>
      <view>
        <uni-icons
        type="refreshempty"
        size="30"
        class="margin-right"
        ></uni-icons>
        <uni-icons type="list" size="30"></uni-icons>
      </view>
    </cover-view> -->
      <tabbar :list="list"></tabbar>
    </view>
  </scroll-view>
</template>

<script>
import bofang from "@/static/imgSvg/24gf-playCircle.svg";
import listPlay from "@/static/imgSvg/playSquare.svg";
import { recommendSong, getHotList } from "@/api/discover.js";
import {pageInfo} from '@/utils/tool'
import tabbar from "@/components/tabbar.vue";
// import skeleton from '@/components//skeleton.vue'
export default {
  name: "Attention",
  components: { tabbar},
  data() {
    return {
      showSkeleton: true,
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
      recommendList: [],
      paddingBottomHeight: 0,
      bofang,
      listPlay,
      value: "",
      active: "",
      title: "Hello",
      defaultImages: [
        {
          title: "下雪的声音",
          name: "林俊杰",
          al: {
            picUrl:
              "http://p1.music.126.net/xLDdcvX4nVVHePy8qcvYVQ==/109951163994703160.jpg?param=140y140",
          },
        },
        {
          title: "烟卷",
          name: "林俊杰",
          al: {
            picUrl:
              "http://p2.music.126.net/Izq2rrMzKPNaxmgg0O0KNA==/19155691579189685.jpg?param=140y140",
          },
        },
      ],
    };
  },
  created() {
    this.getSongList();
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
      if (this.recommendList.length === info.length) return
      this.recommendList = [...this.recommendList, ...currentInfo]
    },
    async getSongList() {
      const cookie = uni.getStorageSync("cookie");
      if (cookie) {
        // 推荐歌曲
        const res = await recommendSong({ cookie });
        const { data, code } = res?.data;
        if (code === 200) {
          this.initList = JSON.stringify(data.dailySongs)
          // 首次取前10条数据
          const {currentInfo,nextNum} = pageInfo(10, 1, data.dailySongs)
          this.pageNum = nextNum
          console.log('3333333333333333333333333333333',currentInfo)
          this.recommendList = currentInfo
            ? currentInfo
            : this.defaultImages;
        }
      } else {
        // 歌手热门 50 首歌曲
        const res = await getHotList({ id: 6452 });
        const { code, songs } = res?.data;
        if (code === 200) {
          this.initList = JSON.stringify(songs)
          // 首次取前10条数据
          const {currentInfo,nextNum} = pageInfo(10, 1, songs)
          this.pageNum = nextNum
          this.recommendList = currentInfo || []
            ? currentInfo
            : this.defaultImages;
        }
      }
    },
    playSing(id) {
      uni.navigateTo({
        url: `/pages/music/index`,
      });
      uni.setStorageSync('musicId', id)
      uni.setStorageSync('musicIdList', JSON.stringify(this.recommendList))
    },
  },
};
</script>

<style scoped lang="scss">
.attention {
  height: calc(100vh - 200rpx); //calc()是动态计算函数  上边距和下边距为 40 +62  综合要大于40+62 否则无法滑动

  .attention-content {
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
      height: 10%;
    }
  }

  .sign {
    position: fixed;
    background: #ffffff;
    width: 100%;
    z-index: 800;
    height: 80rpx;

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

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100rpx;
    background-color: #ffffff;
  }

  .bottom-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
