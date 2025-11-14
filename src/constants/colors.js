export const posteColor = {
  'animateur jeune h/f': { background: '#FFFFEA', color: '#BB6C02' },
  'animatrice périscolaire': { background: '#E0F2FE', color: '#0369A1' },
  'animateur/animatrice enfance': { background: '#D9F99D', color: '#365314' },
  'formateur/trice animateur/trice': { background: '#F6F4FE', color: '#8E67EB' },
  'fonction support': { background: '#FEE2E2', color: '#991B1B' },
  'psychomotricienne': { background: '#FEF3C7', color: '#92400E' },
};

export const getPosteColor = (job) => {
  if (!job) return { background: '#e5e7eb', color: '#374151' };
  const key = job.trim().toLowerCase();
  return posteColor[key] || { background: '#e5e7eb', color: '#374151' };
};

export const roleColor = {
  admin: { background: '#E0F2FE', color: '#0369A1' },
  manager: { background: '#D9F99D', color: '#365314' },
  user: { background: '#FFFFEA', color: '#BB6C02' },
};

export const getRoleColor = (role) => {
  if (!role) return { background: '#e5e7eb', color: '#374151' };
  const key = role.trim().toLowerCase();
  return roleColor[key] || { background: '#e5e7eb', color: '#374151' };
};
