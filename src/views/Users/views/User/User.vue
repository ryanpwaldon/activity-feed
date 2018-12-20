<template>
  <div class="user">
    {{ path }}
  </div>
</template>

<script>
export default {
  name: 'User',
  mounted () {
    this.path = this.$route.fullPath
  },
  data () {
    return {
      path: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  font-weight: bolder;
}
</style>
