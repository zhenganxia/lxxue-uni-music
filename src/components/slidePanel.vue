<template>
    <view class="drawer">
        <view type="line" >
            <view class="example-body">
                <uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event, 'showLeft')">
                    <slot></slot>
                </uni-drawer>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props:{
        isShow:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            showRight: false,
            showLeft: false
        }
    },
    watch:{
      'isShow'(value) {
         if(value) {
            this.showDrawer('showLeft')
         } else {
            this.closeDrawer('showLeft')
         }
      }
    },
    methods: {
        confirm() { },
        // 打开窗口
        showDrawer(e) {
            this.$refs[e].open()
        },
        // 关闭窗口
        closeDrawer(e) {
            this.$refs[e].close()
        },
        // 抽屉状态发生变化触发
        change(e, type) {
            console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
            this[type] = e
        }
    },
    onNavigationBarButtonTap(e) {
        if (this.showLeft) {
            this.$refs.showLeft.close()
        } else {
            this.$refs.showLeft.open()
        }
    },
    // app端拦截返回事件 ，仅app端生效
    onBackPress() {
        if (this.showRight || this.showLeft) {
            this.$refs.showLeft.close()
            this.$refs.showRight.close()
            return true
        }
    }
}
</script>
<style lang="scss">
.example-body {
    padding: 10px;
}

.scroll-view {
    /* #ifndef APP-NVUE */
    width: 100%;
    height: 100%;
    /* #endif */
    flex: 1
}

// 处理抽屉内容滚动
.scroll-view-box {
    flex: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.info {
    padding: 15px;
    color: #666;
}

.info-text {
    font-size: 14px;
    color: #666;
}

.info-content {
    padding: 5px 15px;
}

.close {
    padding: 10px;
}
.drawer {
    position: absolute;
    top: 0;
    left: 0;
}
/deep/ .uni-drawer {
    z-index: 1100;
}
</style>



