<template>
  <cover-view
    class="tabbar"
    :style="{ 'padding-bottom': paddingBottomHeight + 'rpx' }"
  >
    <cover-view class="tabbar-item" v-for="(item, index) in list" :key="index">
      <view @click="tabbarChange(item.path)">
        <!-- <cover-image
          class="item-img"
          :src="item.icon_a"
        >
          <uni-icons type="person-filled" size="30"></uni-icons>
        </cover-image> -->
        <cover-view class="item-name">
          <view
            :style="{ color: active == item.active ? 'red' : 'black' }"
            @click="chang(item.active)"
          >    <uni-icons
          :type="item.icon"
          size="30"
          class="margin-right"
        ></uni-icons>
            {{ item.text }}
          </view>
        </cover-view>
        <cover-view>
          <slot></slot>
        </cover-view>
      </view>
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  props: {
    defaultUrl:{ // 默认跳转路径
      type: String,
    },
    active: {
      type: String,
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    
  },
  data() {
    return {
      paddingBottomHeight: 0, //苹果X以上手机底部适配高度
    };
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

  onShow() {
    uni.hideTabBar({
      animation: false,
    });
  },
  mounted() {
    this.$store.commit("changActive", this.list[0].active);
  },
  methods: {
    chang(active) {
      this.$store.commit("changActive", active);
    },
    tabbarChange() {
      // 跳转 layout页面
      uni.navigateTo({
        url: this.defaultUrl
      });
    },
  },
};
</script>

<style scoped lang="scss">
.tabbarActive {
  /deep/.uni-cover-view .uni-cover-view {
    color: red !important;
  }
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 120rpx;
  background-color: #ffffff;
}
.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 100rpx;
}
.item-img {
  margin-bottom: 4rpx;
  width: 46rpx;
  height: 46rpx;
}
.item-name {
  font-size: 26rpx !important;
  color: #a3a3a3 !important;
}
</style>
