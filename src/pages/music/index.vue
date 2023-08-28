<template>
  <view class="music" v-if="song[0]">
    <view class="music-content">
      <view class="music_title" v-if="isSong">
        <text
          class="iconfont icon-shangyige"
          style="position: absolute; left: 0"
          @click="goBack"
        ></text>
        <view class="music_titleSong">
          <view class="music_titleAnimate">
            <view
              :class="
                song[0].name.length < 14 ? '' : 'music_titleAnimateLoop'
              "
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
      <view  @touchstart="changPage" v-show="isSong">
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
      </view>
      <!-- 歌词 -->
      <view  v-show="!isSong"  @touchstart="changPage">
        <lyricSong
          ref="lyric"
          :musicId="musicId"
          :musicLink="musicLink"
          :lyricTime="lyricTime"
          :lyricsList="lyricsList"
        >
        </lyricSong>
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
      <view class="music_control-icon">
        <text :class="chooseMode" @click="handleChange"></text>
        <!-- 上一首 -->
        <text
          class="iconfont icon-lastSong"
          id="pre"
          @click="handleSwitch"
        ></text>
        <!-- 播放 -->
        <text :class="isPlayMusic" class="big" @click="musicPlaySong"></text>
        <!-- 下一首 -->
        <text
          class="iconfont icon-nextSong"
          id="next"
          @click="handleSwitch"
        ></text>
        <!-- 播放列表 -->
        <text class="iconfont icon-playList" @click="toPlayRecently"></text>
      </view>
    </view>
    <!-- 歌曲详情列表 -->
    <view v-if="isShow" class="song-detail">
      <play-recently
        :playRecentlyId="playRecentlyIdList"
        :musicId="musicId"
        @stopSong="stopSong"
        @listPlay="listPlay"
      ></play-recently>
    </view>
  </view>
</template>

<script>
import playRecently from "./playRecently/playRecently.vue";
import lyricSong from "./lyricSong.vue";
import { getSongDetail, getSongUrl, getLyric } from "@/api/discover.js";

