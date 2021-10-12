/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { BiShow, BiTrash } from 'react-icons/bi';
import { removeLinked } from '../../lib/linkedUpdate';

const LinkedCard = ({ account }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteInit = () => {
    confirmAlert({
      title: `${account?.method?.name} - ${account?.method?.currency}`,
      message: 'Are you sure to remove your linked account?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeLinked(account?.id)
        },
        {
          label: 'No',
        }
      ]
    });
  };
  return (
    <>
      <div className="linked-card">
        <div className="info">
          <h4>
            {account?.method?.name}
          </h4>
          <h5>{account?.method?.currency}</h5>
        </div>
        <div className="action">
          <button
            type="button"
            onClick={() => handleShow()}
          >
            <BiShow />
          </button>
          <button
            type="button"
            onClick={() => deleteInit()}
          >
            <BiTrash />
          </button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {account?.method?.name}
            {' '}
            (
            {account?.method?.currency}
            )
            {' '}
            Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="settings-box">
            {account?.params?.map((field, index) => (
              <div className="single-profile" key={field?.name}>
                <label htmlFor={index}>{field?.name}</label>
                <input
                  id={index}
                  name={index}
                  type="text"
                  disabled
                  defaultValue={field?.value}
                  autoComplete={`${field}-${index}`}
                />
              </div>
            ))}
          </div>
          <p>To update information please remove the linked account first then add it again.</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LinkedCard;
