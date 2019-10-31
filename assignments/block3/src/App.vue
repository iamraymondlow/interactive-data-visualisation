<template>
  <div class="graph">
      <div class="title">
        <h1>OCCUPATIONS OF GEORGIA NEGROES.</h1>
        <h2>MALES OVER 10.</h2>
      </div>

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="815">
          <bar-element v-for="item in rectData"
                       :x1="item.labelX_1" :y1="item.labelY_1" :label1="item.label_1st"
                       :x2="item.labelX_2" :y2="item.labelY_2" :label2="item.label_2nd"
                       :x3="item.labelX_3" :y3="item.labelY_3" :label3="item.label_3rd"
                       :xPop="item.populationX" :yPop="item.populationY" :population="item.populationSize"
                       :xBar="item.barX" :yBar="item.barY"
                       :barWidth="item.barWidth" :textSize="item.textSize"
          />
          <path-element v-for="item in pathData"
                        :path="item.path"
                        :stroke="item.stroke"
                        :stroke-width="item.width"
                        :fill="item.fill"
          />
        </svg>
      </div>
    </div>
</template>

<script>
import rectData from './chartdata.json'
import pathData from './pathdata.json'
import BarElement from './BarElement.vue'
import PathElement from './PathElement'

export default {
  name: 'app',
  components: {
    BarElement,
    PathElement
  },
  data () {
    return {
      rectData: rectData,
      pathData: pathData
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Chakra+Petch');

.graph {
    width: 700px;
    background-color: rgb(250, 239, 233);
}

.title {
    text-align: center;
    font-family: 'Chakra Petch', sans-serif;
    color: rgb(60, 60, 60);
    letter-spacing: 1px;
}

.title h1 {
    font-size: 21px;
    padding-top: 26px;
    font-weight: bolder;
    margin: 0px;
}

.title h2 {
    font-size: 12px;
    font-weight: lighter;
    margin: 0px;
}
</style>
