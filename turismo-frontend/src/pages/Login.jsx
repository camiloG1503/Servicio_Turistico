import LoginForm from "../components/Auth/LoginForm";
import SectionWrapper from "../components/UI/SectionWrapper";
import PageHeader from "../components/UI/PageHeader";

const Login = () => (
    <SectionWrapper>
    <PageHeader
        iconClass="bi-box-arrow-in-right"
        title="Bienvenido"
        subtitle="Inicia sesión para continuar explorando nuestros destinos turísticos."
    />
    <LoginForm />
    </SectionWrapper>
);

export default Login;