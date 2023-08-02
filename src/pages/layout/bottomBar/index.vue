<template>
  <view>
    <Tabbar  :list="list" :defaultUrl="defaultUrl"></Tabbar>
  </view>
</template>

<script>
import Tabbar from "@/components/tabbar.vue";
export default {
  components: { Tabbar },
  data() {
    return {
      defaultUrl:'pages/layout/index',
      list: [
        {
          text: "发现",
          icon: "/static/images/home.png", //未选中图标
          icon_a: "/static/images/home_i.png", //选中图片
          path: "activity", //页面路径
          active: "discover", // 高亮
        },
        {
          text: "FM",
          icon: "/static/images/classify.png",
          icon_a: "/static/images/classify_i.png",
          path: "recommendation",
          active: "fm",
        },
        {
          text: "播客",
          icon: "/static/images/order.png",
          icon_a: "/static/images/order_i.png",
          path: "message",
          active: "cloud",
        },
        {
          text: "社区",
          icon: "/static/images/order.png",
          icon_a: "/static/images/order_i.png",
          path: "message",
          active: "cloud",
        },
        {
          text: "我的",
          icon: "/static/images/me.png",
          icon_a: "/static/images/me_i.png",
          path: "user",
          active: "mine",
        },
      ],
    };
  },

  onShow() {
    uni.hideTabBar({
      animation: false,
    });
  },
};
</script>