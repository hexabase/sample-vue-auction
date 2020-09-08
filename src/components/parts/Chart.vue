<script>
import { Bar } from "vue-chartjs";

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
  // data() {
  //   return {
  //     data: {
  //       labels: this.labels,
  //       datasets: [
  //         {
  //           label: "分配金",
  //           data: this.data,
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.2)",
  //             "rgba(54, 162, 235, 0.2)",
  //             "rgba(255, 206, 86, 0.2)",
  //             "rgba(75, 192, 192, 0.2)",
  //             "rgba(153, 102, 255, 0.2)"
  //           ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(153, 102, 255, 1)"
  //           ],
  //           borderWidth: 1
  //         }
  //         // {
  //         //   label: "Line Dataset",
  //         //   data: [10, 50, 20, 30, 30, 40],
  //         //   borderColor: "#CFD8DC",
  //         //   fill: false,
  //         //   type: "line",
  //         //   lineTension: 0.3
  //         // }
  //       ]
  //     },
  //     options: {
  //       scales: {
  //         xAxes: [
  //           {
  //             scaleLabel: {
  //               display: false,
  //               labelString: "年"
  //             }
  //           }
  //         ],
  //         yAxes: [
  //           {
  //             ticks: {
  //               beginAtZero: true,
  //               stepSize: 5000
  //             }
  //           }
  //         ]
  //       }
  //     }
  //   };
  // },
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>
