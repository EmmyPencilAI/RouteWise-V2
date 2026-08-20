import React, { useState } from 'react';
import { 
  Plus, 
  Star, 
  Check, 
  MessageSquare, 
  Clock, 
  Send, 
  Filter,
  MapPin,
  Globe
} from 'lucide-react';
import { CommunityPost, ReportCategory, CountryConfig } from '../types';

interface CommunityScreenProps {
  posts: CommunityPost[];
  onOpenReportModal: () => void;
  onStarPost: (postId: string) => void;
  onConfirmPost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  selectedCityName: string;
  currentCountry: CountryConfig;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  posts,
  onOpenReportModal,
  onStarPost,
  onConfirmPost,
  onAddComment,
  selectedCityName,
  currentCountry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterScope, setFilterScope] = useState<'city' | 'all'>('city');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const categories: { label: string; value: string; icon?: string }[] = [
    { label: 'All', value: 'All' },
    { label: 'Fare', value: 'Fare', icon: '💰' },
    { label: 'Traffic', value: 'Traffic', icon: '🚦' },
    { label: 'Safety', value: 'Safety', icon: '⚠️' },
    { label: 'Transport', value: 'Transport', icon: '🚌' },
    { label: 'Road', value: 'Road', icon: '🛣️' },
  ];

  const filteredPosts = posts.filter((post) => {
    // City filter check
    if (filterScope === 'city') {
      const matchCity = post.city.toLowerCase() === selectedCityName.toLowerCase() ||
        post.city.toLowerCase().includes(selectedCityName.toLowerCase());
      if (!matchCity) return false;
    }
    // Category filter check
    if (selectedCategory === 'All') return true;
    return post.category === selectedCategory;
  });

  const handleSendComment = (postId: string) => {
    if (!commentInput.trim()) return;
    onAddComment(postId, commentInput.trim());
    setCommentInput('');
  };

  return (
    <div className="space-y-3.5 pb-20 relative">
      {/* Top Header & Filters */}
      <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black text-[#1A1A1A] tracking-tight uppercase">
              Community Intel
            </h1>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                {filterScope === 'city' ? `In ${selectedCityName}` : `Across ${currentCountry.name}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Scope toggle: City vs All */}
            <div className="flex bg-gray-100 p-0.5 rounded-xl border border-gray-200 text-[10px] font-bold">
              <button
                onClick={() => setFilterScope('city')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterScope === 'city' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-gray-500'
                }`}
              >
                {selectedCityName}
              </button>
              <button
                onClick={() => setFilterScope('all')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterScope === 'all' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-gray-500'
                }`}
              >
                All
              </button>
            </div>

            <button
              onClick={onOpenReportModal}
              className="px-3 py-1.5 bg-[#FF6321] hover:bg-[#e05417] active:scale-95 text-white text-xs font-black rounded-xl flex items-center gap-1 shadow-sm uppercase tracking-wider cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Report</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 border ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Community Feed Cards List */}
      <div className="space-y-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const isCommentOpen = activeCommentPostId === post.id;
            const currencySymbol = post.currencySymbol || currentCountry.currencySymbol || '₦';

            return (
              <div
                key={post.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs space-y-2.5"
              >
                {/* Header: Category Badge + Location + City + Time */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {post.category === 'Fare' && (
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[9px] font-black uppercase rounded-md border border-green-200">
                        💰 FARE UPDATE
                      </span>
                    )}
                    {post.category === 'Traffic' && (
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-800 text-[9px] font-black uppercase rounded-md border border-orange-200">
                        🚦 TRAFFIC
                      </span>
                    )}
                    {post.category === 'Safety' && (
                      <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[9px] font-black uppercase rounded-md border border-red-200">
                        ⚠️ SAFETY ALERT
                      </span>
                    )}
                    {post.category === 'Transport' && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-800 text-[9px] font-black uppercase rounded-md border border-blue-200">
                        🚌 TRANSIT INFO
                      </span>
                    )}
                    {post.category === 'Road' && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-[9px] font-black uppercase rounded-md border border-gray-200">
                        🛣️ ROAD REPORT
                      </span>
                    )}

                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-bold rounded">
                      {post.city}
                    </span>

                    <span className="text-xs font-bold text-gray-900 truncate">
                      {post.locationOrRoute}
                    </span>
                  </div>

                  <span className="text-[10px] text-gray-400 font-semibold shrink-0 flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {post.timeAgo}
                  </span>
                </div>

                {/* Main Content: Fare / Text */}
                <div>
                  {post.fareAmount && (
                    <div className="text-lg font-black text-[#1A1A1A] mb-0.5">
                      {currencySymbol}{post.fareAmount.toLocaleString()}{' '}
                      {post.transportMode && (
                        <span className="text-xs font-semibold text-gray-500">
                          ({post.transportMode})
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    &ldquo;{post.text}&rdquo;
                  </p>
                </div>

                {/* Footer Actions: ⭐ Star, ✓ Confirm, 💬 Comment */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <div className="flex items-center gap-2">
                    {/* Star Button */}
                    <button
                      onClick={() => onStarPost(post.id)}
                      className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold text-xs transition-colors cursor-pointer ${
                        post.userStarred
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                      title="Helpful report"
                    >
                      <Star className={`w-3.5 h-3.5 ${post.userStarred ? 'fill-amber-500 text-amber-500' : ''}`} />
                      <span>{post.stars}</span>
                    </button>

                    {/* Confirm Button */}
                    <button
                      onClick={() => onConfirmPost(post.id)}
                      className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold text-xs transition-colors cursor-pointer ${
                        post.userConfirmed
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                      title="I confirm this report"
                    >
                      <Check className="w-3.5 h-3.5 text-green-600 stroke-[3px]" />
                      <span>{post.confirms}</span>
                      <span className="text-[10px] hidden sm:inline uppercase">Confirm</span>
                    </button>
                  </div>

                  {/* Comment Toggle */}
                  <button
                    onClick={() => setActiveCommentPostId(isCommentOpen ? null : post.id)}
                    className="px-2 py-1 text-gray-500 hover:text-gray-900 rounded-lg flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                    <span>{post.comments.length}</span>
                    <span className="text-[10px] uppercase font-bold">Comments</span>
                  </button>
                </div>

                {/* Expanded Comments section */}
                {isCommentOpen && (
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    {post.comments.length > 0 ? (
                      <div className="space-y-1.5">
                        {post.comments.map((cmt) => (
                          <div key={cmt.id} className="bg-gray-50 rounded-xl p-2.5 text-xs border border-gray-100">
                            <div className="flex items-center justify-between text-[10px] text-gray-400 mb-0.5">
                              <span className="font-bold text-gray-800">{cmt.userName}</span>
                              <span>{cmt.timeAgo}</span>
                            </div>
                            <p className="text-gray-800 font-medium">{cmt.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[11px] text-gray-400 italic py-1">
                        No comments yet. Be the first to add context.
                      </div>
                    )}

                    {/* Add comment input */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                        placeholder="Add commuter note..."
                        className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 flex-1 focus:outline-none focus:border-[#FF6321]"
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="px-3 py-2 bg-[#FF6321] hover:bg-[#e05417] text-white rounded-xl text-xs font-black uppercase cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center space-y-2 shadow-xs">
            <Filter className="w-8 h-8 text-gray-300 mx-auto" />
            <div className="text-xs font-bold text-gray-800">
              No reports in &ldquo;{selectedCategory}&rdquo; for {filterScope === 'city' ? selectedCityName : currentCountry.name} yet
            </div>
            <p className="text-[11px] text-gray-500">
              Be the first to submit a live commuter update.
            </p>
            <button
              onClick={onOpenReportModal}
              className="mt-2 px-3.5 py-2 bg-[#FF6321] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              + Submit Report
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-30 max-w-md mx-auto">
        <button
          id="floating-report-btn"
          onClick={onOpenReportModal}
          className="px-4 py-3 bg-[#FF6321] hover:bg-[#e05417] active:scale-95 text-white font-black text-xs rounded-full shadow-lg shadow-orange-200 flex items-center gap-1.5 transition-all cursor-pointer uppercase tracking-wider"
        >
          <Plus className="w-4 h-4 stroke-[3px]" />
          <span>Report</span>
        </button>
      </div>
    </div>
  );
};
