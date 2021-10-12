/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Dropdown, Modal, Spinner } from 'react-bootstrap';
import useLinkeds from '../../data/useLinkeds';
import useMethods from '../../data/useMethods';
import useWallet from '../../data/useWallet';
import { createLinked } from '../../lib/linkedUpdate';

const LinkAccount = ({ show, handleClose }) => {
  const [currency, setCurrency] = useState();
  const [method, setMethod] = useState();
  const [params, setParams] = useState([]);
  const [actionLoader, setActionLoader] = useState(false);
  const { data } = useWallet();
  const { data: methods } = useMethods();
  const { data: linkedAcc } = useLinkeds();

  useEffect(() => {
    setMethod('');
    setParams([]);
  }, [currency]);

  useEffect(() => {
    const arr = [];
    method?.params?.map((methodObj) => arr.push({ name: methodObj?.name, value: null }));
    setParams(arr);
  }, [method]);

  const inputChange = (e, field) => {
    const arr = params;
    const findIndex = arr.findIndex((param) => param.name === field);
    arr[findIndex].value = e.target.value;
    setParams(arr);
  };

  const submitLinked = (e) => {
    e.preventDefault();
    createLinked(params, method?.id, setActionLoader);
    setCurrency();
    setMethod();
    handleClose();
  };

  const methodExistChecker = (methodId) => {
    const findExistingMethod = linkedAcc?.data?.find((acc) => acc?.method?.id === methodId);
    if (findExistingMethod) {
      return true;
    }
    return false;
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
    >
      <form onSubmit={submitLinked}>
        <Modal.Header closeButton>
          <Modal.Title>
            Link New Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="settings-box">
            <div className="single-profile">
              <label htmlFor="curSelector">Wallet</label>
              <Dropdown id="curSelector">
                <Dropdown.Toggle className="bttn-small btn-emt dropdown-method" variant="link">
                  {currency || 'Please Select'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {data?.map((wallet) => (
                    <Dropdown.Item
                      key={wallet?.currency}
                      onClick={() => setCurrency(wallet?.currency)}
                    >
                      {wallet?.currency}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {currency && (
            <div className="single-profile">
              <label htmlFor="methodSelector">Withdraw Method</label>
              <Dropdown id="methodSelector">
                <Dropdown.Toggle className="bttn-small btn-emt dropdown-method" variant="link">
                  {method?.name || 'Please Select'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {methods?.data?.map((methodData) => {
                    if (!(methodData?.currency === currency)) {
                      return <></>;
                    } if (methodExistChecker(methodData?.id)) {
                      return <></>;
                    }
                    return (
                      <Dropdown.Item
                        key={methodData?.name}
                        onClick={() => setMethod(methodData)}
                      >
                        {methodData?.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            )}
            {method?.params?.map((field, index) => (
              <div className="single-profile" key={field?.name}>
                <label htmlFor={index}>{field?.name}</label>
                <input
                  id={index}
                  name={index}
                  type={field?.type}
                  required={field?.required}
                  autoComplete={`${field?.name}-${index}`}
                  onChange={(e) => inputChange(e, field?.name)}
                />
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="bttn-mid btn-grey" onClick={handleClose}>
            Close
          </button>
          <button type="submit" className="bttn-mid btn-ylo">
            {actionLoader ? (
              <>
                <Spinner animation="border" role="status" size="sm" />
                {' '}
                Submit
              </>
            ) : (
              <>
                Submit
              </>
            )}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default LinkAccount;
