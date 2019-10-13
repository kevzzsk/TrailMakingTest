import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Skeleton from "@material-ui/lab/Skeleton"
import { Link } from 'react-router-dom'
import { isBefore } from "date-fns"

import exData from '../template/exData'
import ExperimentCard from './ExperimentCard'
import axios from 'axios';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box p={2}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
        style: { fontSize: "24px" }
    };
}



function ViewExperiment(props) {
    const [value, setValue] = React.useState(0);
    const [exp, setExp] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [skelData, setSkelData] = React.useState([1, 2, 3]);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    const getStatus = (startDate, endDate) => {
        let start = new Date(startDate);
        let end = new Date(endDate);
        if (isBefore(new Date(), start)) {
            return "Draft"
        }
        else if (isBefore(new Date(), end)) {
            return "Active"
        }
        else {
            return "Completed"
        }
    }

    function genCards(index) {

        switch (index) {
            case 0:
                return (loading ? skelData.map(item => <Skeleton width="100%" height={250} />) : exp.map((item) => {
                    return <Link to={`/user-page/view-experiments/${item.experimentID}`} className="text-decoration-none"><ExperimentCard {...item} /></Link>
                }));
                break;
            case 1:
                return (loading ? skelData.map(item => <Skeleton width="100%" height={250} />) : exp.filter((item) => { 
                    return getStatus(item.startDate, item.endDate) === "Active"})
                    .map(item=>{return <Link to={`/user-page/view-experiments/${item.experimentID}`} className="text-decoration-none"><ExperimentCard {...item} /></Link>}));
                break;
            case 2:
                return (loading ? skelData.map(item => <Skeleton width="100%" height={250} />) : exp.filter((item) => { 
                    return getStatus(item.startDate, item.endDate) === "Draft"})
                    .map(item=>{return <Link to={`/user-page/view-experiments/${item.experimentID}`} className="text-decoration-none"><ExperimentCard {...item} /></Link>}));
            case 3:
                return (loading ? skelData.map(item => <Skeleton width="100%" height={250} />) : exp.filter((item) => { 
                    return getStatus(item.startDate, item.endDate) === "Completed"})
                    .map(item=>{return <Link to={`/user-page/view-experiments/${item.experimentID}`} className="text-decoration-none"><ExperimentCard {...item} /></Link>}));

            default:
                return exData.Experiments.map((item) => {
                    return <Link to={`/user-page/view-experiments/${item.experimentID}`} className="text-decoration-none"><ExperimentCard {...item} /></Link>
                });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get("https://cors-anywhere.herokuapp.com/https://easya.fyp2017.com/api/tmt/getAllExperiment");
                setExp(result.data.experiments)
                console.log(result.data.experiments)
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        };

        fetchData();
    }, [])

    return (
        <div className="vexp-container m-4 ">
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className="vexp-tabs"
            >
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Active" {...a11yProps(1)} />
                <Tab label="Draft" {...a11yProps(2)} />
                <Tab label="Completed" {...a11yProps(3)} />
            </Tabs>
            <div className="vexp-tabspanel">
                <TabPanel value={value} index={0}>
                    {genCards(0)}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {genCards(1)}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {genCards(2)}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {genCards(3)}
                </TabPanel>
            </div>
        </div>
    )
}



export default ViewExperiment;