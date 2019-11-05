import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from './App';
import HomePage from './components/HomePage'
import BlogPage from './components/BlogPage'
import PersonalParticulars from './components/PersonalParticulars'
import BlogData from './template/BlogData'
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Card} from '@material-ui/core/Card';
import {FormControlLabel} from "@material-ui/core/FormControlLabel"


configure({adapter : new Adapter()});
function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 7000);
  });
}

describe("Home Page", () => {
  it("Home Page Snapshot", () =>{
    const tree = renderer.create(<HomePage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Home Page Animation", () => {
    const wrapper = shallow(<HomePage/>);
    const submitBtn = wrapper.find('button#submitButton');
    submitBtn.simulate('click');
    const animation = wrapper.find('CircularProgress.button-loading');
    expect(animation).not.toEqual(undefined);
  });
  it("Home Page submission with wrong id", async () => {
    const wrapper = shallow(<HomePage/>);
    const submitBtn = wrapper.find('button#submitButton');
    wrapper.setState({ id: 'fake_test' });
    //console.log(wrapper.state());
    const fakeEvent = { preventDefault: () => {} };
    wrapper.find("form#experiment_form").simulate("submit", fakeEvent);
    jest.setTimeout(30000);
    await tick(); //Delay for ten seconds to wait for response.
    //console.log(wrapper.state());
    expect(wrapper.state("error")).toMatch("valid ID");
   });
});

describe("blog page", () => {
  it("Rendering static blog page", ()=>{
    const tree = renderer.create(<BlogPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Number of blog pages in blog data", ()=>{
    expect(BlogData).toHaveLength(7);
  });

  it("Loading blog data", async ()=>{
    const wrapper = mount(<BlogPage/>);
    jest.setTimeout(30000);
    await tick();
    wrapper.update();
    let cardArr = wrapper.find("div.blogpost");
    console.log(cardArr);
    expect(cardArr).toHaveLength(BlogData.length);
    
    });
  }
);