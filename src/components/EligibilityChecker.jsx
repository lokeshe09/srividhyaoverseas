import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { useEnquiry } from './EnquiryModal.jsx';

const CATEGORIES = [
  { value: 'general', label: 'General / EWS', min: 50 },
  { value: 'reserved', label: 'SC / ST / OBC', min: 40 },
  { value: 'pwd', label: 'PwD', min: 45 },
];

// Quick self-check against the NMC eligibility criteria for MBBS abroad.
export default function EligibilityChecker() {
  const { openEnquiry } = useEnquiry();
  const [f, setF] = useState({ neet: '', category: 'general', pcb: '', english: 'yes', dob: '' });
  const [result, setResult] = useState(null);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  const check = (e) => {
    e.preventDefault();
    const issues = [];
    const warnings = [];
    const cat = CATEGORIES.find((c) => c.value === f.category);
    const pcb = parseFloat(f.pcb);

    if (f.neet === 'no') issues.push('NEET-UG qualification is mandatory for MBBS abroad.');
    if (f.neet === 'awaited') warnings.push('Your NEET result is awaited — you can start shortlisting now and confirm after the result.');
    if (Number.isNaN(pcb)) warnings.push('Enter your PCB percentage for an accurate check.');
    else if (pcb < cat.min) issues.push(`You need at least ${cat.min}% in PCB for the ${cat.label} category.`);
    if (f.english === 'no') issues.push('English must be a subject in your 12th.');
    if (f.dob) {
      // Age completed on 31 Dec of this year = difference in calendar years.
      const age = new Date().getFullYear() - new Date(f.dob).getFullYear();
      if (age < 17) issues.push('You must be at least 17 years old by 31st December of the admission year.');
    } else {
      warnings.push('Add your date of birth to check the age criterion.');
    }
    if (!f.neet) warnings.push('Select your NEET status.');

    setResult({ status: issues.length ? 'no' : warnings.length ? 'maybe' : 'yes', issues, warnings });
  };

  return (
    <div className="eligibility">
      <form className="eligibility-form" onSubmit={check}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="el-neet">NEET-UG status</label>
            <select id="el-neet" value={f.neet} onChange={set('neet')}>
              <option value="">Select</option>
              <option value="yes">Qualified</option>
              <option value="awaited">Result awaited</option>
              <option value="no">Not qualified</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="el-cat">Category</label>
            <select id="el-cat" value={f.category} onChange={set('category')}>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="el-pcb">PCB % in 12th</label>
            <input id="el-pcb" type="number" min="0" max="100" step="0.1" value={f.pcb} onChange={set('pcb')} placeholder="e.g. 65" />
          </div>
          <div className="form-field">
            <label htmlFor="el-eng">English in 12th?</label>
            <select id="el-eng" value={f.english} onChange={set('english')}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-field form-field-full">
            <label htmlFor="el-dob">Date of birth</label>
            <input id="el-dob" type="date" value={f.dob} onChange={set('dob')} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Check My Eligibility</button>
      </form>

      <div className={`eligibility-result${result ? ` is-${result.status}` : ''}`} aria-live="polite">
        {!result && (
          <>
            <h3>Instant eligibility check</h3>
            <p>Based on the National Medical Commission (NMC) criteria for Indian students studying MBBS abroad.</p>
          </>
        )}
        {result?.status === 'yes' && (
          <>
            <CheckCircle2 size={40} aria-hidden="true" />
            <h3>You appear eligible for MBBS abroad</h3>
            <p>Next step: compare NMC-compliant universities that fit your budget.</p>
          </>
        )}
        {result?.status === 'maybe' && (
          <>
            <AlertTriangle size={40} aria-hidden="true" />
            <h3>Almost there — a few details to confirm</h3>
          </>
        )}
        {result?.status === 'no' && (
          <>
            <XCircle size={40} aria-hidden="true" />
            <h3>Some criteria are not met yet</h3>
          </>
        )}
        {result && (
          <>
            <ul>
              {[...result.issues, ...result.warnings].map((m) => <li key={m}>{m}</li>)}
            </ul>
            <button type="button" className="btn btn-accent" onClick={() => openEnquiry({ interest: 'MBBS Abroad' })}>
              Talk to an Admission Expert
            </button>
            <p className="small">This is an indicative check. Final eligibility is confirmed against current NMC notifications.</p>
          </>
        )}
      </div>
    </div>
  );
}
