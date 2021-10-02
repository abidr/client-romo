import Link from 'next/link';
import React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Headroom from 'react-headroom';
import { BiUserPlus } from 'react-icons/bi';
import { RiDashboardLine } from 'react-icons/ri';
import useCheckAuth from '../data/useCheckAuth';
import siteLogo from '../images/weblos-logo.png';

const SiteHeader = () => {
  const { data, loading } = useCheckAuth();
  return (
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
                      {loading ? (
                        <Link href="/">
                          <a className="bttn-small btn-ylo header-btn" style={{ minWidth: '140px', textAlign: 'center' }}>
                            <Spinner animation="border" role="status" size="sm">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>
                          </a>
                        </Link>
                      ) : (
                        <Link href={data ? '/dashboard' : '/login'}>
                          <a className="bttn-small btn-ylo header-btn">
                            {data ? <RiDashboardLine /> : <BiUserPlus />}
                            {data ? 'Dashboard' : 'Login/Register'}
                          </a>
                        </Link>
                      )}
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
};

export default SiteHeader;
