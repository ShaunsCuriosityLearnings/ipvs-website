import React, { useEffect } from 'react';
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
  ChevronRight, 
  Building2, 
  Users, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

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

      // Update meta description
      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', blog.metaDescription || blog.excerpt);

      // Add JSON-LD Article Schema for Google SEO
      const scriptId = 'blog-jsonld-schema';
      let schemaScript = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = scriptId;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": blog.title,
        "description": blog.metaDescription || blog.excerpt,
        "image": [window.location.origin + blog.image],
        "datePublished": "2026-01-20T08:00:00+05:30",
        "dateModified": "2026-01-28T10:00:00+05:30",
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
        }
      };
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
                    Official Creative Asset • IPVS Exhibition Series
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </header>


      {/* 2. Editorial Author & Pull Quote Strip - Matched with User Screenshot */}
      <section className="bg-white border-b border-slate-200 py-8 sm:py-10">
        <div className="max-w-[98%] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Author Card (Left) */}
            <div className="lg:col-span-4 flex items-center space-x-4 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
              {blog.authorAvatar ? (
                <img 
                  src={blog.authorAvatar} 
                  alt={blog.author} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#1E65FF] shadow-md shrink-0" 
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] font-bold text-xl flex items-center justify-center border-2 border-[#1E65FF] shrink-0">
                  {blog.author.charAt(0)}
                </div>
              )}
              <div className="space-y-1 text-left">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Written by</p>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">{blog.author}</h3>
                <p className="text-xs text-slate-500 font-medium">{blog.authorRole}</p>
                <p className="text-[11px] text-blue-600 font-semibold">{blog.date} | HITEX Hyderabad</p>
              </div>
            </div>

            {/* Editorial Pull Quote (Right) - Large, High-Contrast Typography from Reference Screenshot */}
            <div className="lg:col-span-8 text-left pl-0 lg:pl-4">
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif italic font-semibold text-[#0A192F] leading-snug sm:leading-relaxed">
                "{blog.pullQuote || blog.excerpt}"
              </blockquote>
            </div>

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
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* High-Resolution Creative Visual Infographic */}
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

            {/* Primary Introductory Prose */}
            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#1E65FF] first-letter:mr-3 first-letter:float-left first-letter:font-heading leading-relaxed">
                {blog.content}
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
                    {paragraph}
                  </p>
                ))}

                {section.callout && (
                  <div className="my-5 p-5 rounded-2xl bg-slate-900 text-white border-l-4 border-cyan-400 text-sm font-semibold italic shadow-md">
                    "{section.callout}"
                  </div>
                )}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2.5">
                    {section.bulletPoints.map((point, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#1E65FF] shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

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
                        {faqItem.answer}
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
