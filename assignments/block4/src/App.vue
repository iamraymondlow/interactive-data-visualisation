<template>
  <vgg-graphic :width="1500" :height="900" :data="resaleData">

    <vgg-section
      :x1="100"
      :x2="400"
      :y1="100"
      :y2="400"
      :transform="[
        { groupBy: 'flat_type'},
        { summarise: { total_sales: { resale_price: 'mean' } } }
      ]"
    >
      <vgg-plot-title
              text="Average resale price based on flat type"
              :vjust="1.05"
              fontSize="12"
      />

      <vgg-scales
        :scales="{ typeScale: {domain: 'flat_type', order: ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'MULTI-GENERATION', 'EXECUTIVE'] }}"
      />
      <vgg-scales :scales="{ countScale: { domain: 'total_sales', domainMin: 0 } }"/>

      <vgg-map v-slot="{ row }">
        <vgg-rectangle
          :y="{ val: row.flat_type, scale: '#typeScale' }"
          :x1="{ val: 0, scale: '#countScale' }"
          :x2="{ val: row.total_sales, scale: '#countScale' }"
          :h="20"
          fill="#6398c6"
        />
      </vgg-map>

      <vgg-x-axis
              :scale="'#countScale'"
              :tick-count="4"
              rotate-label
              title="Average Sales Price"
              title-font-size="10"
      />
      <vgg-y-axis
              :scale="'#typeScale'"
              :hjust="0"
      />
    </vgg-section>

    <vgg-section
      :x1="500"
      :x2="800"
      :y1="100"
      :y2="400"
      :scale-x="[0, 1]"
      :scale-y="[0, 1]"
    >

      <vgg-plot-title
              text="Comparison of resale price and floor area"
              :vjust="1.05"
              fontSize="12"
      />

      <vgg-scales :scales="{ priceScale: { domain: 'resale_price', domainMin: 0 } }"/>
      <vgg-scales :scales="{ areaScale: { domain: 'floor_area_sqm', domainMin: 0 } }"/>

      <vgg-map v-slot="{ row }">
        <vgg-symbol
          :x="{ val: row.floor_area_sqm, scale: '#areaScale'}"
          :y="{ val: row.resale_price, scale: '#priceScale'}"
          shape="circle"
          fill="#c66366"
          size="5"
        />
      </vgg-map>

      <vgg-x-axis
              :scale="'#areaScale'"
              :hjust="0"
              title="Floor area"
              title-font-size="10"/>
      <vgg-y-axis
              :scale="'#priceScale'"
              :hjust="0"
      />

    </vgg-section>

    <vgg-section
      :x1="100"
      :x2="400"
      :y1="500"
      :y2="800"
      :transform="[
        { groupBy: 'month' },
        { arrange: {month: 'ascending'} },
        { summarise: {mean_price: {resale_price: 'mean'} } },
        { mutate: {month_date: row => new Date(row.month) } } ]"
    >

      <vgg-plot-title
              text="Mean resale price over time"
              :vjust="1.05"
              fontSize="12"

      />

      <vgg-scales :scales="{ meanPriceScale: { domain: 'mean_price'} }"/>
      <vgg-scales :scales="{ timeScale: { domain: 'month_date' } }"/>

      <vgg-map
        v-slot="{ dataframe }"
        unit="dataframe"
      >

        <vgg-multi-line
          :x="{ val: dataframe.month_date, scale: '#timeScale' }"
          :y="{ val: dataframe.mean_price, scale: '#meanPriceScale' }"
          stroke="#66c663"
        />

      </vgg-map>

      <vgg-x-axis
              :scale="'#timeScale'"
              hjust="0"
              :tick-count="4"
              :tick-extra="false"
              title="Time"
              title-font-size="10"/>
      <vgg-y-axis
              :scale="'#meanPriceScale'"
              :hjust="0"
              :tick_count="8"/>

    </vgg-section>

    <vgg-section
      :x1="500"
      :x2="800"
      :y1="500"
      :y2="800"
      :transform="[
        { binning: { groupBy: 'resale_price', method: 'EqualInterval', numClasses: 8 } },
        { summarise: { bin_size: { resale_price: 'count' } } }
      ]"
    >
      <vgg-plot-title
              text="Histogram of resale price"
              :vjust="1.05"
              fontSize="12"
      />

      <vgg-scales :scales="{ bins: {domain: 'bins' }}"/>
      <vgg-scales :scales="{ binSize: {domain: 'bin_size', domainMin: 0}}"/>

      <vgg-map v-slot="{ row }">
        <vgg-rectangle
          :x1="{ val: row.bins[0], scale: '#bins' }"
          :x2="{ val: row.bins[1], scale: '#bins' }"
          :y1="{ val: 0, scale: '#binSize'}"
          :y2="{ val: row.bin_size, scale: '#binSize'}"
          fill="#cc6600"
        />
      </vgg-map>

      <vgg-x-axis
              :scale="'#bins'"
              title="Resale Price"
              title-font-size="10"
      />
      <vgg-y-axis
              :scale="'#binSize'"
              :hjust="0"
              :tick-count="8"/>

    </vgg-section>

    <vgg-section
            :x1="900"
            :x2="1200"
            :y1="500"
            :y2="800"
            :scale-x="[0, 1]"
            :scale-y="[0, 1]"
            :transform="[
                        { filter: row => row.flat_model == 'Improved' },
                        { groupBy: 'month' },
                        { arrange: {month: 'ascending'} },
                        { summarise: {mean_price: {resale_price: 'mean'} } },
                        { mutate: {month_date: row => new Date(row.month) } } ]"
    >

      <vgg-plot-title
              text="Mean resale price of 'Improved' flats over time"
              :vjust="1.05"
              fontSize="12"

      />

      <vgg-scales :scales="{ meanPriceScale: { domain: 'mean_price'} }"/>
      <vgg-scales :scales="{ timeScale: { domain: 'month_date' } }"/>

      <vgg-map
        v-slot="{ dataframe }"
        unit="dataframe"
      >

        <vgg-area
          :x="{ val: dataframe.month_date, scale: '#timeScale' }"
          :y="{ val: dataframe.mean_price, scale: '#meanPriceScale' }"
          :y2="[0]"
          fill="#ff99cc"
        />

      </vgg-map>

      <vgg-x-axis
              :scale="'#timeScale'"
              hjust="0"
              :tick-count="4"
              :tick-extra="false"
              title="Time"
              title-font-size="10"/>
      <vgg-y-axis
              :scale="'#meanPriceScale'"
              :hjust="0"
              :tick_count="8"/>

    </vgg-section>

    <vgg-section
      :x1="900"
      :x2="1200"
      :y1="100"
      :y2="400"
      :transform="[
        { groupBy: 'flat_model'},
        { summarise: { ave_floor_area : { floor_area_sqm: 'mean' } } }
      ]"
    >
      <vgg-plot-title
              text="Average floor area based on flat model"
              :vjust="1.05"
              fontSize="12"
      />

      <vgg-scales :scales="{ modelScale: {domain: 'flat_model', order: ['Premium Apartment','Improved','Model A','New Generation'] }}"/>
      <vgg-scales :scales="{ floorAreaScale: { domain: 'ave_floor_area', domainMin: 0 } }"/>

      <vgg-map v-slot="{ row }">
        <vgg-rectangle
          :x="{ val: row.flat_model, scale: '#modelScale' }"
          :y1="{ val: 0, scale: '#floorAreaScale' }"
          :y2="{ val: row.ave_floor_area, scale: '#floorAreaScale' }"
          :w="20"
          fill="#6398c6"
        />

        <vgg-label
           :x="{ val: row.flat_model, scale: '#modelScale' }"
           :y="{ val: row.ave_floor_area, scale: '#floorAreaScale' }"
           :text="row.ave_floor_area"
           :font-size="10"
           vjust="1"
        />
      </vgg-map>

      <vgg-y-axis
              :scale="'#floorAreaScale'"
              :hjust="0"
              :tick-count="4"
      />
      <vgg-x-axis
              :scale="'#modelScale'"
              rotate-label
      />
    </vgg-section>

  </vgg-graphic>
</template>

<script>
import resaleData from './resale_sample.json'

export default {
  name: 'app',
  data () {
    return {
      resaleData: resaleData
    }
  }
}
</script>

<style>
</style>
