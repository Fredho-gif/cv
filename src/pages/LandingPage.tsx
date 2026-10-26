import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Shield,
  Download,
  FileText,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  Play,
} from 'lucide-react';
import { Footer } from '../components/layout/Footer';

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient pt-16">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-100 opacity-60 blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-violet-100 opacity-50 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-blue-100 opacity-40 blur-3xl" />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-xs font-semibold text-indigo-600 tracking-wide uppercase">
                Free Professional CV Builder
              </span>
              <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">New</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-poppins leading-[1.1] tracking-tight text-slate-900 mb-6">
              Create your{' '}
              <span className="gradient-text">professional</span>{' '}
              CV in one click
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-lg">
              Fill a simple form, pick a template, and download your polished CV as a PDF — all in under 3 minutes. No design skills needed.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/builder"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-lg font-semibold shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 group shine-btn"
              >
                <span>Create my CV free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border-2 border-slate-200 text-slate-700 text-lg font-semibold hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                See how it works
              </a>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {['bg-indigo-400', 'bg-violet-400', 'bg-blue-400', 'bg-pink-400', 'bg-emerald-400'].map((color, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {['J', 'M', 'S', 'A', 'K'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    <span className="font-semibold text-slate-700">50,000+</span> CVs created
                  </p>
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-5">
                <Stat value="100%" label="Free to start" />
                <Stat value="3 min" label="Average time" />
                <Stat value="PDF" label="Instant export" />
              </div>
            </div>
          </div>

          {/* Right - CV Preview Card */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Floating badges */}
              <div className="absolute -top-6 -left-6 z-20 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 border border-slate-100 float">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">CV Generated!</p>
                  <p className="text-xs text-slate-400">Ready to download</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-8 z-20 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 border border-slate-100" style={{animation:'float 4s ease-in-out infinite 1.5s'}}>
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Recruiter-Friendly</p>
                  <p className="text-xs text-slate-400">ATS-friendly format</p>
                </div>
              </div>

              {/* CV Mockup */}
              <div className="relative w-[380px] bg-white rounded-2xl cv-preview-shadow overflow-hidden border border-slate-200">
                {/* CV Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-7 text-white">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold">
                      A
                    </div>
                    <div>
                      <h3 className="text-xl font-bold leading-tight">Alexandra Chen</h3>
                      <p className="text-indigo-200 text-sm mt-0.5">Senior Product Designer</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-indigo-200">
                        <span>📍 San Francisco, CA</span>
                        <span>✉ alex@email.com</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* CV Body */}
                <div className="px-8 py-5 space-y-5">
                  {/* Summary */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-0.5 bg-indigo-500 rounded" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Professional Summary</h4>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-slate-100 rounded w-full" />
                      <div className="h-2 bg-slate-100 rounded w-5/6" />
                      <div className="h-2 bg-slate-100 rounded w-4/6" />
                    </div>
                  </div>
                  {/* Experience */}
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="h-3 w-0.5 bg-indigo-500 rounded" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Experience</h4>
                    </div>
                    <div className="space-y-3">
                      {[
                        { title: 'Lead Designer', company: 'Stripe Inc.', year: '2021–2024' },
                        { title: 'UX Designer', company: 'Notion', year: '2019–2021' },
                      ].map((_job, i) => (
                        <div key={i} className="flex items-start justify-between">
                          <div>
                            <div className="h-2.5 bg-slate-800 rounded w-28 mb-1" />
                            <div className="h-2 bg-slate-200 rounded w-20" />
                          </div>
                          <div className="h-2 bg-indigo-100 rounded w-16" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Skills */}
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="h-3 w-0.5 bg-indigo-500 rounded" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Skills</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Figma', 'React', 'Tailwind', 'UX Research', 'Prototyping'].map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rotate-[-30deg] text-slate-100 text-5xl font-black opacity-30 select-none">
                    PREVIEW
                  </div>
                </div>
              </div>

              {/* Glow behind card */}
              <div className="absolute inset-0 -z-10 rounded-2xl blur-3xl bg-gradient-to-br from-indigo-200 to-violet-200 opacity-40 scale-110" />
            </div>
          </div>
        </div>

        {/* Trusted logos */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Templates loved by professionals at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {['Google', 'Microsoft', 'Apple', 'Meta', 'Amazon', 'Spotify'].map((co) => (
              <span key={co} className="text-slate-500 font-bold text-lg tracking-tight">
                {co}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-base font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

/* ─── How It Works ─── */
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      title: 'Fill your details',
      description:
        'Enter your personal info, work experience, education, and skills in our clean, guided form. Takes less than 3 minutes.',
      color: 'from-indigo-50 to-blue-50',
      border: 'border-indigo-100',
    },
    {
      number: '02',
      icon: <Sparkles className="w-6 h-6 text-violet-600" />,
      title: 'Pick a template',
      description:
        'Choose from our collection of professionally designed, ATS-optimized templates. Preview your CV in real time.',
      color: 'from-violet-50 to-purple-50',
      border: 'border-violet-100',
    },
    {
      number: '03',
      icon: <Download className="w-6 h-6 text-emerald-600" />,
      title: 'Download your PDF',
      description:
        'Get your polished, print-ready CV as a professional PDF file. Share it instantly with employers.',
      color: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-100',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag-pill mb-4">How it works</div>
          <h2 className="text-4xl sm:text-5xl font-bold font-poppins text-slate-900 leading-tight">
            Your dream job is{' '}
            <span className="gradient-text">3 steps away</span>
          </h2>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            No design skills. No confusing settings. Just your information and a beautiful CV.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-indigo-200 via-violet-200 to-indigo-200" />

          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className={`bg-gradient-to-br ${step.color} border ${step.border} rounded-2xl p-8 h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1`}>
                {/* Step number */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-white shadow-sm border ${step.border} flex items-center justify-center`}>
                    {step.icon}
                  </div>
                  <span className="step-number opacity-20">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/35 hover:-translate-y-1 transition-all duration-300"
          >
            Start building now — it's free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-3 text-sm text-slate-400">No credit card required · Always free to get started</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Benefits Section ─── */
function BenefitsSection() {
  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Blazing fast generation',
      description: 'Your CV is ready in seconds, not hours. No waiting, no complexity.',
      color: 'text-amber-500 bg-amber-50',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'ATS-friendly format',
      description: 'Our templates are optimized to pass Applicant Tracking Systems at top companies.',
      color: 'text-emerald-500 bg-emerald-50',
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: 'Instant PDF export',
      description: 'One click to download a print-ready, pixel-perfect PDF of your CV.',
      color: 'text-blue-500 bg-blue-50',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Multiple templates',
      description: 'Choose from modern, classic, and creative designs. Switch any time.',
      color: 'text-indigo-500 bg-indigo-50',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Auto-save progress',
      description: 'Your data is saved automatically. Come back anytime and continue.',
      color: 'text-violet-500 bg-violet-50',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Trusted by 50k+ users',
      description: 'Join thousands of students, freelancers, and professionals who landed their dream job.',
      color: 'text-pink-500 bg-pink-50',
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="tag-pill mb-4">Why Profilick</div>
          <h2 className="text-4xl sm:text-5xl font-bold font-poppins text-slate-900">
            Everything you need to{' '}
            <span className="gradient-text">get hired faster</span>
          </h2>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            We've obsessed over every detail so you don't have to. Just focus on landing the job.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center mb-4`}>
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Templates Preview ─── */
function TemplatesSection() {
  const templates = [
    {
      name: 'Modern',
      tag: 'Most Popular',
      tagColor: 'bg-indigo-500',
      img: '/images/cv-template-modern.jpg',
      description: 'Clean, minimalist design for tech and creative roles.',
      badge: '⭐ Best for Tech',
    },
    {
      name: 'Classic',
      tag: 'Professional',
      tagColor: 'bg-slate-600',
      img: '/images/cv-template-classic.jpg',
      description: 'Traditional layout trusted by corporate recruiters.',
      badge: '💼 Best for Corporate',
    },
    {
      name: 'Creative',
      tag: 'Stand Out',
      tagColor: 'bg-violet-500',
      img: '/images/cv-template-creative.jpg',
      description: 'Bold sidebar design for designers and creatives.',
      badge: '🎨 Best for Design',
    },
  ];

  return (
    <section id="templates" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="tag-pill mb-4">Templates</div>
          <h2 className="text-4xl sm:text-5xl font-bold font-poppins text-slate-900">
            Professionally designed{' '}
            <span className="gradient-text">templates</span>
          </h2>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            Each template is crafted by expert designers and optimized for ATS screening.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((t, i) => (
            <div key={i} className="template-card group cursor-pointer" onClick={() => window.location.href = '/builder'}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group-hover:border-indigo-200">
                {/* Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`${t.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {t.tag}
                  </span>
                </div>
                {/* Preview */}
                <div className="aspect-[3/4] bg-slate-50 relative overflow-hidden">
                  <img
                    src={t.img}
                    alt={`${t.name} CV template`}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <Link
                      to="/builder"
                      className="w-full py-2.5 rounded-xl bg-white text-indigo-600 font-bold text-sm text-center hover:bg-indigo-50 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Use this template →
                    </Link>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-bold text-slate-900">{t.name}</h3>
                    <span className="text-xs text-slate-400">{t.badge}</span>
                  </div>
                  <p className="text-sm text-slate-500">{t.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all"
          >
            View all templates <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Software Engineer',
      company: 'Google',
      avatar: 'SM',
      avatarBg: 'bg-indigo-400',
      rating: 5,
      text: "I built my CV in literally 5 minutes and got interview calls within a week. The templates are clean and the PDF quality is outstanding. Highly recommend!",
    },
    {
      name: 'James Okafor',
      role: 'Marketing Graduate',
      company: 'University of Leeds',
      avatar: 'JO',
      avatarBg: 'bg-violet-400',
      rating: 5,
      text: "As a fresh graduate with no design experience, Profilick was a lifesaver. My CV looks totally professional and I landed my first job within 3 weeks!",
    },
    {
      name: 'Priya Sharma',
      role: 'Freelance Designer',
      company: 'Toptal',
      avatar: 'PS',
      avatarBg: 'bg-pink-400',
      rating: 5,
      text: "The creative template is stunning. It perfectly shows my personality while keeping things professional. I've gotten so many compliments from clients on my CV.",
    },
    {
      name: 'David Langer',
      role: 'Product Manager',
      company: 'Spotify',
      avatar: 'DL',
      avatarBg: 'bg-emerald-400',
      rating: 5,
      text: "What impressed me most is how ATS-friendly the templates are. I went from zero callbacks to 3 interviews per week after switching to Profilick.",
    },
    {
      name: 'Emma Rodriguez',
      role: 'HR Recruiter',
      company: 'McKinsey',
      avatar: 'ER',
      avatarBg: 'bg-amber-400',
      rating: 5,
      text: "As a recruiter, I see hundreds of CVs. Profilick's output stands out — clean formatting, easy to read, and perfectly structured. I recommend it to all candidates.",
    },
    {
      name: 'Alex Turner',
      role: 'Full-Stack Developer',
      company: 'Stripe',
      avatar: 'AT',
      avatarBg: 'bg-blue-400',
      rating: 5,
      text: "The real-time preview is incredible. I could see exactly how my CV would look as I typed. Saved me hours of formatting nightmares in Word.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="tag-pill mb-4">Testimonials</div>
          <h2 className="text-4xl sm:text-5xl font-bold font-poppins text-slate-900">
            Loved by <span className="gradient-text">50,000+ users</span>
          </h2>
          <p className="mt-4 text-xl text-slate-500">
            Real people, real results. Here's what our users say.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array(t.rating).fill(0).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              {/* Text */}
              <p className="text-slate-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="tag-pill mb-4">Free Forever</div>
          <h2 className="text-4xl sm:text-5xl font-bold font-poppins text-slate-900">
            100% <span className="gradient-text">free at launch</span>
          </h2>
          <p className="mt-4 text-xl text-slate-500">Start free, upgrade when you need more.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free */}
          <div className="rounded-2xl border-2 border-slate-200 p-8 bg-white hover:border-indigo-200 transition-colors">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Free</h3>
              <div className="flex items-end gap-1.5">
                <span className="text-5xl font-black text-slate-900">$0</span>
                <span className="text-slate-400 mb-2">/month</span>
              </div>
              <p className="text-slate-500 text-sm mt-2">Perfect to get started</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                '1 CV template',
                'PDF download',
                'Basic sections',
                'Auto-save',
                'Unlimited edits',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/builder"
              className="block w-full text-center py-3 rounded-xl border-2 border-indigo-200 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
            >
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border-2 border-indigo-400 p-8 bg-gradient-to-br from-indigo-50 to-violet-50 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Pro</h3>
              <div className="flex items-end gap-1.5">
                <span className="text-5xl font-black gradient-text">$9</span>
                <span className="text-slate-400 mb-2">/month</span>
              </div>
              <p className="text-slate-500 text-sm mt-2">For serious job seekers</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                'All premium templates',
                'Unlimited CVs',
                'Priority PDF export',
                'LinkedIn import',
                'Cover letter builder',
                'Professional content suggestions',
                'Priority support',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/builder"
              className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
            >
              Start Pro — 7 days free
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-8">
          Cancel anytime. No questions asked. 30-day money-back guarantee.
        </p>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-white/80" />
          <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">Join 50,000+ professionals</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-white leading-tight mb-6">
          Your career starts with<br />
          a great CV. Start now.
        </h2>
        <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
          Don't let a poor CV cost you your dream job. Create a stunning, professional CV in minutes — completely free.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold text-lg shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 group"
          >
            Create my CV free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-indigo-200 text-sm flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            No credit card · No signup required
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const stats = [
    { value: '50,000+', label: 'CVs Created', icon: '📄' },
    { value: '98%', label: 'User Satisfaction', icon: '⭐' },
    { value: '< 3 min', label: 'Average Build Time', icon: '⚡' },
    { value: '100%', label: 'ATS Compliant', icon: '✅' },
  ];

  return (
    <section className="bg-white py-10 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-slate-100">
          {stats.map((s, i) => (
            <div key={i} className="text-center px-6">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-3xl font-black text-slate-900 font-poppins gradient-text">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Landing Page ─── */
export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection />
      <StatsBar />
      <div className="section-divider" />
      <HowItWorksSection />
      <div className="section-divider" />
      <BenefitsSection />
      <div className="section-divider" />
      <TemplatesSection />
      <div className="section-divider" />
      <TestimonialsSection />
      <div className="section-divider" />
      
      <FinalCTASection />
      <Footer />
    </div>
  );
}
