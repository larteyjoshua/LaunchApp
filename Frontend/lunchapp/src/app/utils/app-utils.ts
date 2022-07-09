
export function detectChange(previous:number, current:number): boolean {

  if (current > previous){
    return true;
  }
  else {
    return false;
  }
}


export function percentChange(previous:number, current:number):number {
  const percentage = ((current - previous)/previous) * 100;
    return percentage;
}

export const createFunction = (items:any[], item:any) => [...items, item];

export const updateFunction = (items:any[], changeItem:any) => items.map(item => {
  return item.id === changeItem.id? Object.assign({},item, changeItem): item
});

export const deleteFunction = (items:any[], item:any)=> items.filter(oldItem =>
  oldItem.id !== item.id);


  export const findItemId =(items:any[],key:any) =>items.find(item =>{
   return item.name === key
  })
