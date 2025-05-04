'use client';
import { IconBrandTwitter, IconBrandFacebook, IconBrandInstagram, IconStar } from '@tabler/icons-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-gray-400">
      {/* Links Section */}
      <div className="container mx-auto px-4 py-6 flex justify-center gap-8">
        <span className="hover:text-white transition-colors">
          Privacy Notice
        </span>
        <span className="hover:text-white transition-colors">
          Terms of Service
        </span>
        <span className="hover:text-white transition-colors">
          Cookie Policy
        </span>
        <span className="hover:text-white transition-colors">
          Company Information
        </span>
        <span className="hover:text-white transition-colors">
          Cookie Preferences
        </span>
      </div>

      {/* Copyright and Social Media */}
      <div className="border-t border-[#1F1F1F]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm">
              Copyright © GameQuest, Inc. All rights reserved
            </p>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/gamequest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#1F1F1F] flex items-center justify-center hover:bg-[#1F1F1F] transition-colors"
              >
                <IconBrandTwitter size={20} className="text-gray-400" />
              </a>
              <a 
                href="https://facebook.com/gamequest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#1F1F1F] flex items-center justify-center hover:bg-[#1F1F1F] transition-colors"
              >
                <IconBrandFacebook size={20} className="text-gray-400" />
              </a>
              <a 
                href="https://instagram.com/gamequest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#1F1F1F] flex items-center justify-center hover:bg-[#1F1F1F] transition-colors"
              >
                <IconBrandInstagram size={20} className="text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 