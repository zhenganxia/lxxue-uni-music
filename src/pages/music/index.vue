<template>
  <view class="music" v-if="song[0]">
    <view class="music_title">
      <text
        class="iconfont icon-shangyige"
        style="position: absolute; left: 0"
        @click="goBack"
      ></text>
      <view class="music_titleSong">
        <view class="music_titleAnimate">
          <view
            :class="song[0].name.length < 14 ? '' : 'music_titleAnimateLoop'"
            >{{ song[0].name }}</view
          >
        </view>
        <view>{{ song[0].ar[0].name }}</view>
      </view>
      <text
        class="iconfont icon-share"
        style="position: absolute; right: 0"
      ></text>
    </view>
    <!-- 播放图片 -->
    <view class="music_container">
      <image
        class="music_needle"
        :class="isPlayNeedle"
        src="/static/images/song/needle.png"
      />
      <view class="music_discContainer" :class="isPlayDisc">
        <image class="music_dic" src="/static/images/song/disc.png" />
        <image class="music_dicImg" :src="song[0].al.picUrl" />
      </view>
    </view>
    <!-- 播放进度条 -->
    <view style="display: flex; justify-content: center">
      <view class="control-process">
        <text>{{ currentTime }}</text>
        <slider
          class="slider"
          @change="sliderChange"
          @touchstart="sliderMoveStart"
          @touchend="sliderMoveEnd"
          min="0"
          block-size="16"
          max="100"
          activeColor="rgb(240, 19, 19)"
          backgroundColor="rgba(255,255,255,.3)"
          :value="sliderValue"
        />
        <text>{{ durationTime }}</text>
      </view>
    </view>
    <!-- 底部信息 -->
    <view class="music_control">
      <text :class="chooseMode" @click="handleChange"></text>
      <!-- 上一首 -->
      <text
        class="iconfont icon-lastSong"
        id="pre"
        @click="handleSwitch"
      ></text>
      <!-- 播放 -->
      <text :class="isPlayMusic" class="big" @click="musicPlay"></text>
      <!-- 下一首 -->
      <text
        class="iconfont icon-nextSong"
        id="next"
        @click="handleSwitch"
      ></text>
      <!-- 播放列表 -->
      <text class="iconfont icon-playList" @click="toPlayRecently"></text>
    </view>
    <!-- 歌曲详情列表 -->
    <view v-if="isShow" class="song-detail">
      <play-recently
        :playRecentlyId="playRecentlyIdList"
        @stopSong="stopSong"
      ></play-recently>
    </view>
    <!-- 歌词 -->
     <!-- <view class="lyric-contain">
         <view class="song-lyric" :style="lyricMove">
           <p
             v-for="(item,index) in lyric"
             :key="index"
             :style="{'font-size': (index==currentRow ? '1.3rem':'.9rem')}"
             class="lyric-row"
           >{{item.text}}</p>
           <p
               v-for="(item,index) in lyric"
               :key="index"
             >{{item.text}}</p>
         </view>
       </view> -->
  </view>
</template>

<script>
import playRecently from "./playRecently/playRecently.vue";
import { getSongDetail, getSongUrl, getLyric } from "@/api/discover.js";

