export const isAllowedLocation = (location?: string): boolean => {
  if (!location) return true; // many jobs don't provide location

  const l = location.toLowerCase();

  const isRemote =
    l.includes('remote') ||
    l.includes('anywhere') ||
    l.includes('work from home') ||
    l.includes('wfh');

  const isIndia =
    l.includes('india') ||
    l.includes('bangalore') ||
    l.includes('bengaluru') ||
    l.includes('hyderabad') ||
    l.includes('pune') ||
    l.includes('chennai') ||
    l.includes('gurgaon') ||
    l.includes('noida') ||
    l.includes('kochi') ||
    l.includes('mumbai');

  return isRemote || isIndia;
};