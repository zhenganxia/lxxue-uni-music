<!-- 首页 -->
<template>
  <view class="discover-content">
    <disCoverBanner class="discover-content-banner" @discoverData="discoverData"></disCoverBanner>
    <view class="container" v-if="searchList.length === 0">
      <container></container>
    </view>
    <!-- 搜索数据展示 -->
    <view v-if="searchList.length > 0">
      <view v-for="(item, index) in searchList" :key="index">
        <view 
          class="search"
          :class="{ 'search-bottom': (index !== searchList.length - 1), 'search-padding': index === 0 }"
          @click="goSong(item.id)"
          >
            <view style="margin-top: 20rpx">
              {{ item.name }} {{ item.artists.map(song=>song.name).join(',') }}
            </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import disCoverBanner from "./disCoverBanner/index.vue";
import container from "./container/index.vue";
export default {
  name: "Discover",
  components: { disCoverBanner, container },
  data() {
    return {
      searchList: [],
    };
  },
  methods: {
    discoverData(data = []) {
      this.searchList = data;
    },
    async videoUrl(row) {
      uni.navigateTo({
        url: `/pages/music/index?musicId=${row.id}`
      });
    },
    goSong(id) {
      uni.navigateTo({
        url: `/pages/music/index`,
      });
      uni.setStorageSync('musicId', id)
      uni.setStorageSync('musicIdList',JSON.stringify(this.searchList) )
    }
  },
};
</script>

<style scoped lang="scss">
.discover-content {
  &-banner {
    position: fixed;
    z-index: 1000;
  }

  .container {
    padding-top: 100rpx;
  }

  .search {
    padding: 50rpx;
  }

  .search:hover {
    background-color: red($color: #000000);
  }

  .search-bottom {
    border-bottom: 1px solid rgb(206, 204, 204);
  }

  .search-padding {
    padding-top: 110rpx;
    border-top: 0;
  }
}
</style>
