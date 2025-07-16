<template>
    <div class="SongDetail-top">
        <div class="songCover">
            <img v-if="songData" :src="songData.picUrl" alt="songCover">
        </div>
    </div>
    <div class="SongDetail-middle">
        <div class="songName">{{ songData?.name }}</div>
    </div>
    <div class="SongDetail-bottom">
        <div class="songLyrics">
            <div class="lyricsBox" v-for="(line, index) in lyrics" :key="index">
                <div class="lyricsText">{{ line.text }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { parseLyric } from '@/utils/lyricsFormatter';
import { fetchLyrics } from '@/api/songDetailApi';
import { fetchSongData, mapSongData } from '@/api/songDetailApi';
import { Song } from '@/data/Song';
import { useStore } from '@/store';

const store = useStore();

const lyrics = ref<any>({});
const songData = ref<Song>();

watch(() => store.playingSongId, async() => {
    const rawLyrics = await fetchLyrics(store.playingSongId);
    const rawData = await fetchSongData(store.playingSongId);
    songData.value = await mapSongData(rawData);
    lyrics.value = parseLyric(rawLyrics);
    // console.log("歌曲数据：", songData.value);
    // console.log("歌词：", rawLyrics);
    // console.log("解析后的歌词：", lyrics.value);
})

onMounted(async () => {
    const rawLyrics = await fetchLyrics(store.playingSongId);
    const rawData = await fetchSongData(store.playingSongId);
    songData.value = await mapSongData(rawData);
    lyrics.value = parseLyric(rawLyrics);
})

</script>
<style>
.SongDetail-top{
    width: 100%;
    height: 436px;
    padding-top: 36px;
}
.songCover{
    width: 400px;
    height: 400px;
    margin: 0px auto 0px;
}
.songCover img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
.SongDetail-middle{
    margin: 16px 24px;
    width: calc(100% - 48px);
    height: 85px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.songName{
    width: 100%;
    font-size: 32px;
    font-weight: bold;
    font-family: roboto, sans-serif;
    color: #ffffff;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break
}
.SongDetail-bottom{
    width: 100%;
    height: calc(100% - 592px);
    background-color: rgba(255, 255, 255 0.2);
}
.songLyrics{
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.lyricsBox{
    width: 80%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto 0px;
}
.songLyrics::-webkit-scrollbar {
    display: none;
}
.lyricsText{
    width: 100%;
    font-size: 20px;
    font-family: roboto, sans-serif;
    color: #ffffff;
}

</style>