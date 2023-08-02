
<template>
  <view class="loginPhone">
    <view style="margin-bottom: 20rpx">登录体验更多精彩</view>
    <!-- 二维码 -->
    <!-- <view id="qrcode"></view> -->
    <form @submit="formSubmit" @reset="formReset">
      <view class="uni-form-item uni-column">
        <view class="title">手机号</view>
        <input
          class="uni-input"
          name="input"
          placeholder="输入手机号"
          v-model="user.phone"
        />
        <view class="title">密码</view>
        <input
          class="uni-input"
          name="input"
          placeholder="输入密码"
          v-model="user.password"
        />
      </view>
      <view class="uni-btn-v">
        <button form-type="submit">登录</button>
      </view>
    </form>
  </view>
</template>

<script>
import {
  getQrKey,
  getQrCreate,
  getQrCheck,
  getLoginStatus,
  getCellphone,
} from "@/api/discover.js";

export default {
  data() {
    return {
      num: "",
      pwd: "",
      loginStatuSInterval: undefined,
      user: {
        phone: "",
        password: "",
      },
    };
  },
  async mounted() {
    // const cookie = uni.getStorageSync("cookie");
    // if (cookie) {
    //   this.loginUserInfo(cookie);
    // } else {
    //   this.login();
    // }
  },
  methods: {
    formReset() {},
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
    // // 二维码生成
    // async login() {
    //   let result = await getQrKey({ timestamp: +new Date() });
    //   const { code, data } = result.data;
    //   if (code === 200) {
    //     let keyResult = await getQrCreate({
    //       key: data.unikey,
    //       qrimg: true,
    //       timestamp: +new Date(),
    //     });
    //     if (keyResult.data.code === 200) {
    //       new QRCode(document.getElementById("qrcode"), {
    //         text: keyResult?.data?.data?.qrurl,
    //         width: 128,
    //         height: 128,
    //         colorDark: "#000000",
    //         colorLight: "#ffffff",
    //         correctLevel: QRCode.CorrectLevel.H,
    //       });
    //     }
    //     this.hasLogin(data.unikey);
    //   }
    // },
    // // 扫描二维状态-获取cookie
    // async hasLogin(unikey) {
    //   this.loginStatuSInterval = setInterval(async () => {
    //     let checkResult = await getQrCheck({
    //       key: unikey,
    //       timestamp: +new Date(),
    //     });
    //     const { code, message, cookie } = checkResult.data;
    //     uni.showToast({
    //       title: message,
    //     });
    //     if (code === 803) {
    //       uni.setStorageSync("cookie", JSON.stringify(cookie));
    //       this.loginUserInfo(cookie);
    //     }
    //   }, 10000);
    // },
  },
};
</script>

<style>
.loginPhone {
  padding: 40rpx 20rpx 0 20rpx;
  height: 100%;
}

.loginPhone .phone {
  border-bottom: 1rpx solid #1a0909;
  margin-bottom: 60rpx;
}

.loginPhone .pwd {
  display: flex;
  font-size: 25rpx;
  color: #006699;
  border-bottom: 1rpx solid #aaaaaa;
  margin-bottom: 60rpx;
}

.loginPhone .pwd input {
  color: #000000;
  width: 83%;
}
</style>
