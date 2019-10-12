import React, { Component } from 'react'
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    WhiskerSeries,
    ChartLabel
} from 'react-vis';

import { Tabs, Tab, withStyles, Button, Typography, Box } from "@material-ui/core"

import CanvasJS from '../assets/canvasjs.react'
import exData from '../template/exData'
import DatasetView from './DatasetView'

var CanvasJSChart = CanvasJS.CanvasJSChart;

class ExperimentStat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            processedData: [],
            timeBins: [],
            selectedTab: 0
        }
    }

    componentWillMount() {
        // GET DATA based on Match ID

        this.setState({
            data: exData.Experiments.find((item) => item.experimentID === this.props.match.params.id)
        }, () => {
            this.getAllMetrics(this.state.data);
            this.discretizeTime();
        })
    }

    getAllMetrics = (data) => {
        let metrics = ["totalTime", "success", "error", "miss", "error_rate", "miss_rate"]
        let processedData = data.templateExperiments.map(experiment => { return { 'label': experiment.template.trail.heading, "data": this.getMetrics(experiment, metrics) } })
        //console.log(processedData)
        this.setState({ processedData })
    }

    getMetrics = (exp, metrics) => {
        let returnVal = {
            [metrics[0]]: [],
            [metrics[1]]: [],
            [metrics[2]]: [],
            [metrics[3]]: [],
            [metrics[4]]: [],
            [metrics[5]]: [],
        }
        //console.log(returnVal)
        metrics.map(metric => returnVal[metric] = this.calcMetrics(exp, metric))
        return returnVal
    }

    calcMetrics = (exp, metric) => {
        let data_array = []
        if (["error_rate", "miss_rate"].includes(metric)) {
            let real_metric = metric.split("_")[0]
            data_array = exp.experimentResults.map(result => (result[real_metric] * 100 / result["success"]))

        } else {
            data_array = exp.experimentResults.map(result => result[metric])
        }
        let min_1 = Math.min(...data_array)
        let max_4 = Math.max(...data_array)
        let q1_2 = this.getQuartile(data_array, 0.25)
        let q3_3 = this.getQuartile(data_array, 0.75)
        let med_5 = this.getQuartile(data_array, 0.50)
        return [min_1, q1_2, q3_3, max_4, med_5]
    }

    getQuartile = (data, q) => {
        data.sort(function (a, b) { return a - b });
        var pos = ((data.length) - 1) * q;
        var base = Math.floor(pos);
        var rest = pos - base;
        if ((data[base + 1] !== undefined)) {
            return data[base] + rest * (data[base + 1] - data[base]);
        } else {
            return data[base];
        }
    }

    StyledTabs = withStyles({
        indicator: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            '& > div': {
                maxWidth: 40,
                width: '100%',
                backgroundColor: '#635ee7',
            },
        },
    })(props => <Tabs {...props} style={{ position: "sticky", top: '57px', zIndex: 10, backgroundColor: 'white' }} TabIndicatorProps={{ children: <div /> }} />);

    StyledTab = withStyles(theme => ({
        root: {
            textTransform: 'none',
            color: '#000',
            fontWeight: theme.typography.fontWeightRegular,
            fontSize: theme.typography.pxToRem(15),
            marginRight: theme.spacing(1),
            '&:focus': {
                opacity: 1,
            },
        },
    }))(props => <Tab disableRipple {...props} />);

    onTabChange = (e, index) => {
        this.setState({
            selectedTab: index
        })
    }

    genBody = (index) => {
        switch (index) {
            case 0:
                return this.getCharts()
            case 1:
                return <DatasetView />
            default:
                break;
        }
    }

    time_chart = (data) => {
        return {
            theme: "light2",
            animationEnabled: true,
            title: {
                text: "Total Completion Time"
            },
            axisY: {
                title: "Completion Time in seconds",
                includeZero: false
            },
            dataPointWidth: 40,
            data: [{
                type: "boxAndWhisker",
                yValueFormatString: "#.00 \"seconds\"",
                dataPoints: data.map(trail => { return { label: trail.label, y: trail.data.totalTime } }),
            }]
        }
    }

    metrics_chart = (data) => {
        return {
            theme: "light2",
            animationEnabled: true,
            title: {
                text: "Total Miss/Error"
            },
            axisY: {
                title: "Metrics",
                includeZero: false
            },
            dataPointWidth: 40,
            data: [{
                type: "boxAndWhisker",
                yValueFormatString: "0 \"mistakes\"",
                dataPoints: [...data.map(trail => { return { label: trail.label + " (Errors)", y: trail.data.error } }),
                ...data.map(trail => { return { label: trail.label + " (Misses)", y: trail.data.miss } })]
            }]
        }
    }

    metricsRate_chart = (data) => {
        return {
            theme: "light2",
            animationEnabled: true,
            title: {
                text: "Total Miss/Error Rate"
            },
            axisY: {
                title: "Metrics in %",
                includeZero: false
            },
            dataPointWidth: 40,
            data: [{
                type: "boxAndWhisker",
                yValueFormatString: "0.00\"% mistake rate\"",
                dataPoints: [...data.map(trail => { return { label: trail.label + " (ErrorRate)", y: trail.data.error_rate } }),
                ...data.map(trail => { return { label: trail.label + " (MissRate)", y: trail.data.miss_rate } })]
            }]
        }
    }

    discretizeTime = () => {
        let data = this.state.data.templateExperiments.map(each => each.experimentResults.map(participant => participant.totalTime))
        console.log(data)
        let range = 0.5
        let timeBins = {
            range: range,
            data: []
        }

        for (let index = 0; index < data.length; index++) {
            let min = Math.floor(Math.min(...data[index]))
            let max = Math.ceil(Math.max(...data[index]))
            let bins = Math.ceil((max - min) / range)
            let data_bins = new Array(bins).fill(0)
            for (let j = 0; j < data[index].length; j++) {
                let calc_bin = Math.ceil((data[index][j] - min) / range) - 1
                if (data_bins[calc_bin] === 0) {
                    data_bins[calc_bin] = []
                    data_bins[calc_bin].push(data[index][j])
                } else {
                    data_bins[calc_bin].push(data[index][j])
                }
            }
            timeBins.data.push({
                min:min,
                max:max,
                data_bins:data_bins.map(bin => {
                    if (bin === 0) {
                        return []
                    }
                    else return bin
                })
            })

        }
        this.setState({
            timeBins
        })
    }

    scatter_chart = (timeBins) => {
        if(timeBins.length === 0){
            return null
        }
        console.log(timeBins.data[0].data_bins.map((bin,i) => {
            return {y:bin.length,x:timeBins.data[0].min+(i*timeBins.range)}
        }))
        return {
            title: {
                text: "Completion Time"
            },
            axisY:{
                includeZero:true,
                title:"Number of Participants"
            },
            axisX:{
                minimum:timeBins.data[0].min,
                maximum:timeBins.data[0].max,
                interval:timeBins.range,
                title:"Completion Time"
            },
            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: timeBins.data[0].data_bins.map((bin,i) => {
                        return {y:bin.length,x:timeBins.data[0].min+(i*timeBins.range)+(timeBins.range/2)}
                    })
                },
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: timeBins.data[1].data_bins.map((bin,i) => {
                        return {y:bin.length,x:timeBins.data[1].min+(i*timeBins.range)+(timeBins.range/2)}
                    })
                },
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "line",
                    dataPoints: timeBins.data[0].data_bins.map((bin,i) => {
                        return {y:bin.reduce((a,b) => a + b, 0) / bin.length,x:timeBins.data[0].min+(i*timeBins.range)}
                    })
                },
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "line",
                    dataPoints: timeBins.data[1].data_bins.map((bin,i) => {
                        return {y:bin.reduce((a,b) => a + b, 0) / bin.length,x:timeBins.data[1].min+(i*timeBins.range)}
                    })
                }
            ]
        }
    }




    getCharts = () => {
        return <div className="w-100 chart-wrapper">
            <CanvasJSChart options={this.time_chart(this.state.processedData)} />
            <CanvasJSChart options={this.scatter_chart(this.state.timeBins)} />
            <CanvasJSChart options={this.metrics_chart(this.state.processedData)} />
            <CanvasJSChart options={this.metricsRate_chart(this.state.processedData)} />

        </div>
    }

    render() {
        return (
            <div >
                <div className="d-inline-flex pb-1 pt-2 pl-3 align-items-center">
                    <Button size="large" variant="outlined" className="mr-2">Back</Button><Typography variant="h4" style={{ fontWeight: "600" }} display="inline">{this.state.data.experimentName}({this.state.data.experimentID})</Typography>
                </div>
                <this.StyledTabs value={this.state.selectedTab} onChange={this.onTabChange} aria-label="styled tabs example">
                    <this.StyledTab label="Charts" />
                    <this.StyledTab label="Datasets" />
                    <this.StyledTab label="Settings" />
                </this.StyledTabs>
                {this.genBody(this.state.selectedTab)}
            </div>
        )
    }
}

export default ExperimentStat;