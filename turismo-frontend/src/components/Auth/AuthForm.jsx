import React from "react";
import "./AuthForm.css";

const AuthForm = ({ title, children, onSubmit }) => (
    <div className="auth-form-wrapper container py-5">
    <div className="card auth-form-card p-4 shadow mx-auto">
        <h2 className="text-center mb-4 text-primary fw-bold">{title}</h2>
        <form onSubmit={onSubmit}>
        {children}
        <div className="d-grid mt-3">
            <button type="submit" className="btn btn-form-primary">
            {title}
            </button>
        </div>
        </form>
    </div>
    </div>
);

export default AuthForm;