<template>
    <div class="PlayList-main">
        <div class="PlayList-top" :style="{ background: `linear-gradient(to bottom, ${imgAveColor}, transparent)` }">
            <AlbumDetailBox 
                v-if="AlbumInfoData" :album-detail="AlbumInfoData" />
            <!-- <div class="PlayList-ButtonSet">
                <div class="ButtonIcon">
                    <svg  viewBox="0 0 1024 1024" width="60" height="60" :style="{fill: imgAveColor}">
                        <path d="M511.996 1.28C229.933 1.28 1.276 229.937 1.276 512s228.657 510.72 510.72 510.72c282.07 0 510.72-228.657 510.72-510.72 0.004-282.067-228.65-510.72-510.72-510.72z m249.46 520.727c-25.906 15.157-329.382 192.31-344.566 201.08-18.953 10.96-38.122-2.982-38.122-21.717V298.4c0-20.641 21.186-30.664 37.342-21.583 22.07 12.371 326.692 190.424 345.345 201.534 16.733 9.969 17.006 33.703 0 43.656z"/>
                    </svg>
                </div>
                <div class="ButtonIcon">
                    <svg viewBox="0 0 1024 1024" width="40" height="40" :style="{fill: imgAveColor}">
                        <path d="M819.2 189.44a30.72 30.72 0 0 1 1.152 61.41952L819.2 250.88H143.36a30.72 30.72 0 0 1-1.152-61.41952L143.36 189.44h675.84zM819.2 435.2a30.72 30.72 0 0 1 1.152 61.41952L819.2 496.64H143.3856a30.72 30.72 0 0 1-1.152-61.41952l1.152-0.02048H819.2zM542.72 680.96a30.72 30.72 0 0 1 1.152 61.41952L542.72 742.4H143.3856a30.72 30.72 0 0 1-1.152-61.41952l1.152-0.02048H542.72zM880.64 680.98048a30.72 30.72 0 0 1 1.152 61.41952l-1.152 0.02048h-184.32a30.72 30.72 0 0 1-1.152-61.4144l1.152-0.0256h184.32z"/>
                        <path d="M788.48 588.82048a30.72 30.72 0 0 1 30.69952 29.568l0.02048 1.152v184.32a30.72 30.72 0 0 1-61.41952 1.152l-0.02048-1.152v-184.32a30.72 30.72 0 0 1 30.72-30.72z" />
                    </svg>
                </div>
                <div class="ButtonIcon">
                    <svg viewBox="0 0 1024 1024" width="40" height="38" :style="{fill: imgAveColor}">
                        <path d="M753.564731 337.471035c-45.8697 0-160.259984 113.849978-243.789399 194.548928C383.134027 654.383848 263.508509 773.284865 167.764911 773.284865l-58.892295 0c-24.068162 0-43.581588-19.526729-43.581588-43.581588s19.513426-43.581588 43.581588-43.581588l58.892295 0c60.504002 0 183.002964-121.68134 281.432741-216.784348 119.79641-115.744117 223.254713-219.029482 304.368102-219.029482l56.209186 0-59.641355-57.828057c-17.033955-16.993023-17.060561-42.902112-0.057305-59.927881 17.002232-17.030885 44.596707-17.064654 61.631686-0.065492l134.207631 133.874033c8.192589 8.172123 12.794397 19.238157 12.794397 30.803563 0 11.564383-4.601808 22.604834-12.794397 30.776957L811.706943 461.72599c-8.505721 8.486278-19.646456 12.522198-30.78719 12.522198-11.166317 0-22.333658-4.676509-30.844495-13.199627-17.003256-17.025769-16.975627-45.432749 0.057305-62.425771l59.641355-61.151755L753.564731 337.471035zM811.706943 561.66105c-17.034978-16.999163-44.629453-16.972557-61.631686 0.058328-17.003256 17.024745-16.975627 46.257533 0.057305 63.250556l59.641355 61.150732-56.209186 0c-35.793204 0-95.590102-52.946886-154.87637-108.373243-17.576307-16.435321-45.161572-16.3422-61.594847 1.226944-16.444531 17.568121-15.523555 46.393633 2.053776 62.823837 90.322122 84.458577 151.246703 131.484613 214.417441 131.484613l56.209186 0-59.641355 57.824987c-17.033955 16.993023-17.060561 43.736107-0.057305 60.761875 8.511861 8.523117 19.678178 12.369725 30.844495 12.369725 11.140735 0 22.281469-4.453429 30.78719-12.939707L945.914574 757.311055c8.192589-8.173147 12.794397-19.315928 12.794397-30.881334 0-11.564383-4.601808-22.682605-12.794397-30.855752L811.706943 561.66105zM108.871593 337.471035l58.892295 0c45.932122 0 114.40154 58.455343 168.915108 107.942431 8.352225 7.576559 18.832927 12.140505 29.29214 12.140505 11.852956 0 23.673166-4.394077 32.270984-13.857613 16.182564-17.807574 14.859429-46.823422-2.958378-62.998823-85.247546-77.381391-156.561755-130.388652-227.519854-130.388652l-58.892295 0c-24.068162 0-43.581588 19.526729-43.581588 43.581588S84.804455 337.471035 108.871593 337.471035z"/>
                    </svg>
                </div>
                <div class="ButtonIcon">
                    <svg viewBox="0 0 1024 1024" width="40" height="38" :style="{fill: imgAveColor}">
                        <path d="M512.670266 959.469288c-246.343571 0-446.760137-200.63146-446.760137-447.240067S266.325671 64.979944 512.670266 64.979944s446.760137 200.641693 446.760137 447.2503S759.013837 959.469288 512.670266 959.469288zM512.670266 130.429585c-210.29147 0-381.381104 171.283038-381.381104 381.800659S302.378795 894.019647 512.670266 894.019647s381.381104-171.272805 381.381104-381.790426S722.961736 130.429585 512.670266 130.429585z" />
                        <path d="M447.290209 317.17171a63.891 63.959 0 1 0 130.760113 0 63.891 63.959 0 1 0-130.760113 0Z"/>
                        <path d="M512.197498 820.218804c-30.093389 0-54.235229-24.416086-54.235229-54.541197L457.96227 482.062154c0-30.126134 24.14184-54.541197 54.235229-54.541197 30.093389 0 54.235229 24.416086 54.235229 54.541197l0 283.615453C566.432727 795.802718 542.290887 820.218804 512.197498 820.218804z"/>
                    </svg>
                </div>
            </div> -->
        </div>
        <div class="songListTable">
            <SongList v-if="AlbumInfoData" :song-list="AlbumInfoData.songs" />
        </div>
    </div>