const app = getApp().globalData;
const createInnerAudioContext = uni.createInnerAudioContext();
let _musicLink = "";
let _durationTimeNum = 0;
let _playMode = {
  sequence: 0,
  random: 1,
  loop: 2,
};
let _isMovingSlider = false;
let _musicIdList = [];
export default {
  data() {
    return {
      lyricMove:{},
      currentRow:undefined,
      lyric:[],
      playRecentlyId: undefined,
      song: [], //歌曲详情,
      musicId: '', //音乐id
      isPlay: false,
      mode: 0,
      currentTime: "00:00",
      durationTime: "00:00",
      isShow: false,
      playRecentlyIdList: [],
      isRandom: false,
      isloop: false,
      sliderValue: 0,
    };
  },
  // watch: {
  //   // 监听当前播放时间
  //   currentTime() {
  //     this.lyric.forEach((element, index) => {
  //       if (this.currentTime == element.time) {
  //         this.lyricMove.top = -index * 2.5 + 6 + "rem";
  //         this.currentRow = index; //通过比较我们歌词属性里的时间与当前播放时间，来定位到该歌词
  //       }
  //     });
  //   }
  // },

  async onLoad() {
   let musicId = this.musicId = uni.getStorageSync('musicId') || ''
    const musicIdList = JSON.parse(uni.getStorageSync('musicIdList')) 
    this.playRecentlyIdList = musicIdList;
    _musicIdList = musicIdList;
    if (!musicId && musicIdList.length > 0) {
      musicId = this.musicId = musicIdList[0]?.id;
    }
    await this.getMusicInfo(musicId);
    //判断当前页面音乐是否在播放
    if (app.isMusicPlay) {
      this.isPlay = true;
      // this.musicId = this.musicId;
      uni.setStorageSync('musicId',this.musicId)
    }
    this.mode = app.playwaynum;
    //判断播放顺序
    switch (this.mode) {
      case 1:
        this.isRandom = false;
        this.isloop = false;
        break;
      case 2:
        this.isRandom = true;
        this.isloop = false;
        break;
      case 3:
        this.isRandom = false;
        this.isloop = true;
        break;
    }
  },
  methods: {
	// 获取歌曲详情，图片、时长等
    async getMusicInfo(musicId) {
      let songData = await getSongDetail({ ids: musicId });
      const { code, songs } = songData.data;
      if (code === 200) {
        this.song = songs;
        // 悬浮播放器信息
        let musicInfo = {
          isPlay: app.isMusicPlay,
          song: songs[0],
          musicId,
        };
        uni.$emit("musicBottom", {
          msg: musicInfo,
        });
        _durationTimeNum = songs.length > 0 ? songs[0]?.dt : undefined;
        this.durationTime = String(this.handleTime(_durationTimeNum));
      }
    },
    async musicPlay() {
      this.isPlay = !this.isPlay;
      app.isMusicPlay = this.isPlay;
      let { musicId, isPlay } = this.$data;
      await this.musicControl(musicId, isPlay, _musicLink);
    },
    /**
     * 播放音乐
     * @param {*String} musicId 需要播放歌曲id
     * @param {*Boolean} isPlay 是否正在播放
     * @param {*String} musicLink 需要播放链接
     */
    async musicControl(musicId, isPlay, musicLink) {
      if (isPlay) {
        app.isMusicPlay = true;
        if (!musicLink || this.musicId !== musicId) {
          //获取播放链接
          const musicLinkData = await getSongUrl({ id: musicId });
          const { code, data } = musicLinkData.data;
          if (code === 200) {
            _musicLink = data[0].url === musicLink ? musicLink : data[0].url;
            if (!_musicLink) {
              uni.showToast({
                title: "此曲不可播放,请点击下一曲",
                icon: "none",
              });
            }
            if (this.isloop) {
              createInnerAudioContext.onEnded(() => {
                createInnerAudioContext.src = _musicLink;
                createInnerAudioContext.play();
              });
            }
            createInnerAudioContext.startTime =
              createInnerAudioContext.currentTime;
          }
        }
        createInnerAudioContext.autoplay = true;
        createInnerAudioContext.src = _musicLink;
        createInnerAudioContext.title = this.song[0].name;
        // createInnerAudioContext.play();//
      } else {
        app.currentTimeNum = createInnerAudioContext.currentTime;
        createInnerAudioContext.pause();
      }

      //监听音乐的播放/暂停/停止/自动完成播放
      createInnerAudioContext.onPlay(() => {
        app.isMusicPlay = this.isPlay = true;
        this.musicId = musicId;
        createInnerAudioContext.seek(
          new Date(app.currentTimeNum).getMilliseconds()
        );
      });
      createInnerAudioContext.onPause(() => {
        app.isMusicPlay = this.isPlay = false;
      });
      // 播放完成
      createInnerAudioContext.onEnded(() => {
        this.next(_musicIdList, false);
      });
      //监听音乐实时播放的时间
      createInnerAudioContext.onTimeUpdate(() => {
        let currentTimeNum = createInnerAudioContext.currentTime;
        this.sliderValue = (currentTimeNum / _durationTimeNum) * 1000 * 100;
        this.currentTime = String(this.handleTime(currentTimeNum * 1000));
      });
      // this.getLyricList()
    },
    handleSwitch(e) {
      let type = e.currentTarget.id;
      createInnerAudioContext.stop();
      let isRandom = this.isRandom;
      switch (type) {
        case "pre":
          this.pre(_musicIdList, isRandom);
          break;
        case "next":
          this.next(_musicIdList, isRandom);
          break;
      }
    },
    //上一曲
    async pre(musicIdList, isRandom) {
      if (musicIdList.length < 2) {
        uni.showToast({
          title: "此曲为单曲",
          icon: "none",
        });
      } else if (isRandom) {
        this.handleRandomEvent();
      } else {
        let musicId = this.musicId;
        let index = musicIdList.findIndex((v) => v.id == musicId);
        if (index !== -1) {
          let nextSong = musicIdList[index - 1];
          this.musicId = nextSong.id;
          await this.getMusicInfo(this.musicId);
          await this.musicControl(this.musicId, true);
        } else {
          uni.showToast({
            title: "此曲为第一首",
            icon: "none",
          });
        }
      }
      this.sliderValue = 0;
      this.currentTime = "00:00";
    },
    //下一曲
    async next(musicIdList, isRandom) {
      if (musicIdList.length < 2) {
        uni.showToast({
          title: "此曲为单曲",
          icon: "none",
        });
      } else if (isRandom) {
        this.handleRandomEvent();
      } else {
        let musicId = this.musicId;
        let index = musicIdList.findIndex((v) => v.id == musicId);
        if (musicIdList.length !== index + 1) {
          let nextSong = musicIdList[index + 1];
          this.musicId = nextSong.id;
          await this.getMusicInfo(this.musicId);
          await this.musicControl(this.musicId, true);
        } else {
          uni.showToast({
            title: "词曲为最后一首",
            icon: "none",
          });
        }
      }
      this.sliderValue = 0;
      this.currentTime = "00:00";
    },
    handleChange() {
      let mode = (app.playwaynum = this.mode = (this.mode + 1) % 3);
      switch (mode) {
        case 1:
          mode += 1;
          uni.showToast({
            title: "随机播放",
            icon: "success",
          });
          this.isRandom = true;
          this.isloop = false;
          break;
        case 2:
          mode += 1;
          wx.showToast({
            title: "单曲循环",
            icon: "success",
          });
          this.isRandom = false;
          this.isloop = true;
          break;
        default:
          mode = 1;
          uni.showToast({
            title: "列表循环",
            icon: "success",
          });
          this.isRandom = false;
          this.isloop = false;
          break;
      }
    },
    //随机播放事件
    handleRandomEvent() {
      let musicId = this.musicId;
      let musicIdList = _musicIdList;
      let length = musicIdList.length;
      let index;
      if (length < 2) {
        this.musicControl(musicId, true);
        return;
      }
      if (length === 1) {
        musicId = musicIdList[0];
      } else {
        do {
          let range = length - 0;
          let rand = Math.random();
          index = 0 + Math.round(rand * range);
        } while (musicId === musicIdList[index] || index >= musicIdList.length);
        this.musicId = musicId = musicIdList[index];
      }
      this.getMusicInfo(musicId);
      this.musicControl(musicId, true);
    },
    handleTime(time) {
      let minute = Math.floor(time / 1000 / 60);
      let second = Math.floor((time / 1000) % 60);
      minute = String(minute).length == 1 ? "0" + minute : minute;
      second = String(second).length == 1 ? "0" + second : second;
      return minute + ":" + second;
    },
    sliderChange(e) {
      if (!_isMovingSlider) {
        this.sliderValue = e.detail.value;
        let position = (e.detail.value / 100) * _durationTimeNum;
        this.currentTime = String(this.handleTime(position));
        createInnerAudioContext.seek(position / 1000);
      }
    },
    sliderMoveStart() {
      _isMovingSlider: true;
    },
    sliderMoveEnd() {
      _isMovingSlider: false;
    },
    toPlayRecently() {
      this.isShow = !this.isShow;
    },
    // 返回上一级
   async  goBack() {
      Object.assign(app, {
        isMusicPlay: false, // 当前是否在播放
        musicId: "",
        musicIds: [],
        musicIdList: [],
        currentTimeNum: 0,
        playwaynum: 0,
        song:[]
      });
      createInnerAudioContext.stop();
      uni.setStorageSync('musicId','')
      uni.setStorageSync('musicIdList',JSON.stringify([]))
      uni.navigateBack({
        delta: 1,
      });
    },
    async stopSong(song, id) {
      this.musicId = id;
      if (this.isPlay) {
        // 删除时正在播放
        this.next(song, false);
      } else {
        // 删除时未播放
        let index = song.findIndex((v) => v.id == id);
        let nextSong = song[index + 1];
        this.musicId = nextSong.id;
        this.currentTime = "00:00";
        await this.getMusicInfo(this.musicId);
      }
    },
    // 获取歌词
//     async getLyricList() {
//     const lyricList =   await getLyric({id:this.musicId});
//       const { code, lrc } = lyricList.data;
//       if(code === 200) {
//         this.formatLyric(lrc.lyric)
//       }
//     },
//     //传入初始歌词文本text
// formatLyric(text) {
//       let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
//       let row = arr.length; //获取歌词行数
//       for (let i = 0; i < row; i++) {
//         let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
//         let temp_arr = temp_row.split("]");//我们可以通过“]”对时间和文本进行分离
//         let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
//         //再对剩下的歌词时间进行处理
//         temp_arr.forEach(element => {
//           let obj = {};
//           let time_arr = element.substr(1, element.length - 1).split(":");//先把多余的“[”去掉，再分离出分、秒
//           let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
//           obj.time = s;
//           obj.text = text;
//           this.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
//         });
//       }
//       this.lyric.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
//       console.log('333333333333333333',this.lyric)
//     },
    sortRule(a, b) { //设置一下排序规则
      return a.time - b.time;
    }

  },
  computed: {
    isPlayNeedle() {
      return this.isPlay && "music_needleRotate";
    },
    isPlayDisc() {
      return this.isPlay && "music_discContainerAnimation";
    },
    isPlayMusic() {
      return this.isPlay ? "iconfont icon-play" : "iconfont icon-pause";
    },
    chooseMode() {
      return this.mode === _playMode.sequence
        ? "iconfont icon-sequence"
        : this.mode === _playMode.loop
        ? "iconfont icon-loop"
        : "iconfont icon-random";
    },
  },
  components: {
    playRecently,
  },
};
</script>