const app = getApp().globalData;
let audio = undefined; // 音乐背景实例参数
let _durationTimeNum = 0;
export default {
  name: "musicList",
  components: { lyricSong, playRecently },
  data() {
    return {
      isSong: true,
      lyricMove: {},
      currentRow: undefined,
      lyric: [],
      playRecentlyId: undefined,
      song: [], //歌曲详情,
      musicId: uni.getStorageSync("musicId"), //音乐id
      musicIdList: JSON.parse(uni.getStorageSync("musicIdList")) || [], // 音乐id 列表
      isPlay: false,
      mode: 1, // 判断播放方式 1：列表播放 2：随机播放  3：循环播放
      currentTime: "00:00",
      durationTime: "00:00",
      isShow: false,
      playRecentlyIdList: [], // 当前播放详情列表
      sliderValue: 0,
      isMovingSlider: false, // 判断进度
      musicLink: "", // 播放url
      lyricsList: [], // 歌词
      lyricIndex: 0,
      lyricTime: 0,
    };
  },

  async onLoad() {
    this.playRecentlyIdList = this.musicIdList;
    if (!this.musicId && this.musicIdList.length > 0) {
      // 如果没有当前播放获取播放列表数据第一个id播放
      this.musicId = this.musicIdList[0]?.id;
    }
    await this.getMusicInfo();
  },
  onUnload() {
    // 销毁audio实例
    audio.destroy();
  },
  methods: {
    changPage() {
      if (this.lyricsList && this.lyricsList.length > 0) {
        this.isSong = !this.isSong;
      }
    },
    // 获取歌词
    async getLyricList() {
      const musicId = uni.getStorageSync("musicId");
      const lyricList = await getLyric({ id: musicId });
      const { code, lrc } = lyricList.data;
      if (code === 200) {
        this.formatLyric(lrc.lyric);
      } else {
        this.error = "加载失败！";
      }
    },
    //传入初始歌词文本text
    formatLyric(text) {
      this.lyricsList = []
      let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach((element) => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与lyricTime相同的类型，方便待会实现滚动效果
          obj.time = s;
          obj.text = text;
          this.lyricsList.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
        });
      }
      this.lyricsList
        .sort(this.sortRule) // 按照时间重新排序
        .map((item, index) => {
          const next = this.lyricsList[index + 1];
          if (next) {
            item.timeDuration = [item.time, next.time];
            item.timeDurationTime = next.time - item.time;
            return item;
          }
        });
      console.log("333333333333333333", this.lyricsList);
    },
    sortRule(a, b) {
      //设置一下排序规则
      return a.time - b.time;
    },
    // 获取歌曲详情，图片、时长等
    async getMusicInfo() {
      let songData = await getSongDetail({ ids: this.musicId });
      const { code, songs } = songData.data;
      if (code === 200) {
        this.song = songs;
        // 悬浮播放器信息
        let musicInfo = {
          isPlay: this.isPlay,
          song: songs[0],
          musicId: this.musicId,
        };
        uni.$emit("musicBottom", {
          msg: musicInfo,
        });
        _durationTimeNum = songs.length > 0 ? songs[0]?.dt : undefined;
        this.durationTime = String(this.handleTime(_durationTimeNum));
        await this.musicControl();
        await this.getLyricList();
      }
    },
    // 播放按钮
    async musicPlaySong() {
      this.isPlay = !this.isPlay;
      await this.musicControl();
    },
    // 音乐播放
    async musicControl() {
      if (audio && Object.keys(audio).length !== 0) {
        audio.destroy();
      }
      audio = uni.createInnerAudioContext();

      if (this.isPlay) {
        //获取播放链接
        const musicLinkData = await getSongUrl({ id: this.musicId });
        const { code, data } = musicLinkData.data;
        if (code === 200) {
          this.musicLink = data[0].url;
          if (!this.musicLink) {
            uni.showToast({
              title: "此曲不可播放,请点击下一曲",
              icon: "none",
            });
            this.isPlay = false;
            return;
          }
          audio.startTime = audio.currentTime;
          audio.autoplay = true;
          audio.src = this.musicLink;
          console.log("6666666666666666666666", this.musicLink);
          audio.title = this.song[0].name;
          // audio.play();//
        }
      } else {
        app.currentTimeNum = audio.currentTime;
        audio.pause();
      }

      //音乐的播放
      audio.onPlay(() => {
        this.isPlay = true;
        audio.seek(new Date(app.currentTimeNum).getMilliseconds());
      });

      // 音乐暂停
      audio.onPause(() => {
        this.isPlay = false;
      });

      // 播放完成播放下一首
      audio.onEnded(async () => {
        this.preNext("next");
      });

      //监听音乐实时播放的时间
      audio.onTimeUpdate(() => {
        let currentTimeNum = audio.currentTime;
        this.sliderValue = (currentTimeNum / _durationTimeNum) * 1000 * 100;
        this.currentTime = String(this.handleTime(currentTimeNum * 1000));
        let time_arr = this.currentTime.split(":"); //先把多余的“[”去掉，再分离出分、秒
        this.lyricTime = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
      });
    },
    handleSwitch(e) {
      let type = e.currentTarget.id;
      audio.stop();
      this.preNext(type);
    },
    /**
     *
     * @param {*} type // 默认播放上一首，上一首下一首歌曲切换参数
     */
    async preNext(type = "pre") {
      const musicIdList = this.musicIdList;
      if (musicIdList.length < 2) {
        uni.showToast({
          title: "此曲为单曲",
          icon: "none",
        });
        return;
      }
      this.isPlay = true;
      if (this.mode === 2) {
        // 随机播放
        this.handleRandomEvent();
      } else if (this.mode === 3) {
        // 单曲播放
        audio.src = this.musicLink;
      } else {
        let index = musicIdList.findIndex((v) => v.id == this.musicId);
        if (index !== -1) {
          // 上一首
          let nextSong = musicIdList[index - 1];
          if (type !== "pre") {
            // 下一首
            nextSong = musicIdList[index + 1];
          }
          this.musicId = nextSong?.id;
          uni.setStorageSync("musicId", this.musicId);
          await this.getMusicInfo();
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
    // 播放方式，循环、随机、单曲
    handleChange() {
      this.mode = this.mode + 1;
      const songStatus = {
        1: "列表循环",
        2: "随机播放",
        3: "单曲循环",
      };
      if (this.mode > 3) {
        // 重新点击
        this.mode = 1;
      }
      const playBack = songStatus[this.mode];
      uni.showToast({
        title: playBack,
        icon: "success",
      });
    },
    //随机播放事件
    async handleRandomEvent() {
      const len = this.musicIdList.length;
      const lenIndex = [];
      for (let i = 0; i < len; i++) {
        lenIndex.push(i);
      }
      const randomIndex = Math.floor(Math.random() * lenIndex.length);
      const currentSong = this.musicIdList[randomIndex];
      this.musicId = currentSong.id;
      uni.setStorageSync("musicId", currentSong.id);
      await this.getMusicInfo();
    },
    handleTime(time) {
      let minute = Math.floor(time / 1000 / 60);
      let second = Math.floor((time / 1000) % 60);
      minute = String(minute).length == 1 ? "0" + minute : minute;
      second = String(second).length == 1 ? "0" + second : second;
      return minute + ":" + second;
    },
    sliderChange(e) {
      if (!this.isMovingSlider) {
        this.sliderValue = e.detail.value;
        let position = (e.detail.value / 100) * _durationTimeNum;
        this.currentTime = String(this.handleTime(position));
        audio.seek(position / 1000);
      }
    },
    sliderMoveStart() {
      this.isMovingSlider = true;
    },
    sliderMoveEnd() {
      this.isMovingSlider = false;
    },
    toPlayRecently() {
      this.isShow = !this.isShow;
    },
    // 返回上一级
    async goBack() {
      Object.assign(app, {
        isMusicPlay: false, // 当前是否在播放
        musicId: "",
        musicIds: [],
        musicIdList: [],
        currentTimeNum: 0,
        playwaynum: 0,
        song: [],
      });
      this.musicLink = "";
      uni.setStorageSync("musicId", "");
      uni.setStorageSync("musicIdList", JSON.stringify([]));
      audio.destroy();
      uni.navigateBack({
        delta: 1,
      });
    },
    async stopSong(musicId) {
      if (this.isPlay) {
        // 删除时正在播放
        this.musicId = musicId;
        await this.preNext("next");
      }
    },
    async listPlay(musicId) {
      this.musicId = musicId;
      await this.getMusicInfo();
    },
    // // 获取歌词
    //     async getLyricList() {
    //     const lyricList =   await getLyric({id:this.musicId});
    //       const { code, lrc } = lyricList.data;
    //       if(code === 200) {
    //         this.formatLyric(lrc.lyric)
    //         this.lyricsList = lrc.lyric
    //       }
    //     },
    //传入初始歌词文本text
    // formatLyric(text) {
    //       let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
    //       let row = arr.length; //获取歌词行数
    //       for (let i = 0; i < row; i++) {
    //         let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
    //         let temp_arr = temp_row.split("]");//我们可以通过“]”对时间和文本进行分离
    //         let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
    //         //再对剩下的歌词时间进行处理
    //         temp_arr.forEach((element,index) => {
    //           let obj = {};
    //           // let time_arr = element.substr(1, element.length - 1).split(":");//先把多余的“[”去掉，再分离出分、秒
    //           const time = element.substr(1, element.length - 1).split(".")
    //           // console.log('mmmmmmmmmmmmmmmmm',time[0])
    //           // let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
    //           obj.time = time[0];
    //           obj.text = text;
    //           obj.index = index
    //           // console.log('999999999999999999999999999999',time_arr,Math.ceil(time_arr[1]),obj)
    //           this.lyricsList.push(obj); //每一行歌词对象存到组件 lyricsList歌词属性里
    //         });
    //       }
    //       this.lyricsList.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
    //       console.log('333333333333333333',this.lyricsList)
    //     },
    // sortRule(a, b) {
    //   //设置一下排序规则
    //   return a.time - b.time;
    // },
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
      return this.mode === 1
        ? "iconfont icon-sequence"
        : this.mode === 3
        ? "iconfont icon-loop"
        : "iconfont icon-random";
    },
  },
};
</script>

<style lang="scss">
uni-page-body,
body {
  height: 100%;
}

.music {
  height: 100vh;
  background: linear-gradient(to right bottom, rgb(139, 122, 122), #000000 90%);
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
  position: fixed;
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

.music-content {
  // height: 92%;
}

.music_control {
  // background: linear-gradient(to right bottom, #4c4242, #000000 95%);
  // background: #000000;s
  position: fixed;
  height: 8%;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  color: #000000;

  .music_control-icon {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
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
  // z-index: 3000;
}

</style>
