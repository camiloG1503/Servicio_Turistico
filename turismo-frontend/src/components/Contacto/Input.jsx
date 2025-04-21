import React from 'react';

const Input = ({ type, placeholder, required, icon }) => {
  return (
    <div className="form-group position-relative mb-3">
      {icon && (
        <i className={`bi bi-${icon} position-absolute start-0 top-0 mt-2 ms-3`}></i>
      )}
      <input 
        type={type} 
        placeholder={placeholder} 
        required={required} 
        className="form-control ps-5" 
        style={{ paddingLeft: icon ? '2.5rem' : '1rem' }}
      />
    </div>
  );
};

export default Input;