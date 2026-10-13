import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import StudyAbroad from './pages/StudyAbroad.jsx';
import StudyCountry from './pages/StudyCountry.jsx';
import MbbsAbroad from './pages/MbbsAbroad.jsx';
import MbbsCountry from './pages/MbbsCountry.jsx';
import LocationPage from './pages/LocationPage.jsx';
import UkMasters from './pages/UkMasters.jsx';
import Scholarships from './pages/Scholarships.jsx';
import EducationLoan from './pages/EducationLoan.jsx';
import StudentVisa from './pages/StudentVisa.jsx';
import Services from './pages/Services.jsx';
import Exams from './pages/Exams.jsx';
import Events from './pages/Events.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import FreeCounselling from './pages/FreeCounselling.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import { PrivacyPolicy, Terms } from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';
import { studyCountries } from './data/studyCountries.js';
import { mbbsCountries } from './data/mbbsCountries.js';
import { locationPages } from './data/locations.js';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/study-abroad" element={<StudyAbroad />} />
        {studyCountries.map((c) => (
          <Route key={c.slug} path={`/study-in-${c.slug}`} element={<StudyCountry slug={c.slug} />} />
        ))}
        <Route path="/mbbs-abroad" element={<MbbsAbroad />} />
        {mbbsCountries.map((c) => (
          <Route key={c.slug} path={`/mbbs-in-${c.slug}`} element={<MbbsCountry slug={c.slug} />} />
        ))}
        {locationPages.map((p) => (
          <Route key={p.path} path={p.path} element={<LocationPage path={p.path} />} />
        ))}
        <Route path="/uk-masters" element={<UkMasters />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/education-loan" element={<EducationLoan />} />
        <Route path="/student-visa" element={<StudentVisa />} />
        <Route path="/services" element={<Services />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/free-counselling" element={<FreeCounselling />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
