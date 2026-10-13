import {
  Stethoscope, Compass, GraduationCap, ListChecks, FileText, Wallet, Stamp, BookOpen, Plane,
} from 'lucide-react';

const map = {
  stethoscope: Stethoscope,
  compass: Compass,
  graduation: GraduationCap,
  list: ListChecks,
  file: FileText,
  wallet: Wallet,
  stamp: Stamp,
  book: BookOpen,
  plane: Plane,
};

export default function Icon({ name, size = 22, ...rest }) {
  const Cmp = map[name] || Compass;
  return <Cmp size={size} aria-hidden="true" {...rest} />;
}
