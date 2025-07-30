import React, { useState } from 'react';
import { 
  Calculator, 
  Target, 
  Award, 
  Home
} from 'lucide-react';
import PointCalculator from './components/PointCalculator';
import PointChart from './components/PointChart';
import Simulator from './components/Simulator';
import { PointCalculationInput, PointGrade, PointBreakdown } from './types';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState<'home' | 'calculator' | 'simulator'>('home');
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<PointBreakdown | null>(null);
  const [grade, setGrade] = useState<PointGrade | null>(null);
  const [userInput, setUserInput] = useState<PointCalculationInput | null>(null);

  const handleCalculate = (calculatedBreakdown: PointBreakdown, calculatedGrade: PointGrade, userInputData: PointCalculationInput) => {
    setBreakdown(calculatedBreakdown);
    setGrade(calculatedGrade);
    setUserPoints(calculatedBreakdown.totalPoints);
    setUserInput(userInputData);
  };

  const handleNextStep = () => {
    setCurrentStep('simulator');
  };

  const handleBackToCalculator = () => {
    setCurrentStep('calculator');
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
  };

  const NavButton = ({ icon: Icon, label, step, active }: { icon: any; label: string; step: string; active: boolean }) => (
    <button
      onClick={() => setCurrentStep(step as 'home' | 'calculator' | 'simulator')}
      className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
        active 
          ? 'text-blue-600 bg-blue-50' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      <Icon size={20} />
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          청약 가점 계산기 & 시뮬레이터
        </h1>
        <p className="text-gray-600 mt-2">당신만의 맞춤 청약 전략을 찾아보세요</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => setCurrentStep('calculator')}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl cursor-pointer hover:shadow-lg transition-all"
        >
          <Calculator className="text-blue-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">가점 계산기</h3>
          <p className="text-gray-600 text-sm">내 청약 가점을 확인해보세요</p>
        </div>
        
        <div 
          onClick={() => setCurrentStep('simulator')}
          className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl cursor-pointer hover:shadow-lg transition-all"
        >
          <Target className="text-green-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">전략 시뮬레이터</h3>
          <p className="text-gray-600 text-sm">가점 기반 맞춤 전략</p>
        </div>
      </div>

      {userPoints && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Award className="text-yellow-500 mr-2" size={24} />
            <span className="text-lg font-medium">현재 가점</span>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {userPoints}점
          </div>
          <div className="text-gray-600 mb-4">
            {grade?.description}
          </div>
          <button 
            onClick={() => setCurrentStep('simulator')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            전략 시뮬레이션 실행
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Home className="text-white" size={16} />
              </div>
              <span className="font-bold text-lg">청약전략</span>
            </div>
            {userPoints && (
              <div className="flex items-center space-x-2">
                <Award className="text-yellow-500" size={20} />
                <span className="text-sm font-medium">{userPoints}점</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {currentStep === 'home' && renderHome()}
        
        {currentStep === 'calculator' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">내 청약 가점은 몇 점일까? 🎯</h2>
              <p className="text-gray-600">간단한 정보 입력으로 가점을 확인해보세요</p>
            </div>
            <PointCalculator onCalculate={handleCalculate} />
            
            {breakdown && grade && (
              <div className="mt-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {breakdown.totalPoints}점
                  </div>
                  <div className="text-gray-600 mb-4">
                    {grade.description}
                  </div>
                  <button 
                    onClick={handleNextStep}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    전략 시뮬레이션 실행
                  </button>
                </div>
                
                <PointChart breakdown={breakdown} />
              </div>
            )}
          </>
        )}
        
        {currentStep === 'simulator' && (
          <>
            {userPoints && userInput ? (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">내 점수로 가능한 전략은? ✨</h2>
                  <p className="text-gray-600">가점 {userPoints}점 기준 맞춤 전략</p>
                </div>
                <Simulator userPoints={userPoints} userInput={userInput} />
              </>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-600">가점 계산을 먼저 완료해주세요.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <NavButton icon={Home} label="홈" step="home" active={currentStep === 'home'} />
            <NavButton icon={Calculator} label="가점계산" step="calculator" active={currentStep === 'calculator'} />
            <NavButton icon={Target} label="시뮬레이션" step="simulator" active={currentStep === 'simulator'} />
          </div>
        </div>
      </div>
      
      {/* Bottom padding for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}

export default App;
