import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import DatasetView from "./DatasetView"

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

function DatasetViews(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const genTabs = () => {
        return props.data.templateExperiments.map((item, i) => <Tab fullWidth key={i} label={item.heading} />)
    }

    const genPanel = () => {
        return props.data.templateExperiments.map((item, i) => <TabPanel key={i} value={value} index={i}>
            <DatasetView data={props.data} index={i} />
        </TabPanel>)
    }

    return (
        <div>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    {genTabs()}
                </Tabs>
                {genPanel()}
            </Paper>


        </div>
    );
}

export default DatasetViews