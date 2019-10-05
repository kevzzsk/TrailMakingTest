import React, { Component } from 'react';


class Footer extends Component {
  render() {
    return (
     
      <footer>
          <h3>TrailMakingTest by EasyA</h3>
          <p>Support <br/> TMT@easyA.com</p>
          <ul>
            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-github"></i></a></li>
            <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
          </ul>
      </footer>
      
    );
  }
}

export default Footer;