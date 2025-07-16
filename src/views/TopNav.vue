<template>
    <div class="TopNav-mian">
        <div class="logo" @click="goProfile">
            bethere
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function goProfile() {
  router.push('/profile');
}
</script>
<style>
.logo{
    height: 80px;
    font-family: Salden;
    font-size: 60px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>