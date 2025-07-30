import { PointCalculationInput, PointBreakdown, PointGrade } from '../types';

// 가점 계산 로직
export const calculatePoints = (input: PointCalculationInput): PointBreakdown => {
  // 나이 가점 (만 19세 이상, 만 39세 이하: 20점, 만 40세 이상: 10점)
  const agePoints = input.age >= 19 && input.age <= 39 ? 20 : 10;

  // 무주택 기간 가점 (최대 30점)
  const homelessPoints = Math.min(input.homelessPeriod * 0.5, 30);

  // 부양가족 수 가점 (최대 20점)
  const dependentsPoints = Math.min(input.dependents * 5, 20);

  // 청약통장 가입기간 가점 (최대 20점)
  const subscriptionAccountPoints = Math.min(input.subscriptionAccountPeriod * 0.3, 20);

  // 소득 가점 (연소득 3,000만원 이하: 10점, 3,000만원 초과: 5점)
  const incomePoints = input.income <= 3000 ? 10 : 5;

  const totalPoints = agePoints + homelessPoints + dependentsPoints + subscriptionAccountPoints + incomePoints;

  return {
    agePoints,
    homelessPoints,
    dependentsPoints,
    subscriptionAccountPoints,
    incomePoints,
    totalPoints
  };
};

// 등급 판정
export const getPointGrade = (totalPoints: number): PointGrade => {
  if (totalPoints >= 80) {
    return {
      grade: 'high',
      description: '높음 - 청약 경쟁력이 우수합니다!',
      color: '#4CAF50'
    };
  } else if (totalPoints >= 60) {
    return {
      grade: 'medium',
      description: '보통 - 전략적 접근이 필요합니다.',
      color: '#FF9800'
    };
  } else {
    return {
      grade: 'low',
      description: '낮음 - 대안 전략을 고려해보세요.',
      color: '#F44336'
    };
  }
};

// 가점별 설명
export const getPointExplanation = (breakdown: PointBreakdown) => {
  return {
    age: `나이 가점: ${breakdown.agePoints}점 (만 19-39세: 20점, 만 40세 이상: 10점)`,
    homeless: `무주택 기간 가점: ${breakdown.homelessPoints}점 (개월당 0.5점, 최대 30점)`,
    dependents: `부양가족 수 가점: ${breakdown.dependentsPoints}점 (1명당 5점, 최대 20점)`,
    subscriptionAccount: `청약통장 가입기간 가점: ${breakdown.subscriptionAccountPoints}점 (개월당 0.3점, 최대 20점)`,
    income: `소득 가점: ${breakdown.incomePoints}점 (연소득 3,000만원 이하: 10점, 초과: 5점)`
  };
}; 