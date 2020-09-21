<template>
  <div class='container' v-if='newTemplate.length'>
    <workflow-chart
      :transitions="transitions"
      :states="states"
      :stateSemantics="stateSemantics"
      />
      <div v-if='tooltips.length'>
        <div v-bind:key='tooltip.target' v-for='tooltip of tooltips'>
          <b-tooltip :show='true' ref="tooltip" v-bind:target='tooltip.target' triggers='manual' placement='bottom' fallback-placement='counterclockwise' variant="info">
            {{ tooltip.message }}
            <button @click='acceptTooltip(tooltip.column, tooltip.target)'>Yes</button>
            <button @click='denyTooltip(tooltip.target)'>No</button></b-tooltip>
        </div>
      </div>
  </div>
</template>

<script>
import WorkflowChart from 'vue-workflow-chart';
import { BTooltip } from 'bootstrap-vue';
import axios from 'axios';

export default {
  name: 'Csv',
  props: {
    fileRows: Array,
    newTemplate: Array
  },
  components: {
    WorkflowChart, BTooltip
  },
  data() {
    const boxes = [];
    const scores = [];
    const semantics = [];
    const tooltips = [];
    let index = 0;

    for (const category of this.newTemplate) {
      const leftID = category.left + category.column + '-L';
      const rightID = category.right + category.column + '-R';

      boxes.push({id: leftID, label: category.left}, {id: rightID, label: category.right});

      scores.push({
          "id": category.left + category.right,
          "label": (category.score * 100).toFixed(1).toString() + '%',
          "target": rightID,
          "source": leftID,
      })

      if (category.score <= 0.7) {
        semantics.push({id: rightID, classname: 'hide'})
        tooltips.push({column: {...category}, target: 'tooltip-target-' + index, message: `This is ${(category.score * 100).toFixed(1).toString()}% similar, is this correct?`})
        index++;
      }
    }

    return {
      states: boxes,
      transitions: scores,
      stateSemantics: semantics,
      tooltips
    }
  },
  mounted() {
    const lowScoreDivs = document.getElementsByClassName('vue-workflow-chart-transition-label-hide');
    let index = 0;

    for (const div of lowScoreDivs) {
      div.id = 'tooltip-target-' + index;
      index++;
    }
  },
  methods: {
    denyTooltip(target) {
      this.$root.$emit('bv::hide::tooltip', target);
    },
    acceptTooltip(column, target) {
      console.log(column)
      axios.post('/customers', column)
      .then(result => {
        console.log(result)
        this.$root.$emit('bv::hide::tooltip', target);
      })
      .catch(err => console.log(err))
      
    }
  }
}
</script>

<style>
@import '~vue-workflow-chart/dist/vue-workflow-chart.css';

.container {
  margin: auto;
}

div[data-v-3da956c2] {
  margin: 15px 0px 100px 0px;
}

.vue-workflow-chart-transition-label {
  font-family: "Segoe UI";
}

.vue-workflow-chart-state {
  font-family: "Segoe UI";
  box-shadow: none;
  border: lightgray 1px dashed;
  padding: 15px;
  white-space: nowrap;
}

.vue-workflow-chart-transition-arrow-hide, .vue-workflow-chart-transition-path-hide {
  opacity: 0%;
}

.vue-workflow-chart-transition-label-hide {
  opacity: 50%;
}

.tooltip-inner button {
  margin: 0px 2px;
  outline: none;
  border: 1px #fff solid;
  background-color: #fff;
  border-radius: 10px;
  padding: 0px 10px;
}

</style>