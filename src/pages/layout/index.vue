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
import {
  getQrKey,
  getQrCreate,
  getQrCheck,
  getLoginStatus,
  getCellphone,
} from "@/api/discover.js";
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
  methods: {
    async formSubmit(e) {
      const user = await getCellphone(this.user);
      this.cookie = user.data.cookie;
      console.log('1111111',this.cookie)
      uni.setStorageSync('cookie',this.cookie)
      this.loginUserInfo(this.cookie)
    },
    async loginUserInfo(cookie) {
      // 登录获取用户信息
      let loginStatus = await getLoginStatus({ cookie });
      const { code, account } = loginStatus.data.data;
      if (code === 200) {
        uni.setStorageSync("userInfo", JSON.stringify(account));
        if (account) {
          uni.showToast({
            title: '已登录',
            icon: 'none',
          });
        }
      }
    },
  },
  computed: {
    ...mapGetters(["showPanel", "currentActive"]),
  },
  async created() {
    this.formSubmit()
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