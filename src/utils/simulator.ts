import { Strategy, SimulationResult, PointCalculationInput } from '../types';

// 전략 데이터 (실제로는 API나 데이터베이스에서 가져올 수 있음)
export const strategies: Strategy[] = [
  {
    id: 'public-small',
    name: '중소형 공공분양',
    description: '공공주택 중 소형 평수 위주 청약',
    minPoints: 40,
    maxPoints: 100,
    successRate: 75,
    region: '전국',
    householdType: 'single',
    category: 'public',
    difficulty: 'easy'
  },
  {
    id: 'public-medium',
    name: '중형 공공분양',
    description: '공공주택 중형 평수 청약',
    minPoints: 60,
    maxPoints: 100,
    successRate: 60,
    region: '전국',
    householdType: 'couple',
    category: 'public',
    difficulty: 'medium'
  },
  {
    id: 'private-special',
    name: '민간 특별공급',
    description: '민간분양 특별공급 청약',
    minPoints: 70,
    maxPoints: 100,
    successRate: 45,
    region: '서울',
    householdType: 'family',
    category: 'private',
    difficulty: 'hard'
  },
  {
    id: 'local-public',
    name: '지방 공공분양',
    description: '지방 공공주택 청약',
    minPoints: 30,
    maxPoints: 100,
    successRate: 85,
    region: '지방',
    householdType: 'single',
    category: 'public',
    difficulty: 'easy'
  },
  {
    id: 'newlywed',
    name: '신혼부부 특별공급',
    description: '신혼부부 전용 특별공급',
    minPoints: 50,
    maxPoints: 100,
    successRate: 70,
    region: '전국',
    householdType: 'couple',
    category: 'special',
    difficulty: 'medium'
  },
  {
    id: 'youth-special',
    name: '청년 특별공급',
    description: '청년 전용 특별공급',
    minPoints: 45,
    maxPoints: 100,
    successRate: 65,
    region: '전국',
    householdType: 'single',
    category: 'special',
    difficulty: 'medium'
  }
];

// 시뮬레이션 실행
export const runSimulation = (userPoints: number, input: PointCalculationInput): SimulationResult => {
  // 사용자 조건에 맞는 전략 필터링
  const eligibleStrategies = strategies.filter(strategy => {
    const pointsMatch = userPoints >= strategy.minPoints && userPoints <= strategy.maxPoints;
    const householdMatch = strategy.householdType === input.householdType || strategy.householdType === 'single';
    const regionMatch = strategy.region === '전국' || strategy.region === input.region;
    
    return pointsMatch && householdMatch && regionMatch;
  });

  // 추천 전략 (성공률 높은 순)
  const recommendedStrategies = eligibleStrategies
    .sort((a, b) => b.successRate - a.successRate)
    .slice(0, 3);

  // 대안 전략 (가점 요구사항이 낮은 순)
  const alternativeStrategies = strategies
    .filter(strategy => strategy.minPoints < userPoints)
    .sort((a, b) => a.minPoints - b.minPoints)
    .slice(0, 3);

  // 전체 성공 확률 계산
  const avgSuccessRate = eligibleStrategies.length > 0 
    ? eligibleStrategies.reduce((sum, strategy) => sum + strategy.successRate, 0) / eligibleStrategies.length
    : 0;

  return {
    userPoints,
    recommendedStrategies,
    alternativeStrategies,
    successProbability: avgSuccessRate
  };
};

// 전략별 상세 정보
export const getStrategyDetails = (strategyId: string): Strategy | undefined => {
  return strategies.find(strategy => strategy.id === strategyId);
};

// 난이도별 색상
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy': return '#4CAF50';
    case 'medium': return '#FF9800';
    case 'hard': return '#F44336';
    default: return '#757575';
  }
};

// 성공률별 색상
export const getSuccessRateColor = (rate: number): string => {
  if (rate >= 70) return '#4CAF50';
  if (rate >= 50) return '#FF9800';
  return '#F44336';
}; 