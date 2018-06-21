import * as React from 'react';
import { NewRecordsContainer } from '../../containers/new-records.container';
import './upload.layout.scss';

export const UploadLayout = () => {
  return (
    <div className="uploads">
      <NewRecordsContainer />
    </div>
  );
}
