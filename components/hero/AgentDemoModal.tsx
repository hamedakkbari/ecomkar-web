'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Globe, 
  CheckCircle, 
  TrendingUp, 
  Zap, 
  DollarSign,
  ArrowRight,
  Bot,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface Action {
  id: string;
  label: string;
  icon: any;
  description: string;
  analytics: string;
}

interface AgentDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAction?: string | null;
  actions: Action[];
}

export default function AgentDemoModal({ 
  isOpen, 
  onClose, 
  selectedAction, 
  actions 
}: AgentDemoModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    site_url: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedActionData = actions.find(action => action.id === selectedAction);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', site_url: '' });
    onClose();
  };

  const sampleInsights = [
    {
      icon: TrendingUp,
      title: 'فرصت‌های رشد',
      description: '۳ فرصت کلیدی برای افزایش فروش شناسایی شد',
      value: '+۲۳٪ فروش بالقوه',
      color: 'text-green-400'
    },
    {
      icon: Zap,
      title: 'اتوماسیون',
      description: '۵ فرآیند قابل خودکارسازی در کسب‌وکار شما',
      value: 'صرفه‌جویی ۱۵ ساعت/هفته',
      color: 'text-blue-400'
    },
    {
      icon: DollarSign,
      title: 'ROI پیش‌بینی',
      description: 'بازگشت سرمایه در ۳ ماه اول',
      value: '۳۴۰٪ ROI',
      color: 'text-purple-400'
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                <Bot className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {selectedActionData ? selectedActionData.label : 'ایجنت هوشمند'}
                </h2>
                <p className="text-sm text-white/60">
                  {selectedActionData ? selectedActionData.description : 'تحلیل و پیشنهاد هوشمند'}
                </p>
              </div>
            </div>
            
            <button
              onClick={resetModal}
              className="p-2 text-white/60 hover:text-white/90 hover:bg-white/10 rounded-full transition-colors duration-200"
              aria-label="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    تحلیل هوشمند کسب‌وکار شما
                  </h3>
                  <p className="text-white/70">
                    اطلاعات خود را وارد کنید تا ایجنت هوشمند تحلیل کاملی ارائه دهد
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                      نام و نام خانوادگی
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                        placeholder="نام خود را وارد کنید"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      ایمیل
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                        placeholder="email@example.com"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="site_url" className="block text-sm font-medium text-white/90 mb-2">
                      آدرس وب‌سایت (اختیاری)
                    </label>
                    <div className="relative">
                      <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="url"
                        id="site_url"
                        name="site_url"
                        value={formData.site_url}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                        placeholder="https://yoursite.com"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  data-analytics="submit_agent_quick_audit"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      در حال تحلیل...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      شروع تحلیل هوشمند
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    تحلیل شما آماده است!
                  </h3>
                  <p className="text-white/70">
                    ایجنت هوشمند تحلیل کاملی از کسب‌وکار شما انجام داده است
                  </p>
                </div>

                <div className="space-y-4">
                  {sampleInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-white/5 ${insight.color}`}>
                          <insight.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">
                            {insight.title}
                          </h4>
                          <p className="text-sm text-white/70 mb-2">
                            {insight.description}
                          </p>
                          <div className={`text-lg font-bold ${insight.color}`}>
                            {insight.value}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    href="/agent"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    data-analytics="click_agent_full_analysis"
                    onClick={resetModal}
                  >
                    <span>تحلیل کامل با ایجنت</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

