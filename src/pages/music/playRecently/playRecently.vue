<template>
  <!-- 歌曲播放列表 -->
  <view class="container">
    <view  class="top-content">
      <view class="top">
        <view>
          <text style="font-size: 30rpx; font-weight: 600">当前播放</text>
          <text>
          ({{
            playRecentlyId.length
          }})
          </text>
        </view>
        <text class="iconfont icon-lajixiang" @click="deleteSong({}, 'all')" />
      </view>
    </view>
    <view class="bottom" v-if="show">
      <view class="item" v-for="(item, index) in song" :key="item.id" :class="{ 'play-song': musicId === item.id }">
        <view class="music" @click="listSongPlay(item)">
          <span style="font-weight: 700" class="music-text">{{
            item.name
          }}</span>
          <span class="author">{{ item.ar[0].name }}</span>
        </view>
        <uni-icons type="closeempty" size="18" color="#777777" @click="deleteSong(item, 'song', index)" class="delete"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>  
import { getSongDetail } from "@/api/discover.js";
export default {
  data() {
    return {
      song: [],
      show: true,
    };
  },
  props: {
    playRecentlyId: Array,
    musicId: [Number, String],
  },
  watch: {
    playRecentlyId: {
      handler(id) {
        this.playRecentlyId = id;
        this.getMusicInfo(this.playRecentlyId);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async getMusicInfo(musicIdList) {
      const ids = musicIdList.map((item) => item.id)?.join(",");
      let songData = await getSongDetail({ ids });
      this.song = songData?.data?.songs;
    },
    deleteSong(value, type, index) {
      if (type === "all") {
        // uni.setStorageSync('musicIdList',JSON.stringify([]))
        return;
      }
      const nexSong = this.song[index] || this.song[0];
      if (this.musicId === value.id && nexSong) {
        // 删除当前音乐
        uni.setStorageSync("musicId", nexSong.id);
        this.$emit("stopSong", nexSong.id);
      }
      this.song = this.song.filter((item) => item.id !== value.id);
      uni.setStorageSync("musicIdList", JSON.stringify(this.song));
    },
    listSongPlay(item) {
      uni.setStorageSync("musicId", item.id);
      this.$emit("listPlay", item.id);
    },
  },
};
</script>

<style lang="scss">
.container {
  position: fixed;
  bottom: 150rpx;
  background: rgba(255, 255, 255, 1);
  width: 80%;
  height: 800rpx;
  overflow-x: scroll;
  border-radius: 30rpx;
}
.top-content {
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  position:fixed;
  width: 80%;
  background-color: rgba(255, 255, 255, 1);
  z-index: 1000;
  // border-radius: 30rpx;
}
.container .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10rpx 20rpx;
  height: 80rpx;
  font-size: 20rpx;
  width: 100%;
}

.container .top .iconfont {
  font-size: 40rpx;
  margin-right: 45rpx;
}

.container .bottom {
  width: 100%;
  margin-top: 100rpx;
  z-index: 800;
}

.container .bottom .item {
  position: relative;
  display: flex;
  align-items: center;
  height: 80rpx;
  font-size: 30rpx;
}

.container .bottom .item .music {
  display: flex;
  margin: 20rpx;
  align-items: center;
  width: 100%;
}

.music-text {
  width: 350rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.container .bottom .item .music text {
  height: 50rpx;
  line-height: 50rpx;
  max-width: 500rpx;
}

.container .bottom .item .music .author {
  font-size: 26rpx;
  color: #777777;
  width: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 20rpx;
  text-align: left;
}

.container .bottom .item .iconfont {
  position: absolute;
  right: 40rpx;
  width: 40rpx;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-weight: 600;
  font-size: 40rpx;
  color: #c6c4c4;
}

.play-song {
  background-color: #eeebeb;
  width: 100%;
  height: 80rpx;
}
.delete {
  margin-right: 30rpx;
}
</style>
