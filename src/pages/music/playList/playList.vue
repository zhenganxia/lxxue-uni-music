<template>
  <view class="playList">
	<view class="playListInfo">
		<view class="left" style="width: 40%;" @click="toPlayListInfo">
			<text class="iconfont icon-playIcon">{{_getNum(playList.playCount)}}</text>
			<image :src="playList.coverImgUrl" style="width: 250rpx;height: 250rpx;border-radius: 20rpx;"/>
		</view>
		<view class="right" style="width: 60%;">
			<text style="font-weight: 700;padding-bottom: 15rpx;" @click="toPlayListInfo">{{playList.name}}</text>
			<view style="display: flex;align-items: center;">
				<image :src="playList.creator.avatarUrl" style="width: 70rpx;height: 70rpx;border-radius: 50%;margin-right: 10rpx;"/>
				<text style="font-size: 25rpx;">{{playList.creator.nickname}}</text>
				<text class="iconfont icon-xiayige"/>
			</view>
			<view style="display: flex;text-align: center;" @click="toPlayListInfo">
				<text class="description">{{_handleDescription(playList.description)}}</text>
				<text class="iconfont icon-xiayige"/>
			</view>
		</view>
	</view>
	<view class="playListDynamic">
		<view class="icons" v-for="(item,index) in icons" :key="index" @click="more(index)">
			<text :class="'iconfont icon-'+item.iconclass"/>
			<text style="font-size: 28rpx;">{{item.dynamic}}</text>
		</view>
	</view>
	<view class="top">
		<view style="font-weight: 600;display: flex;align-items: center;width: 426rpx;">
			<view class="iconfont icon-pause"
				  style="font-size: 60rpx;padding-right: 20rpx;"/>
			<view>播放全部
				<text style="font-size: 28rpx;color: #696969;">(共{{_getNum(playList.trackIds.length)}}首)</text>
			</view>
		</view>
		<view class="collect">
			<text class="iconfont icon-jia"
				  style="font-size: 50rpx;padding-right: 10rpx;"></text>
			<text style="margin-right: 10rpx;">收藏</text>
			<text>({{_getNum(playList.subscribedCount)}})</text>	
		</view>
	</view>
	<scroll-view class="bottom" scroll-y>
		<view class="item" 
			  v-for="(item, index) in playList.tracks" 
			  :key="item.id"
			  @click="toMusic(item.id, index)">
			<checkbox-group>
				<label>
					<checkbox v-show="isShow" :checked="isTrue" color="rgb(240, 19, 19)" style="transform:scale(0.9);" />
				</label>
			</checkbox-group>
			<view style="width: 40rpx;color: #555555;">
				<text v-if="item.id === musicId" class="iconfont icon-playing" style="color: rgb(240, 19, 19);position: relative;"></text>
				<text v-else >{{index+1}}</text>
			</view>
			<view class="music">
				<text style="font-weight: 700;">{{item.name}}</text>
				<text class="author">{{item.ar[0].name}}-{{item.al.name}}</text>
			</view>
			<text class="iconfont icon-ziyuan"/>
		</view>
		<view class="collector">
			<view v-for="item in playList.subscribers.slice(0,5)" :key="item.userId">
				<image :src="item.avatarUrl" style="width: 70rpx;height: 70rpx;border-radius: 50%;margin-right: 30rpx;"></image>
			</view>
			<text style="font-size: 30rpx;">{{_getNum(playList.subscribedCount)}}人收藏</text>
		</view>
	</scroll-view>
	<!-- <musicBottom></musicBottom> -->
  </view>
</template>

