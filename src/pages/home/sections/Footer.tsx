import { useAppSelector } from '@/shared/hooks';
import React from 'react';

const Footer: React.FC = () => {
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === 'dark';

  return (
    <footer style={{
      padding: '32px',
      borderTop: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.07)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '12px',
      maxWidth: '1100px', margin: '0 auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: 28, height: 28, borderRadius: '7px',
          background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
           fontWeight: 700, fontSize: '11px', color: 'white',
        }}>MS</div>
        <span style={{ fontSize: '13px', color: dark ? 'rgba(241,245,249,0.35)' : 'rgba(15,23,42,0.35)', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
          Musaab Suhail · 2026
        </span>
      </div>
      <span style={{ fontSize: '12px', color: dark ? 'rgba(241,245,249,0.25)' : 'rgba(15,23,42,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>
        Built with React + TypeScript + Redux
      </span>
    </footer>
  );
};

export default Footer;
export { Footer };
