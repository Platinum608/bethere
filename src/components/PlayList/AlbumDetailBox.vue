<template>
    <div class="AlbumDetailBox-main">
        <div class="AlbumDetailBoxCover">
            <img 
                id="coverImg" 
                :src="proxyUrl" 
                alt="Album Cover"
                ref="imgRef"
                crossorigin="anonymous"
                @load="onImgLoad"
            >
        </div>
        <div class="AlbumDetailBoxInfo">
            <div class="AlbumDetailBoxInfo-top">
                <div>{{ props.albumDetail.type }}</div>
            </div>
            <div class="AlbumDetailBoxInfo-middle">
                <div>{{ props.albumDetail.title }}</div>
            </div>
            <div class="AlbumDetailBoxInfo-bottom">
                <div>{{ props.albumDetail.releaseDate }}&nbsp;Release&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div>{{ props.albumDetail.size }}&nbsp;Songs&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div>{{ props.albumDetail.duration }}</div>
            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
import { AlbumDetail } from '@/data/Album';
const props = defineProps<{albumDetail: AlbumDetail}>();

import { FastAverageColor } from 'fast-average-color';
import { nextTick, onMounted, ref, watch } from 'vue';
const fac = new FastAverageColor();

import { useStore } from '@/store';

const store = useStore();

const originalUrl = ref(props.albumDetail.picUrl);
const proxyUrl = ref('https://images.weserv.nl/?url=' + encodeURIComponent(originalUrl.value.replace(/^https?:\/\//, '')));

const imgRef = ref(null);

// 计算平均色
const calcAverageColor = () => {
  const img = imgRef.value;
  if (img) {
    fac.getColorAsync(img, {
      crossOrigin: 'anonymous'
    }).then(color => {
      store.setAlbumThemeColor(color.rgba);
    });
  }
};

const onImgLoad = () => {
    calcAverageColor();
}

watch(
  () => props.albumDetail.picUrl,
  async (newUrl) => {
    originalUrl.value = newUrl;
    proxyUrl.value = 'https://images.weserv.nl/?url=' + encodeURIComponent(newUrl.replace(/^https?:\/\//, ''));
    await nextTick(); // 等待图片 src 更新
  }
);

onMounted(() => {
  calcAverageColor();
});

</script>

<style lang="scss" scoped>
.AlbumDetailBox-main {
    width: 100%;
    height: 320px;
    padding: 48px 32px 32px 32px; 
    display: flex;
}
.AlbumDetailBoxCover {
    width: 240px;
    height: 240px;
}
.AlbumDetailBoxCover img {
    width: 100%;
    height: 100%;
}
.AlbumDetailBoxInfo {
    flex: 1;
    padding-left: 28px;
    padding-top: 16px;
    display: flex;
    flex-direction: column;
}
.AlbumDetailBoxInfo-top {
    font-family: URW DIN Cond W05 Demi, system-ui;
    font-size: 28px;
    color: #ffffff;
}
.AlbumDetailBoxInfo-middle {
    margin-top: 20px;
    font-family: roboto, sans-serif;
    font-weight: bold;
    font-size: 50px;
    color: #ffffff;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
}
.AlbumDetailBoxInfo-bottom {
    margin-top: 12px;
    font-family: URW DIN Cond W05 Demi, system-ui;
    font-size: 24px;
    color: #ffffff;
    display: flex;
    flex-direction: row;
}

</style>