// src/components/Informacion/ContenidoInfo.jsx
import SobreNosotros from "./SobreNosotros";
import OpcionesPago from "./OpcionesPago";
import Reembolso from "./Reembolso";
import PoliticasPrivacidad from "./PoliticasPrivacidad";

const ContenidoInfo = () => (
    <div className="informacion-grid">
        <SobreNosotros />
        <OpcionesPago />
        <Reembolso />
        <PoliticasPrivacidad />
    </div>
);

export default ContenidoInfo;