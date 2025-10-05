/**
 * Contact Channels - quick access cards
 */

"use client";

import { Mail, Send, Phone, MessageCircle } from "lucide-react";
import type { ContactChannelItem } from "@/lib/content/pages/contact";

interface ContactChannelsProps {
  channels: ContactChannelItem[];
}

const iconMap: Record<string, any> = {
  email: Mail,
  telegram: Send,
  whatsapp: MessageCircle,
  phone: Phone,
};

export default function ContactChannels({ channels }: ContactChannelsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="rtl">
      {channels.map((ch) => {
        const Icon = iconMap[ch.key] || MessageCircle;
        const title = ch.key === "email" ? "ارسال ایمیل" : ch.key === "telegram" ? "پیام در تلگرام" : ch.key === "whatsapp" ? "پیام در واتساپ" : "تماس تلفنی";
        return (
          <a
            key={ch.key}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            data-analytics="click_contact_channel"
            data-prop={ch.key}
            className="flex items-center justify-between p-4 bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl hover:border-cyan-400/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-cyan-500/15 text-cyan-300" aria-hidden>
                <Icon className="w-5 h-5" />
              </span>
              <span className={`text-[#E6F1FF] ${ch.key === "phone" ? "text-left font-mono" : ""}`}>{ch.label}</span>
            </div>
            <span className="text-xs text-[#9FB3C8]">باز می‌شود</span>
          </a>
        );
      })}
    </div>
  );
}


