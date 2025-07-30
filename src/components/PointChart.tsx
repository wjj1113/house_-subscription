import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { PointBreakdown } from '../types';
import { TrendingUp, BarChart3 } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface PointChartProps {
  breakdown: PointBreakdown;
}

const PointChart: React.FC<PointChartProps> = ({ breakdown }) => {
  // 도넛 차트 데이터
  const doughnutData = {
    labels: ['나이', '무주택 기간', '부양가족 수', '청약통장', '소득'],
    datasets: [
      {
        data: [
          breakdown.agePoints,
          breakdown.homelessPoints,
          breakdown.dependentsPoints,
          breakdown.subscriptionAccountPoints,
          breakdown.incomePoints
        ],
        backgroundColor: [
          '#3B82F6', // blue-500
          '#EF4444', // red-500
          '#F97316', // orange-500
          '#10B981', // green-500
          '#8B5CF6'  // purple-500
        ],
        borderColor: [
          '#2563EB', // blue-600
          '#DC2626', // red-600
          '#EA580C', // orange-600
          '#059669', // green-600
          '#7C3AED'  // purple-600
        ],
        borderWidth: 2,
      },
    ],
  };

  // 바 차트 데이터
  const barData = {
    labels: ['나이', '무주택 기간', '부양가족 수', '청약통장', '소득'],
    datasets: [
      {
        label: '현재 점수',
        data: [
          breakdown.agePoints,
          breakdown.homelessPoints,
          breakdown.dependentsPoints,
          breakdown.subscriptionAccountPoints,
          breakdown.incomePoints
        ],
        backgroundColor: [
          '#3B82F6', // blue-500
          '#EF4444', // red-500
          '#F97316', // orange-500
          '#10B981', // green-500
          '#8B5CF6'  // purple-500
        ],
        borderColor: [
          '#2563EB', // blue-600
          '#DC2626', // red-600
          '#EA580C', // orange-600
          '#059669', // green-600
          '#7C3AED'  // purple-600
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: '최대 점수',
        data: [20, 30, 20, 20, 10],
        backgroundColor: 'rgba(156, 163, 175, 0.3)', // gray-400 with opacity
        borderColor: '#9CA3AF', // gray-400
        borderWidth: 1,
        borderRadius: 4,
        type: 'bar' as const,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3B82F6',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}점`;
          }
        }
      }
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3B82F6',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed}점`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 30,
        ticks: {
          stepSize: 5,
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <TrendingUp className="text-blue-600 mr-2" size={20} />
          <h3 className="text-lg font-bold">가점 분포 (도넛 차트)</h3>
        </div>
        <div className="h-64">
          <Doughnut data={doughnutData} options={options} />
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <BarChart3 className="text-green-600 mr-2" size={20} />
          <h3 className="text-lg font-bold">항목별 점수 비교 (바 차트)</h3>
        </div>
        <div className="h-64">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default PointChart; 