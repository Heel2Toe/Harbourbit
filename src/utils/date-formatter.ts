
const dateFormatter = (date: string) => {
    const dateObject = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('en-US',{
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(dateObject);

    return formattedDate;
}

export default dateFormatter;