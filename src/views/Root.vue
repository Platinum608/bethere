<template>
    <div class="overall-main">
        <div class="top">
            <TopNav></TopNav>
        </div>
        <div class="middle">
            <div class="m-left">
                <AlbumList />
            </div>
            <div class="m-middle">
                <router-view/>            
            </div>
            <div class="m-right">
                <SongDetail></SongDetail>
            </div>
        </div>
        <div class="bottom">
            <Player></Player>
        </div>
    </div>
</template>
<script setup lang="ts">
import TopNav from './TopNav.vue';
import AlbumList from './AlbumList.vue';
import SongDetail from './SongDetail.vue';
import Player from './Player.vue';


</script>
<style scoped>
.overall-main{
    height: 100%;
    width: 100%;
    background-color: #000000;
}
.top{
    height: 80px;
    width: 100%;
}
.middle{
    width: 100%;
    height: calc(100% - 200px);
    display: flex;
}
.bottom{
    height: 120px;
    width: 100%;
    position: fixed;
    bottom: 0px;
}
.m-left{
    height: 100%;
    flex: 3;
    margin-left: 20px;
    margin-right: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px 10px 0 0;;
}
.m-middle{
    height: 100%;
    flex: 8;
    margin-left: 10px;
    margin-right: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px 10px 0 0;;
}
.m-right{
    height: 100%;
    flex: 5;
    margin-left: 10px;
    margin-right: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px 10px 0 0;;
}
</style>