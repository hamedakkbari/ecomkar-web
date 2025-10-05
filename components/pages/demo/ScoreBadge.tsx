"use client";

import { motion } from "framer-motion";

interface ScoreBadgeProps {
  key: string;
  label: string;
  score: number; // 1-5
  index?: number;
}

const getScoreColor = (score: number) => {
  if (score >= 4) return "text-green-600 dark:text-green-400";
  if (score >= 3) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
};

const getScoreBgColor = (score: number) => {
  if (score >= 4) return "bg-green-100 dark:bg-green-900/30";
  if (score >= 3) return "bg-yellow-100 dark:bg-yellow-900/30";
  return "bg-red-100 dark:bg-red-900/30";
};

const getScoreText = (score: number) => {
  if (score >= 4) return "عالی";
  if (score >= 3) return "خوب";
  if (score >= 2) return "متوسط";
  return "نیاز به بهبود";
};

export default function ScoreBadge({ key, label, score, index = 0 }: ScoreBadgeProps) {
  const clampedScore = Math.max(1, Math.min(5, score));
  const colorClass = getScoreColor(clampedScore);
  const bgClass = getScoreBgColor(clampedScore);
  const scoreText = getScoreText(clampedScore);

  return (
    <motion.div
      className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${bgClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            {label}
          </h4>
          <p className={`text-sm font-medium ${colorClass}`}>
            {scoreText}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          {/* Score Stars */}
          <div className="flex space-x-1 space-x-reverse">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${
                  star <= clampedScore 
                    ? colorClass 
                    : "text-gray-300 dark:text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          {/* Score Number */}
          <span className={`text-lg font-bold ${colorClass}`}>
            {clampedScore}/5
          </span>
        </div>
      </div>
    </motion.div>
  );
}
