// 청약 가점 계산 관련 타입
export interface PointCalculationInput {
  age: number;
  homelessPeriod: number; // 무주택 기간 (개월)
  dependents: number; // 부양가족 수
  subscriptionAccountPeriod: number; // 청약통장 가입기간 (개월)
  income: number; // 연소득 (만원)
  householdType: 'single' | 'couple' | 'family'; // 가구 형태
  region: string; // 선호 지역
}

export interface PointBreakdown {
  agePoints: number;
  homelessPoints: number;
  dependentsPoints: number;
  subscriptionAccountPoints: number;
  incomePoints: number;
  totalPoints: number;
}

export interface PointGrade {
  grade: 'low' | 'medium' | 'high';
  description: string;
  color: string;
}

// 시뮬레이터 관련 타입
export interface Strategy {
  id: string;
  name: string;
  description: string;
  minPoints: number;
  maxPoints: number;
  successRate: number; // 0-100
  region: string;
  householdType: 'single' | 'couple' | 'family';
  category: 'public' | 'private' | 'special';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SimulationResult {
  userPoints: number;
  recommendedStrategies: Strategy[];
  alternativeStrategies: Strategy[];
  successProbability: number;
}

// 차트 데이터 타입
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
} 