// function to get date and time in format dd-mm-yyyy hh:mm:ss
export function getDateInFormat(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// convert date into today, yesterday, or dd-mm-yyyy format
export function getFormattedDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return `${day}-${month}-${year}`;
    }
}