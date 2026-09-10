import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'event';
  schema?: Record<string, any>;
}

const DEFAULT_IMAGE = 'https://res.cloudinary.com/lh8mihme/image/upload/f_auto,q_auto/v1789032731/ipvs-website/hero_bg.jpg';
const SITE_NAME = 'IPVS 2026';
const BASE_URL = 'https://ipvs.in';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = "Discover cutting-edge industrial pumps, valves, and process automation systems at IPVS 2026. Connecting 100+ global exhibitors with 5,000+ buyers at HITEX Hyderabad.",
  keywords = "industrial pumps, valves exhibition, IPVS 2026, HITEX Hyderabad, Orbit Exhibitions, slurry pumps, chemical process valves, ethanol distillery pumps",
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  schema
}) => {
  useEffect(() => {
    // Title
    const fullTitle = title.includes('IPVS') ? title : `${title} | IPVS 2026`;
    document.title = fullTitle;

    // Helper to set or update meta tag
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}='${key}']`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // Canonical link
    const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : BASE_URL);
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // OpenGraph
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // Optional Schema JSON-LD
    let scriptEl = document.getElementById('page-seo-schema') as HTMLScriptElement | null;
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'page-seo-schema';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, keywords, canonical, image, type, schema]);

  return null;
};

export default SEO;
