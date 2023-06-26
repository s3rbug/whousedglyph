export function isDevelopment(){
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}