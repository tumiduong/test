<template>
  <div class='container' v-if='newTemplate.length'>
    <workflow-chart
      :transitions="transitions"
      :states="states"
      :stateSemantics="stateSemantics"
      />
      <div v-if='tooltips.length'>
        <div v-bind:key='tooltip.target' v-for='tooltip of tooltips'>
          <b-tooltip show='true' v-bind:target='tooltip.target' triggers='manual' placement='bottom'>
            {{ tooltip.message }}
            <button>Yes</button>
            <button>No</button></b-tooltip>
        </div>
      </div>
  </div>
</template>

<script>
import WorkflowChart from 'vue-workflow-chart';
import { BTooltip } from 'bootstrap-vue';

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
        tooltips.push({target: 'tooltip-target-' + index, message: `This scored ${(category.score * 100).toFixed(1).toString()}%, is this correct?`})
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
  }
}
</script>

<style>
@import '~vue-workflow-chart/dist/vue-workflow-chart.css';

.vue-workflow-chart-transition-arrow-hide, .vue-workflow-chart-transition-path-hide {
  opacity: 0%;
}

.vue-workflow-chart-transition-label-hide {
  opacity: 50%;
}

</style>