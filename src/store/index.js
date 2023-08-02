import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{
        show:false,
        active:''
	},
    getters:{
        showPanel:(state)=>{
            return state.show
        },
        currentActive:(state)=>{
            return state.active
        },
    },
    mutations: {
		changPanel(state) {
            // 抽屉使用
			state.show = !state.show
            console.log('6666666666',state.show)
		},
        changActive(state,data) {
            // 切换底部导航栏
            state.active = data
        }
	}
})
export default store
