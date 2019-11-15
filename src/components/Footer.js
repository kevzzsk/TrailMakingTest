import React, { Component } from 'react';

import Link from "@material-ui/core/Link"

/** Footer for homepage */
class Footer extends Component {
  render() {
    return (
     
      <footer>
          <h3>TrailMakingTest by EasyA</h3>
          <p>Support <br/> TMT@easyA.com</p>
          <ul>
            <li><Link onClick={()=> window.open("https://www.facebook.com", "_blank")}><i className="fab fa-facebook-f"></i></Link></li>
            <li><Link onClick={()=> window.open("https://twitter.com", "_blank")}><i className="fab fa-twitter"></i></Link></li>
            <li><Link onClick={()=> window.open("https://www.instagram.com", "_blank")}><i className="fab fa-instagram"></i></Link></li>
            <li><Link onClick={()=> window.open("https://github.com", "_blank")}><i className="fab fa-github"></i></Link></li>
            <li><Link onClick={()=> window.open("https://linkedin.com", "_blank")}><i className="fab fa-linkedin"></i></Link></li>
          </ul>
      </footer>
      
    );
  }
}

export default Footer;