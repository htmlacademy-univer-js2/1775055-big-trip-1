import dayjs from 'dayjs';
import SmartView from './smart-view.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createStatisticsTemplate = () => {
  const completedTaskCount = 0; // Нужно посчитать количество завершенных задач за период

  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>
  fffff
</section>`;
};

export default class StatisticsView extends SmartView {
  constructor(tasks) {
    super();

    this.#setCharts();
  }

  get template() {
    return createStatisticsTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();
  }

  #setCharts = () => {
    // Нужно отрисовать два графика
  }
}