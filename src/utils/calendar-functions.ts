
export const getNumberOfDays = (month: number, year: number) => {
    const lastDay = new Date(year, month+1, 0);
    return lastDay.getDate();
}

export const compareDates = (date:Date) => {
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
   if(currentDate.getTime() === date.getTime()){
    return true;
   }
   else{
    return false;
   }
}
