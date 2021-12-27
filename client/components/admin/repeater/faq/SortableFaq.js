/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FiEdit, FiGrid, FiTrash } from 'react-icons/fi';

export default function SortableFaq({
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
          <p>{children?.title}</p>
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
        animation={false}
      >
        <form>
          <Modal.Header closeButton>
            <Modal.Title>
              Edit Solution
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="settings-box">
              <div className="single-profile">
                <label htmlFor="serTitle">Title</label>
                <input
                  id="serTitle"
                  name="title"
                  type="text"
                  required
                  defaultValue={children?.title}
                  onChange={(e) => handleEdit(children.id, 'title', e.target.value)}
                />
              </div>
              <div className="single-profile">
                <label htmlFor="serContent">Content</label>
                <input
                  id="serContent"
                  name="content"
                  type="text"
                  required
                  defaultValue={children?.content}
                  onChange={(e) => handleEdit(children.id, 'content', e.target.value)}
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
