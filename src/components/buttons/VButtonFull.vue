
<template>
  <VButton :class="$style.full" :s="s" @click="$emit('click')"><slot /></VButton>
</template>
<script>
import VButton from './VButton'
export default {
  components: {
    VButton
  },
  props: {
    s: {
      type: String,
      default: ''
    }
  }
}
</script>

<style module>
.full {
  display: block;
  width: 100%;
}
</style>
