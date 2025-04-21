import React from 'react';

const ContactDetail = ({ icon, label, content }) => {
  return (
    <div className="contact-info-item">
      <div className="contact-icon">
        <i className={`bi bi-${icon}`}></i>
      </div>
      <div className="contact-info-content">
        <div className="contact-info-label">{label}</div>
        <div className="contact-info-text">
          {content.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < content.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;