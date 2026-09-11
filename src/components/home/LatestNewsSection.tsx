import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BLOG_ARTICLES } from '../../data/ipvsData';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

export const LatestNewsSection: React.FC = () => {
  const navigate = useNavigate();
  const topBlogs = BLOG_ARTICLES.slice(0, 3);

  return (
    <section className="py-8 sm:py-10 bg-[#F4F7FE] text-slate-800 border-t border-slate-200/60">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 text-center space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2.5">
          <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            <span>EXHIBITION INSIGHTS</span>
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading">
            Top Blogs & Industry Articles
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Explore technical articles, exhibitor stories, and visitor guides for the upcoming IPVS 2026 expo.
          </p>
        </div>

        {/* Blog Cards: Horizontal Scrollable Row on Mobile, 3-Column Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 px-2 -mx-2 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible no-scrollbar scroll-smooth">
          {topBlogs.map((article) => (
            <div 
              key={article.id}
              onClick={() => navigate(`/blogs/${article.slug}`)}
              className="w-[82vw] max-w-[300px] flex-shrink-0 snap-center md:w-auto md:max-w-none bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-left flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-44 sm:h-50 overflow-hidden bg-slate-900">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 px-2.5 py-0.5 sm:px-3 sm:py-0.5 rounded-full bg-[#1E65FF] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                    {article.type}
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-[#1E65FF]" />
                      {article.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-lg font-extrabold text-slate-900 group-hover:text-[#1E65FF] transition-colors leading-snug font-heading line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 flex items-center truncate max-w-[140px]">
                  <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-slate-400 shrink-0" />
                  <span className="truncate">{article.author}</span>
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-[#1E65FF] flex items-center group-hover:underline shrink-0">
                  Read Article <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center space-x-1.5 text-[11px] font-semibold text-[#1E65FF] -mt-4 pb-1">
          <span>← Swipe horizontally for more blogs →</span>
        </div>

        {/* View All Blogs CTA */}
        <div className="pt-2">
          <button
            onClick={() => navigate('/blogs')}
            className="px-8 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-slate-900 hover:bg-[#1E65FF] transition-colors shadow-lg uppercase tracking-wider inline-flex items-center space-x-2"
          >
            <span>Explore All Exhibitor & Visitor Blogs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
