<script>
import { Bar } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  name: "Chart",
  extends: Bar,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>
