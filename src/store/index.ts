import { defineStore } from 'pinia'
import type { Song } from '@/data/Song';

export const useStore = defineStore('main', {
    state: () => ({
        playListAlbumId: 67303,
        playingSongId: 693995,
        playingSongAlbumId: 67303,
        albumThemeColor: 'rgba(255, 255, 255, 1)',
        playList: [] as Song[],
        shouldAutoPlay: false,
    }),
    getters: {
        getPlayListAlbumId: (state) => state.playListAlbumId,
        getPlayingSongId: (state) => state.playingSongId,
        getAlbumThemeColor: (state) => state.albumThemeColor,
        getPlayList: (state) => state.playList,
        getCurrentSongIndex: (state) => state.playList.findIndex(song => song.id === state.playingSongId)
    },
    actions: {
        setPlayListAlbumId(id: number) {
            this.playListAlbumId = id;
        },
        setPlayingSongId(id: number) {
            this.playingSongId = id;
        },
        setPlayingSongAlbumId(id: number) {
            this.playingSongAlbumId = id;
        },
        setAlbumThemeColor(color: string) {
            this.albumThemeColor = color
        },
        setPlayList(songs: Song[]) {
            this.playList = songs;
        },
        changeShouldAutoPlay(status: boolean){
            this.shouldAutoPlay = status;
        },
    }
})