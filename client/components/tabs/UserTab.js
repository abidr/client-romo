import React, { useState } from 'react';
import {
  Col, Row, Tab
} from 'react-bootstrap';

const UserTab = ({
  title, description, defaultTab, children
}) => {
  const [tab, setTab] = useState(defaultTab || 0);
  return (
    <Row>
      <Col sm={3}>
        <h3 className="mb-30">{title}</h3>
        <p className="mb-30">{description}</p>
        <div className="nav-pills">
          {children?.map((child, index) => (
            <button
              key={child?.props?.name}
              className={`bttn-mid mb-10 btn-grad nav-link text-left w-100 ${tab === index ? 'active' : ''}`}
              onClick={() => setTab(index)}
              type="button"
            >
              {child?.props?.icon}
              {child?.props?.name}
            </button>
          ))}
        </div>
      </Col>
      <Col sm={9}>
        <Tab.Content>
          {children?.map((child, index) => (
            <div key={child?.props?.name} className={`tab-wrapper ${tab === index ? 'active' : 'not-active'}`}>
              {child?.props?.children}
            </div>
          ))}
        </Tab.Content>
      </Col>
    </Row>
  );
};

export default UserTab;
