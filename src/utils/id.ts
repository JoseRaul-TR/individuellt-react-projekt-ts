// Creates random Id for tasks
export const createId = (prefix = '') => prefix + Math.random().toString(36).slice(2, 9);