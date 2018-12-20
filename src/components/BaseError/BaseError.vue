<template>
  <div class="base-error">
    Error: {{ error.message }}
  </div>
</template>

<script>
export default {
  name: 'BaseError',
  props: {
    error: {
      type: Error,
      required: true
    }
  },
  mounted () {
    console.error(this.error)
  }
}
</script>

<style lang="scss" scoped>
.base-error {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  font-weight: bolder;
  padding: 10px;
  text-align: center;
}
</style>
