
export function showMoney (m, decimals) {
  const [int, dec] = (m+'').split('.')
  let main = int.slice(-3, int.length);
  for(let i=6; i<int.length+3; i+=3)
    main = int.slice(-i, -i+3) + ',' + main
  if(decimals || dec) {
    return main+'.'+(dec?.substring(0,decimals || 2) || '').padEnd(decimals || 2, 0)
  } else return main;
}
