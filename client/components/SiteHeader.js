import Link from 'next/link';
import React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import Headroom from 'react-headroom';
import { BiUserPlus } from 'react-icons/bi';
import siteLogo from '../images/weblos-logo.png';

const SiteHeader = () => (
  <>
    <Headroom>
      <header className="site-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <Navbar expand="lg">
                <Navbar.Brand href="/" className="site-logo">
                  <Image src={siteLogo.src} alt="Weblos" />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                  <Nav className="ml-auto mainmenu">
                    <Link href="/"><a className="nav-link">Home</a></Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#howitworks">How it works</Nav.Link>
                    <Nav.Link href="#faq">Faq</Nav.Link>
                    <Nav.Link href="#contact">Contact</Nav.Link>
                    <Link href="/login">
                      <a className="bttn-small btn-ylo header-btn">
                        <BiUserPlus />
                        Login/Register
                      </a>
                    </Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </div>
      </header>
    </Headroom>
  </>
);

export default SiteHeader;
