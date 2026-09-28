import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_ARTICLES, BlogArticle } from '../data/ipvsData';
import { InlineRegistrationForm } from '../components/common/InlineRegistrationForm';
import { 
  Calendar, 
  Clock, 
  Tag, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  CheckCircle2, 
  HelpCircle, 
  ChevronLeft,
  ChevronRight, 
  Building2, 
  Users, 
  Sparkles,
  ExternalLink,
  Maximize2,
  X,
  Play,
  Pause,
  Layers,
  Globe,
  ShieldCheck,
  MapPin,
  Compass
} from 'lucide-react';

// Helper to parse markdown links [label](url) and make them clickable
const renderFormattedText = (text: string) => {
  if (!text) return null;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const url = match[2];
    const isExternal = url.startsWith('http://') || url.startsWith('https://');

    if (isExternal) {
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1E65FF] hover:text-[#0048db] font-semibold underline underline-offset-2 transition-colors inline-flex items-center gap-0.5"
        >
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 inline-block shrink-0 opacity-70" />
        </a>
      );
    } else {
      parts.push(
        <Link
          key={match.index}
          to={url}
          className="text-[#1E65FF] hover:text-[#0048db] font-semibold underline underline-offset-2 transition-colors"
        >
          {label}
        </Link>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

const slideCaptions: Record<number, string> = {
  0: "Slide 1: Can a 50-Year-Old Factory Become an Industry 4.0 Factory?",
  1: "Slide 2: The Transformation — You Don't Always Need a New Factory",
  2: "Slide 3: The Proof — Siemens Kalwa Case Study (21s→9s, +35% Capacity, -86% Carbon)",
  3: "Slide 4: The Opportunity — Your Factory Could Be Next at IPVS 2026",
  4: "Slide 5: IPVS 2026 — 3–4 December 2026 HITEX Hyderabad • Visit & Exhibit"
};

interface BlogCarouselProps {
  images: string[];
  title: string;
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  return (
    <div className="space-y-3">
      {/* Carousel Container */}
      <div 
        className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-950 group select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Floating Action Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-2 pointer-events-auto">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 border border-white/10 shadow-lg">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Slide {currentIndex + 1} of {images.length}</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 pointer-events-auto">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                isAutoPlay 
                  ? 'bg-blue-600/90 border-blue-400 text-white shadow-lg' 
                  : 'bg-black/60 border-white/10 text-white/80 hover:text-white hover:bg-black/80'
              }`}
              title={isAutoPlay ? "Pause slideshow" : "Auto-play slideshow"}
              aria-label="Toggle auto-play"
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg"
              title="View fullscreen"
              aria-label="Fullscreen view"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Display */}
        <div 
          className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[16/10] max-h-[620px] flex items-center justify-center bg-slate-950 cursor-pointer overflow-hidden"
          onClick={() => setIsFullscreen(true)}
        >
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - Slide ${currentIndex + 1}`}
            className="w-full h-full object-contain transition-all duration-300"
            loading="eager"
          />
        </div>

        {/* Floating Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-transform active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-transform active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Slide Caption Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-10 text-white flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
          <p className="text-xs sm:text-sm font-medium text-slate-200 truncate max-w-full text-center sm:text-left">
            {slideCaptions[currentIndex] || `Visual Slide ${currentIndex + 1}`}
          </p>
          <div className="flex items-center space-x-1.5 shrink-0">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-[#1E65FF]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Thumbnail Strip */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3 pt-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-square bg-slate-900 ${
              idx === currentIndex
                ? 'border-[#1E65FF] ring-2 ring-blue-400 shadow-md scale-105'
                : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400'
            }`}
          >
            <img
              src={img}
              alt={`Slide ${idx + 1} thumbnail`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white">
              {idx + 1}
            </span>
          </button>
        ))}
      </div>

      <p className="text-[11px] text-slate-500 italic text-center pt-1">
        Interactive 5-slide visual carousel • Swipe, use arrow keys, or click to enlarge.
      </p>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 select-none"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Modal Header */}
          <div className="w-full max-w-5xl flex items-center justify-between text-white pb-3 z-30" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-0.5 text-left">
              <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                IPVS 2026 Visual Presentation • Slide {currentIndex + 1} of {images.length}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                {slideCaptions[currentIndex] || title}
              </h4>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Image Display */}
          <div 
            className="relative w-full max-w-5xl max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />

            {/* Left/Right Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 shadow-xl transition-transform active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 shadow-xl transition-transform active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Modal Thumbnail Indicators */}
          <div 
            className="w-full max-w-xl flex items-center justify-center gap-2 pt-4 z-30"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex ? 'border-[#1E65FF] scale-110' : 'border-white/20 opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface BlogDetailPageProps {
  onOpenModal?: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ onOpenModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find blog by slug or ID
  const blog = BLOG_ARTICLES.find(
    (b) => b.slug === slug || b.id === slug
  );

  // Recent/other articles for the editorial sidebar
  const recentArticles = BLOG_ARTICLES.filter((b) => b.id !== blog?.id).slice(0, 3);

  // Scroll to top on slug change and set document title & meta
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (blog) {
      document.title = `${blog.seoTitle || blog.title} | IPVS 2026`;

      // Helper function to update or create meta tags
      const setMetaTag = (property: string, content: string, isName = false) => {
        const attr = isName ? 'name' : 'property';
        let el = document.querySelector(`meta[${attr}='${property}']`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attr, property);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      setMetaTag('description', blog.metaDescription || blog.excerpt, true);
      setMetaTag('keywords', blog.tags.join(', '), true);
      setMetaTag('og:title', `${blog.seoTitle || blog.title} | IPVS 2026`);
      setMetaTag('og:description', blog.metaDescription || blog.excerpt);
      setMetaTag('og:image', blog.image.startsWith('http') ? blog.image : window.location.origin + blog.image);
      setMetaTag('og:url', window.location.href);
      setMetaTag('og:type', 'article');
      setMetaTag('twitter:card', 'summary_large_image', true);
      setMetaTag('twitter:title', `${blog.seoTitle || blog.title} | IPVS 2026`, true);
      setMetaTag('twitter:description', blog.metaDescription || blog.excerpt, true);
      setMetaTag('twitter:image', blog.image.startsWith('http') ? blog.image : window.location.origin + blog.image, true);

      // Canonical link
      let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', window.location.href);

      // Add JSON-LD Article + FAQ + Breadcrumbs Schema Graph for Google SEO
      const scriptId = 'blog-jsonld-schema';
      let schemaScript = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = scriptId;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }

      const allImages = blog.carouselImages && blog.carouselImages.length > 0
        ? blog.carouselImages.map(img => img.startsWith('http') ? img : window.location.origin + img)
        : [blog.image.startsWith('http') ? blog.image : window.location.origin + blog.image];

      const schemaData: any = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "TechArticle",
            "@id": `${window.location.href}#article`,
            "isPartOf": {
              "@type": "WebPage",
              "@id": window.location.href
            },
            "headline": blog.title,
            "description": blog.metaDescription || blog.excerpt,
            "image": allImages,
            "datePublished": "2026-02-12T08:00:00+05:30",
            "dateModified": new Date().toISOString(),
            "author": {
              "@type": "Organization",
              "name": blog.author,
              "url": "https://ipvs.in"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Industrial Pumps & Valves Show (IPVS 2026)",
              "logo": {
                "@type": "ImageObject",
                "url": "https://ipvs.in/wp-content/uploads/2024/10/ipvs_logo-150x150.jpg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": window.location.href
            },
            "keywords": blog.tags.join(", ")
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${window.location.href}#breadcrumb`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ipvs.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blogs & Insights",
                "item": "https://ipvs.in/blogs"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": blog.title,
                "item": window.location.href
              }
            ]
          }
        ]
      };

      if (blog.faq && blog.faq.length > 0) {
        schemaData["@graph"].push({
          "@type": "FAQPage",
          "@id": `${window.location.href}#faq`,
          "mainEntity": blog.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        });
      }

      schemaScript.text = JSON.stringify(schemaData);

      return () => {
        // Cleanup script if needed
        const existingScript = document.getElementById(scriptId);
        if (existingScript) existingScript.remove();
      };
    }
  }, [blog, slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || '');
    const summary = encodeURIComponent(blog?.excerpt || '');
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '_blank');
  };

  if (!blog) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#F4F7FE] text-slate-800 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl max-w-lg text-center space-y-5">
          <span className="px-3.5 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase">
            Article Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Blog Post Not Found
          </h1>
          <p className="text-slate-600 text-sm">
            The article you are looking for might have been moved or updated. Explore all current IPVS 2026 articles below.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#1E65FF] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="pt-24 pb-16 bg-[#F4F7FE] text-slate-800 min-h-screen selection:bg-[#1E65FF] selection:text-white">
      
      {/* 1. Top Editorial Banner - Inspired by Reference Design */}
      <header className="bg-gradient-to-r from-[#111183] to-[#0e89d0] text-white border-b border-white/10 overflow-hidden relative shadow-xl">
        <div className="max-w-[98%] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-medium text-blue-200/80 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
            <Link to="/blogs" className="hover:text-white transition-colors">Blogs & Insights</Link>
            <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-white font-bold truncate max-w-[200px] sm:max-w-md">{blog.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Headline Area */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center space-x-2">
                <span className="px-3.5 py-1 rounded-full bg-[#1E65FF] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  {blog.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-blue-100 text-[11px] font-semibold">
                  {blog.type === 'exhibitor' ? 'Exhibitor Strategy' : blog.type === 'technology' ? 'Technology Deep-Dive' : 'Visitor & Procurement'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading leading-tight tracking-tight">
                {blog.title}
              </h1>

              {blog.subtitle && (
                <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                  {blog.subtitle}
                </p>
              )}

              {/* Meta strip */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#1E65FF]" />
                  {blog.date}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-[#1E65FF]" />
                  {blog.readTime}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-blue-300 font-medium">IPVS 2026 Knowledge Series</span>
              </div>
            </div>

            {/* Right Hero Creative Image Thumbnail */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 group">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <span className="text-[11px] text-white/90 font-mono tracking-wide">
                    {blog.carouselImages && blog.carouselImages.length > 0 
                      ? `${blog.carouselImages.length}-Slide Interactive Presentation • IPVS 2026` 
                      : 'Official Creative Asset • IPVS Exhibition Series'}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </header>


      {/* 2. Editorial Pull Quote Strip */}
      <section className="bg-white border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-[98%] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 max-w-5xl">
            <div className="w-1.5 self-stretch bg-[#1E65FF] rounded-full shrink-0"></div>
            <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif italic font-medium text-[#0A192F] leading-snug sm:leading-relaxed text-left">
              "{blog.pullQuote || blog.excerpt}"
            </blockquote>
          </div>
        </div>
      </section>


      {/* 3. Main Body: 2-Column Editorial Grid (Left: Recent Articles / Right: Detailed Content) */}
      <main className="max-w-[98%] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
          
          {/* LEFT SIDEBAR: Recent Articles + Quick Event CTA (Matches Reference Screenshot Column) */}
          <aside aria-label="Sidebar" className="lg:col-span-4 order-2 lg:order-1 space-y-8">
            
            {/* Recent Articles Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold font-heading text-slate-900 uppercase tracking-wider">
                  Recent Articles
                </h3>
                <Link to="/blogs" className="text-xs font-bold text-[#1E65FF] hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-5">
                {recentArticles.map((article) => (
                  <div 
                    key={article.id}
                    onClick={() => navigate(`/blogs/${article.slug}`)}
                    className="flex items-start space-x-3.5 group cursor-pointer"
                  >
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:shadow-md transition-all"
                    />
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] font-bold text-[#1E65FF] uppercase">
                        {article.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1E65FF] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider pt-0.5">
                        READ MORE →
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Event Card */}
            <div className="bg-gradient-to-br from-[#0A192F] to-[#1E65FF] rounded-3xl p-6 text-white text-left space-y-4 shadow-xl">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
              <h4 className="text-lg font-extrabold font-heading">
                Exhibit or Source at IPVS 2026
              </h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Connect with 300+ industrial pump & valve manufacturers and 10,000+ vetted trade buyers at HITEX Exhibition Centre, Hyderabad.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <button
                  onClick={() => onOpenModal && onOpenModal('exhibitor')}
                  className="w-full py-3 px-4 rounded-xl bg-white text-[#0A192F] text-xs font-extrabold uppercase tracking-wider hover:bg-blue-50 transition-colors text-center shadow-md flex items-center justify-center space-x-2"
                >
                  <Building2 className="w-4 h-4 text-[#1E65FF]" />
                  <span>Book Exhibitor Stall</span>
                </button>
                <button
                  onClick={() => onOpenModal && onOpenModal('visitor')}
                  className="w-full py-3 px-4 rounded-xl bg-white/15 border border-white/30 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/25 transition-colors text-center flex items-center justify-center space-x-2"
                >
                  <Users className="w-4 h-4 text-white" />
                  <span>Get Free VIP Visitor Pass</span>
                </button>
              </div>
            </div>

            {/* Social Share Box */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm text-left space-y-3">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                Share This Insight
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLinkedInShare}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#0077B5] text-white text-xs font-bold flex items-center justify-center space-x-1.5 hover:opacity-90 transition-opacity"
                >
                  <span>Share on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleShare}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center space-x-1 transition-colors"
                  title="Copy link or share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
            </div>

          </aside>


          {/* RIGHT COLUMN: Full Magazine Article (Detailed Content, Sections, FAQs, SEO) */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-10 text-left">
            
            {/* Google Featured Snippet: Key Takeaways Box */}
            {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border-l-4 border-[#1E65FF] rounded-2xl p-6 space-y-3">
                <div className="flex items-center space-x-2 text-[#1E65FF]">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h3 className="text-sm font-extrabold uppercase tracking-wider font-heading">
                    Executive Key Takeaways (Quick Overview)
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                  {blog.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                      <span className="text-[#1E65FF] font-bold mt-0.5">•</span>
                      <span>{renderFormattedText(takeaway)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Visual Media: Interactive Carousel or High-Resolution Graphic */}
            {blog.carouselImages && blog.carouselImages.length > 0 ? (
              <BlogCarousel images={blog.carouselImages} title={blog.title} />
            ) : (
              <div className="space-y-2">
                <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
                  <img 
                    src={blog.image} 
                    alt={`${blog.title} - Official Technical Visual Graphic`}
                    className="w-full h-auto object-contain max-h-[600px] mx-auto"
                  />
                </div>
                <p className="text-[11px] text-slate-500 italic text-center">
                  Fig: Official creative infographic released for the {blog.title} industry brief.
                </p>
              </div>
            )}

            {/* Primary Introductory Prose */}
            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#1E65FF] first-letter:mr-3 first-letter:float-left first-letter:font-heading leading-relaxed">
                {renderFormattedText(blog.content)}
              </p>
            </div>

            {/* Semantic Sections (H2, H3, Bullet Points, Data Callout Quotes) */}
            {blog.sections && blog.sections.map((section, idx) => (
              <section key={idx} className="space-y-4 pt-4 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading leading-snug">
                  {section.heading}
                </h2>

                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {renderFormattedText(paragraph)}
                  </p>
                ))}

                {section.image && (
                  <div className="my-6 space-y-2">
                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 group">
                      <img
                        src={section.image}
                        alt={section.imageCaption || section.heading}
                        className="w-full h-auto max-h-[520px] object-cover mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    {section.imageCaption && (
                      <p className="text-xs text-slate-500 italic text-center font-medium">
                        {section.imageCaption}
                      </p>
                    )}
                  </div>
                )}

                {section.callout && (
                  <div className="my-5 p-5 rounded-2xl bg-slate-900 text-white border-l-4 border-cyan-400 text-sm font-semibold italic shadow-md">
                    "{renderFormattedText(section.callout)}"
                  </div>
                )}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2.5">
                    {section.bulletPoints.map((point, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#1E65FF] shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{renderFormattedText(point)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Featured Exhibitor & Product Showcase Hub */}
            {blog.companyInfo && (
              <div className="my-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-6 sm:p-8 border border-blue-500/20 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        Confirmed IPVS 2026 Exhibitor
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {blog.companyInfo.stallNumber} • {blog.companyInfo.hallName || 'HITEX Hyderabad'}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                      {blog.companyInfo.companyName}
                    </h3>
                    {blog.companyInfo.advisoryName && (
                      <p className="text-xs text-slate-300">
                        Advisory Leadership: <strong className="text-white">{blog.companyInfo.advisoryName}</strong> ({blog.companyInfo.advisoryRole})
                      </p>
                    )}
                  </div>

                  <a
                    href={blog.companyInfo.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>

                {/* Promoted Products Grid */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-400" />
                    Featured Industrial Products & Technical Solutions
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blog.companyInfo.products.map((prod, pIdx) => (
                      <a
                        key={pIdx}
                        href={prod.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 transition-all duration-300"
                      >
                        <div className="space-y-2">
                          {prod.badge && (
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-blue-500/20 text-blue-300">
                              {prod.badge}
                            </span>
                          )}
                          <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors flex items-start justify-between gap-1">
                            <span>{prod.name}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                            {prod.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/10 text-[11px] font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                          <span>Explore Product Specs</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Fallback Conversion Gateway to IPVS */}
                <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    to="/visitor"
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-600/30 to-blue-500/20 hover:from-blue-600/50 hover:to-blue-500/40 border border-blue-400/30 transition-all group"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-blue-300 tracking-wider block">
                        Meet {blog.companyInfo.companyName.split(' ')[0]} in Person
                      </span>
                      <strong className="text-xs sm:text-sm text-white font-bold block">
                        Get Free VIP Trade Visitor Pass
                      </strong>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>

                  <Link
                    to="/exhibitor"
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-500/20 hover:from-emerald-600/40 hover:to-teal-500/30 border border-emerald-400/30 transition-all group"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-emerald-300 tracking-wider block">
                        Exhibit in the Same Hall
                      </span>
                      <strong className="text-xs sm:text-sm text-white font-bold block">
                        Book Your IPVS Exhibition Stall
                      </strong>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>
                </div>
              </div>
            )}

            {/* Technical FAQ Section for Search Engine Snippets */}
            {blog.faq && blog.faq.length > 0 && (
              <section className="pt-6 border-t border-slate-200 space-y-5">
                <div className="flex items-center space-x-2 text-slate-900">
                  <HelpCircle className="w-5 h-5 text-[#1E65FF]" />
                  <h3 className="text-lg sm:text-xl font-extrabold font-heading">
                    Frequently Asked Procurement & Engineering Questions
                  </h3>
                </div>

                <div className="space-y-4">
                  {blog.faq.map((faqItem, fIdx) => (
                    <div key={fIdx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {faqItem.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {renderFormattedText(faqItem.answer)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Industrial Article Tags */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center">
                <Tag className="w-3.5 h-3.5 mr-1 text-[#1E65FF]" /> Tags:
              </span>
              {blog.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx} 
                  className="px-3 py-1 bg-slate-200/80 hover:bg-blue-100 text-slate-700 hover:text-[#1E65FF] rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  onClick={() => navigate(`/blogs?search=${encodeURIComponent(tag)}`)}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Bottom High-Converting Call-To-Action Banner */}
            <div className="bg-gradient-to-r from-[#111183] to-[#0e89d0] rounded-3xl p-8 text-white space-y-4 shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider inline-block">
                  Industrial Opportunity • IPVS 2026
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                  Position Your Brand in the Room
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Join 300+ exhibitors and meet 10,000+ EPC contractors, plant directors, and international procurement leaders at HITEX Hyderabad.
                </p>
              </div>

              <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => onOpenModal && onOpenModal(blog.ctaType || 'exhibitor')}
                  className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>{blog.ctaType === 'exhibitor' ? 'Reserve Exhibitor Stall' : 'Get Free Trade Visitor Pass'}</span>
                  <ArrowRight className="w-4 h-4 text-[#1E65FF]" />
                </button>
                <Link
                  to="/blogs"
                  className="px-6 py-2 rounded-xl text-center text-xs font-bold text-blue-200 hover:text-white transition-colors"
                >
                  Explore More Articles
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Universal Inline Form at bottom */}
        <div className="mt-14">
          <InlineRegistrationForm 
            title="Subscribe & Stay Updated on IPVS 2026 Blogs"
            subtitle="Receive technical whitepapers, exhibitor catalogues, and free VIP visitor passes directly in your inbox."
          />
        </div>

      </main>

    </article>
  );
};
