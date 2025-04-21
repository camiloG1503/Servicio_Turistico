import { useState } from "react";

const PasswordInput = ({ value, onChange, placeholder, required = true }) => {
    const [visible, setVisible] = useState(false);

    return (
    <div className="mb-3 position-relative">
        <input
        type={visible ? "text" : "password"}
        className="form-control pe-5"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        />
        <i
        className={`bi ${visible ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3 text-secondary`}
        style={{ cursor: "pointer" }}
        onClick={() => setVisible(!visible)}
        ></i>
    </div>
    );
};

export default PasswordInput;