<script>	
	import { getPlayDetail,getSongDetail } from "@/api/discover.js";
	// import musicBottom from 'pages/music/musicBottom/musicBottom'
	
	const appGlobalData = getApp().globalData;
	let _playListSongId = []
	export default {
		data() {
		  return {
			icons: [
				{
					iconclass:'pinglun',
					dynamic: 33
				},
				{
					iconclass:'share',
					dynamic: 28
				},
				{
					iconclass:'download',
					dynamic: '下载'
				},
				{
					iconclass:'show_duoxuan',
					dynamic: '多选'
				},
			],
			playList: {
				subscribers: [],
				creator: {},
				trackIds: [],
			},// 歌单数据
			isShow:false,
			isTrue:false,
			index:0,
			musicId: '',//歌曲id
		  }
		},
		onLoad(options) {
			let playListId = options.playListId;
			this.getPlayListInfo(playListId);
			// 判断用户是否登录
			const userInfo = (appGlobalData.userInfo1 === '') && (appGlobalData.userInfo2 === '') && (appGlobalData.userInfo3 === '')
			if(userInfo){
				uni.showToast({
					title:'请先登录',
					icon:'none',
					success:() => {
						uni.reLaunch({
							url:'/pages/login/loginMain/loginMain'
						})
					}
				})
			}
			uni.$on('musicBottom',(data) => {
				this.musicId = data.msg.musicId
			})
		},
		onUnload() {
			uni.$off('test');
		},
		methods: {
			toPlayListInfo(){
				uni.navigateTo({
					// url:'./playListInfo/playListInfo'
				})
			},
			async getPlayListInfo(playListId){
				debugger
				let playListData = await getPlayDetail({id:playListId});
				this.playList = playListData.playlist
				this.icons[0].dynamic = this.playList.commentCount
				this.icons[1].dynamic = this.playList.shareCount
				let playListSongId = this.playList.trackIds
				this.getPlayListMusic(playListSongId)
				//
				// uni.$on('test',data => {
				// 	uni.$emit('playListInfo',{
				// 		coverImgUrl: this.playList.coverImgUrl,
				// 		name: this.playList.name,
				// 		tags: this.playList.tags,
				// 		description: this.playList.description,
				// 	})
				// })
			},
			async getPlayListMusic(playListSongId){
				const ids = playListSongId.map(item=>item.id).join(',')
				let songItem = await getSongDetail({ids});
				this.playList.tracks = songItem.songs
				appGlobalData.musicIdList = songItem.songs.map(item => {
					return item.id
				})
			},
			more(tab){
				if(tab === 3){
					this.isShow = !this.isShow
				}
			},
			toMusic(songId,index){
				this.index = index
				if(!this.isShow){
					uni.navigateTo({
						url:'/pages/music/index?id=' + songId
					})
				}
			},
			_getNum(num){
				if(num < 100000){
					return numpages/music/index
				}else if(num >= 100000 && num < 10000000){
					return Math.floor(num / 10000) + '万'
				} else {
					return (num / 10000000).toFixed(1) + '亿'
				}
			},
			_handleDescription(description){
				if(description === null){
					return description = '介绍：无'
				} else {
					return description
				}
			}
		},
		// components: {
		// 	musicBottom
		// }
	}
</script>

<style>
	.playList{
		background: #000;
		color: #fff;
	}
	
	.playListInfo{
		display: flex;
		padding: 30rpx 50rpx 30rpx 50rpx;
	}
	.playListInfo .left .iconfont{
		z-index: 99;
		position: absolute;
		font-size: 20rpx;
		font-weight: 600;
		border: 2rpx solid rgba(0,0,0,.1);
		border-radius: 15rpx;
		background-color: rgba(0,0,0,.1);
		filter:Alpha(opacity=50);
		color: #fff;
		top: 37rpx;
		left: 60rpx;
	}
	.playListInfo .right{
		display: flex;
		padding-left: 50rpx;
		flex-direction: column;
	}
	.playListInfo .right .description{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-top: 15rpx;
		font-size: 20rpx;
	}
	
	.playListDynamic{
		display: flex;
		justify-content: space-around;
		padding-bottom: 20rpx;
	}
	.playListDynamic .icons{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.playListDynamic .icons .iconfont{
		font-size: 55rpx;
	}
	
	.top{
		display: flex;
		align-items: center;
		height: 80rpx;
		padding: 10rpx 20rpx 10rpx 35rpx;
		background: #fff;
		color: #000;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
	}
	.top .collect{
		display: flex;
		align-items: center;
		background: rgb(240, 19, 19);
		border-radius: 40rpx;
		padding: 10rpx;
		color: #fff;
	}
	
	.bottom{
		height: calc(100vh - 526rpx);
		width: calc(100vw - 100rpx);
		padding: 10rpx 50rpx 30rpx 50rpx;
		background: #fff;
		color: #000;
	}
	.bottom .item {
		position: relative;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.bottom .item .music{
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		margin-left: 20rpx;
	}
	.bottom .item .music text{
		height: 50rpx;
		line-height: 50rpx;
		max-width: 500rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.bottom .item .music .author{
		font-size: 26rpx;
		color: #777777;
	}
	.bottom .item .iconfont{
		position: absolute;
		right: 0;
		width: 40rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-weight: 600;
		font-size: 40rpx;
		color: #555555;
	}
	.bottom .collector{
		display: flex;
		align-items: center;
		color: #696969;
	}
</style>
