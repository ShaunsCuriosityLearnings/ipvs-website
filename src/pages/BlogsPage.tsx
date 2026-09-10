import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { BLOG_ARTICLES, BlogArticle } from '../data/ipvsData';
import { InlineRegistrationForm } from '../components/common/InlineRegistrationForm';
import { PastExhibitionGallery } from '../components/common/PastExhibitionGallery';
import { Calendar, Clock, User, Search, Tag, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { SEO } from '../components/common/SEO';

interface BlogsPageProps {
  onOpenModal?: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onOpenModal }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [activeType, setActiveType] = useState<'all' | 'exhibitor' | 'visitor' | 'technology'>('all');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  const featuredBlog = BLOG_ARTICLES[0];

  const filteredBlogs = BLOG_ARTICLES.filter(blog => {
    const matchesType = activeType === 'all' || blog.type === activeType;
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="pt-24 pb-12 bg-[#F4F7FE] text-slate-800 min-h-screen">
      <SEO 
        title="Industrial Engineering Blogs & Insights | IPVS 2026"
        description="Explore in-depth technical analysis, industrial pump selection guides, ZLD water recycling, predictive maintenance, and ethanol refinery standards."
        canonical="https://ipvs.in/blogs"
      />
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111183] to-[#0e89d0] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center mb-10 shadow-xl">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
            <span>Official Knowledge Hub & Editorial Series</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight">
            IPVS 2026 Blog & Industry Insights
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Thought-leadership articles, smart pump telemetry, Zero Liquid Discharge (ZLD) guides, and procurement strategies for Indian fluid engineering.
          </p>
        </div>
      </div>

      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 space-y-10 sm:space-y-12">
        
        {/* Featured Flagship Article (Magazine Hero Card) */}
        {featuredBlog && !searchQuery && activeType === 'all' && (
          <div 
            onClick={() => navigate(`/blogs/${featuredBlog.slug}`)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer text-left"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden bg-slate-900">
                <img 
                  src={featuredBlog.image} 
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#1E65FF] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                    Featured Insight
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                    {featuredBlog.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#1E65FF]" />
                      {featuredBlog.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {featuredBlog.readTime}
                    </span>
                    <span className="text-[#1E65FF]">• Editor's Choice</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 group-hover:text-[#1E65FF] transition-colors leading-tight font-heading">
                    {featuredBlog.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                    {featuredBlog.subtitle || featuredBlog.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredBlog.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-[#1E65FF]" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{featuredBlog.author}</p>
                      <p className="text-[11px] text-slate-500">{featuredBlog.authorRole}</p>
                    </div>
                  </div>
                  
                  <span className="inline-flex items-center space-x-2 text-xs sm:text-sm font-extrabold text-[#1E65FF] group-hover:underline">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm">
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeType === 'all' ? 'bg-[#1E65FF] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              All Articles ({BLOG_ARTICLES.length})
            </button>
            <button
              onClick={() => setActiveType('exhibitor')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeType === 'exhibitor' ? 'bg-[#1E65FF] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Exhibitor Strategy
            </button>
            <button
              onClick={() => setActiveType('visitor')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeType === 'visitor' ? 'bg-[#1E65FF] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Visitor & Sourcing
            </button>
            <button
              onClick={() => setActiveType('technology')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeType === 'technology' ? 'bg-[#1E65FF] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Technology & IoT
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or tag..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article 
              key={blog.id}
              onClick={() => navigate(`/blogs/${blog.slug}`)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between text-left cursor-pointer"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#1E65FF] text-white text-[10px] font-bold uppercase shadow-md">
                      {blog.type}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-4 text-[11px] font-semibold text-slate-400">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#1E65FF]" />
                      {blog.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1E65FF] transition-colors leading-snug font-heading line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {blog.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-slate-100 rounded-md text-[10px] font-semibold text-slate-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2 truncate max-w-[150px]">
                  <User className="w-3.5 h-3.5 text-[#1E65FF] shrink-0" />
                  <span className="text-[11px] font-bold text-slate-700 truncate">{blog.author}</span>
                </div>
                <span className="text-xs font-bold text-[#1E65FF] group-hover:underline flex items-center shrink-0">
                  Read Article <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
            <Search className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No articles matched your search query.</h3>
            <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
            <button
              onClick={() => { setActiveType('all'); setSearchQuery(''); }}
              className="px-5 py-2 rounded-xl bg-[#1E65FF] text-white text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Real Past Exhibition Gallery (5-Card Row + Full Lightbox Modal) */}
        <PastExhibitionGallery onOpenModal={onOpenModal} className="-mx-4 sm:-mx-6 lg:-mx-8 rounded-3xl overflow-hidden shadow-xl" />

        {/* Embedded Form (Universal Form Requirement) */}
        <InlineRegistrationForm 
          title="Subscribe & Stay Updated on IPVS 2026 Blogs"
          subtitle="Receive the latest exhibitor announcements, technical whitepapers, and free visitor passes directly in your inbox."
        />

      </div>

    </div>
  );
};
