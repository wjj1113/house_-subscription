import React, { useState } from 'react';
import { Calculator, TrendingUp, Users, Calendar, DollarSign, MapPin, Award } from 'lucide-react';
import { PointCalculationInput, PointBreakdown, PointGrade } from '../types';
import { calculatePoints, getPointGrade, getPointExplanation } from '../utils/pointCalculator';

interface PointCalculatorProps {
  onCalculate: (breakdown: PointBreakdown, grade: PointGrade, userInput: PointCalculationInput) => void;
}

const PointCalculator: React.FC<PointCalculatorProps> = ({ onCalculate }) => {
  const [formData, setFormData] = useState<PointCalculationInput>({
    age: 25,
    homelessPeriod: 12,
    dependents: 0,
    subscriptionAccountPeriod: 6,
    income: 2500,
    householdType: 'single',
    region: '서울'
  });

  const [breakdown, setBreakdown] = useState<PointBreakdown | null>(null);
  const [grade, setGrade] = useState<PointGrade | null>(null);

  const handleInputChange = (field: keyof PointCalculationInput, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    const calculatedBreakdown = calculatePoints(formData);
    const calculatedGrade = getPointGrade(calculatedBreakdown.totalPoints);
    
    setBreakdown(calculatedBreakdown);
    setGrade(calculatedGrade);
    onCalculate(calculatedBreakdown, calculatedGrade, formData);
  };

  const explanations = breakdown ? getPointExplanation(breakdown) : null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center">
            <Users className="text-blue-600 mr-2" size={16} />
            나이
          </label>
          <input 
            type="range" 
            min="19" 
            max="100" 
            value={formData.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
            className="w-full"
          />
          <div className="text-center mt-1 text-sm text-gray-600">{formData.age}세</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center">
            <Calendar className="text-red-600 mr-2" size={16} />
            무주택 기간 (개월)
          </label>
          <input 
            type="range" 
            min="0" 
            max="600" 
            value={formData.homelessPeriod}
            onChange={(e) => handleInputChange('homelessPeriod', parseInt(e.target.value) || 0)}
            className="w-full"
          />
          <div className="text-center mt-1 text-sm text-gray-600">{formData.homelessPeriod}개월</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center">
            <Users className="text-orange-600 mr-2" size={16} />
            부양가족 수
          </label>
          <input 
            type="range" 
            min="0" 
            max="10" 
            value={formData.dependents}
            onChange={(e) => handleInputChange('dependents', parseInt(e.target.value) || 0)}
            className="w-full"
          />
          <div className="text-center mt-1 text-sm text-gray-600">{formData.dependents}명</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center">
            <TrendingUp className="text-green-600 mr-2" size={16} />
            청약통장 가입기간 (개월)
          </label>
          <input 
            type="range" 
            min="0" 
            max="600" 
            value={formData.subscriptionAccountPeriod}
            onChange={(e) => handleInputChange('subscriptionAccountPeriod', parseInt(e.target.value) || 0)}
            className="w-full"
          />
          <div className="text-center mt-1 text-sm text-gray-600">{formData.subscriptionAccountPeriod}개월</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center">
            <DollarSign className="text-purple-600 mr-2" size={16} />
            연소득 (만원)
          </label>
          <input 
            type="range" 
            min="0" 
            max="10000" 
            value={formData.income}
            onChange={(e) => handleInputChange('income', parseInt(e.target.value) || 0)}
            className="w-full"
          />
          <div className="text-center mt-1 text-sm text-gray-600">{formData.income}만원</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">가구 형태</label>
            <select 
              value={formData.householdType}
              onChange={(e) => handleInputChange('householdType', e.target.value as any)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="single">1인 가구</option>
              <option value="couple">부부</option>
              <option value="family">가족</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <MapPin className="text-gray-600 mr-2" size={16} />
              선호 지역
            </label>
            <select 
              value={formData.region}
              onChange={(e) => handleInputChange('region', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="서울">서울</option>
              <option value="경기">경기</option>
              <option value="인천">인천</option>
              <option value="부산">부산</option>
              <option value="대구">대구</option>
              <option value="대전">대전</option>
              <option value="광주">광주</option>
              <option value="울산">울산</option>
              <option value="지방">기타 지방</option>
            </select>
          </div>
        </div>
        
        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <Calculator className="mr-2" size={20} />
          가점 계산하기
        </button>
      </div>

      {breakdown && grade && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Award className="text-yellow-500 mr-2" size={24} />
            <span className="text-lg font-medium">가점 결과</span>
          </div>
          
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {breakdown.totalPoints}점
          </div>
          
          <div className="text-gray-600 mb-4">
            {grade.description}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">나이</span>
              <span className="font-medium">{breakdown.agePoints}점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(breakdown.agePoints / 20) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">무주택 기간</span>
              <span className="font-medium">{breakdown.homelessPoints}점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(breakdown.homelessPoints / 30) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">부양가족 수</span>
              <span className="font-medium">{breakdown.dependentsPoints}점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(breakdown.dependentsPoints / 20) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">청약통장</span>
              <span className="font-medium">{breakdown.subscriptionAccountPoints}점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(breakdown.subscriptionAccountPoints / 20) * 100}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">소득</span>
              <span className="font-medium">{breakdown.incomePoints}점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(breakdown.incomePoints / 10) * 100}%` }}></div>
            </div>
          </div>

          <div className="text-left text-sm text-gray-600 space-y-2">
            {explanations && (
              <>
                <p><strong>나이:</strong> {explanations.age}</p>
                <p><strong>무주택 기간:</strong> {explanations.homeless}</p>
                <p><strong>부양가족 수:</strong> {explanations.dependents}</p>
                <p><strong>청약통장:</strong> {explanations.subscriptionAccount}</p>
                <p><strong>소득:</strong> {explanations.income}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PointCalculator; 