(self["webpackChunkmy_project"]=self["webpackChunkmy_project"]||[]).push([[306],{1999:function(t,n,i){var e=i(3684);e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.id,e,""]]),e.locals&&(t.exports=e.locals);var a=i(56).Z;a("c406b33a",e,!0,{sourceMap:!1,shadowMode:!1})},972:function(t,n,i){"use strict";i.r(n),i.d(n,{default:function(){return b}});var e,a={uniIcons:i(2240).Z},s=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-scroll-view",{attrs:{"scroll-y":!0,"scroll-with-animation":!0,"refresher-enabled":!0},on:{scrolltolower:function(n){arguments[0]=n=t.$handleEvent(n),t.scroll.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"attention"},[i("v-uni-view",{staticClass:"attention-content"},[i("v-uni-view",{staticClass:"container"}),i("v-uni-view",{staticClass:"sign"},[i("v-uni-view",{staticClass:"sign-header flex-between",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.playSing("")}}},[i("v-uni-view",{staticClass:"flex-start"},[i("v-uni-view",{staticClass:"sign-icon-imag"},[i("v-uni-image",{staticStyle:{width:"100%",height:"100%"},attrs:{mode:"aspectFill",src:t.bofang}})],1),i("v-uni-view",[t._v("播放全部")])],1)],1)],1),i("v-uni-view",{staticClass:"attention-scroll"},t._l(t.articalAllSongs,(function(n,e){return i("v-uni-view",{key:e,staticClass:"attention-sing"},[i("v-uni-view",{staticClass:"flex-between"},[i("v-uni-view",{staticClass:"flex-start"},[i("v-uni-view",{staticClass:"flex-start",staticStyle:{"margin-top":"40rpx"}},[i("v-uni-view",{staticClass:"reg-text-name"},[i("span",[t._v(t._s(n.name))])]),i("span",{staticClass:"reg-text"},[t._v(t._s(n.ar[0].name))])],1)],1),i("v-uni-view",{staticClass:"flex-start"},[i("v-uni-view",{staticClass:"list-play",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.playSing(n.id)}}},[i("v-uni-image",{staticStyle:{width:"100%",height:"100%"},attrs:{mode:"aspectFill",src:t.listPlay}})],1),i("v-uni-view",{staticClass:"good-icon"},[i("uni-icons",{attrs:{type:"more-filled",size:"18"}})],1)],1)],1)],1)})),1)],1)],1)],1)},l=[],r=i(6407),o=i(4587),c=i(9510),u=(i(1539),i(2772),i(2222),i(8862),i(9891)),d=i(8291),g=i(6302),p=i(84),v=i(2611),m={name:"Attention",data:function(){return{pageNum:1,pageSize:10,list:[{text:"歌曲名"},{icon:"refreshempty"},{icon:"list"}],initList:[],articalAllSongs:[],paddingBottomHeight:0,bofang:u,listPlay:d,value:"",active:"",title:"Hello"}},onLoad:function(t){t.id&&this.getArtistsList(t.id)},created:function(){uni.getSystemInfo({success:function(t){var n=["X","XR","XS","11","12","13","14","15"];n.forEach((function(n){-1!=t.model.indexOf(n)&&-1!=t.model.indexOf("iPhone")&&(that.paddingBottomHeight=40)}))}})},methods:{scroll:function(){var t=JSON.parse(this.initList),n=(0,p.x)(this.pageSize,this.pageNum,t),i=n.currentInfo,e=n.nextNum;this.pageNum=e,this.articalAllSongs.length!==t.length&&(this.articalAllSongs=[].concat((0,c.Z)(this.articalAllSongs),(0,c.Z)(i)))},getArtistsList:function(t){var n=this;return(0,o.Z)((0,r.Z)().mark((function i(){var e,a,s,l,o,c,u,d;return(0,r.Z)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(e=uni.getStorageSync("cookie"),!e){i.next=9;break}return i.next=4,(0,g.o7)({id:t});case 4:a=i.sent,s=null===a||void 0===a?void 0:a.data,l=s.songs,o=s.code,200===o&&(n.initList=JSON.stringify(l),c=(0,p.x)(10,1,l),u=c.currentInfo,d=c.nextNum,n.pageNum=d,n.articalAllSongs=u),i.next=10;break;case 9:n.articalAllSongs=v.Z.songAtricSongs;case 10:case"end":return i.stop()}}),i)})))()},playSing:function(t){uni.navigateTo({url:"/pages/music/index"}),uni.setStorageSync("musicId",t),uni.setStorageSync("musicIdList",JSON.stringify(JSON.parse(this.initList)))}}},f=m,h=(i(1999),i(9453)),x=(0,h.Z)(f,s,l,!1,null,"4e6b5a3d",null,!1,a,e),b=x.exports},2611:function(t,n){"use strict";var i=[{accountId:"",alg:null,fansCount:10116320,followed:!1,id:3684,identifyTag:null,img1v1Id:0x186a00156d02970,img1v1Id_str:"109951168529049969",img1v1Url:"http://p2.music.126.net/r6W-zCnV-aduVn_PLZYuYg==/109951168529049969.jpg",isSubed:null,musicSize:570,mvSize:null,name:"林俊杰",picId:0x186a00156d03140,picId_str:"109951168529051968",picUrl:"http://p2.music.126.net/78q0jUUJ0h08GxAs2G-tCA==/109951168529051968.jpg",publishTime:null,showPrivateMsg:null,topicPerson:0,trans:"",transNames:null},{accountId:542203503,albumSize:44,alg:null,briefDesc:"",fansCount:1464347,followed:!1,id:29051613,identifyTag:null,img1v1Id:0x186a00162b0a190,img1v1Id_str:"109951168728310167",img1v1Url:"http://p2.music.126.net/Wu7G9bBtQy0RC1XOVJ-Sbg==/109951168728310167.jpg",isSubed:null,musicSize:126,mvSize:null,name:"郑润泽",picId:0x186a0006432e180,picId_str:"109951164458656122",picUrl:"http://p2.music.126.net/BtXjoRNLCZjoSV-3Ag3M0Q==/109951164458656122.jpg",publishTime:null,showPrivateMsg:null,topicPerson:0,trans:"",transNames:null},{accountId:null,albumSize:128,alg:null,briefDesc:"",fansCount:8897529,followed:!1,id:2116,identifyTag:null,img1v1Id:0x186a000c6fa9820,img1v1Url:"http://p2.music.126.net/rYYhHXZHwCfizE0N46F37Q==/109951166115911716.jpg",isSubed:null,musicSize:1843,mvSize:null,name:"陈奕迅",picId:0x186a000c6faa550,picId_str:"109951166115915081",picUrl:"http://p2.music.126.net/w_vuv9hBWq2hlJxJcmJrjg==/109951166115915081.jpg",publishTime:null,showPrivateMsg:null,topicPerson:0,trans:"",transNames:null}],e=[{name:"可惜没如果",id:29814898,ar:[{name:"林俊杰"}]},{name:"美人鱼",id:108931,ar:[{name:"林俊杰"}]},{name:"江南",id:108914,ar:[{name:"林俊杰"}]}];n["Z"]={songs:i,songAtricSongs:e}},84:function(t,n,i){"use strict";i.d(n,{x:function(){return e}});i(7042);var e=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2?arguments[2]:void 0;if(i&&i.length>0){var e=t*(n-1),a=t-10+9+t*(n-1),s=n+1,l=i.slice(e,a+1);return console.log("111111111111111111",e,a,l),{currentInfo:l,nextNum:s}}}},3684:function(t,n,i){"use strict";i.r(n);var e=i(8081),a=i.n(e),s=i(3645),l=i.n(s),r=l()(a());r.push([t.id,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.flex-center[data-v-4e6b5a3d]{display:flex;justify-content:center;align-items:center}.flex-end[data-v-4e6b5a3d]{display:flex;justify-content:flex-end;align-items:center}.flex-start[data-v-4e6b5a3d]{display:flex;justify-content:flex-start;align-items:center}.flex-around[data-v-4e6b5a3d]{display:flex;justify-content:space-around;align-items:center}.flex-between[data-v-4e6b5a3d]{display:flex;justify-content:space-between;align-items:center}.margin-right[data-v-4e6b5a3d]{margin-right:%?30?%}.margin-left[data-v-4e6b5a3d]{margin-left:%?30?%}.margin[data-v-4e6b5a3d]{margin:%?30?%}.attention .attention-content[data-v-4e6b5a3d]{height:calc(100vh - %?100?%);padding-left:%?40?%;padding-right:%?40?%}.attention .attention-content .swiper-slide-img[data-v-4e6b5a3d]{width:%?100?%;height:%?100?%;border-radius:6px;margin-right:%?30?%;margin-bottom:%?30?%}.attention .attention-content .good-icon[data-v-4e6b5a3d]{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.attention .attention-content .attention-scroll[data-v-4e6b5a3d]{padding-top:40px}.attention .attention-content .attention-sing[data-v-4e6b5a3d]{width:100%;height:%?150?%}.attention .sign[data-v-4e6b5a3d]{position:fixed;background:#fff;width:100%;z-index:800;height:%?80?%;padding-top:%?20?%}.attention .sign .sign-header .sign-icon-imag[data-v-4e6b5a3d]{width:%?60?%;height:%?60?%;margin-right:%?20?%}.attention .sign .sign-title[data-v-4e6b5a3d]{margin-right:10px}.attention .list-play[data-v-4e6b5a3d]{width:%?50?%;height:%?50?%;margin-right:%?20?%}.attention .reg-text-name[data-v-4e6b5a3d]{margin:%?20?%;width:%?250?%;text-align:left}.attention .reg-text[data-v-4e6b5a3d]{margin:%?20?%}',""]),n["default"]=r},9891:function(t,n,i){"use strict";t.exports=i.p+"static/img/24gf-playCircle.9d0e3c8a.svg"},8291:function(t,n,i){"use strict";t.exports=i.p+"static/img/playSquare.f11a4240.svg"}}]);