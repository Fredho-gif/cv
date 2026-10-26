import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Star, ArrowLeft, FileText } from 'lucide-react';
import { saveToStorage, loadFromStorage } from '../store/cvStore';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    tag: 'Most Popular',
    tagColor: 'bg-indigo-500',
    badge: '⭐ Best for Tech & Startups',
    description: 'Clean, minimalist design with a stunning gradient header. Perfect for tech roles, product managers, and modern professionals.',
    features: ['ATS optimized', 'Clean typography', 'Skills visualizer', 'Gradient header'],
    img: '/images/cv-template-modern.jpg',
    colors: ['from-indigo-500 to-blue-500', 'from-indigo-400 to-violet-400', 'from-blue-500 to-cyan-400'],
    rating: 4.9,
    uses: '24,000+',
  },
  {
    id: 'classic',
    name: 'Classic',
    tag: 'Professional',
    tagColor: 'bg-slate-700',
    badge: '💼 Best for Corporate & Finance',
    description: 'Traditional serif layout trusted by Fortune 500 recruiters. Formal, structured, and impeccably professional.',
    features: ['Traditional serif font', 'Clear hierarchy', 'Corporate-approved', 'Chronological layout'],
    img: '/images/cv-template-classic.jpg',
    colors: ['from-slate-600 to-slate-800', 'from-slate-500 to-slate-700', 'from-gray-600 to-gray-800'],
    rating: 4.8,
    uses: '18,000+',
  },
  {
    id: 'creative',
    name: 'Creative',
    tag: 'Stand Out',
    tagColor: 'bg-violet-500',
    badge: '🎨 Best for Design & Creative',
    description: 'Bold sidebar layout that showcases your personality. Make a lasting impression in creative, design, and marketing roles.',
    features: ['Bold sidebar design', 'Visual skill bars', 'Photo placeholder', 'Color accent'],
    img: '/images/cv-template-creative.jpg',
    colors: ['from-violet-500 to-purple-600', 'from-purple-400 to-fuchsia-500', 'from-violet-600 to-indigo-600'],
    rating: 4.7,
    uses: '12,000+',
  },
];

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectTemplate = (id: string) => {
    const current = loadFromStorage();
    saveToStorage({ ...current, template: id });
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-800">
                Profil<span className="text-indigo-500">ick</span>
              </span>
              <span className="text-slate-400 text-sm hidden sm:inline">/ Templates</span>
            </div>
          </div>
          <Link
            to="/builder"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            Start building <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-5">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Choose your template</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-poppins text-slate-900 mb-4">
            Find the perfect <span className="gradient-text">CV template</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Each template is professionally designed, ATS-optimized, and crafted to help you stand out from the competition.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            const isHovered = hoveredTemplate === template.id;

            return (
              <div
                key={template.id}
                className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-indigo-400 shadow-xl shadow-indigo-500/20'
                    : 'border-slate-200 hover:border-indigo-200 hover:shadow-lg'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                {/* Preview */}
                <div className="relative aspect-[3/4] bg-slate-50 overflow-hidden">
                  {/* Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`${template.tagColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                      {template.tag}
                    </span>
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Template image or fallback */}
                  <div className="relative w-full h-full">
                    <img
                      src={template.img}
                      alt={`${template.name} CV Template`}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {/* Fallback mini preview */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 -z-10">
                      <div className="text-center text-slate-300">
                        <FileText className="w-12 h-12 mx-auto mb-2" />
                        <span className="text-sm">{template.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/20 to-transparent flex items-end p-5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTemplate(template.id);
                      }}
                      className="w-full py-3 rounded-xl bg-white text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg"
                    >
                      Use this template →
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{template.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-slate-700">{template.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-indigo-600 font-semibold mb-3">{template.badge}</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{template.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.map((f) => (
                      <span key={f} className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-400">{template.uses} CVs created</span>
                    <button
                      onClick={() => handleSelectTemplate(template.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg'
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100'
                      }`}
                    >
                      {isSelected ? '✓ Use this template' : 'Select & Build'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* More templates coming */}
        <div className="mt-12 text-center p-8 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">More templates coming soon</h3>
          <p className="text-slate-500 text-sm mb-4">Executive, Minimal, Two-Column, and more free templates coming soon.</p>
          <span className="tag-pill">Notify me</span>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/35 hover:-translate-y-1 transition-all duration-300"
          >
            Build my CV now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-3 text-sm text-slate-400">Free to get started · No credit card required</p>
        </div>
      </div>
    </div>
  );
}
