import React from 'react'
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Button, Box, makeStyles } from '@material-ui/core'
import { fontSize } from '@material-ui/system';
import {Link} from 'react-router-dom'

import exData from '../template/exData'
import ExperimentCard from './ExperimentCard'

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



function ViewExperiment() {
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function genCards(index) {
        switch (index) {
            case 0:
                return exData.Experiments.map((item) => {
                    return <Link to={`/user-page/view-experiments/${item.experimentID}`} className="text-decoration-none"><ExperimentCard title={item.title} subheader={item.experimentID} description={item.description} /></Link>
                });
                break;
            case 1:
                return exData.Experiments.filter((item) => { return item.status === "Active" }).map((item) => {
                    return <Link to={`/user-page/view-experiments/${item.experimentID}`} className="text-decoration-none"><ExperimentCard title={item.title} subheader={item.experimentID} description={item.description} /></Link>
                });
                break;
            case 2:
                return exData.Experiments.filter((item) => { return item.status === "Draft" }).map((item) => {
                    return <Link to={`/user-page/view-experiments/${item.experimentID}`} className="text-decoration-none"><ExperimentCard title={item.title} subheader={item.experimentID} description={item.description} /></Link>
                });
                break;
            case 3:
                return exData.Experiments.filter((item) => { return item.status === "Completed" }).map((item) => {
                    return <Link to={`/user-page/view-experiments/${item.experimentID}`} className="text-decoration-none"><ExperimentCard title={item.title} subheader={item.experimentID} description={item.description} /></Link>
                });
                break;

            default:
                return exData.Experiments.map((item) => {
                    return <Link to={`/user-page/view-experiments/${item.experimentID}`} className="text-decoration-none"><ExperimentCard title={item.title} subheader={item.experimentID} description={item.description} /></Link>
                });
                break;
        }
    }

    return (
        <div className="vexp-container m-4 ">
            <Link to="/user-page"><Button variant="contained" className="vexp-btn">Back</Button></Link>
            <Typography variant="h3" className="vexp-title">View Experiment</Typography>
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