<template>
  <view class="navbar flex-between">
    <uni-icons
      type="bars"
      size="22"
      @click="handlePerson(!isShow)"
      class="icon-right-item"
    ></uni-icons>
    <uni-search-bar
      class="search"
      @confirm="onSearch"
      cancelButton="none"
      :focus="true"
      v-model="value"
      @blur="blur"
      @clear="clear"
    >
    </uni-search-bar>
    <view class="icon-right">
      <uni-icons
        type="headphones"
        size="22"
        class="icon-right-item"
      ></uni-icons>
      <uni-icons type="images" size="22" class="icon-right-item"></uni-icons>
    </view>
  </view>
</template>

<script>
import { discoverSearch } from "@/api/discover.js";
export default {
  data() {
    return {
      value: "",
      isShow: false,
      searchList: [],
    };
  },
  onLoad() {
    // console.log("11111111111");
  },
  methods: {
    // 打开抽屉
    handlePerson() {
      this.$store.commit("changPanel");
    },
    onSearch() {},
    // 搜索条件
    async getSearchList() {
      if(!this.value) return
      const res = await discoverSearch({ keywords: this.value });
      const { code, result } = res.data;
      if (code === 200) {
        this.searchList = result?.songs || [];
      } else {
        this.searchList = [];
      }
      this.$emit("discoverData", this.searchList);
    },
    blur() {
      this.getSearchList();
    },
    // input(res) {
    //   console.log("----input:", res);
    // },
    clear() {
      this.$emit("discoverData", []);
    },
    // focus(e) {
    //   uni.showToast({
    //     title: "focus事件，输出值为：" + e.value,
    //     icon: "none",
    //   });
    // },
    // cancel(res) {
    //   debuger
    //   uni.showToast({
    //     title: "点击取消，输入值为：" + res.value,
    //     icon: "none",
    //   });
    // },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background: #fff;
  height: 100rpx;
}

.icon-right-item {
  margin: 0 10rpx;
}

.search {
  flex: 1;
}
</style>
