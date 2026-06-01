import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({ title, description, canonical, image, type = 'website', jsonLd }: SEOProps) => {
  const truncatedDesc = description.length > 160 ? description.slice(0, 157) + '…' : description;
  const truncatedTitle = title.length > 60 ? title.slice(0, 57) + '…' : title;

  return (
    <Helmet>
      <title>{truncatedTitle}</title>
      <meta name="description" content={truncatedDesc} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={truncatedTitle} />
      <meta property="og:description" content={truncatedDesc} />
      <meta property="og:type" content={type} />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={truncatedTitle} />
      <meta name="twitter:description" content={truncatedDesc} />
      {image && <meta name="twitter:image" content={image} />}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
