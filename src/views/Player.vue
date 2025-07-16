<template>
  <div class="Player-main">
    <div class="player-controls">
      <button @click="playPrev" class="prev-btn">
        <svg  viewBox="0 0 1024 1024" width="50" height="50" :style="{fill: imgAveColor}" transform='rotate(180)' >
          <path d="M817 160h38c30.928 0 56 25.072 56 56v593c0 30.928-25.072 56-56 56h-38c-30.928 0-56-25.072-56-56V216c0-30.928 25.072-56 56-56zM648.314 546.191l-422.304 303.4c-32.294 23.201-77.282 15.83-100.484-16.464A72 72 0 0 1 112 791.117V232.064c0-39.764 32.235-72 72-72a72 72 0 0 1 39.95 12.1l422.762 281.959c25.73 17.16 32.677 51.93 15.517 77.66a56 56 0 0 1-13.915 14.408z"/>
        </svg> 
      </button>
      <button @click="togglePlay" class="play-btn">
        <span v-if="!isPlaying">
          <svg  viewBox="0 0 1024 1024" width="50" height="50" :style="{fill: imgAveColor}">
            <path d="M511.996 1.28C229.933 1.28 1.276 229.937 1.276 512s228.657 510.72 510.72 510.72c282.07 0 510.72-228.657 510.72-510.72 0.004-282.067-228.65-510.72-510.72-510.72z m249.46 520.727c-25.906 15.157-329.382 192.31-344.566 201.08-18.953 10.96-38.122-2.982-38.122-21.717V298.4c0-20.641 21.186-30.664 37.342-21.583 22.07 12.371 326.692 190.424 345.345 201.534 16.733 9.969 17.006 33.703 0 43.656z"/>
          </svg>
        </span>
        <span v-else>
          <svg viewBox="0 0 1024 1024" width="50" height="50" :style="{ fill: imgAveColor }">
            <path d="M1023.79 512c0 282.706-229.186 511.898-511.898 511.898C229.182 1023.892 0 794.706 0 512 0 229.289 229.181 0.108 511.892 0.108 794.604 0.108 1023.79 229.289 1023.79 512zM433.92 340.48c0-25.452-20.628-46.08-46.08-46.08-25.452 0-46.08 20.628-46.08 46.08v343.04c0 25.452 20.628 46.08 46.08 46.08 25.452 0 46.08-20.628 46.08-46.08V340.48z m247.68 0c0-25.452-20.628-46.08-46.08-46.08-25.452 0-46.08 20.628-46.08 46.08v343.045c0 25.452 20.628 46.08 46.08 46.08 25.452 0 46.08-20.628 46.08-46.08V340.48z"/>
          </svg>
        </span>
      </button>
      <button @click="playNext" class="next-btn">
        <svg  viewBox="0 0 1024 1024" width="50" height="50" :style="{fill: imgAveColor}">
          <path d="M817 160h38c30.928 0 56 25.072 56 56v593c0 30.928-25.072 56-56 56h-38c-30.928 0-56-25.072-56-56V216c0-30.928 25.072-56 56-56zM648.314 546.191l-422.304 303.4c-32.294 23.201-77.282 15.83-100.484-16.464A72 72 0 0 1 112 791.117V232.064c0-39.764 32.235-72 72-72a72 72 0 0 1 39.95 12.1l422.762 281.959c25.73 17.16 32.677 51.93 15.517 77.66a56 56 0 0 1-13.915 14.408z"/>
        </svg>        
      </button>
    </div>
    <div class="player-progress">
        <div class="time">{{ currentTimeStr }}</div>
        <input
        type="range"
        min="0"
        :max="duration"
        step="0.1"
        v-model.number="currentTime"
        @input="onSeek"
        class="progress-bar"
        :style="{'accent-color': imgAveColor}"
        />
        <div class="time">{{ durationStr }}</div>
    </div>
    <audio ref="audioRef" :src="songUrl" @timeupdate="onTimeUpdate" @ended="onEnded" @loadedmetadata="onLoadedMetadata" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from 'vue';
