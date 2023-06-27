export function isDevelopment(){
  return !import.meta.env.MODE || import.meta.env.MODE === 'development'
}