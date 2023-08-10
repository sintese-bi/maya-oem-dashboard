// EXTRAI AS INICIAIS EM MAIÚSCULAS DAS DUAS PRIMEIRAS PALAVRAS DE UMA STRING 
export const getInitials = (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');
