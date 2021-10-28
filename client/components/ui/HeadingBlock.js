/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BiHeading } from 'react-icons/bi';
import { v1 as uuidv1 } from 'uuid';

const HeadingBlock = ({ data }) => (
  <div className="container mt-20 mb-10">
    <h3>{data?.content}</h3>
  </div>
);

export const HeadingBlockAdd = ({ handleAdd }) => {
  const label = 'Heading Block';
  const [active, setActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd({
      id: uuidv1(),
      label,
      component: 'HeadingBlock',
      data: {
        content: e.target?.content?.value
      }
    });
    setActive(false);
  };

  return (
    <>
      <button className="block-add" type="button" onClick={() => setActive(true)}>
        <BiHeading />
        {' '}
        {label}
      </button>
      <Modal
        show={active}
        onHide={() => setActive(false)}
        size="lg"
        centered
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              Add
              {' '}
              {label}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="settings-box">
              <div className="single-profile">
                <label>Content</label>
                <input
                  name="content"
                  type="text"
                  required
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="bttn-mid btn-grey" onClick={() => setActive(false)}>
              Close
            </button>
            <button type="submit" className="bttn-mid btn-ylo">
              Add
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default HeadingBlock;
