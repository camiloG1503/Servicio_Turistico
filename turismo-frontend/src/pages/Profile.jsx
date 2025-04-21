import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";
import ProfileForm from "../components/Profile/ProfileForm";

const Profile = () => {
    const { usuario } = useAuth();

    if (!usuario) return <Navigate to="/login" />;

    return (
        <SectionWrapper>
            <PageHeader
                iconClass="bi-person-fill"
                title="Mi Perfil"
                subtitle="Actualiza tu información personal y configuración de cuenta"
            />
            <div className="row justify-content-center">
                <div className="col-12">
                    <ProfileForm />
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Profile;