<style>
uni-page-body,
body {
  height: 100%;
}

.music {
  padding-top: 70rpx;
  height: 85%;
}

.music_title {
  background: #000000;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.music_title text {
  font-size: 50rpx;
}

.music_titleSong {
  width: 100%;
  padding: 0 50rpx 0 50rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.music_titleAnimate {
  width: 300rpx;
  font-size: 40rpx;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 600;
}

.music_titleAnimateLoop {
  width: 300rpx;
  font-weight: 600;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  animation: 10s titleSongLoop linear infinite;
}

@keyframes titleSongLoop {
  from {
    transform: translateX(290rpx);
  }

  to {
    transform: translateX(-1rpx);
  }
}

.music_container {
  /* background-image: linear-gradient(#000000 75%,#7e3f00); */
  background: linear-gradient(to left top, #000000 75%, #7e3f00);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.music_needle {
  z-index: 99;
  position: relative;
  left: 60rpx;
  width: 240rpx;
  height: 180px;
  transform-origin: 40rpx 0;
  transform: rotate(-20deg);
  transition: transform 1s;
}

.music_needleRotate {
  transform: rotate(0deg);
}

.music_discContainer {
  position: relative;
  top: -140rpx;
  width: 598rpx;
  height: 598rpx;
}

/* 动画 */
.music_discContainerAnimation {
  animation: musicDisc 10s linear infinite;
  /* infinite无限循环 */
  animation-delay: 1s;
}

@keyframes musicDisc {
  to {
    transform: rotate(360deg);
  }
}

.music_dic {
  width: 598rpx;
  height: 598rpx;
}

.music_dicImg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 370rpx;
  height: 370rpx;
  border-radius: 50%;
}

.control-process {
  position: absolute;
  bottom: 150rpx;
  width: 700rpx;
  height: 100rpx;
  line-height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control-process .slider {
  position: relative;
  width: 526rpx;
}

.control-process text {
  color: #fff;
}

.music_control {
  /* background: linear-gradient(#7e3f00,#000000 80%); */
  background: linear-gradient(to right top, #7e3f00, #000000 90%);
  position: absolute;
  height: 120rpx;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  color: #000000;
}

.music_control text {
  width: 20%;
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
  color: #ffffff;
  font-size: 50rpx;
}

.music_control text.big {
  font-size: 90rpx;
}

.song-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -999;
}
.lyric-contain {
  position: fixed;
  z-index: 999;
  bottom: 150rpx;
  width: 100%;
  height: 30%;
  overflow: scroll;
  color:#fff;
}
.song-lyric {
  position: absolute;
  transform: translate(-50%,-50%);
  left: 0;
  top:0;
}
</style>
