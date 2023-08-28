import { fetch } from '@/utils/axios/axios.js';
import {
	BANNER,
    RECOMMEND_SONG,
    DISCOVER_SEARCH,
    SONG_URL,
    PLAY_DETAIL,
    SONG_DETAIL,
    CELL_PHONE,
    QR_CREATE,
    QR_KEY,
    QR_CHECK,
    LOGIN_STATUS,
    LYRIC_SONG,
    HOT_SONG,
    TOP_LIST,
    TOP_LIST_DETAIL,
    ARTISTS,
    ARTISTS_SONGS,
    PERSONALIZED,
    LIKELIST,
    PLAY_LIST
    // VIDEO_URL,
    
    // VIDEO_DETAIL,
    // ALL_VIDEO
} from './apiUrl';

export const getBanner = (data) => fetch('GET', BANNER, data);// 轮播图
export const recommendSong = (data) => fetch('GET', RECOMMEND_SONG, data); //每日推荐-需要登录
export const discoverSearch = (data) => fetch('GET', DISCOVER_SEARCH, data);//搜索
export const getSongUrl = (data) => fetch('GET', SONG_URL, data);//获取歌曲地址
export const getSongDetail = (data) => fetch('GET', SONG_DETAIL, data);//获取歌曲详情
// export const getVideoUrl = (data) => fetch('GET', VIDEO_URL, data);// 视频播放地址
// export const getVideoDetail = (data) => fetch('GET', VIDEO_DETAIL, data); // 获取 video 详情
// export const getAllVideo = (data) => fetch('GET', ALL_VIDEO, data); // 相关视频
export const getPlayDetail = (data) => fetch('GET', PLAY_DETAIL, data); // 播放详情
export const getCellphone = (data) => fetch('GET', CELL_PHONE, data); // 播放详情
export const getQrKey = (data) => fetch('GET', QR_KEY, data); // 二维码 key 生成接口
export const getQrCreate = (data) => fetch('GET', QR_CREATE, data); // 二维码生成接口
export const getQrCheck = (data) => fetch('GET', QR_CHECK, data); // 维码检测扫码状态接口
export const getLoginStatus = (data) => fetch('GET', LOGIN_STATUS, data); // 登录状态接口
export const getLyric = (data) => fetch('GET', LYRIC_SONG, data); //歌词
export const getHotList = (data) => fetch('GET', HOT_SONG, data); // 歌手热门 50 首歌曲
export const getTopList = (data) => fetch('GET', TOP_LIST, data); //所有榜单
export const getTopDetail = (data) => fetch('GET', TOP_LIST_DETAIL, data); //排行榜详情
export const getArtists = (data) => fetch('GET', ARTISTS, data); // 
export const getArtistsSongs = (data) => fetch('GET', ARTISTS_SONGS, data); // 歌手歌曲
export const getPersonalized= (data) => fetch('GET', PERSONALIZED, data); // 推荐歌单
export const getLike= (data) => fetch('GET', LIKELIST, data); // 喜欢歌曲列表
export const getLikePlay= (data) => fetch('GET', PLAY_LIST, data); // 歌单详详情列表

