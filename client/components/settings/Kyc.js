/* eslint-disable jsx-a11y/label-has-associated-control */
import cogoToast from 'cogo-toast';
import React, { useState } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import { BiErrorCircle } from 'react-icons/bi';
import ImageUploading from 'react-images-uploading';
import useKyc from '../../data/useKyc';
import kycUpdate, { kycResubmit } from '../../lib/kycUpdate';
import Loader from '../Loader';

const Kyc = () => {
  const [type, setType] = useState('nid');
  const [front, setFront] = useState();
  const [back, setBack] = useState();
  const [selfie, setSelfie] = useState();
  const [actionLoader, setActionLoader] = useState(false);

  const { data, loading } = useKyc();

  if (loading) {
    return <Loader height="300px" />;
  }

  const typePicker = (typeDoc) => {
    if (typeDoc === 'nid') {
      return 'National Identity Card';
    } if (typeDoc === 'passport') {
      return 'Passport';
    } if (typeDoc === 'driving') {
      return 'Driving License';
    }
    return null;
  };

  const handleSubmit = () => {
    if (!front) {
      return cogoToast.error('Please upload front side', { position: 'bottom-center' });
    } if (!selfie) {
      return cogoToast.error('Please upload your selfie', { position: 'bottom-center' });
    } if (!(type === 'passport') && !back) {
      return cogoToast.error('Please upload back side', { position: 'bottom-center' });
    }
    kycUpdate({
      type, front, back, selfie
    }, setActionLoader);
    return null;
  };

  const handleResubmit = () => {
    kycResubmit(setActionLoader);
    return null;
  };

  return (
    <div className="basic-card">
      <h4 className="box-title">KYC</h4>
      <div className="settings-box">
        <p>
          Status:
          {' '}
          <strong
            className={`status ${data?.status === 'declined' ? 'danger' : 'success'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {data?.status || 'Awaiting Submission'}
          </strong>
        </p>
        {!(data?.status) ? (
          <>
            <div className="single-profile">
              <label htmlFor="documentSelector">Document Type</label>
              <Dropdown id="documentSelector">
                <Dropdown.Toggle className="bttn-small btn-emt dropdown-kyc" variant="link">
                  {typePicker(type)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setType('nid')}>
                    National Identity Card
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setType('passport')}>
                    Passport
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setType('driving')}>
                    Driving License
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="single-profile">
              <label>Front Side</label>
              <ImageUploading
                value={front}
                onChange={setFront}
                acceptType={['jpg', 'png', 'jpeg']}
              >
                {({
                  imageList,
                  onImageUpload,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <button
                      type="button"
                      className="kyc-upload-button"
                      style={isDragging ? { background: '#0d3b66' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      {imageList.length <= 0 ? 'Click or Drop Here (Front Side)' : (
                        imageList.map((image) => (
                          <div key={image.dataURL} className="image-item">
                            <img src={image.dataURL} alt="" width="100%" />
                          </div>
                        ))
                      )}
                    </button>
                  </div>
                )}
              </ImageUploading>
            </div>
            {!(type === 'passport') ? (
              <div className="single-profile">
                <label>Back Side</label>
                <ImageUploading
                  value={back}
                  onChange={setBack}
                  acceptType={['jpg', 'png', 'jpeg']}
                >
                  {({
                    imageList,
                    onImageUpload,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <button
                        type="button"
                        className="kyc-upload-button"
                        style={isDragging ? { background: '#0d3b66' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        {imageList.length <= 0 ? 'Click or Drop Here (Back Side)' : (
                          imageList.map((image) => (
                            <div key={image.dataURL} className="image-item">
                              <img src={image.dataURL} alt="" width="100%" />
                            </div>
                          ))
                        )}
                      </button>
                    </div>
                  )}
                </ImageUploading>
              </div>
            ) : (<></>)}
            <div className="single-profile">
              <label>Selfie</label>
              <ImageUploading
                value={selfie}
                onChange={setSelfie}
                acceptType={['jpg', 'png', 'jpeg']}
              >
                {({
                  imageList,
                  onImageUpload,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <button
                      type="button"
                      className="kyc-upload-button-selfie"
                      style={isDragging ? { background: '#0d3b66' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      {imageList.length <= 0 ? 'Click or Drop Here (Selfie)' : (
                        imageList.map((image) => (
                          <div key={image.dataURL} className="image-item">
                            <img src={image.dataURL} alt="" width="100%" />
                          </div>
                        ))
                      )}
                    </button>
                  </div>
                )}
              </ImageUploading>
            </div>
            <button onClick={() => handleSubmit()} type="button" className="bttn-mid btn-ylo" disabled={actionLoader}>
              {actionLoader ? (
                <>
                  <Spinner animation="border" role="status" size="sm" />
                  {' '}
                  Submit KYC
                </>
              ) : (
                <>
                  <BiErrorCircle />
                  Submit KYC
                </>
              )}
            </button>
          </>
        ) : (
          <>
            {data?.status === 'declined' ? (
              <>
                <p>Your submitted document is not valid. Please resubmit all of your documents.</p>
                <button onClick={() => handleResubmit()} type="button" className="bttn-mid btn-ylo" disabled={actionLoader}>
                  {actionLoader ? (
                    <>
                      <Spinner animation="border" role="status" size="sm" />
                      {' '}
                      Resubmit KYC
                    </>
                  ) : (
                    <>
                      <BiErrorCircle />
                      Resubmit KYC
                    </>
                  )}
                </button>
              </>
            ) : (
              <p>
                Thanks for submitting your KYC. We&apos;ll look into your
                documents and if everything is valid we&apos;ll approve your application.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Kyc;
