import Link from 'next/link';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  BiCog, BiLogOut, BiMenu, BiUser
} from 'react-icons/bi';
import { signOutRequest } from '../lib/authRequest';

const Header = () => (
  <>
    <header className="user-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <nav className="navbar navbar-expand-lg navbar-light px-0 justify-content-between">
              <button type="button" className="nav-toggle">
                <BiMenu />
                <span>Toggle</span>
              </button>
              <div className="d-flex align-items-center" />
              <div className="dashboard-log">
                <div className="d-flex align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle className="bttn-small btn-blue" variant="link">
                      <BiUser />
                      Admin
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Link href="/admin/settings">
                        <a className="dropdown-item">
                          <BiCog />
                          Settings
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
