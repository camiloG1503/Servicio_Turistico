const PageHeader = ({ iconClass, title, subtitle }) => (
    <div className="text-center mb-4">
        {iconClass && <i className={`bi ${iconClass} text-primary fs-2 mb-2`}></i>}
        <h2 className="display-5 text-primary">{title}</h2>
        {subtitle && <p className="text-muted">{subtitle}</p>}
    </div>
    );

export default PageHeader;
