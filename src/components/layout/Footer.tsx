import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, Heart, Globe, BookOpen, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-poppins tracking-tight">
                Profil<span className="text-indigo-400">ick</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              Create stunning professional CVs in seconds. Trusted by 50,000+ job seekers worldwide.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href="#" label="Website" icon={<Globe className="w-4 h-4" />} />
              <SocialLink href="#" label="Blog" icon={<BookOpen className="w-4 h-4" />} />
              <SocialLink href="#" label="Community" icon={<Users className="w-4 h-4" />} />
              <SocialLink href="#" label="Email" icon={<Mail className="w-4 h-4" />} />
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              <FooterLink href="/#how-it-works">How it works</FooterLink>
              <FooterLink href="/#templates">Templates</FooterLink>
              <FooterLink href="/#pricing">Templates</FooterLink>
              <FooterLink href="/builder">CV Builder</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              <FooterLink href="#">About us</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-3">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Cookie Policy</FooterLink>
              <FooterLink href="#">GDPR</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Profilick. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for job seekers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-slate-500 hover:text-indigo-400 transition-colors"
      >
        {children}
      </a>
    </li>
  );
}
