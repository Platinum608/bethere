<template>
    <div class="AlbumList-main">
        <div class="AlbumList-top">
            <div class="ListFilter" @click="onFilterClick">{{ filterOptions[filterIndex] }}</div>
            <div class="sortBtn">
                <svg class="sortIcon" viewBox="0 0 1024 1024" width="20" height="19">
                    <path d="M768 362.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v387.648l61.418667-61.397333a21.333333 21.333333 0 0 1 30.165333 0l30.165334 30.165333a21.333333 21.333333 0 0 1 0 30.165333l-116.053334 116.053334a53.333333 53.333333 0 0 1-90.922666-34.218667L704 848.917333V384a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667zM554.666667 789.333333a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H128a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334h426.666667z m0-320a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H128a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334h426.666667zM896 149.333333a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H128a21.333333 21.333333 0 0 1-21.333333-21.333334V170.666667a21.333333 21.333333 0 0 1 21.333333-21.333334h768z"></path>
                </svg>
            </div>            
        </div>
        <div class="AlbumList-content">
            <AlbumBox
                v-for="(item, index) in filteredAlbumData"
                :key="index"
                :pic-url="item.picUrl"
                :title="item.title"
                :release-date="item.releaseDate"
                :album-id="item.id"
                :is-current="item.id === store.playingSongAlbumId"
                @click="onAlbumClick(item.id)"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import AlbumBox from '@/components/AlbumList/AlbumBox.vue';
import type { Album } from '@/data/Album';
import { fetchAlbumInfo, mapAlbumListData } from '@/api/albumListApi';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const filterOptions = ['All', 'Album', 'Single'];
const filterIndex = ref(0);

// const aritstId = ref(20878);
const aritstId = ref(18705);

const AlbumData = ref<Album[]>([]);

const filteredAlbumData = computed(() => {
    const type = filterOptions[filterIndex.value];
    if (type === 'All') return AlbumData.value;
    if (type === 'Album') return AlbumData.value.filter(a => a.type === 'Album');
    if (type === 'Single') return AlbumData.value.filter(a => a.type === 'Single');
    return AlbumData.value;
});

function onFilterClick() {
    filterIndex.value = (filterIndex.value + 1) % filterOptions.length;
}

onMounted(async () => {
  const rawData = await fetchAlbumInfo(aritstId.value);
    AlbumData.value = mapAlbumListData(rawData);
});

function onAlbumClick(id: number) {
  store.setPlayListAlbumId(id);
  router.push('/playlist');
}

</script>
<style scoped>
.AlbumList-main{
    width: 100%;
    height: calc(100% - 10px);
}
.AlbumList-top{
    height: 36px;
    position: relative;
    margin: 10px;
    display: flex;
}
.ListFilter{
    font-family: URW DIN Cond W05 Demi, system-ui;
    font-size: 28px;
    color: #ffffff;
    width: 80px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.sortBtn{
    position: absolute;
    top: 10px;
    right: 14px;
    width: 20px;
    height: 19px;
}
.AlbumList-content{
    overflow-y: auto;
    height: calc(100% - 46px);
}
.AlbumList-content::-webkit-scrollbar {
  display: none;
}
.sortIcon{
    fill: #ffffff;
}

</style>