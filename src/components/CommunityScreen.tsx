import React, { useState } from 'react';
import { 
  Plus, 
  Star, 
  Check, 
  MessageSquare, 
  Send, 
  Radio, 
  CheckCircle2, 
  AlertTriangle 
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
    { label: 'Safety', value: 'Safety', icon: '🚨' },
    { label: 'Transport', value: 'Transport', icon: '🚌' },
    { label: 'Road', value: 'Road', icon: '🛣️' },
  ];

  const filteredPosts = posts.filter((post) => {
    if (filterScope === 'city') {
      const matchCity =
        post.city.toLowerCase() === selectedCityName.toLowerCase() ||
        post.city.toLowerCase().includes(selectedCityName.toLowerCase());
      if (!matchCity) return false;
    }
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
      <section className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xs space-y-3">
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
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterScope === 'city' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-gray-500'
                }`}
              >
                {selectedCityName}
              </button>
              <button
                onClick={() => setFilterScope('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterScope === 'all' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-gray-500'
                }`}
              >
                All
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-[#FF6321] text-white shadow-xs font-black'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Posts List */}
      <div className="space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 text-center space-y-2">
            <div className="text-2xl">📡</div>
            <h3 className="text-xs font-black uppercase text-gray-800">No reports in this category yet</h3>
            <p className="text-xs text-gray-500">
              Be the first commuter to submit a live update in {selectedCityName}.
            </p>
            <button
              onClick={onOpenReportModal}
              className="mt-2 px-4 py-2 bg-[#FF6321] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Submit Report
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isHazard = post.category === 'Safety' || post.category === 'Road';
            const isTraffic = post.category === 'Traffic';
            const isFare = post.category === 'Fare';

            const freshnessColor =
              post.freshness === 'LIVE'
                ? 'bg-green-100 text-green-800 border-green-200'
                : post.freshness === 'RECENT'
                ? 'bg-orange-100 text-orange-800 border-orange-200'
                : 'bg-gray-100 text-gray-600 border-gray-200';

            return (
              <article
                key={post.id}
                className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xs space-y-3 transition-all hover:border-gray-300"
              >
                {/* Header: Category Badge + Freshness + Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border ${
                        isHazard
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : isTraffic
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : isFare
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {post.category}
                    </span>

                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md border ${freshnessColor}`}>
                      {post.freshness}
                    </span>

                    {post.status === 'VERIFIED' && (
                      <span className="text-[9px] font-bold text-green-700 bg-green-50 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold text-gray-400">{post.timeAgo}</span>
                </div>

                {/* Location / Route Title */}
                <div>
                  <div className="text-xs font-black text-gray-900 flex items-center gap-1">
                    <span>{post.locationOrRoute}</span>
                    <span className="text-[10px] text-gray-400 font-semibold">• {post.city}</span>
                  </div>

                  {post.fareAmount && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-base font-black text-green-700">
                        {post.currencySymbol || '₦'}{post.fareAmount.toLocaleString()}
                      </span>
                      {post.transportMode && (
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                          {post.transportMode}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-gray-700 font-medium leading-relaxed mt-1.5">
                    {post.text}
                  </p>
                </div>

                {/* Star ⭐, Confirm ✓, Comments Action Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <div className="flex items-center gap-2">
                    {/* Star / Useful Button */}
                    <button
                      onClick={() => onStarPost(post.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                        post.userStarred
                          ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                      title="Mark as useful intelligence"
                    >
                      <Star className={`w-3.5 h-3.5 ${post.userStarred ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                      <span className="text-[11px]">{post.stars}</span>
                    </button>

                    {/* Confirm Button */}
                    <button
                      onClick={() => onConfirmPost(post.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                        post.userConfirmed
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                      title="I confirm this is currently true"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5px]" />
                      <span className="text-[11px]">{post.confirms}</span>
                    </button>
                  </div>

                  {/* Comment Thread Toggle */}
                  <button
                    onClick={() =>
                      setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-900 font-bold text-[11px] cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.comments.length}</span>
                  </button>
                </div>

                {/* Comment Thread Expansion */}
                {activeCommentPostId === post.id && (
                  <div className="pt-2 space-y-2 border-t border-gray-100">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="p-2 bg-gray-50 rounded-xl text-xs space-y-0.5">
                        <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                          <span className="text-gray-700">{comment.userName}</span>
                          <span>{comment.timeAgo}</span>
                        </div>
                        <p className="text-gray-800 font-medium">{comment.text}</p>
                      </div>
                    ))}

                    <div className="flex gap-1.5 pt-1">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Add commuter note..."
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#FF6321]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendComment(post.id);
                        }}
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="p-2 bg-[#FF6321] text-white rounded-xl cursor-pointer hover:bg-[#e05417]"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      {/* Floating Action Button: Add Report */}
      <div className="fixed bottom-20 right-4 z-30 max-w-md mx-auto">
        <button
          onClick={onOpenReportModal}
          className="bg-[#FF6321] hover:bg-[#e05417] text-white p-3.5 rounded-full shadow-lg flex items-center justify-center cursor-pointer active:scale-95 transition-all"
          title="Submit new commuter report"
        >
          <Plus className="w-5 h-5 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
};
