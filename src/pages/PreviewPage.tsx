import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Edit3,
  Share2,
  FileText,
  CheckCircle2,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import { loadFromStorage } from '../store/cvStore';
import { CVPreview } from '../components/cv/CVPreview';
import { generatePDF } from '../utils/pdfGenerator';

export default function PreviewPage() {
  const [cvData] = useState(loadFromStorage);
  const [generating, setGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      await generatePDF(cvData);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const name = `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}`.trim() || 'Your CV';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/builder"
              className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to editor
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-800">
                Profil<span className="text-indigo-500">ick</span>
              </span>
              <span className="text-slate-400 text-sm hidden sm:inline">/ Preview</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/builder"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:border-indigo-200 hover:text-indigo-600 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit CV
            </Link>
            <button
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:border-indigo-200 hover:text-indigo-600 transition-colors"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'My CV', text: 'Check out my CV!' });
                }
              }}
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            <button
              onClick={handleDownload}
              disabled={generating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:pointer-events-none"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">{name}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-semibold">
            {cvData.template.charAt(0).toUpperCase() + cvData.template.slice(1)} Template
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Zoom:</span>
          <div className="flex items-center gap-1">
            {[0.6, 0.8, 1.0].map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  scale === s ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {Math.round(s * 100)}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
        <div className="flex gap-8 max-w-screen-xl w-full items-start">
          {/* CV Preview */}
          <div className="flex-1 flex justify-center">
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                width: `${100 / scale}%`,
                maxWidth: 900 / scale,
                transition: 'transform 0.2s ease',
              }}
            >
              <CVPreview data={cvData} id="cv-preview" />
            </div>
          </div>

          {/* Sidebar actions */}
          <div className="hidden xl:flex flex-col gap-4 w-72 sticky top-24">
            {/* Download card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-1">Your CV is ready! 🎉</h3>
              <p className="text-sm text-slate-500 mb-4">Download your professional PDF and start applying.</p>
              <button
                onClick={handleDownload}
                disabled={generating}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 mb-3"
              >
                {generating ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                ) : downloaded ? (
                  <><CheckCircle2 className="w-4 h-4" /> Downloaded!</>
                ) : (
                  <><Download className="w-4 h-4" /> Download PDF</>
                )}
              </button>
              <Link
                to="/builder"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-indigo-200 hover:text-indigo-600 transition-colors"
              >
                <Edit3 className="w-4 h-4" /> Edit CV
              </Link>
            </div>

            {/* Tips card */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 p-5">
              <h4 className="font-bold text-slate-800 mb-3 text-sm">💡 Pro tips for your CV</h4>
              <ul className="space-y-2">
                {[
                  'Tailor keywords to each job posting',
                  'Keep your CV to 1–2 pages max',
                  'Use strong action verbs',
                  'Quantify achievements where possible',
                  'Proofread before submitting',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Template switcher */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-3 text-sm">Switch template</h4>
              <div className="space-y-2">
                {['modern', 'classic', 'creative'].map(t => (
                  <Link
                    key={t}
                    to="/templates"
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-colors text-sm ${
                      cvData.template === t
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-700 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:border-indigo-200'
                    }`}
                  >
                    <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                    {cvData.template === t && <CheckCircle2 className="w-4 h-4 text-indigo-500" />}
                  </Link>
                ))}
                <Link to="/templates" className="flex items-center gap-1 text-xs text-indigo-500 font-medium mt-1 hover:text-indigo-700">
                  See all templates <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex items-center gap-3 z-30">
        <Link
          to="/builder"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm"
        >
          <Edit3 className="w-4 h-4" /> Edit
        </Link>
        <button
          onClick={handleDownload}
          disabled={generating}
          className="flex-2 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold shadow-lg disabled:opacity-60 flex-1"
        >
          {generating ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
          ) : downloaded ? (
            <><CheckCircle2 className="w-4 h-4" /> Done!</>
          ) : (
            <><Download className="w-4 h-4" /> Download PDF</>
          )}
        </button>
      </div>
    </div>
  );
}
