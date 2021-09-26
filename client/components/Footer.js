import React from 'react';

const Footer = () => (
  <>
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-sm-12 order-xl-1 order-2">
            <div className="copyright">
              <p>Copyright &copy; All Rights Reserved Weblos 2021.</p>
            </div>
          </div>
          <div className="col-xl-6 col-sm-12 order-xl-2 order-1">
            <div className="footer-menu">
              <ul>
                <li><a href="/#">About</a></li>
                <li><a href="/#">Contact</a></li>
                <li><a href="/#">Privacy Policy</a></li>
                <li><a href="/#">Terms and Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
