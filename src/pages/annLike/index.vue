<!-- annLike -->
<template>
  <scroll-view scroll-y @scrolltolower="scroll" scroll-with-animation>
    <view class="anLike">
      <view class="anLike-content">
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
        <view class="anLike-scroll">
          <view v-for="(item, index) in recommendList" :key="index" class="anLike-sing">
            <view class="flex-between">
              <view class="flex-start">
                <view>
                  <image :src="item.al.picUrl" alt="" class="swiper-slide-img" />
                </view>
                <view>
                  <p class="reg-text">{{ item.name }}</p>
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
import { getSongDetail } from "@/api/discover.js";
import { pageInfo } from '@/utils/tool'
import defaultImages from './config'
// import skeleton from '@/components//skeleton.vue'
export default {
  name: "songList",
  data() {
    return {
      showSkeleton: true,
      pageNum: 1,
      pageSize: 10,
      initList: [], // 初始所有数据
      recommendList: [],
      paddingBottomHeight: 0,
      bofang,
      listPlay,
      value: "",
      active: "",
      title: "Hello"
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
      const { currentInfo, nextNum } = pageInfo(this.pageSize, this.pageNum, info)
      this.pageNum = nextNum
      // 当初始数据和当前数据长度相同不再获取数据
      if (this.recommendList.length === info.length) return
      this.recommendList = [...this.recommendList, ...currentInfo]
    },
    async getSongList() {
      const cookie = uni.getStorageSync("cookie");
      if (cookie) {
        const likeId = ['2036015243', '532777119', '1847510147', '1897469512',
          '1450707917', '1901371647', '1191250809',
          '1844720844', '1989690962', '29498161', '1990450477',
          '28461933', '1831241783', '1393582057', '1431253446',
          '1498349481','193168','1357155628','1380849352']
        const ids = likeId.join(',')
        const res = await getSongDetail({ ids });
        const { songs, code } = res.data;
        this.initList = JSON.stringify(songs)
        if (code === 200) {
          this.recommendList = songs
            ? songs
            : defaultImages.songs;
        }
      } else {
        this.recommendList = defaultImages.songs;
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
.anLike {
  height: calc(100vh - 200rpx); //calc()是动态计算函数  上边距和下边距为 40 +62  综合要大于40+62 否则无法滑动

  .anLike-content {
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

    .anLike-scroll {
      padding-top: 40px;
    }

    .anLike-sing {
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
  