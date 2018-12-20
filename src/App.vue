<template>
  <div id="app">
    <transition name="fade" mode="out-in" appear>
      <keep-alive>
        <router-view :key="$route.path"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>
