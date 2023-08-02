<template>
  <view class="content">
    <cover-view class="content-panel">
      <slidePanel :isShow="showPanel" title="panel">
        <!-- 侧边栏抽屉 -->
        <panel></panel>
      </slidePanel>
      <view
        :style="{ 'padding-bottom': paddingBottomHeight + 'rpx' }"
        class="content-container"
      >
        <!-- 默认discover页面 -->
        <component :is="currentActive" v-model="info"></component>
      </view>
    </cover-view>
    <bottomBar class="content-body"></bottomBar>
  </view>
</template>

<script>
import bottomBar from "./bottomBar/index.vue";
import discover from "../discover/index.vue"; // 发现
import cloud from "../cloud/index.vue"; // 社区
import mine from "../mine/index.vue"; // 我的
import fm from "../fm/index.vue"; // FM
import panel from './panel'
import slidePanel from "@/components/slidePanel.vue";
import { mapGetters } from "vuex";
export default {
  name: "Layout",
  components: { discover, bottomBar, slidePanel, mine, cloud, fm, panel },
  data() {
    return {
      isShow: "",
      info: {},
      paddingBottomHeight: 26,
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["showPanel", "currentActive"]),
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
            that.paddingBottomHeight = 26 + 40;
          }
        });
      },
    });
  },
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(252, 249, 249);
  &-container {
    overflow: scroll;
  }
  &-body {
    padding-top: 50px;
  }
 
}
</style>