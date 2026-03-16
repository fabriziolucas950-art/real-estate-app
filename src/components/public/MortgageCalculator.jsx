import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const MortgageCalculator = ({ price }) => {
  const [downPayment, setDownPayment] = useState(price * 0.2);
  const [interestRate, setInterestRate] = useState(5.5);
  const [years, setYears] = useState(30);

  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  const monthlyPayment = loanAmount > 0 
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    : 0;

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>
        <Calculator size={20} color="var(--accent)" />
        <span>Calculadora Hipotecaria</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>Entrega Inicial (USD)</label>
          <input 
            type="number" 
            className="search-input" style={{ width: '100%', padding: '0.5rem' }}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>Tasa interés %</label>
            <input 
              type="number" step="0.1"
              className="search-input" style={{ width: '100%', padding: '0.5rem' }}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>Años</label>
            <input 
              type="number"
              className="search-input" style={{ width: '100%', padding: '0.5rem' }}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>
        </div>

        <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--background)', borderRadius: '0.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cuota Mensual Est.</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent)' }}>
            USD {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
