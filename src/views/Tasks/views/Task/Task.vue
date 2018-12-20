<template>
  <div class="task">
    {{ path }}
  </div>
</template>

<script>
export default {
  name: 'Task',
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
.task {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  font-weight: bolder;
}
</style>
