import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from './App';
import HomePage from './components/HomePage'
import BlogPage from './components/BlogPage'
import PersonalParticulars from './components/PersonalParticulars'
import ExperimentTest from './components/ExperimentTest';
import BlogData from './template/BlogData'
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Card} from '@material-ui/core/Card';
import { FormControl, TextField, CircularProgress } from "@material-ui/core"
import { MemoryRouter, Router } from "react-router-dom";
import {createMemoryHistory} from "history";

configure({adapter : new Adapter()});
function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 8000);
  });
}


describe("Routing", () => {
  it("404 error", ()=>{
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/anyrandomnonexistantpage']}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find("h3").text()).toMatch("404");
  });

  it("navigates to blog page", () =>{
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/blog']}>
        <App/>
      </MemoryRouter>
    );
    expect.assertions(2);
    expect(wrapper.find(BlogPage)).toHaveLength(1);
    expect(wrapper.find(HomePage)).toHaveLength(0);
  });

  it("navigates to blog page with simulated button click", async () =>{
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/']}>
        <App/>
      </MemoryRouter>
    );
    const blogLink = wrapper.find('a#blog');
    blogLink.simulate('click', {button:0});  
    jest.setTimeout(30000);    
    await tick();
    expect.assertions(2);
    expect(wrapper.find(BlogPage)).toHaveLength(1);
    expect(wrapper.find(HomePage)).toHaveLength(0);
  });

});

describe("Home Page", () => {
  it("Home Page Snapshot", () =>{
    const tree = renderer.create(<HomePage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Home Page loading state", async () => {
    const wrapper = mount(<HomePage/>);
    const submitBtn = wrapper.find('button#submitButton');
    expect(submitBtn).toHaveLength(1);
    submitBtn.simulate("submit");
    expect(wrapper.state("loading")).toEqual(true);
  });
  it("Home Page submission test error", async () => {
    const wrapper = mount(<HomePage/>);
    wrapper.setState({ id: 'test_id' });
    const fakeEvent = { preventDefault: () => {} };
    const experiment = wrapper.find("form#experiment_form");
    experiment.simulate("submit", fakeEvent);
    jest.setTimeout(30000);
    await tick(); //Delay for ten seconds to wait for response.
    wrapper.update();
    expect(wrapper.find(HomePage)).toHaveLength(1);
    expect(wrapper.state("error")).toMatch("valid ID");
   });

   it("Home Page submission success", async () => {
    const wrapper = mount(<HomePage/>);
    wrapper.setProps({history: []})
    wrapper.setState({ id: 'U0001' });
    const fakeEvent = { preventDefault: () => {} };
    const experiment = wrapper.find("form#experiment_form");
    experiment.simulate("submit", fakeEvent);
    jest.setTimeout(30000);
    await tick(); //Delay for ten seconds to wait for response.
    wrapper.update();
    expect(wrapper.prop("history")).toHaveLength(1);
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