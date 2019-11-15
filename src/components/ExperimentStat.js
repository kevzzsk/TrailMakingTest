import React, { Component } from 'react'
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Skeleton from "@material-ui/lab/Skeleton"
import axios from "axios"

import CanvasJS from '../assets/canvasjs.react'
import DatasetViews from './DatasetViews'
import ExperimentSettings from "./ExperimentSettings"

var CanvasJSChart = CanvasJS.CanvasJSChart;


/**
 * Shows experiment results in charts
 */
class ExperimentStat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            processedData: [],
            timeBins: [],
            selectedTab: 0,
            loading: false
        }
    }
    /**
     * @method
     * @description Hide loader animation
     */
    hideLoader = () => {
        this.setState({ loading: false });
    }

    /**
     * @method
     * @description Show loader animation
     */
    showLoader = () => {
        this.setState({ loading: true });
    }

    /** get data based on ExperimentID clicked */
    componentWillMount() {
        // GET DATA based on Match ID
        this.showLoader()
        axios.get("https://cors-anywhere.herokuapp.com/https://easya.fyp2017.com/api/tmt/viewExperiment", {
            params: {
                experimentID: this.props.match.params.id
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({
                    data: res.data
                }, () => {
                    this.getAllMetrics(this.state.data);
                    this.discretizeTime();
                });
                this.hideLoader()
            })
            .catch(err => {
                console.log(err)
                this.hideLoader()
            })
    }

    /**
     * @method
     * @param {Object} data All participant results for that experiment
     * @description Calculate all necessary metrics for graphs plotting
     */
    getAllMetrics = (data) => {
        let metrics = ["totalTime", "success", "error", "miss", "error_rate", "miss_rate"]
        let processedData = data.templateExperiments.map(experiment => { return { 'label': experiment.heading, "data": this.getMetrics(experiment, metrics) } })
        //console.log(processedData)
        this.setState({ processedData })
    }

    /**
     * @method
     * @param {Object} exp Experiment data raw
     * @param {Object} metrics List of metrics to be calculated
     * @description Get all the metrics needed
     * @returns {Object} object in specified metrics{list} passed in
     */
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

    /**
     * @method
     * @param {Object} exp Experiment data raw
     * @param {Object} metrics List of metrics to be calculated
     * @description Caculate metrics needed
     * @returns {Array} array of [min_1, q1_2, q3_3, max_4, med_5]
     */
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

    /**
     * @method
     * @param {Object} data participants results flattened
     * @param {int} q quartile value to be calculated
     * @returns {int} quartile result
     */
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

    /** Custom StyledTabs */
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

    /** Custom StyleTab */
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

    /**
     * @method
     * @param {Object} e Event DOM
     * @param {Object} index index of selected tab
     * @description Change the selected tab index based on click
     */
    onTabChange = (e, index) => {
        this.setState({
            selectedTab: index
        })
    }

    /**
     * @method
     * @description Plot Time Chart
     * @param {Object} data Data needed to plot time chart
     * @returns {object} Time Chart
     */
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

    /**
     * @method
     * @description Plot Metrics Chart
     * @param {Object} data Data needed to plot metric chart
     * @returns {object} Metric Chart
     */
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

    /**
     * @method
     * @description Plot Metric rate Chart
     * @param {Object} data Data needed to plot metric rate chart
     * @returns {object} Metric rate Chart
     */
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

    /**
     * @method
     * @description Discretize TotalTime as it is a continuous variable. aka binning
     */
    discretizeTime = () => {
        let data = this.state.data.templateExperiments.map(each => each.experimentResults.map(participant => participant.totalTime))
        console.log(data)
        let range = 0.5
        let timeBins = {
            range: range,
            data: []
        }

        for (let index = 0; index < data.length; index++) {
            if (data[index].length === 0) {
                break
            }
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
                min: min,
                max: max,
                data_bins: data_bins.map(bin => {
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

    /**
     * @method
     * @description Plot Scatter Chart
     * @param {Object} data Data needed to plot scatter chart
     * @returns {object} Scatter Chart
     */
    scatter_chart = (timeBins) => {
        if (timeBins.data.length === 0) {
            return {
                title: {
                    text: "Completion Time"
                },
                axisY: {
                    includeZero: true,
                    title: "Number of Participants"
                },
                axisX: {
                    title: "Completion Time"
                },
                data: [{
                    type: "column",
                    dataPoints: []
                }
                ]
            }
        }
        return {
            theme: "light2",
            animationEnabled: true,
            title: {
                text: "Completion Time"
            },
            axisY: {
                includeZero: true,
                title: "Number of Participants",
            },
            axisX: {
                minimum: Math.min(...timeBins.data.map(data => data.min)),
                maximum: Math.max(...timeBins.data.map(data => data.max)),
                interval: timeBins.range,
                title: "Completion Time in seconds"
            },
            data: timeBins.data.map(((data, i) => {
                return {
                    type: "column",
                    name: this.state.data.templateExperiments[i].heading,
                    showInLegend: true,
                    xValueFormatString: `${this.state.data.templateExperiments[i].heading} (##.#s)`,
                    yValueFormatString: "# participants",
                    dataPoints:
                        data.data_bins.map((bin, j) => {
                            return { y: bin.length, x: timeBins.data[i].min + (j * timeBins.range) + (timeBins.range / 2) }
                        })
                }
            }))
        }
    }



    /**
     * @method
     * @description Plot All Chart
     */
    getCharts = () => {

        return <div className="w-100 chart-wrapper">
            <CanvasJSChart options={this.time_chart(this.state.processedData)} />
            <CanvasJSChart options={this.scatter_chart(this.state.timeBins)} />
            <CanvasJSChart options={this.metrics_chart(this.state.processedData)} />
            <CanvasJSChart options={this.metricsRate_chart(this.state.processedData)} />

        </div>
    }

    /**
     * @method
     * @description Display skeleton when loading
     */
    genSkeleton = () => {
        return <div className="skeleton-graph">
            <Skeleton width="100%" height={400} />
            <Skeleton width="100%" height={400} />
            <Skeleton width="100%" height={400} />
            <Skeleton width="100%" height={400} />
        </div>
    }

    /**
     * @method
     * @param {int} index index of active tab
     * @description Display neccesary content based on selected tab
     */
    genBody = (index) => {
        switch (index) {
            case 0:
                return this.getCharts()
            case 1:
                return <DatasetViews data={this.state.data} />
            case 2:
                return <ExperimentSettings data={this.state.data} history={this.props.history} />
            default:
                break;
        }
    }

    render() {
        return (
            <div >
                <div className="d-inline-flex pb-1 pt-2 pl-3 align-items-center">
                    <Button size="large" variant="outlined" className="mr-2" onClick={() => this.props.history.goBack()}>Back</Button>
                    {this.state.loading ? <Skeleton width={300} height={40} /> : <Typography variant="h4" style={{ fontWeight: "600" }} display="inline">{this.state.data.experimentName}({this.state.data.experimentID})</Typography>}

                </div>
                <this.StyledTabs value={this.state.selectedTab} onChange={this.onTabChange} aria-label="styled tabs example">
                    <this.StyledTab label="Charts" />
                    <this.StyledTab label="Datasets" />
                    <this.StyledTab label="Settings" />
                </this.StyledTabs>
                {this.state.loading ? this.genSkeleton() : this.genBody(this.state.selectedTab)}
            </div>
        )
    }
}

export default ExperimentStat;