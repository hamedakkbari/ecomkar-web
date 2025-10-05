'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, Play } from 'lucide-react';
import type { CourseModule } from '../../../lib/content/pages/course';

interface CurriculumProps {
  modules: CourseModule[];
}

export default function Curriculum({ modules }: CurriculumProps) {
  const [openModules, setOpenModules] = useState<Set<string>>(new Set(['m1'])); // First module open by default

  const toggleModule = (moduleKey: string) => {
    const newOpenModules = new Set(openModules);
    if (newOpenModules.has(moduleKey)) {
      newOpenModules.delete(moduleKey);
    } else {
      newOpenModules.add(moduleKey);
    }
    setOpenModules(newOpenModules);

    // Analytics
    if (typeof window !== 'undefined') {
      const ev = new CustomEvent('analytics', { 
        detail: { 
          action: 'toggle_curriculum',
          prop: moduleKey 
        } 
      });
      window.dispatchEvent(ev);
    }
  };

  return (
    <div className="space-y-4">
      {modules.map((module, index) => {
        const isOpen = openModules.has(module.key);
        
        return (
          <motion.div
            key={module.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
          >
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.key)}
              className="w-full p-6 text-right flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls={`module-${module.key}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-semibold text-white">
                    {module.title}
                  </h3>
                  {module.brief && (
                    <p className="text-sm text-gray-400 mt-1">
                      {module.brief}
                    </p>
                  )}
                </div>
              </div>
              
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Module Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`module-${module.key}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-white/10">
                    <div className="space-y-3 pt-4">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <motion.div
                          key={lessonIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: lessonIndex * 0.05 }}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gray-600/50 rounded-full flex items-center justify-center text-xs text-gray-300">
                              {lessonIndex + 1}
                            </div>
                            <span className="text-white text-sm">
                              {lesson.title}
                            </span>
                            {lesson.free && (
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                رایگان
                              </span>
                            )}
                          </div>
                          
                          {lesson.duration && (
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration}</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}