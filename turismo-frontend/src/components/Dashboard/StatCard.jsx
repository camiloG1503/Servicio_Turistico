import "./StatCard.css";

const StatCard = ({ title, value, icon, color = "primary", onClick, active }) => {
    const colorMap = {
        primary: "text-white bg-primary",
        success: "text-white bg-success",
        danger: "text-white bg-danger",
        dark: "text-white bg-dark",
        info: "text-white bg-info",
        warning: "text-dark bg-warning"
    };

    return (
        <div 
            className={`stat-card ${colorMap[color]} ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            <div className="stat-icon">
                <i className={`bi ${icon}`}></i>
            </div>
            <div className="stat-info">
                <h6 className="stat-title">{title}</h6>
                <h3 className="stat-value">{value}</h3>
                <div className="stat-footer">
                    <span>Ver detalles <i className="bi bi-arrow-right-short"></i></span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;