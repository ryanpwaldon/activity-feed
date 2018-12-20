<template>
  <div id="app">
    <transition name="fade" mode="out-in" appear>
      <router-view :key="$route.path"/>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>
