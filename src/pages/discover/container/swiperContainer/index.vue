<!-- 发现-轮播图 -->
<template>
	<view class="discover-swiper">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in bannerInfo" :key="index">
					<view class="swiper-item uni-bg-red">
                        <image :src="item.pic" alt="" class="swiper-slide-img" />
                    </view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
import {getBanner} from '@/api/discover.js'

export default {
    data() {
        return {
            defaultImages: [
          // 都没有存图片时默认图
            {
                        url:'',
                        pic:'http://p1.music.126.net/5bFuahB8SgQxaG34TDaM7A==/109951168557580532.jpg?imageView&quality=89'
                    },{
                        pic:'http://p1.music.126.net/w4p4IYR51vHSJyZcLMHkJw==/109951168557505160.jpg?imageView&quality=89'
                    },
                    {
                        pic:'http://p1.music.126.net/UEmoJD7kxHM7fo3wB-RzGw==/109951168558487506.jpg?imageView&quality=89'
                    },
                    {
                        pic:'http://p1.music.126.net/aYg0AaIkDlxacegdv69IqQ==/109951168558484039.jpg?imageView&quality=89'
                    }
          
        ],
            background: ['color1', 'color2', 'color3'],
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
            bannerList:[]
        }
    },
    computed: {
       bannerInfo() {
        return this.bannerList.length>0 ? this.bannerList : this.defaultImages
       }
    },
    created() {
        this.getBannerList()
    },
    methods: {
        changeIndicatorDots(e) {
            this.indicatorDots = !this.indicatorDots
        },
        changeAutoplay(e) {
            this.autoplay = !this.autoplay
        },
        intervalChange(e) {
            this.interval = e.target.value
        },
        durationChange(e) {
            this.duration = e.target.value
        },
        async getBannerList(){
                const res = await  getBanner({type:2})
                this.bannerList = res.data.banners || []
            }
    }
}
</script>
<style lang="scss" scoped>
.discover-swiper{
	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}
	.info {
		position: absolute;
		right: 20rpx;
	}
	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
    .swiper-slide-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>
