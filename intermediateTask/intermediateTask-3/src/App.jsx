import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [overwrite, setOverwrite] = useState(false);

  const formatNumber = (num) => {
    if (num === 'Error') return num;
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const handleNumber = (num) => {
    if (overwrite) {
      setCurrentValue(String(num));
      setOverwrite(false);
    } else {
      setCurrentValue(currentValue === '0' ? String(num) : currentValue + num);
    }
  };

  const handleDecimal = () => {
    if (overwrite) {
      setCurrentValue('0.');
      setOverwrite(false);
    } else if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const handleClear = () => {
    setCurrentValue('0');
  };

  const handleAllClear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(false);
  };

  const calculate = (prev, current, op) => {
    const a = parseFloat(prev);
    const b = parseFloat(current);
    
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? 'Error' : a / b;
      default: return current;
    }
  };

  const handleOperation = (op) => {
    if (currentValue === 'Error') {
      handleAllClear();
      return;
    }

    if (previousValue === null) {
      setPreviousValue(currentValue);
      setOperation(op);
      setOverwrite(true);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setCurrentValue(String(result));
      setPreviousValue(String(result));
      setOperation(op);
      setOverwrite(true);
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, currentValue, operation);
      setCurrentValue(String(result));
      setPreviousValue(null);
      setOperation(null);
      setOverwrite(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleNumber(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === '+') {
        e.preventDefault();
        handleOperation('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperation('-');
      } else if (e.key === '*') {
        e.preventDefault();
        handleOperation('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperation('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleAllClear();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display" aria-label="Calculator display">
          <div className="operation">{previousValue && operation ? `${formatNumber(previousValue)} ${operation}` : ''}</div>
          <div className="current">{formatNumber(currentValue)}</div>
        </div>
        <div className="buttons">
          <button className="btn function" onClick={handleAllClear} aria-label="All Clear">AC</button>
          <button className="btn function" onClick={handleClear} aria-label="Clear">C</button>
          <button className="btn function" onClick={() => handleOperation('÷')} aria-label="Divide">÷</button>
          <button className="btn operator" onClick={() => handleOperation('×')} aria-label="Multiply">×</button>

          <button className="btn" onClick={() => handleNumber(7)} aria-label="7">7</button>
          <button className="btn" onClick={() => handleNumber(8)} aria-label="8">8</button>
          <button className="btn" onClick={() => handleNumber(9)} aria-label="9">9</button>
          <button className="btn operator" onClick={() => handleOperation('-')} aria-label="Subtract">-</button>

          <button className="btn" onClick={() => handleNumber(4)} aria-label="4">4</button>
          <button className="btn" onClick={() => handleNumber(5)} aria-label="5">5</button>
          <button className="btn" onClick={() => handleNumber(6)} aria-label="6">6</button>
          <button className="btn operator" onClick={() => handleOperation('+')} aria-label="Add">+</button>

          <button className="btn" onClick={() => handleNumber(1)} aria-label="1">1</button>
          <button className="btn" onClick={() => handleNumber(2)} aria-label="2">2</button>
          <button className="btn" onClick={() => handleNumber(3)} aria-label="3">3</button>
          <button className="btn operator equals" onClick={handleEquals} aria-label="Equals">=</button>

          <button className="btn zero" onClick={() => handleNumber(0)} aria-label="0">0</button>
          <button className="btn" onClick={handleDecimal} aria-label="Decimal">.</button>
        </div>
      </div>
    </div>
  );
}

export default App;