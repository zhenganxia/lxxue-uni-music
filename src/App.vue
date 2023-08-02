
<script>
export default {
   shu: {//全局标识
		isMusicPlay: false, // 当前是否在播放
		musicId: '',
		musicIds: [],
		musicIdList:[],
		currentTimeNum: 0,
		playwaynum:0,
		userInfo:uni.getStorageSync('userInfo1') // 用户信息
	},
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
    uni.hideTabBar({
      animation: false,
    });
  },
  onHide: function () {
    console.log("App Hide");
  },
  onPageNotFound: function () {
    uni.navigateTo({
      url: "/pages/error/index", // 404 页面的路径
    });
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./static/comm.css";
@import '/static/iconfont/iconfont.css';

html,
body {
  // height: 100vh;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
