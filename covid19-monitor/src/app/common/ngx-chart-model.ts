// Ngx Chart Basic Color List
export namespace NgxColor {
    export const VIVID = 'vivid';
    export const NATURAL = 'natural';
    export const COOL = 'cool';
    export const FIRE = 'fire';
    export const SOLAR = 'solar';
    export const AIR = 'air';
    export const AQUA = 'aqua';
    export const FLAME = 'flame';
    export const OCEAN = 'ocean';
    export const FOREST = 'forest';
    export const HORIZON = 'horizon';
    export const NEONS = 'neons';
    export const PICNIC = 'picnic';
    export const NIGHT = 'night';
    export const NIGHTLIGHTS = 'nightLights';
}

export class ChartSeriesBasicItem {
    name: string;
    value: number;
}

// export class ChartSeriesItem {
//     name: string;
//     series: ChartSeriesBasicItem[];

//     constructor(item) {
//         if (item) {
//             this.name = item;
//             this.series = [];
//         }
//     }
// }

export namespace CovidDataType {
    export const accDefRate: string = '누적 환진율';
    export const accExamCnt: string = '누적 검사';
    export const accExamCompCnt: string = '누적 검사 완료';
    export const careCnt: string = '치료중 환자';
    export const clearCnt: string = '격리 해제';
    export const deathCnt: string = '사망자';
    export const decideCnt: string = '확진자';
    export const examCnt: string = '검사 진행';
    export const resutlNegCnt: string = '결과 음성';
}

export namespace CovidDataParameter {
    export const accDefRate: string = 'accDefRate';
    export const accExamCnt: string = 'accExamCnt';
    export const accExamCompCnt: string = 'accExamCompCnt';
    export const careCnt: string = 'careCnt';
    export const clearCnt: string = 'clearCnt';
    export const deathCnt: string = 'deathCnt';
    export const decideCnt: string = 'decideCnt';
    export const examCnt: string = 'examCnt';
    export const resutlNegCnt: string = 'resutlNegCnt';
}

export class CovidDateImte {
    accDefRate: number;         //누적 환진율
    accExamCnt: number;         //누적 검사 수
    accExamCompCnt: number;     //누적 검사 완료 수
    careCnt: number;            //치료 중 환자 수
    clearCnt: number;           //격리 해제 수
    createDt: string;           //등록일
    deathCnt: number;           //사망자 수
    decideCnt: number;          //확진자 수
    examCnt: number;            //검사 진행 수
    resutlNegCnt: number;       //결과 음성 수
    seq: number;                //게시글 번호
    stateDt: string;            //기준일
    stateTime: string;          //기준 시간
    updateDt: string;           //수정일

    constructor(item?) {
        if (item) {
            this.accDefRate = item.accDefRate._text;
            this.accExamCnt = item.accExamCnt._text;
            this.accExamCompCnt = item.accExamCompCnt._text;
            this.careCnt = item.careCnt._text;
            this.clearCnt = item.clearCnt._text;
            this.createDt = item.createDt._text;
            this.deathCnt = item.deathCnt._text;
            this.decideCnt = item.decideCnt._text;
            this.examCnt = item.examCnt._text;
            this.resutlNegCnt = item.resutlNegCnt._text;
            this.seq = item.seq._text;
            this.stateDt = item.stateDt._text;
            this.stateTime = item.stateTime._text;
            this.updateDt = item.updateDt._text;
        } else {
            this.accDefRate = 0;
            this.accExamCnt = 0;
            this.accExamCompCnt = 0;
            this.careCnt = 0;
            this.clearCnt = 0;
            this.createDt = '';
            this.deathCnt = 0;
            this.decideCnt = 0;
            this.examCnt = 0;
            this.resutlNegCnt = 0;
            this.seq = 0;
            this.stateDt = '';
            this.stateTime = '';
            this.updateDt = '';
        }
    }
}


// Ngx Chart Basic Option Class
export class NgxChartsBarVertical {
    view: [0, 0];   // [width, height] || undefined(container size)
    results: any;
    showXAxis: boolean;
    showYAxis: boolean;
    gradient: boolean;
    showLegend: boolean;
    legendPosition = ''; // below || right
    legendTitle = '';
    showXAxisLabel: boolean;
    xAxisLabel = '';
    showYAxisLabel: boolean;
    yAxisLabel = '';
    animations: boolean;
    showLabels: boolean;
    tooltipDisabled: boolean;
    colorScheme: any;

    constructor(chartsInfo?) {
        if (chartsInfo) {
            this.view = chartsInfo.view;
            this.results = chartsInfo.results;
            this.showXAxis = chartsInfo.showXAxis;
            this.showYAxis = chartsInfo.showYAxis;
            this.gradient = chartsInfo.gradient;
            this.showLegend = chartsInfo.showLegend;
            this.legendPosition = chartsInfo.legendPosition;
            this.legendTitle = chartsInfo.legendTitle;
            this.showXAxisLabel = chartsInfo.showXAxisLabel;
            this.xAxisLabel = chartsInfo.xAxisLabel;
            this.showYAxisLabel = chartsInfo.showYAxisLabel;
            this.yAxisLabel = chartsInfo.yAxisLabel;
            this.showLabels = chartsInfo.showLabels;
            this.animations = chartsInfo.animations;
            this.tooltipDisabled = chartsInfo.tooltipDisabled;

            this.colorScheme.domain = JSON.parse(JSON.stringify(chartsInfo.colorScheme.domain));
        } else {
            this.view = undefined;
            this.results = [{}];
            this.showXAxis = true;
            this.showYAxis = true;
            this.gradient = false;
            this.showLegend = true;
            this.legendPosition = 'below';
            this.legendTitle = '';
            this.showXAxisLabel = false;
            this.xAxisLabel = '';
            this.showYAxisLabel = false;
            this.yAxisLabel = '';
            this.showLabels = false;
            this.animations = false;
            this.tooltipDisabled = false;

            this.colorScheme = NgxColor.FLAME;
        }
    }
}