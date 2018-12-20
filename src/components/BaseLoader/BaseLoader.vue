<template>
  <div class="base-loader">
    <svg class="loader-item" ref="loader-item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <g stroke="var(--color-medium-gray)" fill="none" stroke-miterlimit="10" stroke-width="5">
        <path ref="loader-item-outer" d="M50 0A50 50 0 1 1 0 50"/>
        <path ref="loader-item-inner" d="M50 75a25 25 0 1 1 25-25"/>
      </g>
    </svg>
  </div>
</template>

<script>
import { TweenMax, Linear } from 'gsap'
export default {
  name: 'BaseLoader',
  mounted () {
    this.animateLoader()
  },
  methods: {
    animateLoader () {
      TweenMax.to(this.$refs['loader-item-outer'], 1, { rotation: 360, transformOrigin: 'center center', ease: Linear.easeNone, repeat: -1 })
      TweenMax.to(this.$refs['loader-item-inner'], 1, { rotation: -360, transformOrigin: 'center center', ease: Linear.easeNone, repeat: -1 })
    }
  }
}
</script>

<style lang="scss" scoped>
.base-loader {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader-item {
  width: 40px;
  overflow: visible;
}
</style>
