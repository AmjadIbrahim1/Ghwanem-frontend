import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Student } from '../types'

export const generatePDF = async (student: Student) => {
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.width = '800px'
  container.style.padding = '40px'
  container.style.backgroundColor = 'white'
  container.style.fontFamily = 'Cairo, sans-serif'
  container.style.direction = 'rtl'

  // Calculate total percentage
  const totalMaxScore = student.grades.reduce((sum, grade) => sum + grade.maxScore, 0)
  const totalPercentage = ((student.totalScore / totalMaxScore) * 100).toFixed(2)

  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #1E90FF; font-family: Almarai, sans-serif; font-size: 28px; margin-bottom: 8px;">
        ${student.schoolInfo?.schoolName || 'مدرسة الغوانم الاعدادية المشتركة بالحوطا الغربية'}
      </h1>
      <h2 style="color: #28A745; font-size: 20px; margin-bottom: 5px;">
        ${student.schoolInfo?.educationOffice || 'إدارة ديروط التعليمية'}
      </h2>
      <h3 style="color: #333; font-size: 22px; margin-bottom: 20px;">
        نتيجة الطالب - ${student.grade || 'الصف الثالث الإعدادي'}
      </h3>
    </div>

    <div style="background: linear-gradient(135deg, #1E90FF 0%, #28A745 100%); padding: 20px; border-radius: 10px; margin-bottom: 30px; color: white;">
      <h3 style="font-size: 24px; margin-bottom: 10px;">${student.name}</h3>
      <p style="font-size: 18px; margin: 5px 0;">رقم الجلوس: ${student.seatNumber}</p>
      <p style="font-size: 18px; margin: 5px 0;">السنة الدراسية: ${student.academicYear}</p>
      <p style="font-size: 18px; margin: 5px 0;">الفصل الدراسي: ${student.semester}</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 30px;">
      <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; text-align: center;">
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">المجموع الكلي</p>
        <p style="color: #1E90FF; font-size: 28px; font-weight: bold; margin: 0;">${student.totalScore.toFixed(2)}</p>
        <p style="color: #666; font-size: 12px; margin-top: 5px;">من ${totalMaxScore}</p>
      </div>
      <div style="background: #fff7ed; padding: 20px; border-radius: 10px; text-align: center;">
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">النسبة المئوية</p>
        <p style="color: #28A745; font-size: 28px; font-weight: bold; margin: 0;">${totalPercentage}%</p>
      </div>
      <div style="background: #fef3c7; padding: 20px; border-radius: 10px; text-align: center;">
        <p style="color: #666; font-size: 14px; margin-bottom: 5px;">الترتيب</p>
        <p style="color: #f59e0b; font-size: 28px; font-weight: bold; margin: 0;">#${student.rank}</p>
      </div>
    </div>

    <h3 style="color: #333; font-size: 20px; margin-bottom: 15px; font-family: Almarai, sans-serif;">
      تفاصيل الدرجات
    </h3>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;">المادة</th>
          <th style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">الدرجة</th>
          <th style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">النهاية العظمى</th>
          <th style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">النسبة المئوية</th>
        </tr>
      </thead>
      <tbody>
        ${student.grades.map((grade, index) => {
          const percentage = ((grade.score / grade.maxScore) * 100).toFixed(1)
          const bgColor = index % 2 === 0 ? '#ffffff' : '#f9fafb'
          return `
            <tr style="background: ${bgColor};">
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${grade.subject}</td>
              <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb; font-weight: bold; color: #1E90FF;">${grade.score}</td>
              <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">${grade.maxScore}</td>
              <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb; font-weight: bold; color: #28A745;">${percentage}%</td>
            </tr>
          `
        }).join('')}
      </tbody>
    </table>

    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
      <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
        تاريخ الطباعة: ${new Date().toLocaleDateString('ar-EG')}
      </p>
      <div style="color: #999; font-size: 12px;">
        <p style="margin: 5px 0;">© ${new Date().getFullYear()} ${student.schoolInfo?.schoolName || 'مدرسة الغوانم'} - جميع الحقوق محفوظة</p>
        ${student.schoolInfo ? `
          <p style="margin: 5px 0; font-weight: bold; color: #666;">تطوير وبرمجة:</p>
          <p style="margin: 3px 0;">${student.schoolInfo.developerName}</p>
          <p style="margin: 3px 0;">Phone: ${student.schoolInfo.developerPhone}</p>
          <p style="margin: 3px 0;">Email: ${student.schoolInfo.developerEmail}</p>
        ` : ''}
      </div>
    </div>
  `

  document.body.appendChild(container)

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    pdf.save(`نتيجة_${student.name}_${student.seatNumber}.pdf`)
  } finally {
    document.body.removeChild(container)
  }
}