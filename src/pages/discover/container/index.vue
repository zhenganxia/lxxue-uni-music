<template>
    <view class="swiperContainer">
     <swiperContainer></swiperContainer>
     <iconContainer></iconContainer>
     <collect :hotTop="hotTop"></collect>
     <goodSing :hotTop="hotTop"></goodSing>
     <ranking :hotAcgTop="hotAcgTop"></ranking>
    </view>
</template>

<script>
import swiperContainer from './swiperContainer'
import iconContainer from './iconContainer'
import collect from './collect'
import goodSing from './goodSing'
import ranking from './ranking'
import { getTopList } from "@/api/discover.js";

export default {
    components:{swiperContainer,collect,iconContainer,goodSing,ranking},
    data() {
        return {
            topList:[],
            hotTop:{}, // 热歌
            hotAcgTop:{}
        };
    },
    // created() {
     // this.topListInfo()
    //},
    //methods: {
    //async topListInfo() {
        // 所有榜单
       // const res = await getTopList();
       // const { code, list } = res?.data;
        //if (code === 200) {
         // this.topList = list || []
          // 热歌
         // this.hotTop = this.topList.find(item=>item.id === 3778678)
          // 新歌榜
          //this.hotAcgTop = this.topList.find(item=>item.id === 3779629)
        //}
      //}
    //}
};
</script>

<style scoped lang="scss">
.swiperContainer {
    // height: 1000rpx;
    
}
</style>
