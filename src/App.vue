<template>
  <router-view/>
</template>
<script setup lang="ts">
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}

@font-face {
  font-family: 'URW DIN Cond W05 Demi';
  src: url('./assets/font/FontsFree-Net-0c67d2a3-2c5e-4939-ba83-e7d488c2ea70.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
    font-family: 'Salden';
    src: local('Salden Caps'), local('Salden-Caps'),
        url('./assets/font/Salden-Caps.woff2') format('woff2'),
        url('./assets/font/Salden-Caps.woff') format('woff'),
        url('./assets/font/Salden-Caps.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
</style>
