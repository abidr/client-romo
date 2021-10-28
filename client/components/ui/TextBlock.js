/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BiText } from 'react-icons/bi';
import { v1 as uuidv1 } from 'uuid';

const TextBlock = ({ data }) => (
  <div className="container mt-20 mb-10">
    <p>{data?.content}</p>
  </div>
);

export const TextBlockAdd = ({ handleAdd }) => {
  const label = 'Text Block';
  const [active, setActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd({
      id: uuidv1(),
      label,
      component: 'TextBlock',
      data: {
        content: e.target?.content?.value
      }
    });
    setActive(false);
  };

  return (
    <>
      <button className="block-add" type="button" onClick={() => setActive(true)}>
        <BiText />
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
                <textarea
                  name="content"
                  className="input-box"
                  type="text"
                  row={10}
                  style={{width: '100%', height: '100px', paddingTop: '10px'}}
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

export default TextBlock;
