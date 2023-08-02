<template>
	<view class="fm-content">
		111111
	</view>
</template>

<script>
	export default {
		name:'Fm',
		data() {
			return {
				value:'',
				active: '',
				title: 'Hello',
	
			}
		},
		onLoad() {
          console.log('11111111111')
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">
.fm-content {
	&-banner {
		position: fixed;
		z-index: 1000;
	}
	.container {
		padding-top: 100rpx;
	}
}


</style>
