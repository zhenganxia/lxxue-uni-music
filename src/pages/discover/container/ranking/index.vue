<template>
  <view class="discover-ranking-sing">
    <view class="flex-between margin-title">
      <view class="flex-start">
        <p class="ranking-sing-title">{{name || '新歌榜'}}</p>
        <!-- <uni-icons type="forward" size="15" @click="rankingMore"></uni-icons> -->
      </view>
      <!-- <view class="margin-right"> : </view> -->
    </view>
    <view class="ranking-content flex-start"           v-if="hotTopList.length>0">
      <view class="ranking-reg flex-start">
        <view
          class="ranking-item"
          v-for="(item, index) in hotTopList" :key="index"
        >
          <view v-for="(song, songIndex) in item" :key="songIndex">
            <view class="flex-between ranking-item-unit" @click="playSing(song)">
              <view class="flex-start">
                <img :src="song.al.picUrl" alt="" class="swiper-slide-img" />
                <view>
                  <p class="reg-text-name">{{ song.name }}</p>
                </view>
              </view>
              <view class="ranking-item-play" >
                <uni-icons type="forward" size="15"></uni-icons>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getPlayDetail } from "@/api/discover.js";
import rankingSongs from "./song.js";
export default {
  props:{
    hotAcgTop:{
      type:Object,
    }
  },
  data() {
    return {
      name:'',
      hotTopList: [], // 热歌
      defaultImages: rankingSongs.songs,
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
    };
  },
  // created() {
  //   this.getHotSongs();
  // },
  watch: {
    hotAcgTop: {
      handler(newValue) {
          // 获取榜单详情
          this.getHotSongs(newValue.id);
      },
      immediate: true,
    },
  },
  methods: {
    rankingMore() {
      // this.indicatorDots = !this.indicatorDots
    },
    getNewSing(songList) {
      return new Promise((resolve, reject) => {
        let songInfo = JSON.parse(JSON.stringify(songList))
        const songs = songInfo.filter((_,index)=>index<=49)
        const length = Math.ceil(songs.length / 4);
        const list = [];
        for (let i = 0; i < length; i++) {
          const arr = songs.filter(
            (item, index) => ((0 + 5 * i) < index && index < (5 + 5 * i)) && item.al
          );
          if(arr.length>0) {
            arr.forEach(item => {
              // console.log('555555555555555555',item)
            });
            list.push(arr);
          }
        }
        // console.log('eeeeeeeeeeeeeeeeeee',list)
        resolve(list);
      });
    },
    async getHotSongs(id) {
      const res = await getPlayDetail({ id:'3779629' });
      const { code, playlist } = res?.data;
      if (playlist?.tracks&&playlist?.tracks.length>0) {
        if (code === 200) {
          const { name, tracks } = playlist;
          this.name = name;
          const list = (await this.getNewSing(tracks)) || [];
          this.hotTopList = list;
          // console.log("4444444", this.hotTopList);
          // list.forEach(item=>{
          //   console.log()
          // })
          // console.log('777777777777777777777777777',list.forEach(item => {
            
          // });)
        }
      } else {
        this.hotTopList = (await this.getNewSing(this.defaultImages)) || [];
      }
    },
    playSing(row) {
      uni.navigateTo({
        url: `/pages/music/index`,
      });
      uni.setStorageSync("musicId", row.id);
      uni.setStorageSync("musicIdList", JSON.stringify([]));
    }
  },
};
</script>
<style lang="scss" scoped>
.discover-ranking-sing {
  .ranking-sing-play {
    padding: 6rpx;
    background-color: rgb(231, 228, 228);
    border-radius: 15rpx;
    margin-left: 10rpx;
    font-size: 14rpx;
  }

  .ranking-sing-title {
    font-weight: 600;
    margin-bottom: 20rpx;
  }

  .ranking-content {
    overflow-x: scroll;
    .ranking-reg {
      padding: 30rpx;
      .ranking-item {
        width: 600rpx;
        margin-right: 20rpx;
        background-color: #fff;
        border-radius: 20rpx;
        padding: 30rpx;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

        .swiper-slide-img {
          width: 120rpx;
          height: 100%;
          object-fit: contain;
          border-radius: 20rpx;
          margin: 10rpx;
        }

        .reg-text {
          font-weight: 600;
        }

        .reg-text-name {
          font-size: 16rpx;
          margin: 10rpx 10rpx 1rpx 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 200px;
        }

        .ranking-item-play {
          padding: 5rpx 8rpx;
          border-radius: 10rpx;
          border: 2rpx solid;
          color: rgb(156, 153, 153);
        }
      }
    }
  }

  .margin-title {
    margin: 25rpx 0 0  32rpx;
  }

  .margin-right {
    margin-right: 60rpx;
  }

  ::-webkit-scrollbar {
    /* 可以滑动不展示滚动条 */
    display: none;
  }
}
</style>
  