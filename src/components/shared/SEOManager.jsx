import { Helmet } from 'react-helmet';

const SEOManager = ({ title, description }) => {
  const defaultTitle = 'Real Estate Premium | Encuentra tu hogar ideal';
  const defaultDesc = 'Plataforma líder en bienes raíces de lujo con integración de Supabase y diseño ultra moderno.';

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEOManager;
