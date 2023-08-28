<template>
  <!--歌词-->
  <view
    ref="musicLyric"
    class="music-lyric"
    :style="{ 'padding-top': paddingTop }"
  >
    <view class="music-lyric-items" ref="lyricRef">
      <view v-if="lyricsList.length > 0">
        <p
          v-for="(item, index) in lyricsList"
          :key="index"
          :data-index="index"
          class="lyric-item"
          :class="{ 'current-lyric': lyricCurrentTime(item) }"
          :style="{ 'animation-duration': `${item.timeDurationTime}s` }"
        >
          {{ item.text }}
        </p>
      </view>
      <p style="color: #fff" v-if="error">{{ error }}</p>
    </view>
  </view>
</template>

<script>
export default {
  name: "lyricList",
  props: {
    // 当前播放时间
    lyricTime: {
      type: Number,
      default: 1,
    },
    paddingTop: {
      type: String,
      default: "3rem",
    },
    lyricsList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      error: "",
      scrollTop: 0,
      top: 0, // 文案居中
      lyricListDemo: [
        // lyricsList 数据样式
        {
          text: "原唱:孟煦东",
          time: 1,
          timeDuration: [1, 30], // 第一段和对二段的时间范围
          timeDurationTime: 29, // 第一段和对二段的时间间隔
        },
      ],
    };
  },
  computed: {
    lyricCurrentTime() {
      return (item) => {
        if (item.timeDuration) {
          // 判断当前播放时间是否在那个时间间隔里
          return (
            this.lyricTime >= item.timeDuration[0] &&
            this.lyricTime < item.timeDuration[1]
          );
        }
      };
    },
  },
  methods: {
    rollUp() {
      // debugger
      // const dd = document.querySelector('.music-lyric-items').scrollTop
      // // console.log('99999999999999999',this.$refs.lyric.scrollTop)
      // console.log('888888888888888',dd.scrollTop)
      // let ul1 = document.getElementById("publishMain1");
      // // let ul2 = document.getElementById("publishMain2");
      // let box = document.getElementById("publishMain");
      // // ul2.innerHTML = ul1.innerHTML;
      // if (box.scrollTop >= ul1.scrollHeight) {
      //     this.scrollTop = 0;
      // } else {
      //     this.scrollTop++;
      // }
      // box.scrollTop = this.scrollTop;
      // let scrollTopClass = document.querySelector(".music-lyric-items");
      // let scrollTop = scrollTopClass.scrollTop;
      // scrollTopClass.scrollTop = -300
      // let clientHeight =
      //   document.querySelector(".music-lyric-items").clientHeight;
      // let scrollview =
      //   document.querySelector(".music-lyric-items").scrollHeight;
      // console.log(scrollTop, "scrollTop");
      // console.log(clientHeight, "clientHeight");
      // console.log(scrollview, "scrollview");
      // if (scrollTop + clientHeight >= scrollview) {
      //   // this.getTopics();
      //   // this.limit = this.limit + 10;
      // }
      // console.log("555555555555555555555555", this.$refs.lyricRef);
      // let scrollY = scrollTopClass.offsetTop;
      // scrollTopClass.parentElement.scrollTo(0, scrollY);
      //       this.$refs.lyricRef.scrollTo({
      // top: 100,
      // behavior: 'smooth'
      // })
    },
  },
};
</script>
<style lang="scss" scoped>
/*歌词部分*/
.music-lyric {
  padding-top: 4.1rem;
  box-sizing: border-box;
  overflow: scroll;
  text-align: center;
  height: 100vh;
  padding-bottom: 4rem;

  .music-lyric-items {
    font-size: 25rpx;
    text-align: center;
    color: #fff;
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s ease-out;
    text-overflow: ellipsis;
    overflow: scroll;
    white-space: nowrap;
    height: 93%;
  }

  .lyric-item {
    line-height: 65rpx;
    color: rgb(193, 179, 179);
  }

  .current-lyric {
    color: #fff;
    animation-name: LeftToRight;
    animation-timing-function: linear;
  }
  // 动画效果  animation-duration 动态获取
  @keyframes LeftToRight {
    0% {
      transform: scale(1);
    }

    10% {
      transform: scale(1.1);
    }

    20% {
      transform: scale(1.2);
    }

    30% {
      transform: scale(1.3);
    }

    40% {
      transform: scale(1.4);
    }

    50% {
      transform: scale(1.5);
    }

    60% {
      transform: scale(1.4);
    }

    70% {
      transform: scale(1.3);
    }

    80% {
      transform: scale(1.2);
    }

    90% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }
}
</style>

