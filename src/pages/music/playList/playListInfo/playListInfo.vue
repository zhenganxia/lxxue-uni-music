<template>
	<view class="playListInfo">
		<view class="header">
			<text class="iconfont icon-quxiao" @click="cancel"/>
		</view>
		<view class="container">
			<view class="top">
				<image :src="playListInfo.coverImgUrl" style="width: 400rpx;height: 400rpx;border-radius: 10rpx;">
					<text style="font-weight: 600;margin-top: 30rpx;text-align: center;">{{playListInfo.name}}</text>
				</image>
			</view>
			<view class="bottom">
				<view class="label">
					标签:
					<view class="labelItem" v-for="(item,index) in playListInfo.tags" :key="index">{{item}}</view>
				</view>
				<scroll-view scroll-y class="description">
					{{_handleDescription(playListInfo.description)}}
				</scroll-view>
			</view>
		</view>
		<view style="display: flex;justify-content: center;">
			<button style="
					position:fixed;
					bottom:50rpx;
					font-size: 30rpx;
					width: 180rpx;
					line-height: 80rpx;
					text-align: center;
					border-radius: 100rpx;
					color: #FFF;
					border: 1rpx solid rgb(191, 191, 191);
					background: rgb(0, 0, 0);"
					@click="saveImage">保存封面</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playListInfo: {},
			}
		},
		mounted() {
			uni.$on('playListInfo',data => {
				this.playListInfo = data
				uni.$off('playListInfo')
			})
			uni.$emit('test',{msg:'test'})
		},
		destroyed() {
			uni.$off('playListInfo')
		},
		methods: {
			cancel(){
				uni.navigateBack({
					delta:1
				})
			},
			saveImage(){
				uni.downloadFile({
					url:this.playListInfo.coverImgUrl,
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({
									title:'保存成功',
								})
							},
							fail: () => {
								uni.showToast({
									title:'保存失败',
									icon: 'none'
								})
							}
						});
					}
				})
			},
			_handleDescription(description){
				if(description === null){
					return description = '介绍：无'
				} else {
					return description
				}
			}
		}
	}
</script>

<style>
	uni-page-body{
		height: 100%;
		background: #000;
		color: #fff;
	}
	.playListInfo{
		padding: 70rpx 50rpx 0 50rpx;
	}
	
	.header{
		height: 80rpx;
		font-weight: 800;
	}
	.header .iconfont{
		font-size: 50rpx;
		float: right;
	}
	
	.container{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.container .top{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-bottom: 1rpx solid rgba(255, 255, 255, .3);
		padding-bottom: 30rpx;
	}
	.container .bottom{
		padding-top: 20rpx;
		font-size: 25rpx;
	}
	.container .bottom .label{
		display: flex;
		align-items: center;
		padding-bottom: 10rpx;
	}
	.container .bottom .label .labelItem{
		width: 100rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		font-weight: 600;
		text-align: center;
		border: 1rpx solid rgba(166, 166, 166, .5);
		border-radius: 30rpx;
		background-color: rgba(166, 166, 166, .5);
		margin: 0 30rpx 0 30rpx;
	}
	.description{
		white-space: pre-line;
		padding-top: 15rpx;
		height: calc(100vh - 450px);
	}
</style>
