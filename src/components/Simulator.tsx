import React, { useState } from 'react';
import { Target, MapPin, TrendingUp, Star, ChevronRight, Award, Users, Calendar } from 'lucide-react';
import { Strategy, SimulationResult, PointCalculationInput } from '../types';
import { runSimulation, getDifficultyColor, getSuccessRateColor } from '../utils/simulator';

interface SimulatorProps {
  userPoints: number;
  userInput: PointCalculationInput;
}

const Simulator: React.FC<SimulatorProps> = ({ userPoints, userInput }) => {
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);

  const handleRunSimulation = () => {
    const result = runSimulation(userPoints, userInput);
    setSimulationResult(result);
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '쉬움';
      case 'medium': return '보통';
      case 'hard': return '어려움';
      default: return '알 수 없음';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'public': return '공공분양';
      case 'private': return '민간분양';
      case 'special': return '특별공급';
      default: return '기타';
    }
  };

  const StrategyCard: React.FC<{ strategy: Strategy; type: 'recommended' | 'alternative' }> = ({ strategy, type }) => (
    <div 
      className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => setSelectedStrategy(strategy)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{strategy.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{strategy.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          type === 'recommended' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {type === 'recommended' ? '추천' : '대안'}
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-1" />
          {strategy.region}
        </div>
        <div className="text-sm font-medium" style={{ color: getSuccessRateColor(strategy.successRate) }}>
          {strategy.successRate}% 확률
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <span 
            className="px-2 py-1 rounded text-xs font-medium"
            style={{ 
              backgroundColor: getDifficultyColor(strategy.difficulty) + '20',
              color: getDifficultyColor(strategy.difficulty)
            }}
          >
            {getDifficultyText(strategy.difficulty)}
          </span>
          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {getCategoryText(strategy.category)}
          </span>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{userPoints}점</div>
            <div className="text-sm text-gray-600">현재 가점</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{userInput.region}</div>
            <div className="text-sm text-gray-600">선호 지역</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {userInput.householdType === 'single' ? '1인' : 
               userInput.householdType === 'couple' ? '부부' : '가족'}
            </div>
            <div className="text-sm text-gray-600">가구 형태</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{userInput.income}만원</div>
            <div className="text-sm text-gray-600">연소득</div>
          </div>
        </div>
        
        <button 
          onClick={handleRunSimulation}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <Target className="mr-2" size={20} />
          전략 시뮬레이션 실행
        </button>
      </div>

      {simulationResult && (
        <>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="text-blue-600 mr-2" size={24} />
              <span className="text-lg font-medium">시뮬레이션 결과</span>
            </div>
            
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {simulationResult.successProbability.toFixed(1)}%
            </div>
            
            <div className="text-gray-600 mb-4">
              {simulationResult.successProbability >= 70 ? '높은 성공 가능성! 🎉' :
               simulationResult.successProbability >= 50 ? '보통 성공 가능성 💪' : '낮은 성공 가능성 🤔'}
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${simulationResult.successProbability}%`,
                  backgroundColor: getSuccessRateColor(simulationResult.successProbability)
                }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center">
              <Star className="text-yellow-500 mr-2" size={20} />
              추천 전략
            </h3>
            
            {simulationResult.recommendedStrategies.length > 0 ? (
              simulationResult.recommendedStrategies.map(strategy => (
                <StrategyCard key={strategy.id} strategy={strategy} type="recommended" />
              ))
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Star className="text-yellow-500 mr-2" size={20} />
                  <span className="font-medium">알림</span>
                </div>
                <p className="text-sm text-gray-700">
                  현재 가점으로 추천할 수 있는 전략이 없습니다. 대안 전략을 확인해보세요!
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center">
              <Users className="text-blue-500 mr-2" size={20} />
              대안 전략
            </h3>
            
            {simulationResult.alternativeStrategies.length > 0 ? (
              simulationResult.alternativeStrategies.map(strategy => (
                <StrategyCard key={strategy.id} strategy={strategy} type="alternative" />
              ))
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Users className="text-blue-500 mr-2" size={20} />
                  <span className="font-medium">정보</span>
                </div>
                <p className="text-sm text-gray-700">
                  대안 전략이 없습니다. 가점을 높이거나 다른 조건을 고려해보세요.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {selectedStrategy && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">{selectedStrategy.name}</h3>
            <button 
              onClick={() => setSelectedStrategy(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">{selectedStrategy.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">필요 가점</div>
              <div className="font-bold">{selectedStrategy.minPoints}~{selectedStrategy.maxPoints}점</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">예상 성공률</div>
              <div 
                className="font-bold"
                style={{ color: getSuccessRateColor(selectedStrategy.successRate) }}
              >
                {selectedStrategy.successRate}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">적용 지역</div>
              <div className="font-bold">{selectedStrategy.region}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">가구 형태</div>
              <div className="font-bold">
                {selectedStrategy.householdType === 'single' ? '1인 가구' : 
                 selectedStrategy.householdType === 'couple' ? '부부' : '가족'}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 mb-6">
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: getDifficultyColor(selectedStrategy.difficulty) + '20',
                color: getDifficultyColor(selectedStrategy.difficulty)
              }}
            >
              {getDifficultyText(selectedStrategy.difficulty)}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {getCategoryText(selectedStrategy.category)}
            </span>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Award className="text-yellow-500 mr-2" size={20} />
              <span className="font-medium">전략 TIP</span>
            </div>
            <p className="text-sm text-gray-700">
              {selectedStrategy.difficulty === 'easy' ? '이 전략은 비교적 당첨 확률이 높습니다!' :
               selectedStrategy.difficulty === 'medium' ? '적당한 경쟁률로 도전해볼 만합니다.' :
               '높은 경쟁률이 예상되니 전략적 접근이 필요합니다.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulator; 