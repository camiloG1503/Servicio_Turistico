import React from 'react';

const Textarea = ({ placeholder, required, rows }) => {
  return (
    <div className="form-group mb-3">
      <textarea 
        placeholder={placeholder} 
        required={required} 
        rows={rows} 
        className="form-control" 
      />
    </div>
  );
};

export default Textarea;