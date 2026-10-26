import { type ReactNode } from 'react';
import { CVData } from '../../store/cvStore';

interface CVPreviewProps {
  data: CVData;
  id?: string;
}

/* ─── Modern Template ─── */
function ModernTemplate({ data }: { data: CVData }) {
  const p = data.personalInfo;
  const fullName = `${p.firstName} ${p.lastName}`.trim() || 'Your Name';

  const levelLabels = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];
  const levelWidths = [20, 40, 60, 80, 100];

  return (
    <div className="bg-white font-inter text-slate-800 shadow-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: '28px 28px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          {p.photo ? (
            <img src={p.photo} alt="" style={{ width: 64, height: 64, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.4)', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20, fontWeight: 700, flexShrink: 0 }}>
              {(p.firstName?.[0] || 'A').toUpperCase()}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.5px', fontFamily: 'Poppins, sans-serif' }}>{fullName}</h1>
            {p.title && <p style={{ margin: '3px 0 0', fontSize: 12, color: 'rgba(199,210,254,1)', fontWeight: 500 }}>{p.title}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: 8 }}>
              {p.email && <ContactItem icon="✉" text={p.email} />}
              {p.phone && <ContactItem icon="📱" text={p.phone} />}
              {p.location && <ContactItem icon="📍" text={p.location} />}
              {p.linkedin && <ContactItem icon="🔗" text="LinkedIn" />}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 28px', display: 'flex', gap: '20px' }}>
        {/* Left column */}
        <div style={{ flex: 2 }}>
          {/* Summary */}
          {data.summary && (
            <Section title="Profile">
              <p style={{ fontSize: 11, lineHeight: 1.6, color: '#475569', margin: 0 }}>{data.summary}</p>
            </Section>
          )}

          {/* Experience */}
          {data.experience.some(e => e.company || e.position) && (
            <Section title="Experience">
              {data.experience.filter(e => e.company || e.position).map((exp) => (
                <div key={exp.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{exp.position || 'Position'}</p>
                      <p style={{ margin: '1px 0 0', fontSize: 11, color: '#6366f1', fontWeight: 600 }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <p style={{ margin: 0, fontSize: 10, color: '#94a3b8', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 8 }}>
                      {exp.startDate}{exp.startDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  {exp.description && (
                    <div style={{ marginTop: 4 }}>
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <p key={i} style={{ margin: '2px 0', fontSize: 10.5, color: '#475569', lineHeight: 1.5 }}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {data.education.some(e => e.institution || e.degree) && (
            <Section title="Education">
              {data.education.filter(e => e.institution || e.degree).map((edu) => (
                <div key={edu.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                      <p style={{ margin: '1px 0 0', fontSize: 11, color: '#6366f1', fontWeight: 600 }}>{edu.institution}</p>
                    </div>
                    <p style={{ margin: 0, fontSize: 10, color: '#94a3b8', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 8 }}>
                      {edu.startDate}{edu.startDate ? ' – ' : ''}{edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                  {edu.description && <p style={{ margin: '3px 0 0', fontSize: 10.5, color: '#475569', lineHeight: 1.5 }}>{edu.description}</p>}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Skills */}
          {data.skills.some(s => s.name) && (
            <Section title="Skills">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {data.skills.filter(s => s.name).map((skill) => (
                  <div key={skill.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 600, color: '#334155' }}>{skill.name}</span>
                      <span style={{ fontSize: 9, color: '#6366f1', fontWeight: 600 }}>{levelLabels[skill.level - 1]}</span>
                    </div>
                    <div style={{ height: 4, background: '#e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${levelWidths[skill.level - 1]}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Contact */}
          {(p.website || p.linkedin) && (
            <Section title="Links">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {p.website && (
                  <div>
                    <p style={{ margin: 0, fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Portfolio</p>
                    <p style={{ margin: 0, fontSize: 10, color: '#6366f1', fontWeight: 500, wordBreak: 'break-all' }}>{p.website}</p>
                  </div>
                )}
                {p.linkedin && (
                  <div>
                    <p style={{ margin: 0, fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>LinkedIn</p>
                    <p style={{ margin: 0, fontSize: 10, color: '#6366f1', fontWeight: 500, wordBreak: 'break-all' }}>{p.linkedin}</p>
                  </div>
                )}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Classic Template ─── */
function ClassicTemplate({ data }: { data: CVData }) {
  const p = data.personalInfo;
  const fullName = `${p.firstName} ${p.lastName}`.trim() || 'Your Name';
  const levelLabels = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <div className="bg-white" style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
      {/* Header */}
      <div style={{ borderBottom: '3px solid #1e293b', padding: '24px 28px 16px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#0f172a', fontFamily: 'Georgia, serif' }}>{fullName}</h1>
        {p.title && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase' }}>{p.title}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
          {p.email && <span style={{ fontSize: 10, color: '#475569' }}>✉ {p.email}</span>}
          {p.phone && <span style={{ fontSize: 10, color: '#475569' }}>📞 {p.phone}</span>}
          {p.location && <span style={{ fontSize: 10, color: '#475569' }}>📍 {p.location}</span>}
        </div>
      </div>

      <div style={{ padding: '16px 28px' }}>
        {data.summary && (
          <ClassicSection title="Professional Summary">
            <p style={{ margin: 0, fontSize: 11, lineHeight: 1.7, color: '#334155', fontStyle: 'italic' }}>{data.summary}</p>
          </ClassicSection>
        )}

        {data.experience.some(e => e.company || e.position) && (
          <ClassicSection title="Professional Experience">
            {data.experience.filter(e => e.company || e.position).map((exp) => (
              <div key={exp.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 11.5, color: '#0f172a' }}>{exp.position || 'Position'}</strong>
                  <em style={{ fontSize: 10, color: '#64748b' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</em>
                </div>
                <p style={{ margin: '1px 0 0', fontSize: 11, color: '#334155', fontStyle: 'italic' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                {exp.description && (
                  <div style={{ marginTop: 3 }}>
                    {exp.description.split('\n').filter(Boolean).map((l, i) => (
                      <p key={i} style={{ margin: '1px 0', fontSize: 10.5, color: '#475569', lineHeight: 1.5 }}>{l}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </ClassicSection>
        )}

        {data.education.some(e => e.institution || e.degree) && (
          <ClassicSection title="Education">
            {data.education.filter(e => e.institution || e.degree).map((edu) => (
              <div key={edu.id} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 11.5, color: '#0f172a' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                  <em style={{ fontSize: 10, color: '#64748b' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</em>
                </div>
                <p style={{ margin: '1px 0 0', fontSize: 11, color: '#334155' }}>{edu.institution}</p>
              </div>
            ))}
          </ClassicSection>
        )}

        {data.skills.some(s => s.name) && (
          <ClassicSection title="Skills">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px' }}>
              {data.skills.filter(s => s.name).map((skill) => (
                <span key={skill.id} style={{ fontSize: 11, color: '#334155' }}>
                  • {skill.name} <em style={{ color: '#64748b', fontSize: 10 }}>({levelLabels[skill.level - 1]})</em>
                </span>
              ))}
            </div>
          </ClassicSection>
        )}
      </div>
    </div>
  );
}

/* ─── Creative Template ─── */
function CreativeTemplate({ data }: { data: CVData }) {
  const p = data.personalInfo;
  const fullName = `${p.firstName} ${p.lastName}`.trim() || 'Your Name';
  const levelWidths = [20, 40, 60, 80, 100];

  return (
    <div className="bg-white" style={{ fontFamily: 'Inter, sans-serif', display: 'flex', minHeight: 600 }}>
      {/* Sidebar */}
      <div style={{ width: 160, background: 'linear-gradient(180deg, #6d28d9 0%, #4c1d95 100%)', padding: '24px 16px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Avatar */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.5)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: 'white' }}>
            {(p.firstName?.[0] || 'A').toUpperCase()}
          </div>
          <h2 style={{ margin: '8px 0 2px', fontSize: 11, fontWeight: 700, color: 'white', textAlign: 'center', letterSpacing: '-0.3px' }}>{fullName}</h2>
          {p.title && <p style={{ margin: 0, fontSize: 9, color: '#c4b5fd', textAlign: 'center', lineHeight: 1.3 }}>{p.title}</p>}
        </div>

        {/* Contact sidebar */}
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 8, fontWeight: 700, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: 1 }}>Contact</p>
          {p.email && <p style={{ margin: '0 0 4px', fontSize: 8.5, color: 'rgba(255,255,255,0.85)', wordBreak: 'break-all' }}>✉ {p.email}</p>}
          {p.phone && <p style={{ margin: '0 0 4px', fontSize: 8.5, color: 'rgba(255,255,255,0.85)' }}>📱 {p.phone}</p>}
          {p.location && <p style={{ margin: '0 0 4px', fontSize: 8.5, color: 'rgba(255,255,255,0.85)' }}>📍 {p.location}</p>}
        </div>

        {/* Skills sidebar */}
        {data.skills.some(s => s.name) && (
          <div>
            <p style={{ margin: '0 0 6px', fontSize: 8, fontWeight: 700, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: 1 }}>Skills</p>
            {data.skills.filter(s => s.name).map((skill) => (
              <div key={skill.id} style={{ marginBottom: 5 }}>
                <p style={{ margin: '0 0 2px', fontSize: 9, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{skill.name}</p>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${levelWidths[skill.level - 1]}%`, background: 'rgba(255,255,255,0.8)', borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '20px 20px' }}>
        {data.summary && (
          <div style={{ marginBottom: 14 }}>
            <CreativeSectionTitle title="About Me" />
            <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.6, color: '#475569' }}>{data.summary}</p>
          </div>
        )}

        {data.experience.some(e => e.company || e.position) && (
          <div style={{ marginBottom: 14 }}>
            <CreativeSectionTitle title="Experience" />
            {data.experience.filter(e => e.company || e.position).map((exp) => (
              <div key={exp.id} style={{ marginBottom: 10, paddingLeft: 10, borderLeft: '2px solid #ede9fe' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p style={{ margin: 0, fontSize: 11.5, fontWeight: 700, color: '#1e293b' }}>{exp.position}</p>
                  <span style={{ fontSize: 9, color: '#7c3aed', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: 4 }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p style={{ margin: '1px 0 4px', fontSize: 10, color: '#7c3aed', fontWeight: 600 }}>{exp.company}</p>
                {exp.description && (
                  <div>
                    {exp.description.split('\n').filter(Boolean).map((l, i) => (
                      <p key={i} style={{ margin: '1px 0', fontSize: 10, color: '#475569', lineHeight: 1.5 }}>{l}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {data.education.some(e => e.institution || e.degree) && (
          <div>
            <CreativeSectionTitle title="Education" />
            {data.education.filter(e => e.institution || e.degree).map((edu) => (
              <div key={edu.id} style={{ marginBottom: 8, paddingLeft: 10, borderLeft: '2px solid #ede9fe' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#1e293b' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                  <span style={{ fontSize: 9, color: '#7c3aed', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: 4 }}>
                    {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p style={{ margin: '1px 0 0', fontSize: 10, color: '#7c3aed', fontWeight: 600 }}>{edu.institution}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Helper Components ─── */
function ContactItem({ icon, text }: { icon: string; text: string }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 9.5, color: 'rgba(199,210,254,1)' }}>
      <span>{icon}</span>
      <span style={{ wordBreak: 'break-all' }}>{text}</span>
    </span>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <div style={{ width: 3, height: 12, background: 'linear-gradient(180deg, #6366f1, #8b5cf6)', borderRadius: 2 }} />
        <h3 style={{ margin: 0, fontSize: 9, fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ClassicSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, color: '#0f172a', borderBottom: '1.5px solid #cbd5e1', paddingBottom: 4, letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>{title}</h3>
      {children}
    </div>
  );
}

function CreativeSectionTitle({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
      <div style={{ height: 2, width: 16, background: 'linear-gradient(90deg, #7c3aed, #a78bfa)', borderRadius: 1 }} />
      <h3 style={{ margin: 0, fontSize: 9.5, fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1.5 }}>{title}</h3>
      <div style={{ flex: 1, height: 1, background: '#ede9fe' }} />
    </div>
  );
}



/* ─── Main CV Preview Component ─── */
export function CVPreview({ data, id }: CVPreviewProps) {
  const isEmpty =
    !data.personalInfo.firstName &&
    !data.personalInfo.lastName &&
    !data.personalInfo.email;

  return (
    <div
      id={id || 'cv-preview'}
      className="cv-preview-shadow rounded-lg overflow-hidden"
      style={{ background: 'white', minHeight: 600, position: 'relative' }}
    >
      {isEmpty && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(248,250,252,0.95)',
            zIndex: 10,
          }}
        >
          <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>📄</span>
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#334155', margin: 0 }}>Your CV preview</p>
          <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Start filling in your details →</p>
        </div>
      )}
      {data.template === 'modern' && <ModernTemplate data={data} />}
      {data.template === 'classic' && <ClassicTemplate data={data} />}
      {data.template === 'creative' && <CreativeTemplate data={data} />}
    </div>
  );
}
