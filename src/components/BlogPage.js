
import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Skeleton from "@material-ui/lab/Skeleton"

import BlogData from '../template/blogData'


/** Blog page for participants to learn more about dementia patient and help lines */
class BlogPage extends Component {

    /** @member */
    state = {
        activeStep: 10,
        steps: ["He/she should see a doctor for an assessment and diagnosis.",
        "Get some understanding about dementia. Your doctor can put you in touch with people who can help.",
        "Rally for support. Caring for people with dementia is challenging and can be exhausting both physically and emotionally. Learn to talk about your problems. Make sure that you get enough rest. Take care of your own physical and mental well-being.",
        "Group support is important. Meet with others who are also caring for people with dementia. Sharing provides mutual support for caregivers.",
        "Get expert advice especially with coping with challenging behaviour."],
        loading: false
    }

    /** Init Data */
    componentDidMount(){
        this.setState({loading:true})
        setTimeout(function() { //Start the timer
            this.setState({loading: false}) //After 1 second, set render to true
        }.bind(this), 1000)
    }

    /**
     * @method
     * @param {int} index index of ICON
     * @description return respective icon based on index
     */
    getIconLabel = (index)=>{
        switch (index) {
            case 1:
                return <i className="far fa-edit"/>
            case 2:
                return <i className="fas fa-info-circle"/>
            case 3:
                return <i className="fas fa-life-ring"/>
            case 4:
                return <i className="fas fa-users"/>
            case 5:
                return <i className="fas fa-user-md"/>
            default:
                break;
        }
    }

    /**
     * @method
     * @param {*} props 
     * @description return Icon
     * @returns {Object} Display ICON
     */
    ColorlibStepIcon =(props)=> {
      
        return (
          <div>
            {this.getIconLabel(props.icon)}
          </div>
        );
      }

    render() {
        return (
            <div className="blog-bg">
                <div>
                    <Typography className="m-3" variant="h3">Blog</Typography>
                    {this.state.loading? [1,2,3].map((item,i)=><Skeleton key={i} width="97%" height={460} className="m-3" />) :BlogData.map((blog, i) => {
                        return <Card key={i} className="m-3" >
                            <CardActionArea onClick={() => window.open(blog.webUrl, "_blank")}>
                                <img className="card-img-top" style={{ objectFit: "cover", height: "300px" }} src={blog.coverImage} alt="imagea" ></img>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {blog.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {blog.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                    </Button>
                                <Button size="small" color="primary" onClick={() => window.open(blog.webUrl, "_blank")}>
                                    Learn More
                                    </Button>
                            </CardActions>
                        </Card>
                    })})
                </div>
                <div className="m-2">
                    <Paper className="p-4">
                    <Typography variant="h4" style={{fontWeight:"bold",letterSpacing:"2px"}}>What can I do if someone I know is showing signs of dementia?</Typography>
                    <Stepper activeStep={this.state.activeStep} orientation="vertical">
                        {this.state.steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={this.ColorlibStepIcon} >{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    </Paper>
                    <Paper className="p-4 mt-3 card-left">
                        <i style={{fontSize:"40px",color:"rgb(248,107,70)"}} className="fas fa-phone-alt align-self-center"/>
                        <div className="ml-2">
                        <Typography variant="h5">HPB Dementia Infoline</Typography>
                        <Typography variant="h3" style={{color:"rgb(248,107,70)",fontWeight:"600"}}>1800 223 1123</Typography>
                        </div>
                    </Paper>
                    <Paper className="p-4 mt-3 card-left">
                        <i style={{fontSize:"40px",color:"rgb(248,107,70)"}} className="fas fa-phone-alt align-self-center"/>
                        <div className="ml-2">
                        <Typography variant="h5">Alzheimer's Disease Association Dementia Helpline</Typography>
                        <Typography variant="h3" style={{color:"rgb(248,107,70)",fontWeight:"600"}}>6377 0700</Typography>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}


export default BlogPage