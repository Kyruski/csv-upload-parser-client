import React, { useState } from 'react';


const UploadInput = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);
  
  const validFileTypes = /.csv\b/;

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
    if (isFilePicked) {
      console.log(selectedFile);
      const formData = new FormData();
  
      formData.append('File', selectedFile);
    }
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
      <button disabled={isFilePicked} onClick={handleSubmit} > Upload </button>
    </form>
  )
}

export default UploadInput;