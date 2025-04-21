import RegisterForm from "../components/Auth/RegisterForm";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";

const Register = () => (
    <SectionWrapper>
    <PageHeader
        iconClass="bi-person-plus-fill"
        title="Crea tu cuenta"
        subtitle="Únete a Elite Tours y empieza tu próxima aventura con nosotros."
    />
    <RegisterForm />
    </SectionWrapper>
);

export default Register;