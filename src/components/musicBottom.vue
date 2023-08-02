<template>
	<view class="musicBottom" v-if="musicInfo.song"
		  :style="{'top': top + 'px',
				  'right': right + 'px'}"
		  @touchstart="musicBottomStart" 
		  @touchmove.stop.prevent="musicBottomMove">
		<image :src="musicInfo.song.al.picUrl" style="width: 100rpx;height: 100rpx;border-radius: 50%;z-index: 9999;" @click="toMusic" :class="isPlayMusic"></image>
	</view>
</template>

<script>
	const app = getApp();
	let _musicId = '';
	let _startPoint;
	let _windowHeight = 0;
	let _windowWidth = 0;
	export default {
		data() {
			return {
				isPlay:false,
				musicInfo:{},
				top:0,
				right:0,
			}
		},
		watch:{
			isPlay(value){
				this.playRecentlyId = value
			},
			musicInfo(value){
				this.playRecentlyId = value
			}
		},
		mounted() {
			uni.$on('musicBottom',(data) => {
				this.musicInfo = data.msg
				this.isPlay = data.msg.isPlay
				_musicId = data.msg.musicId
			})
			uni.getSystemInfo({
				success: (res) => {
						_windowHeight = res.windowHeight
						_windowWidth = res.windowWidth
						this.top = res.windowHeight * 0.50//这里定义按钮的初始位置
						this.right = res.windowWidth * 0.01//这里定义按钮的初始位置
					}
				})
		},
		methods: {
			toMusic(){
				uni.navigateTo({
					url:'/pages/music/music?musicId=' + _musicId
				})
			},
			//拖动事件
			musicBottomStart(e){
				_startPoint = e.touches[0]
			},
			musicBottomMove(e){
				let endPoint = e.touches[e.touches.length - 1]//获取拖动结束点
				//计算在X轴上拖动的距离和在Y轴上拖动的距离
				const translateX = endPoint.clientX - _startPoint.clientX
				const translateY = endPoint.clientY - _startPoint.clientY
				_startPoint = endPoint//重置开始位置
				let _top = this.top + translateY
				let _right = this.right + translateX
				//判断是移动否超出屏幕
				if (50 -_right <= _windowWidth){
				  _right = _windowWidth + 50;
				}
				if (_right>=0){
				  _right=0;
				}
				if (_top<=0){
				  _top=33
				}
				if (_top + 50 >= _windowHeight-33){
				  _top = _windowHeight-83;
				}
				this.top = _top
				this.right = _right
			},
		},
		computed: {
			isPlayMusic(){
				return this.isPlay && 'music_discContainerAnimation'
			}
		},
	}
</script>

<style>
	.musicBottom{
		position: absolute;
		background-image: linear-gradient(to bottom,#330867,#30cfd0);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		z-index: 888;
		box-shadow: 1px 0px 1px 1px #ede7e7;
	}
	
	/* 动画 */
	.music_discContainerAnimation{
		animation: musicDisc 10s linear infinite;
		/* infinite无限循环 */
		animation-delay: 1s;
	}
	@keyframes musicDisc{
		to{
			transform: rotate(360deg);
		}
	}
</style>

