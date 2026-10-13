import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { X, CheckCircle2, ArrowLeft } from 'lucide-react';
import { studyCountries } from '../data/studyCountries.js';
import { mbbsCountries } from '../data/mbbsCountries.js';
import { CITIES, isValidPhone, submitLead } from '../utils/lead.js';

const EnquiryContext = createContext({ openEnquiry: () => {} });
export const useEnquiry = () => useContext(EnquiryContext);

const GOALS = ['MBBS Abroad', 'Master’s / PG Abroad', 'Bachelor’s Abroad', 'Not sure yet'];
const NEET = ['NEET qualified', 'Result awaited', 'Appearing next year'];
const PCB = ['60% or above', '50% – 59%', '40% – 49%'];
const SCORES = ['80% or above', '60% – 79%', '50% – 59%', 'Below 50%'];
const MBBS_BUDGET = ['Under ₹25 lakh (full course)', '₹25 – 40 lakh', '₹40 lakh +'];
const STUDY_BUDGET = ['Under ₹15 lakh / year', '₹15 – 25 lakh / year', '₹25 – 40 lakh / year', 'Budget is flexible'];
const year = new Date().getFullYear();
const INTAKES = [`${year}`, `${year + 1}`, `${year + 2}`, 'Not decided'];

function Chips({ options, value, onChange, multi = false }) {
  const isOn = (o) => (multi ? value.includes(o) : value === o);
  const click = (o) => {
    if (!multi) return onChange(o);
    onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  };
  return (
    <div className="chips" role={multi ? 'group' : 'radiogroup'}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className={`chip${isOn(o) ? ' is-on' : ''}`}
          aria-pressed={isOn(o)}
          onClick={() => click(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

const initial = (preset = {}) => ({
  interest: preset.interest || '',
  country: preset.country ? [preset.country] : [],
  neet: '',
  score: '',
  budget: '',
  intake: '',
  name: '',
  phone: '',
  city: '',
});

function EnquiryDialog({ preset, onClose }) {
  const [step, setStep] = useState(preset.interest ? 2 : 1);
  const [d, setD] = useState(() => initial(preset));
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);
  const set = (k) => (v) => setD((x) => ({ ...x, [k]: v }));
  const isMbbs = d.interest === 'MBBS Abroad';
  const countries = isMbbs ? mbbsCountries.map((c) => c.name) : studyCountries.map((c) => c.name);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    if (d.name.trim().length < 2) return setError('Please enter your name.');
    if (!isValidPhone(d.phone)) return setError('Please enter a valid 10-digit mobile number.');
    setError('');
    const res = await submitLead(
      { name: d.name, phone: d.phone, city: d.city, interest: d.interest, country: d.country, neet: d.neet, score: d.score, budget: d.budget, intake: d.intake },
      'Counselling pop-up'
    );
    setDone(res);
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="enq-title">
        <aside className="modal-side">
          <h2>Start your journey abroad</h2>
          <p>Counselling → Shortlisting → Admission → Visa</p>
          <ul>
            <li>Free 1:1 counselling</li>
            <li>Profile-based university shortlist</li>
            <li>Scholarship &amp; loan guidance</li>
            <li>Visa &amp; pre-departure support</li>
          </ul>
        </aside>
        <div className="modal-main">
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
            <X size={22} />
          </button>

          {done ? (
            <div className="enquiry-done">
              <CheckCircle2 size={48} className="text-success" aria-hidden="true" />
              <h3 id="enq-title">Thank you, {d.name.split(' ')[0]}!</h3>
              <p>Your details are ready in WhatsApp — just press <strong>Send</strong>. Our counsellor will contact you shortly.</p>
              <a className="btn btn-whatsapp" href={done.link} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a>
            </div>
          ) : (
            <>
              <div className="steps-indicator" aria-hidden="true">
                {[1, 2, 3].map((n) => <span key={n} className={n <= step ? 'is-on' : ''} />)}
              </div>

              {step === 1 && (
                <div className="modal-step">
                  <h3 id="enq-title">What are you planning?</h3>
                  <Chips options={GOALS} value={d.interest} onChange={(v) => { set('interest')(v); setStep(2); }} />
                </div>
              )}

              {step === 2 && (
                <div className="modal-step">
                  <h3 id="enq-title">Tell us a little more</h3>
                  <p className="modal-label">Preferred {isMbbs ? 'MBBS countries' : 'countries'} (choose any)</p>
                  <Chips options={[...countries, 'Not decided']} value={d.country} onChange={set('country')} multi />
                  {isMbbs ? (
                    <>
                      <p className="modal-label">NEET status</p>
                      <Chips options={NEET} value={d.neet} onChange={set('neet')} />
                      <p className="modal-label">PCB % in 12th</p>
                      <Chips options={PCB} value={d.score} onChange={set('score')} />
                      <p className="modal-label">Budget (tuition, full course)</p>
                      <Chips options={MBBS_BUDGET} value={d.budget} onChange={set('budget')} />
                    </>
                  ) : (
                    <>
                      <p className="modal-label">Your latest academic score</p>
                      <Chips options={SCORES} value={d.score} onChange={set('score')} />
                      <p className="modal-label">Budget</p>
                      <Chips options={STUDY_BUDGET} value={d.budget} onChange={set('budget')} />
                      <p className="modal-label">Preferred intake year</p>
                      <Chips options={INTAKES} value={d.intake} onChange={set('intake')} />
                    </>
                  )}
                  <div className="modal-nav">
                    <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Next</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form className="modal-step" onSubmit={submit} noValidate>
                  <h3 id="enq-title">Where can our counsellor reach you?</h3>
                  <div className="form-field">
                    <label htmlFor="enq-name">Full name *</label>
                    <input id="enq-name" value={d.name} onChange={(e) => set('name')(e.target.value)} autoComplete="name" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="enq-phone">Mobile number *</label>
                    <input id="enq-phone" value={d.phone} onChange={(e) => set('phone')(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" />
                  </div>
                  <p className="modal-label">City</p>
                  <Chips options={CITIES.slice(0, 3)} value={d.city} onChange={set('city')} />
                  {error && <p className="form-error">{error}</p>}
                  <div className="modal-nav">
                    <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}><ArrowLeft size={16} /> Back</button>
                    <button type="submit" className="btn btn-primary">Get Free Counselling</button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function EnquiryProvider({ children }) {
  const [preset, setPreset] = useState(null);
  const openEnquiry = useCallback((p = {}) => setPreset(p), []);
  const close = useCallback(() => setPreset(null), []);
  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}
      {preset && <EnquiryDialog preset={preset} onClose={close} />}
    </EnquiryContext.Provider>
  );
}
