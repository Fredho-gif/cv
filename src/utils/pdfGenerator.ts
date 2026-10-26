import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CVData } from '../store/cvStore';

export async function generatePDF(cvData: CVData): Promise<void> {
  // Find the preview element
  const element = document.getElementById('cv-preview');
  if (!element) {
    // Fallback: create a text-based PDF
    await generateTextPDF(cvData);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;

    let imgWidth = pdfWidth;
    let imgHeight = pdfWidth / ratio;

    if (imgHeight > pdfHeight) {
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * ratio;
    }

    const xOffset = (pdfWidth - imgWidth) / 2;

    pdf.addImage(imgData, 'PNG', xOffset, 0, imgWidth, imgHeight);

    const name = `${cvData.personalInfo.firstName || 'CV'}_${cvData.personalInfo.lastName || ''}`.trim();
    pdf.save(`${name}_CV_Profilick.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    await generateTextPDF(cvData);
  }
}

async function generateTextPDF(cvData: CVData): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const p = cvData.personalInfo;
  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  // Color helpers
  const indigo: [number, number, number] = [79, 70, 229];
  const darkSlate: [number, number, number] = [15, 23, 42];
  const slate: [number, number, number] = [71, 85, 105];
  const lightSlate: [number, number, number] = [148, 163, 184];
  const white: [number, number, number] = [255, 255, 255];

  // Header gradient bg
  pdf.setFillColor(...indigo);
  pdf.rect(0, 0, 210, 45, 'F');

  // Name
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(...white);
  const fullName = `${p.firstName} ${p.lastName}`.trim() || 'Your Name';
  pdf.text(fullName, margin, 18);

  // Title
  if (p.title) {
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(199, 210, 254);
    pdf.text(p.title, margin, 26);
  }

  // Contact info row
  pdf.setFontSize(8.5);
  pdf.setTextColor(199, 210, 254);
  let contactX = margin;
  const contactY = 35;
  if (p.email) {
    pdf.text(`✉ ${p.email}`, contactX, contactY);
    contactX += pdf.getTextWidth(`✉ ${p.email}`) + 10;
  }
  if (p.phone) {
    pdf.text(`📱 ${p.phone}`, contactX, contactY);
    contactX += pdf.getTextWidth(`📱 ${p.phone}`) + 10;
  }
  if (p.location) {
    pdf.text(`📍 ${p.location}`, contactX, contactY);
  }

  y = 55;

  // Helper functions
  const addSectionHeader = (title: string) => {
    pdf.setDrawColor(...indigo);
    pdf.setLineWidth(0.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(...indigo);
    pdf.text(title.toUpperCase(), margin, y);
    pdf.line(margin, y + 1.5, margin + contentWidth, y + 1.5);
    y += 7;
  };

  const addText = (text: string, size: number, bold: boolean, color: [number, number, number], indent = 0) => {
    pdf.setFont('helvetica', bold ? 'bold' : 'normal');
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
    const lines = pdf.splitTextToSize(text, contentWidth - indent);
    pdf.text(lines, margin + indent, y);
    y += lines.length * (size * 0.4 + 1.5);
  };

  // Summary
  if (cvData.summary) {
    addSectionHeader('Professional Summary');
    addText(cvData.summary, 9.5, false, slate);
    y += 4;
  }

  // Experience
  if (cvData.experience.some(e => e.company || e.position)) {
    addSectionHeader('Work Experience');
    cvData.experience.filter(e => e.company || e.position).forEach(exp => {
      if (y > 260) {
        pdf.addPage();
        y = margin;
      }
      // Job title + date
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10.5);
      pdf.setTextColor(...darkSlate);
      pdf.text(exp.position || 'Position', margin, y);

      const dateText = `${exp.startDate || ''} – ${exp.current ? 'Present' : exp.endDate || ''}`;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(...lightSlate);
      pdf.text(dateText, pageWidth - margin - pdf.getTextWidth(dateText), y);
      y += 5;

      // Company
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(9);
      pdf.setTextColor(...indigo);
      pdf.text(`${exp.company}${exp.location ? ' · ' + exp.location : ''}`, margin, y);
      y += 5;

      // Description
      if (exp.description) {
        const lines = exp.description.split('\n').filter(Boolean);
        lines.forEach(line => {
          if (y > 265) { pdf.addPage(); y = margin; }
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9);
          pdf.setTextColor(...slate);
          const wrapped = pdf.splitTextToSize(line, contentWidth - 4);
          pdf.text(wrapped, margin + 2, y);
          y += wrapped.length * 4.5;
        });
      }
      y += 4;
    });
  }

  // Education
  if (cvData.education.some(e => e.institution || e.degree)) {
    if (y > 240) { pdf.addPage(); y = margin; }
    addSectionHeader('Education');
    cvData.education.filter(e => e.institution || e.degree).forEach(edu => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10.5);
      pdf.setTextColor(...darkSlate);
      pdf.text(`${edu.degree || ''}${edu.field ? ' in ' + edu.field : ''}`, margin, y);

      const dateText = `${edu.startDate || ''} – ${edu.current ? 'Present' : edu.endDate || ''}`;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(...lightSlate);
      pdf.text(dateText, pageWidth - margin - pdf.getTextWidth(dateText), y);
      y += 5;

      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(9.5);
      pdf.setTextColor(...indigo);
      pdf.text(edu.institution || '', margin, y);
      y += 7;
    });
  }

  // Skills
  if (cvData.skills.some(s => s.name)) {
    if (y > 240) { pdf.addPage(); y = margin; }
    addSectionHeader('Skills');
    const skillChunks: string[] = [];
    const levelLabels = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];
    cvData.skills.filter(s => s.name).forEach(skill => {
      skillChunks.push(`${skill.name} (${levelLabels[skill.level - 1]})`);
    });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...slate);
    const skillText = skillChunks.join(' · ');
    const wrapped = pdf.splitTextToSize(skillText, contentWidth);
    pdf.text(wrapped, margin, y);
    y += wrapped.length * 5 + 4;
  }

  // Footer
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(...lightSlate);
  pdf.text('Generated with Profilick.io', pageWidth / 2, 290, { align: 'center' });

  const name = `${p.firstName || 'CV'}_${p.lastName || ''}`.trim();
  pdf.save(`${name}_CV_Profilick.pdf`);
}
