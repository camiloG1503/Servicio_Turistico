const SpinnerCentered = ({ text = "Cargando..." }) => (
    <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">{text}</p>
    </div>
    );

export default SpinnerCentered;  
