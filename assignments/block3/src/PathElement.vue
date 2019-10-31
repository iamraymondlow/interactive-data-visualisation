<template>
  <!-- TEMPLATE SYNTAX GOES HERE -->
  <g>
    <path :d="path" :style="{fill: fill, stroke: stroke, width: width}"></path>
  </g>
</template>

<script>
// JS GOES HERE

export default {
  name: 'path-element',
  props: ['path', 'stroke', 'width', 'fill'],
  data () {
    fill: this.fill;
    stroke: this.stroke;
    width: this.width
    return {
    }
  },
}
</script>

<style>
</style>
