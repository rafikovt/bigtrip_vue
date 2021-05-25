import { HorizontalBar, mixins } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
const { reactiveProp } = mixins;

export default {
    extends: HorizontalBar,
    mixins: [reactiveProp],
    props: ['options'],

    mounted() {
        console.log(this.optionsLocal);
        console.log(this.chartData)
        // this.chartData создаётся внутри миксина.
        // Если вы хотите передать опции, создайте локальный объект options
        this.addPlugin(ChartDataLabels);
        this.renderChart(this.chartData, this.options)
    }
}
