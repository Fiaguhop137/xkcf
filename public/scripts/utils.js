export function getTimestamp(ms=Date.now()){
  const date=new Date(ms);
  const pad=(num)=>String(num).padStart(2,'0');
  const year=date.getUTCFullYear();
  const month=pad(date.getUTCMonth()+1);
  const day=pad(date.getUTCDate());
  const hours=pad(date.getUTCHours());
  const minutes=pad(date.getUTCMinutes());
  const seconds=pad(date.getUTCSeconds());
  return `${year}.${month}.${day}-${hours}.${minutes}.${seconds}`;
}
