const Footer = () => {
  return (
    <footer className="mt-24 border-t border-glass-border bg-secondary/20 py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <h4 className="text-2xl font-bold mb-4">ESTATE PREM</h4>
          <p className="text-muted max-w-sm">Elevando los estándares de la industria inmobiliaria con tecnología de vanguardia y diseño centrado en el usuario.</p>
        </div>
        <div>
          <h5 className="font-bold mb-4">Plataforma</h5>
          <ul className="text-muted space-y-2">
            <li><a href="#" className="hover:text-white">Explorar</a></li>
            <li><a href="#" className="hover:text-white">Admin Dashboard</a></li>
            <li><a href="#" className="hover:text-white">API Docs</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-4">Legal</h5>
          <ul className="text-muted space-y-2">
            <li><a href="#" className="hover:text-white">Privacidad</a></li>
            <li><a href="#" className="hover:text-white">Términos</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
