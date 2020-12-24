import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiServiceService } from './api-service.service';
import { ChartSeriesBasicItem, CovidDataParameter, CovidDataType, CovidDateImte, NgxChartsBarVertical, NgxColor } from './common/ngx-chart-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;

  private static CHART_TYPE_DEF = 1;
  private static CHART_TYPE_SORT = 2;

  startDate: string;
  endDate: string;

  barChart = new NgxChartsBarVertical();

  allData: any[];
  lineNames: string[];
  lineParameter: string[];

  today: any;

  view: any[] = [900, 700];

  dataSeriesMap = new Map<string, ChartSeriesBasicItem[]>();
  dataSeriesCalMap = new Map<string, ChartSeriesBasicItem[]>();
  dataSeries: any[];
  dataCalSeries: any[];

  constructor(
    private apiService: ApiServiceService,
    private datePipe: DatePipe
  ) {
    this.unsubscribeAll = new Subject();

    // Chart Data Init
    this.allData = [CovidDataParameter.decideCnt, CovidDataParameter.clearCnt, CovidDataParameter.examCnt, CovidDataParameter.deathCnt,
    CovidDataParameter.careCnt, CovidDataParameter.resutlNegCnt, CovidDataParameter.accExamCnt, CovidDataParameter.accExamCompCnt];
    this.lineNames = [CovidDataType.decideCnt, CovidDataType.clearCnt, CovidDataType.deathCnt, CovidDataType.careCnt];
    this.lineParameter = [CovidDataParameter.decideCnt, CovidDataParameter.clearCnt, CovidDataParameter.deathCnt, CovidDataParameter.careCnt];

    this.today = new Date();
    this.dataSeries = [];
    this.dataCalSeries = [];
    this.dataSeriesMap = new Map<string, ChartSeriesBasicItem[]>();
    this.dataSeriesCalMap = new Map<string, ChartSeriesBasicItem[]>();

    this.lineNames.forEach(element => {
      this.dataSeriesMap.set(element, []);
      this.dataSeriesCalMap.set(element, []);
    });

  }

  ngOnInit(): void {
    this.chartInit();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  allDataInit(): void {
    this.dataSeries = [];
    this.dataCalSeries = [];
    this.dataSeriesMap.clear();
    this.dataSeriesCalMap.clear();

    this.lineNames.forEach(element => {
      this.dataSeriesMap.set(element, []);
      this.dataSeriesCalMap.set(element, []);
    });
  }

  chartInit(): void {
    this.barChart.showXAxis = true;
    this.barChart.showYAxis = true;
    this.barChart.gradient = false;
    this.barChart.showLegend = true;
    this.barChart.legendTitle = '현황';
    this.barChart.showXAxisLabel = true;
    this.barChart.xAxisLabel = '날짜';
    this.barChart.showYAxisLabel = true;
    this.barChart.yAxisLabel = '인원수';
    this.barChart.colorScheme = NgxColor.FLAME;
  }

  startDateValue(event): void {
    this.startDate = this.datePipe.transform(event.value, 'yyyyMMdd');
  }

  endDateValue(event): void {
    if (event.value !== null) {
      this.endDate = this.datePipe.transform(event.value, 'yyyyMMdd');
      this.getDataList();
    }
  }

  getDataList(): void {
    this.apiService.getCovidData(1, 10000, this.startDate, this.endDate).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        if (res) {
          this.allDataInit();
          this.createChartProcess(res.response.body.items.item, AppComponent.CHART_TYPE_DEF);
          const dataResult = res.response.body.items.item.sort(function (a, b) {
            return Number(a['stateDt']['_text']) - Number(b['stateDt']['_text']);
          });
          this.createChartProcess(dataResult, AppComponent.CHART_TYPE_SORT);
        }
      }, err => {
        console.log(err);
      });
  }

  async createChartProcess(data: [], chartType: number) {
    for (let count = 0; count < data.length; count++) {
      if (chartType === AppComponent.CHART_TYPE_DEF) {
        const addItem = new CovidDateImte(data[count]);
        this.createChartDataMap(addItem, chartType);
      }
      if (chartType === AppComponent.CHART_TYPE_SORT) {
        console.log(data);
        if (count < data.length - 1) {
          const orgItem = new CovidDateImte(data[count]);
          const cmpItem = new CovidDateImte(data[count + 1]);
          if (orgItem.stateDt !== cmpItem.stateDt) {
            let addItem = JSON.parse(JSON.stringify(cmpItem));
            for (let subCount = 0; subCount < this.allData.length; subCount++) {
              addItem[this.allData[subCount]] = Math.abs(orgItem[this.allData[subCount]] - cmpItem[this.allData[subCount]]);
            }
            this.createChartDataMap(addItem, chartType);
          }
        }
      }
    }
    this.dataSeries = this.createChartDataParameter(this.dataSeries, this.dataSeriesMap);
    this.dataCalSeries = this.createChartDataParameter(this.dataCalSeries, this.dataSeriesCalMap);
  }

  createChartDataMap(data: CovidDateImte, chartType: number): void {
    for (let count = 0; count < this.lineParameter.length; count++) {
      const addChartItem = new ChartSeriesBasicItem();
      addChartItem.name = this.datePipe.transform(data.createDt, 'yyyy-MM-dd');
      addChartItem.value = data[this.lineParameter[count]]
      let target = [];
      if (chartType === AppComponent.CHART_TYPE_SORT) {
        target = this.dataSeriesCalMap.get(this.lineNames[count]);
        target.push(addChartItem);
        this.dataSeriesCalMap.set(this.lineNames[count], target);
      } else {
        target = this.dataSeriesMap.get(this.lineNames[count]);
        target.push(addChartItem);
        this.dataSeriesMap.set(this.lineNames[count], target);
      }
    }
  }

  createChartDataParameter(chartData: any[], chartMap): any[] {
    if (chartData.length > 0) {
      chartData = [];
    }
    for (let [key, value] of chartMap) {
      let addObj = Object();
      addObj['name'] = key;
      addObj['series'] = [];
      value.forEach(element => {
        let addSubObj = Object();
        addSubObj['name'] = element.name;
        addSubObj['value'] = Number(element.value);
        addObj['series'].push(addSubObj);
      });
      chartData.push(addObj);
    }
    return chartData = [...chartData];
  }
}
