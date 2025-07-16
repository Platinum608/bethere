<template>
    <div class="songList-main">
        <div class="tableHeader">
            <div class="tableHeaderContent" id="tableHeaderContentS">#</div>
            <div class="tableHeaderContent" id="tableHeaderContentT">Title</div>
            <div class="tableHeaderContent" id="tableHeaderContentA">Album</div>
            <div class="tableHeaderContent" id="tableHeaderContentD">Duration</div>
        </div>
        <div class="tablebody">
            <div 
            v-for="(song, index) in props.songList" 
            :key="index" 
            class="tableRow"
            @dblclick="() => { 
                store.setPlayList(props.songList);
                store.setPlayingSongId(song.id);
                store.changeShouldAutoPlay(true)  }"
            >
                <div class="tableRowContent" id="tableRowContentS">{{ index + 1 }}</div>
                <div class="tableRowContent" id="tableRowContentT">{{ song.songTitle || song.name }}</div>
                <div class="tableRowContent" id="tableRowContentA">{{ song.songAlbum || song.album }}</div>
                <div class="tableRowContent" id="tableRowContentD">
                  {{ song.songDuration || song.duration }}

                </div>
                <div class="tableRowContent" id="tableRowContentI">
                    <svg class="playingIcon" v-if="song.id === store.playingSongId"  viewBox="0 0 1024 1024" width="30" height="30" :style="{fill: imgAveColor}">
                        <path d="M469.312 362.688v298.624a42.688 42.688 0 1 0 85.376 0V362.688a42.688 42.688 0 1 0-85.376 0zM661.312 234.688v554.624a42.688 42.688 0 1 0 85.376 0V234.688a42.688 42.688 0 1 0-85.376 0zM85.312 362.688v298.624a42.688 42.688 0 1 0 85.376 0V362.688a42.688 42.688 0 1 0-85.376 0zM853.312 384v256a42.688 42.688 0 0 0 85.376 0V384a42.688 42.688 0 1 0-85.376 0zM277.312 85.312v853.376a42.688 42.688 0 1 0 85.376 0V85.312a42.688 42.688 0 1 0-85.376 0z"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const props = defineProps<{songList: any[]}>();

const imgAveColor = ref(store.albumThemeColor);

watch(() => store.albumThemeColor, () => {
    imgAveColor.value = store.albumThemeColor;
})

</script>

<style lang="scss" scoped>
.songList-main {
    width: 100%;
    height: 100%;
}
.tableHeader{
    width: calc(100% - 20px);
    height: 40px;
    margin-left: 10px;
    display: flex;
    font-family: URW DIN Cond W05 Demi, system-ui;
    font-size: 30px;
    color: #D7D7D7;
}
#tableHeaderContentS{
    flex: 3;
    display: flex;
    justify-content: center;
}
#tableHeaderContentT{
    flex: 18;
}
#tableHeaderContentA{
    flex: 15;
}
#tableHeaderContentD{
    flex: 10;
}
.tablebody{
    width: calc(100% - 20px);
    height: calc(100% - 70px);
    margin-left: 10px;
    overflow-y: auto;
    color: #ffffff;
    font-family: roboto, system-ui;
    font-size: 24px;
    font-weight: bold;
}
.tablebody::-webkit-scrollbar {
    display: none;
}
.tableRow{
    display: flex;
    height: 60px;
    align-items: center;
    justify-items: center;
}
.tableRow:hover{
    background-color: rgba(255, 255, 255, 0.1);
}
.tableRowContent{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
}
#tableRowContentS{
    font-family: URW DIN Cond W05 Demi, system-ui;
    flex: 3;
    display: flex;
    justify-content: center;
}
#tableRowContentT{
    flex: 18;
    padding-right: 10px;
}
#tableRowContentA{
    flex: 15;
    padding-right: 10px;
}
#tableRowContentD{
    flex: 6;
}
#tableRowContentI{
    flex: 4;
}
.playing-icon {
  width: 24px;
  height: 24px;
  margin-left: 8px;
  vertical-align: middle;
}
.playingIcon{
    margin-top: 10px;
}
//60 360 300 140 60
//3 18 15 10(7 3)

</style>