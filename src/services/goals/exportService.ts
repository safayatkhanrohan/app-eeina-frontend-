import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Goal } from '@/types/goals';
import { UserHealthProfile } from '@/types/goals/health';

export const exportToCSV = (goals: Goal[]): void => {
  const headers = ['Title', 'Category', 'Status', 'Progress', 'Target Date', 'Current Value', 'Target Value'];
  const rows = goals.map(goal => [
    goal.title,
    goal.category,
    goal.status,
    `${Math.round((goal.currentValue / goal.targetValue) * 100)}%`,
    goal.targetDate,
    goal.currentValue.toString(),
    goal.targetValue.toString()
  ]);

  let csvContent = headers.join(',') + '\n';
  rows.forEach(row => {
    csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `goals_export_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};

export const exportToJSON = (goals: Goal[]): void => {
  const dataStr = JSON.stringify(goals, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `goals_export_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
};

export const exportToPDF = (goals: Goal[]): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('Goal Management Report', 14, 22);
  
  // Add date
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Prepare table data
  const tableData = goals.map(goal => [
    goal.title,
    goal.category,
    goal.status,
    `${Math.round((goal.currentValue / goal.targetValue) * 100)}%`,
    goal.targetDate,
  ]);
  
  // Generate table
  autoTable(doc, {
    head: [['Title', 'Category', 'Status', 'Progress', 'Target Date']],
    body: tableData,
    startY: 35,
    theme: 'grid',
    headStyles: { fillColor: [34, 174, 75] }, // #22ae4b theme color
    styles: { fontSize: 9 },
  });
  
  doc.save(`goals_report_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportHealthDataForDoctor = (healthProfile: UserHealthProfile): void => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(16);
  doc.text('Health Profile Report', 14, 22);
  
  doc.setFontSize(10);
  doc.text(`Age: ${healthProfile.basic.age} | Gender: ${healthProfile.basic.gender}`, 14, 32);
  doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 38);
  
  // Basic Metrics
  doc.setFontSize(12);
  doc.text('Basic Metrics', 14, 48);
  doc.setFontSize(10);
  doc.text(`Height: ${healthProfile.basic.height} cm`, 14, 56);
  doc.text(`Weight: ${healthProfile.basic.weight} kg`, 14, 62);
  doc.text(`BMI: ${healthProfile.basic.bmi}`, 14, 68);
  
  // Lab Results
  doc.setFontSize(12);
  doc.text('Laboratory Results', 14, 82);
  
  const labData = [];
  const { cholesterol, bloodSugar, liver, kidney, vitamins, thyroid } = healthProfile.labMetrics;
  
  labData.push(['Total Cholesterol', `${cholesterol.total} mg/dL`]);
  labData.push(['LDL', `${cholesterol.ldl} mg/dL`]);
  labData.push(['HDL', `${cholesterol.hdl} mg/dL`]);
  labData.push(['Triglycerides', `${cholesterol.triglycerides} mg/dL`]);
  
  labData.push(['Glucose', `${bloodSugar.glucose} mg/dL`]);
  labData.push(['Insulin', `${bloodSugar.insulin} µU/mL`]);
  labData.push(['HOMA-IR', bloodSugar.homa_ir.toString()]);
  
  labData.push(['ALT', `${liver.alt} U/L`]);
  labData.push(['AST', `${liver.ast} U/L`]);
  labData.push(['ALP', `${liver.alp} U/L`]);
  
  labData.push(['Creatinine', `${kidney.creatinine} mg/dL`]);
  labData.push(['Urea', `${kidney.urea} mg/dL`]);
  labData.push(['eGFR', `${kidney.egfr} mL/min`]);
  
  labData.push(['Vitamin D', `${vitamins.vitaminD} ng/mL`]);
  labData.push(['Vitamin B12', `${vitamins.vitaminB12} pg/mL`]);
  labData.push(['Iron', `${vitamins.iron} µg/dL`]);
  
  labData.push(['TSH', `${thyroid.tsh} mIU/L`]);
  labData.push(['T4', `${thyroid.t4} μg/dL`]);
  labData.push(['T3', `${thyroid.t3} ng/dL`]);
  
  autoTable(doc, {
    head: [['Test', 'Result']],
    body: labData,
    startY: 88,
    theme: 'grid',
    headStyles: { fillColor: [34, 174, 75] },
    styles: { fontSize: 9 },
  });
  
  // Medical History
  if (healthProfile.healthConditions.conditions.length > 0) {
    const finalY = (doc as any).lastAutoTable.finalY || 88;
    doc.setFontSize(12);
    doc.text('Medical Conditions', 14, finalY + 10);
    doc.setFontSize(9);
    healthProfile.healthConditions.conditions.forEach((condition: string, index: number) => {
      doc.text(`• ${condition}`, 14, finalY + 18 + (index * 6));
    });
  }
  
  doc.save(`health_report_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportYearInReview = (data: {
  totalGoals: number;
  completedGoals: number;
  monthlyProgress: { month: string; completed: number }[];
  categoryBreakdown: { category: string; count: number }[];
  achievements: string[];
}): void => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Year in Review', 14, 22);
  
  doc.setFontSize(12);
  doc.text(`Total Goals: ${data.totalGoals}`, 14, 35);
  doc.text(`Completed: ${data.completedGoals}`, 14, 42);
  doc.text(`Success Rate: ${Math.round((data.completedGoals / data.totalGoals) * 100)}%`, 14, 49);
  
  // Monthly progress table
  doc.setFontSize(14);
  doc.text('Monthly Progress', 14, 62);
  autoTable(doc, {
    head: [['Month', 'Completed Goals']],
    body: data.monthlyProgress.map(m => [m.month, m.completed.toString()]),
    startY: 67,
    theme: 'striped',
    headStyles: { fillColor: [34, 174, 75] },
  });
  
  // Category breakdown
  const finalY = (doc as any).lastAutoTable.finalY;
  doc.setFontSize(14);
  doc.text('Category Breakdown', 14, finalY + 12);
  autoTable(doc, {
    head: [['Category', 'Goals']],
    body: data.categoryBreakdown.map(c => [c.category, c.count.toString()]),
    startY: finalY + 17,
    theme: 'striped',
    headStyles: { fillColor: [34, 174, 75] },
  });
  
  doc.save(`year_in_review_${new Date().getFullYear()}.pdf`);
};

export const exportData = async (
  goals: Goal[],
  format: 'csv' | 'json' | 'pdf' | 'doctor' | 'year-review',
  healthProfile?: UserHealthProfile
): Promise<void> => {
  switch (format) {
    case 'csv':
      exportToCSV(goals);
      break;
    case 'json':
      exportToJSON(goals);
      break;
    case 'pdf':
      exportToPDF(goals);
      break;
    case 'doctor':
      if (healthProfile) {
        exportHealthDataForDoctor(healthProfile);
      } else {
        throw new Error('Health profile is required for doctor export');
      }
      break;
    case 'year-review': {
      // Prepare year in review data
      const completedGoals = goals.filter(g => g.status === 'completed');
      
      // Group by month using lastUpdated date for completed goals
      const monthlyProgress: { month: string; completed: number }[] = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentYear = new Date().getFullYear();
      
      months.forEach((month, index) => {
        const count = completedGoals.filter(g => {
          const date = new Date(g.lastUpdated);
          return date.getMonth() === index && date.getFullYear() === currentYear;
        }).length;
        monthlyProgress.push({ month, completed: count });
      });
      
      // Category breakdown
      const categoryMap = new Map<string, number>();
      goals.forEach(g => {
        categoryMap.set(g.category, (categoryMap.get(g.category) || 0) + 1);
      });
      const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, count]) => ({
        category,
        count,
      }));
      
      // Achievements (completed goals)
      const achievements = completedGoals
        .slice(0, 5)
        .map(g => g.title);
      
      exportYearInReview({
        totalGoals: goals.length,
        completedGoals: completedGoals.length,
        monthlyProgress,
        categoryBreakdown,
        achievements,
      });
      break;
    }
    default:
      throw new Error(`Unknown export format: ${format}`);
  }
};