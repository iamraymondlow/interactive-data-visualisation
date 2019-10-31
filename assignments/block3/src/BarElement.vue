<template>
  <!-- TEMPLATE SYNTAX GOES HERE -->
  <g>
    <text :x="x1" :y="y1" :style="{fontSize: textSize}" dominant-baseline="hanging">{{ this.label1 }}</text>
    <text :x="x2" :y="y2" :style="{fontSize: textSize}" dominant-baseline="hanging">{{ this.label2 }}</text>
    <text :x="x3" :y="y3" :style="{fontSize: textSize}" dominant-baseline="hanging">{{ this.label3 }}</text>
    <text :x="xPop" :y="yPop" :style="{fontSize: textSize}" dominant-baseline="hanging">{{ this.population }}</text>
    <rect :x="xBar" :y="yBar" height="8" :width="barWidth" />
  </g>
</template>

<script>
// JS GOES HERE

export default {
  name: 'bar-element',
  props: ['x1','y1','label1','x2','y2','label2','x3','y3','label3','xPop','yPop','population', 'xBar','yBar','barWidth','textSize'],
  data () {
    textSize: this.textSize
    return {
    }
  },
}
</script>

<style>

rect {
    fill: rgb(167, 68, 87);
}

text {
    font-color: rgb(60, 60, 60);
    font-family: 'Chakra Petch', sans-serif;
    font-weight: lighter;
}

</style>
