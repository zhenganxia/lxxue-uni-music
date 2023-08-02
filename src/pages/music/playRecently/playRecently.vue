<template>
  <!-- 歌曲播放列表 -->
  <view class="container">
    <view class="top">
      <text style="font-size: 30rpx; font-weight: 600">当前播放</text>({{
        playRecentlyId.length
      }})
      <text class="iconfont icon-lajixiang" />
    </view>
      <view class="bottom">
        <view class="item" v-for="item in song" :key="item.id">
          <view class="music">
            <span style="font-weight: 700">{{ item.name }}-</span>
            <span class="author">{{ item.ar[0].name }}</span>
          </view>
          <text class="iconfont icon-quxiao" @click="deleteSong(item)"/>
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
    };
  },
  props: {
    playRecentlyId: Array,
  },
  watch: {
    playRecentlyId:{
      handler(id) {
      this.playRecentlyId = id;
      this.getMusicInfo(this.playRecentlyId);
    },
    immediate:true,
    deep:true
    }
  },
  methods: {
    async getMusicInfo(musicIdList) {
      const ids = musicIdList.map(item=>item.id)?.join(',')
      let songData = await getSongDetail({ ids });
      this.song = songData?.data?.songs;
    },
    deleteSong(value) {
      const song = JSON.parse(JSON.stringify(this.song))
      this.$emit('stopSong',song,value.id)
      this.song = this.song.filter(item=>item.id !==value.id)
    }
  },
};
</script>

<style>
.container {
  position: fixed;
  z-index: 1500;
  bottom: 150rpx;
  background: rgba(255, 255, 255, 0.8);
  width: 80%;
  height: 480rpx;
  border-radius: 30rpx;
  overflow-x: scroll;
}

.container .top {
  padding: 10rpx 20rpx;
  display: flex;
  align-items: center;
  height: 80rpx;
  font-size: 20rpx;
}

.container .top .iconfont {
  font-size: 40rpx;
  margin-left: 330rpx;
}

.container .bottom {
  width: 100%;
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
}

.container .bottom .item .music text {
  height: 50rpx;
  line-height: 50rpx;
  max-width: 500rpx;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container .bottom .item .music .author {
  font-size: 26rpx;
  color: #777777;
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
  color: #555555;
}
</style>
