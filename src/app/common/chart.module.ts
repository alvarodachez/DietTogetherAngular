import { NgModule } from '@angular/core';
import { LinearChartComponent } from './linear-chart/linear-chart.component';
import { LinearGaugeChartComponent } from './linear-gauge-chart/linear-gauge-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PieChartAdvencedComponent } from './pie-chart-advenced/pie-chart-advenced.component';

@NgModule({
    declarations : [
        LinearGaugeChartComponent,
        LinearChartComponent,
        GaugeChartComponent,
        PieChartAdvencedComponent
    ],
    imports:[

        CommonModule,


        NgxChartsModule
    ],

    exports:[
        LinearGaugeChartComponent,
        LinearChartComponent,
        GaugeChartComponent,
        PieChartAdvencedComponent
    ],
})

export class ChartModule {}