import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.h2`
  color: #34495e;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' }>`
  background: ${props => {
    switch (props.variant) {
      case 'primary': return '#3498db';
      case 'secondary': return '#95a5a6';
      case 'success': return '#27ae60';
      default: return '#3498db';
    }
  }};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: 20px;
`;

export const Flex = styled.div<{ direction?: 'row' | 'column'; justify?: string; align?: string }>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  gap: 16px;
`;

export const Badge = styled.span<{ color?: string }>`
  background: ${props => props.color || '#3498db'};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const ProgressBar = styled.div<{ progress: number; color?: string }>`
  width: 100%;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.color || '#3498db'};
    transition: width 0.3s ease;
  }
`;

export const Alert = styled.div<{ type?: 'success' | 'warning' | 'error' | 'info' }>`
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  background: ${props => {
    switch (props.type) {
      case 'success': return '#d4edda';
      case 'warning': return '#fff3cd';
      case 'error': return '#f8d7da';
      case 'info': return '#d1ecf1';
      default: return '#d1ecf1';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#155724';
      case 'warning': return '#856404';
      case 'error': return '#721c24';
      case 'info': return '#0c5460';
      default: return '#0c5460';
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return '#c3e6cb';
      case 'warning': return '#ffeaa7';
      case 'error': return '#f5c6cb';
      case 'info': return '#bee5eb';
      default: return '#bee5eb';
    }
  }};
`; 