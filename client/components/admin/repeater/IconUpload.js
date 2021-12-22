/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { imageUpload } from '../../../lib/settingsUpdate';

const IconUpload = ({ id, value, handleEdit }) => {
  const [actionLoader, setActionLoader] = useState(false);
  const handleUpload = async (e) => {
    const data = await imageUpload(e.target.files[0], setActionLoader);
    handleEdit(id, 'icon', data.path);
  };
  return (
    <div className="single-profile">
      <label>Icon</label>
      <div className="image-field">
        {value && (
        <div className="image-preview-icon">
          <img src={`/api/${value}`} alt="Icon" />
        </div>
        )}
        <input type="text" defaultValue={value} placeholder="Icon URL" disabled />
        <label className="bttn-mid btn-ylo" htmlFor="inputFile">
          {actionLoader ? <Spinner animation="border" role="status" size="sm" /> : 'Upload'}
        </label>
        <input id="inputFile" className="inputFile" type="file" onChange={handleUpload} />
      </div>
    </div>
  );
};

export default IconUpload;
