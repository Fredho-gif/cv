import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  Briefcase,
  Zap,
  FileText,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Download,
  Eye,
  Save,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { Input, Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import {
  CVData,
  Education,
  Experience,
  Skill,
  loadFromStorage,
  saveToStorage,
  generateId,
} from '../store/cvStore';
import { CVPreview } from '../components/cv/CVPreview';
import { generatePDF } from '../utils/pdfGenerator';

const STEPS = [
  { id: 0, label: 'Personal', icon: User, shortLabel: 'Info' },
  { id: 1, label: 'Education', icon: GraduationCap, shortLabel: 'Edu' },
  { id: 2, label: 'Experience', icon: Briefcase, shortLabel: 'Exp' },
  { id: 3, label: 'Skills', icon: Zap, shortLabel: 'Skills' },
  { id: 4, label: 'Summary', icon: FileText, shortLabel: 'Summary' },
];

/* ─── Personal Info Step ─── */
function PersonalInfoStep({ data, onChange }: { data: CVData; onChange: (d: CVData) => void }) {
  const p = data.personalInfo;
  const set = (field: string, value: string) =>
    onChange({ ...data, personalInfo: { ...p, [field]: value } });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Personal Information</h2>
        <p className="text-slate-500 text-sm">Tell us about yourself — this will appear at the top of your CV.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="First Name" placeholder="Alexandra" value={p.firstName} onChange={e => set('firstName', e.target.value)} />
        <Input label="Last Name" placeholder="Chen" value={p.lastName} onChange={e => set('lastName', e.target.value)} />
      </div>
      <Input label="Professional Title" placeholder="Senior Product Designer" value={p.title} onChange={e => set('title', e.target.value)} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Email" type="email" placeholder="alex@email.com" value={p.email} onChange={e => set('email', e.target.value)} />
        <Input label="Phone" type="tel" placeholder="+1 234 567 890" value={p.phone} onChange={e => set('phone', e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Location" placeholder="San Francisco, CA" value={p.location} onChange={e => set('location', e.target.value)} />
        <Input label="Website / Portfolio" placeholder="https://portfolio.com" value={p.website} onChange={e => set('website', e.target.value)} />
      </div>
      <Input label="LinkedIn URL" placeholder="https://linkedin.com/in/yourprofile" value={p.linkedin} onChange={e => set('linkedin', e.target.value)} />
    </div>
  );
}

/* ─── Education Step ─── */
function EducationStep({ data, onChange }: { data: CVData; onChange: (d: CVData) => void }) {
  const addEdu = () => {
    const newEdu: Education = {
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const removeEdu = (id: string) =>
    onChange({ ...data, education: data.education.filter(e => e.id !== id) });

  const updateEdu = (id: string, field: string, value: string | boolean) => {
    onChange({
      ...data,
      education: data.education.map(e => (e.id === id ? { ...e, [field]: value } : e)),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Education</h2>
        <p className="text-slate-500 text-sm">Add your educational background, starting with the most recent.</p>
      </div>

      <div className="space-y-5">
        {data.education.map((edu, i) => (
          <div key={edu.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative">
            {data.education.length > 1 && (
              <button
                onClick={() => removeEdu(edu.id)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Education #{i + 1}</div>
            <div className="space-y-4">
              <Input label="Institution" placeholder="Harvard University" value={edu.institution} onChange={e => updateEdu(edu.id, 'institution', e.target.value)} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Degree" placeholder="Bachelor of Science" value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} />
                <Input label="Field of Study" placeholder="Computer Science" value={edu.field} onChange={e => updateEdu(edu.id, 'field', e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Start Date" placeholder="Sep 2018" value={edu.startDate} onChange={e => updateEdu(edu.id, 'startDate', e.target.value)} />
                <div>
                  <Input
                    label="End Date"
                    placeholder="Jun 2022"
                    value={edu.endDate}
                    onChange={e => updateEdu(edu.id, 'endDate', e.target.value)}
                    disabled={edu.current}
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={e => updateEdu(edu.id, 'current', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-xs text-slate-500">Currently studying here</span>
                  </label>
                </div>
              </div>
              <Textarea
                label="Description (optional)"
                placeholder="Notable achievements, thesis, activities..."
                rows={2}
                value={edu.description}
                onChange={e => updateEdu(edu.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addEdu}
        className="flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:text-indigo-700 py-2 px-4 rounded-xl border-2 border-dashed border-indigo-200 hover:border-indigo-300 w-full justify-center transition-colors"
      >
        <Plus className="w-4 h-4" /> Add another education
      </button>
    </div>
  );
}

/* ─── Experience Step ─── */
function ExperienceStep({ data, onChange }: { data: CVData; onChange: (d: CVData) => void }) {
  const addExp = () => {
    const newExp: Experience = {
      id: generateId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: '',
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const removeExp = (id: string) =>
    onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });

  const updateExp = (id: string, field: string, value: string | boolean) => {
    onChange({
      ...data,
      experience: data.experience.map(e => (e.id === id ? { ...e, [field]: value } : e)),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Work Experience</h2>
        <p className="text-slate-500 text-sm">Add your work history, starting with your most recent position.</p>
      </div>

      <div className="space-y-5">
        {data.experience.map((exp, i) => (
          <div key={exp.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative">
            {data.experience.length > 1 && (
              <button
                onClick={() => removeExp(exp.id)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Experience #{i + 1}</div>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Job Title" placeholder="Senior Product Designer" value={exp.position} onChange={e => updateExp(exp.id, 'position', e.target.value)} />
                <Input label="Company" placeholder="Google LLC" value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} />
              </div>
              <Input label="Location" placeholder="San Francisco, CA (or Remote)" value={exp.location} onChange={e => updateExp(exp.id, 'location', e.target.value)} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Start Date" placeholder="Jan 2020" value={exp.startDate} onChange={e => updateExp(exp.id, 'startDate', e.target.value)} />
                <div>
                  <Input
                    label="End Date"
                    placeholder="Present"
                    value={exp.endDate}
                    onChange={e => updateExp(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={e => updateExp(exp.id, 'current', e.target.checked)}
                    />
                    <span className="text-xs text-slate-500">Currently working here</span>
                  </label>
                </div>
              </div>
              <Textarea
                label="Description"
                placeholder="• Led the redesign of the main dashboard, improving user engagement by 40%&#10;• Collaborated with cross-functional teams to ship 3 major features&#10;• Mentored 2 junior designers"
                rows={4}
                value={exp.description}
                onChange={e => updateExp(exp.id, 'description', e.target.value)}
                hint="Use bullet points (•) to list your key achievements and responsibilities"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addExp}
        className="flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:text-indigo-700 py-2 px-4 rounded-xl border-2 border-dashed border-indigo-200 hover:border-indigo-300 w-full justify-center transition-colors"
      >
        <Plus className="w-4 h-4" /> Add another position
      </button>
    </div>
  );
}

/* ─── Skills Step ─── */
function SkillsStep({ data, onChange }: { data: CVData; onChange: (d: CVData) => void }) {
  const addSkill = () => {
    const newSkill: Skill = { id: generateId(), name: '', level: 3 };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const removeSkill = (id: string) =>
    onChange({ ...data, skills: data.skills.filter(s => s.id !== id) });

  const updateSkill = (id: string, field: string, value: string | number) => {
    onChange({
      ...data,
      skills: data.skills.map(s => (s.id === id ? { ...s, [field]: value } : s)),
    });
  };

  const levelLabels = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];

  const suggestedSkills = [
    'Microsoft Office', 'Project Management', 'Communication', 'Leadership',
    'Python', 'JavaScript', 'React', 'Figma', 'Adobe Photoshop', 'Data Analysis',
    'Marketing', 'Sales', 'Customer Service', 'SQL', 'Excel'
  ];

  const addSuggested = (skill: string) => {
    if (!data.skills.find(s => s.name === skill)) {
      const newSkill: Skill = { id: generateId(), name: skill, level: 3 };
      onChange({ ...data, skills: [...data.skills, newSkill] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Skills</h2>
        <p className="text-slate-500 text-sm">List your key skills and your proficiency level in each.</p>
      </div>

      <div className="space-y-3">
        {data.skills.map((skill, i) => (
          <div key={skill.id} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="flex-1">
              <input
                className="form-input w-full rounded-lg bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400"
                placeholder={`Skill ${i + 1} (e.g., JavaScript)`}
                value={skill.name}
                onChange={e => updateSkill(skill.id, 'name', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 min-w-[180px]">
              <input
                type="range"
                min={1}
                max={5}
                value={skill.level}
                onChange={e => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs text-indigo-600 font-semibold w-20 text-right">
                {levelLabels[skill.level - 1]}
              </span>
            </div>
            {data.skills.length > 1 && (
              <button
                onClick={() => removeSkill(skill.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addSkill}
        className="flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:text-indigo-700 py-2 px-4 rounded-xl border-2 border-dashed border-indigo-200 hover:border-indigo-300 w-full justify-center transition-colors"
      >
        <Plus className="w-4 h-4" /> Add skill
      </button>

      {/* Suggestions */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Quick add popular skills:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map(s => (
            <button
              key={s}
              onClick={() => addSuggested(s)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Summary Step ─── */
function SummaryStep({ data, onChange }: { data: CVData; onChange: (d: CVData) => void }) {
  const suggestions = [
    "Passionate [Job Title] with [X] years of experience in [field]. Proven track record of [achievement]. Skilled in [key skills]. Seeking to leverage expertise at [type of company].",
    "Results-driven professional with expertise in [area]. Consistently delivers [measurable outcomes]. Known for [key strength] and [key strength].",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Professional Summary</h2>
        <p className="text-slate-500 text-sm">Write a compelling 2–4 sentence overview of your professional profile.</p>
      </div>

      <Textarea
        label="Professional Summary"
        placeholder="Passionate product designer with 5+ years of experience creating user-centered digital experiences. Proven track record of leading design systems and shipping products that increased user engagement by 40%. Skilled in Figma, UX research, and cross-functional collaboration."
        rows={6}
        value={data.summary}
        onChange={e => onChange({ ...data, summary: e.target.value })}
        hint={`${data.summary.length} characters · Recommended: 200–400 characters`}
      />

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Starter templates:</p>
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onChange({ ...data, summary: s })}
              className="block w-full text-left text-sm text-slate-600 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl p-3 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Template Selector */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-3">CV Template Style:</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'modern', label: 'Modern', color: 'from-indigo-500 to-blue-500' },
            { id: 'classic', label: 'Classic', color: 'from-slate-600 to-slate-800' },
            { id: 'creative', label: 'Creative', color: 'from-violet-500 to-purple-600' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => onChange({ ...data, template: t.id })}
              className={`relative p-3 rounded-xl border-2 transition-all text-center ${
                data.template === t.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-slate-200 hover:border-indigo-200'
              }`}
            >
              <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${t.color} mb-2`} />
              <span className="text-xs font-semibold text-slate-700">{t.label}</span>
              {data.template === t.id && (
                <div className="absolute top-1.5 right-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Builder Page ─── */
export default function BuilderPage() {
  const [cvData, setCVData] = useState<CVData>(loadFromStorage);
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = useCallback((newData: CVData) => {
    setCVData(newData);
    setSaved(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToStorage(cvData);
      setSaved(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cvData]);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      await generatePDF(cvData);
    } catch (e) {
      console.error('PDF generation failed:', e);
    } finally {
      setGenerating(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  const stepComponents = [
    <PersonalInfoStep data={cvData} onChange={handleChange} />,
    <EducationStep data={cvData} onChange={handleChange} />,
    <ExperienceStep data={cvData} onChange={handleChange} />,
    <SkillsStep data={cvData} onChange={handleChange} />,
    <SummaryStep data={cvData} onChange={handleChange} />,
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-800">
                Profil<span className="text-indigo-500">ick</span>
              </span>
              <span className="text-slate-400 text-sm hidden sm:inline">/ CV Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saved ? (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <Save className="w-3.5 h-3.5" /> Saved
              </span>
            ) : (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Save className="w-3.5 h-3.5" /> Saving...
              </span>
            )}
            <Link
              to="/preview"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:border-indigo-200 hover:text-indigo-600 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Full Preview
            </Link>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:border-indigo-200 hover:text-indigo-600 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <Button
              variant="primary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              loading={generating}
              onClick={handleDownload}
            >
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-100">
          <div
            className="progress-bar h-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="flex flex-1 max-w-screen-xl mx-auto w-full">
        {/* Sidebar - Desktop Steps */}
        <aside className="hidden lg:flex flex-col w-56 border-r border-slate-200 bg-white py-6 px-3 sticky top-14 h-[calc(100vh-3.5rem)]">
          <div className="space-y-1">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isDone = step > s.id;
              const isCurrent = step === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    isCurrent
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : isDone
                      ? 'text-slate-500 hover:bg-slate-50'
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isCurrent ? 'bg-indigo-100' : isDone ? 'bg-emerald-50' : 'bg-slate-50'
                  }`}>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Icon className={`w-4 h-4 ${isCurrent ? 'text-indigo-600' : 'text-slate-400'}`} />
                    )}
                  </div>
                  <span>{s.label}</span>
                  {isCurrent && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                </button>
              );
            })}
          </div>

          <div className="mt-auto">
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-700 mb-1">Step {step + 1} of {STEPS.length}</p>
              <div className="h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                <div className="progress-bar h-full" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-indigo-500 mt-1.5">{Math.round(progress)}% complete</p>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <div className={`flex-1 flex ${showPreview ? 'flex-col' : ''}`}>
          {/* Mobile: Step tabs */}
          <div className="lg:hidden flex items-center gap-1 px-4 py-3 bg-white border-b border-slate-200 overflow-x-auto">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isDone = step > s.id;
              const isCurrent = step === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                    isCurrent ? 'bg-indigo-100 text-indigo-700' : isDone ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                  {s.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Form Area */}
          <div className={`flex-1 ${showPreview ? 'hidden lg:block' : 'block'}`}>
            <div className="p-6 lg:p-8 max-w-2xl">
              {stepComponents[step]}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                <Button
                  variant="ghost"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  icon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>

                {step < STEPS.length - 1 ? (
                  <Button
                    variant="primary"
                    onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}
                    icon={<ChevronRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleDownload}
                    loading={generating}
                    icon={<Download className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Download PDF
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Area - Desktop */}
          <div className={`hidden lg:flex flex-col w-[420px] xl:w-[480px] bg-slate-100 border-l border-slate-200 sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden flex-shrink-0`}>
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Live Preview</span>
              <button
                onClick={handleDownload}
                disabled={generating}
                className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                {generating ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-[500px] mx-auto">
                <CVPreview data={cvData} id="cv-preview" />
              </div>
            </div>
          </div>

          {/* Preview Area - Mobile (when toggled) */}
          {showPreview && (
            <div className="lg:hidden flex-1 bg-slate-100 p-4 overflow-auto">
              <CVPreview data={cvData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
