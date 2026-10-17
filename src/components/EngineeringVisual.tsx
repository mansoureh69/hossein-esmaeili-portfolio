import { useId } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
export default function EngineeringVisual({ className = '' }: { type?: string; className?: string }) {
  const grid = useId();
  const { t } = useLanguage();
  return <svg className={`engineering-visual ${className}`} viewBox="0 0 600 270" fill="none" role="img" aria-label={t('Conceptual engineering diagram')}>
    <defs><pattern id={grid} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="currentColor" opacity=".12" /></pattern></defs>
    <rect width="600" height="270" fill={`url(#${grid})`} />
    <g stroke="currentColor" strokeWidth="1.4">
      <path d="M95 230H505M135 230V78L300 30L465 78V230M135 78H465M300 30V230M135 128H465M135 178H465" />
      {[0,1,2].map(row => <g key={row}>{[0,1,2,3,4,5].map(col => <rect key={col} x={154+col*50} y={91+row*50} width="24" height="23" opacity=".45" />)}</g>)}
      <path d="M110 243H490M110 237V249M490 237V249" opacity=".3" />
      <path d="M315 221V66M315 108H445M315 158H445M315 208H445" stroke="#cf8047" strokeWidth="2" />
      {[108,158,208].map(y => <g key={y}><circle cx="315" cy={y} r="3" fill="#cf8047" stroke="none"/><circle cx="445" cy={y} r="4" stroke="#cf8047"/></g>)}
    </g>
  </svg>;
}
