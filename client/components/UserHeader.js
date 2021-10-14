import Link from 'next/link';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  BiCog, BiLinkAlt, BiLogOut, BiUser
} from 'react-icons/bi';
import siteLogo from '../images/weblos-logo.png';
import { signOutRequest } from '../lib/authRequest';

const Header = () => (
  <>
    <header className="user-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <nav className="navbar navbar-expand-lg navbar-light px-0 justify-content-between">
              <div className="d-flex align-items-center">
                <a href="/" className="brand-logo">
                  <img src={siteLogo.src} alt="logo" />
                </a>
              </div>
              <div className="dashboard-log">
                <div className="d-flex align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle className="bttn-small btn-blue" variant="link">
                      <BiUser />
                      My Profile
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Link href="/settings">
                        <a className="dropdown-item">
                          <BiCog />
                          Settings
                        </a>
                      </Link>
                      <Link href="/settings?tab=2">
                        <a className="dropdown-item">
                          <BiLinkAlt />
                          Linked Accounts
                        </a>
                      </Link>
                      <Dropdown.Item onClick={() => signOutRequest()}>
                        <BiLogOut />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </>
);

export default Header;
