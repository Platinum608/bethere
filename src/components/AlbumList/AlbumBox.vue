<template>
    <div class="AlbumBox-main">
        <div class="AlbumBoxCover">
            <div class="AlbumPlayingMask" v-if="props.isCurrent" >
                <svg class="playingIcon" viewBox="0 0 1024 1024" width="40" height="40" :style="{fill: '#ffffff'}">
                    <path d="M469.312 362.688v298.624a42.688 42.688 0 1 0 85.376 0V362.688a42.688 42.688 0 1 0-85.376 0zM661.312 234.688v554.624a42.688 42.688 0 1 0 85.376 0V234.688a42.688 42.688 0 1 0-85.376 0zM85.312 362.688v298.624a42.688 42.688 0 1 0 85.376 0V362.688a42.688 42.688 0 1 0-85.376 0zM853.312 384v256a42.688 42.688 0 0 0 85.376 0V384a42.688 42.688 0 1 0-85.376 0zM277.312 85.312v853.376a42.688 42.688 0 1 0 85.376 0V85.312a42.688 42.688 0 1 0-85.376 0z"></path>
                </svg>
            </div>
            <img :src="props.picUrl" :alt="props.title">
        </div>
        <div class="AlbumBoxInfo">
            <div class="AlbumBoxTitle">{{props.title}}</div>
            <div class="AlbumBoxReleasedate">{{props.releaseDate}}&nbsp;Release</div>
        </div>

    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    picUrl: string;
    title: string;
    releaseDate: string
    albumId?: number;
    isCurrent?: boolean;
}>()

</script>

<style lang="scss" scoped>
.AlbumBox-main{
    height: 100px;
    width: 100%;
    padding: 0px 10px;
    display: flex;
}
.AlbumBox-main:hover{
    background-color: rgba(255, 255, 255, 0.1);
}
.AlbumBoxCover{
    position: relative;
    width: 80px;
    height: 80px;
    margin-top: 10px;
}
.AlbumBoxCover img{
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
.AlbumPlayingMask{
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
.AlbumBoxInfo{
    flex: 1;
}
.AlbumBoxTitle{
    margin: 10px;
    font-family: roboto, sans-serif;
    font-weight: bold;
    font-size: 20px;
    color: #ffffff;
    max-height: 54px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
}
.AlbumBoxReleasedate{
    margin: 10px;
    font-family:  URW DIN Cond W05 Demi, system-ui;
    font-size: 16px;
    color: #ffffff;
}

</style>