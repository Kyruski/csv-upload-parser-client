import axios from 'axios';
import React, { useState } from 'react';

const serverEndpoint = 'http://127.0.0.1:5000/'

const UploadInput = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);
  
  const validFileTypes = /.csv\b/;

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('File', file);
    const formHeaders = { headers: { 'Content-Type': 'multipart/form-data' }}

    axios.post(serverEndpoint + 'file', formData, formHeaders)
      .then(res => {
        console.log('We did it, ', res);
      })
      .catch(err => {
        console.log('we got an error, ', err);
      })
  }

  const changeHandler = (e) => {
    if (e.target.files[0].name.match(validFileTypes)) {
      setSelectedFile(e.target.files[0]);
      setIsFilePicked(true);
      setFileTypeError(false);
    } else {
      setFileTypeError(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('abc');
      uploadFile(selectedFile);
      setFileTypeError(false);
      setSelectedFile('');
      setIsFilePicked(false);
  }

  return (
    <form>
      <input type='file' name='file' onChange={changeHandler} />
      {isFilePicked ? (
        <div>
          <p>
            File Name: {selectedFile.name}
          </p>
          <p>
            File Type: {selectedFile.type}
          </p>
          <p>
            File Size in bytes: {selectedFile.size}
          </p>
          {/* <p>
            Last modified: {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p> */}
        </div>
      ) : null}
      {fileTypeError ? (
        <p style={{color: "red"}}>Only .csv files are accepted</p>
      ) : null}
      <button disabled={!isFilePicked} onClick={handleSubmit} > Upload </button>
    </form>
  )
}

export default UploadInput;