</template>
<script setup lang="ts">
import AlbumDetailBox from '@/components/PlayList/AlbumDetailBox.vue';
import SongList from '@/components/PlayList/SongList.vue';
import { onMounted, ref, watch } from 'vue';
import type { AlbumDetail } from '@/data/Album';
import { fetchAlbumDetalInfo, mapAlbumDetailData } from '@/api/albumDetailApi';
import { useStore } from '@/store';

const store = useStore();

const AlbumInfoData = ref<AlbumDetail>();

const imgAveColor = ref(store.albumThemeColor);

watch(() => store.playListAlbumId, async () => {
    const rawData = await fetchAlbumDetalInfo(store.playListAlbumId);
    AlbumInfoData.value = mapAlbumDetailData(rawData);

    if (AlbumInfoData.value?.songs) {
        const picUrl = AlbumInfoData.value?.picUrl || '';
        const songList = AlbumInfoData.value.songs.map(song => ({
            name: song.songTitle,
            id: song.id,
            picUrl
        }));
        store.setPlayList(songList);
    }
})

watch(() => store.albumThemeColor, () => {
    imgAveColor.value = store.albumThemeColor;
})

onMounted(async () => {
    const rawData = await fetchAlbumDetalInfo(store.playListAlbumId);
    AlbumInfoData.value = mapAlbumDetailData(rawData);

    if (AlbumInfoData.value?.songs) {
        const picUrl = AlbumInfoData.value?.picUrl || '';
        const songList = AlbumInfoData.value.songs.map(song => ({
            name: song.songTitle,
            id: song.id,
            picUrl
        }));
        store.setPlayList(songList);
    }
});


</script>
<style>
.PlayList-main{
    width: 100%;
    height: 100%;
}
.PlayList-top{
    width: 100%;
    height: 320px;
    border-radius: 10px;

}
/* .PlayList-ButtonSet{
    width: 100%;
    height: 90px;
    display: flex;
    padding-left: 40px;
} */
.ButtonIcon{
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.songListTable{
    width: 100%;
    height: calc(100% - 310px);
}
</style>