const SectionWrapper = ({ children, className = "" }) => (
    <section className={`container py-5 ${className}`}>
        {children}
    </section>
    );

export default SectionWrapper;
