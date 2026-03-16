import { useState } from 'react';

const MortgageCalculator = ({ price }) => {
  const [downpayment, setDownpayment] = useState(price * 0.2);
  const [years, setYears] = useState(30);
  const interest = 0.05;

  const calculate = () => {
    const loan = price - downpayment;
    const monthlyInterest = interest / 12;
    const n = years * 12;
    return (loan * monthlyInterest * Math.pow(1 + monthlyInterest, n)) / (Math.pow(1 + monthlyInterest, n) - 1);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-muted block mb-1">Pago Inicial</label>
        <input 
          type="number" 
          value={downpayment} 
          onChange={(e) => setDownpayment(e.target.value)}
          className="w-full bg-secondary/50 border border-glass-border rounded p-2"
        />
      </div>
      <div>
        <label className="text-xs text-muted block mb-1">Plazo (Años): {years}</label>
        <input 
          type="range" 
          min="5" max="35" 
          value={years} 
          onChange={(e) => setYears(e.target.value)}
          className="w-full accent-accent"
        />
      </div>
      <div className="pt-4 border-t border-glass-border">
        <p className="text-xs text-muted">Pago Mensual Estimado</p>
        <p className="text-3xl font-bold text-success">${Math.round(calculate()).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default MortgageCalculator;
