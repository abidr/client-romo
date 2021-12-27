/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Modal } from 'react-bootstrap';
import pageAdd from '../../../lib/pageUpdate';

const AddPage = ({ active, setActive }) => {
  const handleClose = () => setActive(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      name: e.target?.name?.value,
      slug: e.target?.slug?.value,
      type: 'landing',
      content: []
    };
    pageAdd(params);
    handleClose();
  };

  return (
    <Modal
      show={active}
      onHide={handleClose}
      size="lg"
      centered
      animation={false}
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add New Page
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="settings-box">
            <div className="single-profile">
              <label htmlFor="pageName">Name</label>
              <input
                id="pageName"
                name="name"
                type="text"
                required
              />
            </div>
            <div className="single-profile">
              <label htmlFor="pageSlug">Slug</label>
              <input
                id="pageSlug"
                name="slug"
                type="text"
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="bttn-mid btn-grey" onClick={handleClose}>
            Close
          </button>
          <button type="submit" className="bttn-mid btn-ylo">
            Submit
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddPage;
