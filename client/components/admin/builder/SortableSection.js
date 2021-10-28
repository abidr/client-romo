/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FiEdit, FiGrid, FiTrash } from 'react-icons/fi';

export default function SortableSection({
  dragging,
  dragged,
  children,
  handleDelete,
  handleEdit,
  ...rest
}) {
  const [active, setActive] = useState(false);
  const handleClose = () => setActive(false);
  return (
    <>
      <div
        {...rest}
        className={`menu-builder ${dragged ? 'is-dragging' : ''} ${active ? 'active' : ''}`}
      >
        <div className="builder-content">
          <FiGrid />
          <p>{children.label}</p>
        </div>
        <div className="d-flex">
          <button
            type="button"
            onClick={() => setActive(true)}
            className="action-btn"
          >
            <FiEdit />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(children.id)}
            className="action-btn danger ml-10"
          >
            <FiTrash />
          </button>
        </div>
      </div>
      <Modal
        show={active}
        onHide={handleClose}
        size="lg"
        centered
      >
        <form>
          <Modal.Header closeButton>
            <Modal.Title>
              Edit Menu
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="settings-box">
              <div className="single-profile">
                <label htmlFor="menuName">Name</label>
                <input
                  id="menuName"
                  name="name"
                  type="text"
                  required
                  defaultValue={children.name}
                  onChange={(e) => handleEdit(children.id, 'name', e.target.value)}
                />
              </div>
              <div className="single-profile">
                <label htmlFor="menuUrl">URL</label>
                <input
                  id="menuUrl"
                  name="url"
                  type="text"
                  required
                  defaultValue={children.url}
                  onChange={(e) => handleEdit(children.id, 'url', e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="bttn-mid btn-grey" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
