<template>
	<view class="content">
		
		<view class="container">
		</view>
	</view>
</template>

<script>
	export default {
		name:'Discover',
		components:{},
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
// 			onChange(event) {
//     console.log(event.detail);
//   }

		}
	}
</script>

<style scoped lang="scss">

	.content {
		width: 100%;
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}

	.container {
		/* flex: 1; */
	}
</style>
