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
            selectedTab: 0
        }
    }

    componentWillMount() {
        // GET DATA based on Match ID

        this.setState({
            data: exData.Experiments.find((item) => item.experimentID === this.props.match.params.id)
        }, () => this.getAllMetrics(this.state.data))
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
        let data_array= []
        if (["error_rate", "miss_rate"].includes(metric)) {
            let real_metric = metric.split("_")[0]
            data_array = exp.experimentResults.map(result => (result[real_metric]*100 / result["success"]))

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
    })(props => <Tabs {...props} style={{position:"sticky",top:'57px',zIndex:10,backgroundColor:'white'}} TabIndicatorProps={{ children: <div /> }} />);

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




    getCharts = () => {
        return <div className="w-100 chart-wrapper">
            <CanvasJSChart options={this.time_chart(this.state.processedData)} />
            <CanvasJSChart options={this.metrics_chart(this.state.processedData)} />
            <CanvasJSChart options={this.metricsRate_chart(this.state.processedData)} />
            
        </div>
    }

    render() {
        return (
            <div >
                <div className="d-inline-flex pb-1 pt-2 pl-3 align-items-center">
                    <Button size="large" variant="outlined" className="mr-2">Back</Button><Typography variant="h4" style={{fontWeight:"600"}} display="inline">{this.state.data.experimentName}({this.state.data.experimentID})</Typography>
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