import { useStore } from '@/store';
import { fetchSongData, fetchSongUrl } from '@/api/songDetailApi';

const store = useStore();
const audioRef = ref<HTMLAudioElement | null>(null);
const songUrl = ref('');
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

const currentTimeStr = ref('0:00');
const durationStr = ref('0:00');

const imgAveColor = ref(store.albumThemeColor);

const playList = computed(() => store.getPlayList);
const currentIndex = computed(() => store.getCurrentSongIndex);

async function loadSong(songId: number) {
  const rawData = await fetchSongData(songId);
  const url = await fetchSongUrl(songId);
  const wasPlaying = isPlaying.value;
  songUrl.value = url;
  if (rawData && rawData.al && rawData.al.id) {
    store.setPlayingSongAlbumId(rawData.al.id);
  };
  isPlaying.value = false;
  await nextTick();
  if (audioRef.value) {
    audioRef.value.src = url;
    audioRef.value.currentTime = 0;
    currentTime.value = 0;
    isPlaying.value = false;
    audioRef.value.load();
  };
  if(wasPlaying && audioRef.value){
    audioRef.value.play();
    isPlaying.value = true;
  };
}

function togglePlay() {
  if (!audioRef.value) return;
  if (isPlaying.value) {
    audioRef.value.pause();
    isPlaying.value = false;
  } else {
    audioRef.value.play();
    isPlaying.value = true;
  }
}

function onTimeUpdate() {
  if (!audioRef.value) return;
  currentTime.value = audioRef.value.currentTime;
  currentTimeStr.value = formatTime(currentTime.value);
}

function onLoadedMetadata() {
  if (!audioRef.value) return;
  duration.value = audioRef.value.duration;
  durationStr.value = formatTime(duration.value);
}

function onSeek() {
  if (audioRef.value) {
    audioRef.value.currentTime = currentTime.value;
    currentTimeStr.value = formatTime(currentTime.value);
  }
}

function onEnded() {
  if (currentIndex.value === playList.value.length - 1) {
       isPlaying.value = false;
       currentTime.value = 0;
       if (audioRef.value) {
         audioRef.value.currentTime = 0;
       }
     } else {
       playNext();
     }
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function playPrev() {
  if (playList.value.length === 0) return;
  let prev = currentIndex.value - 1;
  if (prev < 0) prev = 0;
  const prevSong = playList.value[prev];
  if (prevSong) store.setPlayingSongId(prevSong.id);
}

function playNext() {
  if (playList.value.length === 0) return;
  let next = currentIndex.value + 1;
  if (next >= playList.value.length) next = playList.value.length - 1;
  const nextSong = playList.value[next];
  if (nextSong) store.setPlayingSongId(nextSong.id);
}

watch(() => store.playingSongId,(id) => {
    if (id) loadSong(id);
  },
  { immediate: true }
);

watch(isPlaying, (val) => {
  if (!audioRef.value) return;
  if (val) audioRef.value.play();
  else audioRef.value.pause();
});

watch(() => store.shouldAutoPlay, (val) => {
    if(val && audioRef.value){
      audioRef.value.play();
      isPlaying.value = true;
      store.changeShouldAutoPlay(false);
    }
  })

watch(() => store.albumThemeColor, () => {
    imgAveColor.value = store.albumThemeColor;
})
</script>

<style scoped>
.Player-main {
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 24px;
}
.play-btn {
  background: none;
  border: none;
  cursor: pointer;
}
.prev-btn, .next-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 32px;
  margin: 0 24px;
}
.player-progress{
  display: flex;

}
.progress-bar {
  width: 1200px;
  height: 10px;
  flex: 1;
  margin: 15px 12px;
}
.time {
  font-family: URW DIN Cond W05 Demi, system-ui;
  font-size: 32px;
  width: 48px;
  text-align: center;
}
</style>