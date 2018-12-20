<template>
  <div class="home">
    <BaseActivityFeed/>
  </div>
</template>

<script>
import BaseActivityFeed from '@/components/BaseActivityFeed/BaseActivityFeed'
export default {
  name: 'Home',
  components: {
    BaseActivityFeed
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.base-activity-feed {
  max-width: 480px;
}
</style>
