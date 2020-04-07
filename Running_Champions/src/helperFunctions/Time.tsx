
export function getDuration(start: number, end: number) {
    let duration = end - start;
    let hours = Math.floor(duration /1000 /60 /60).toString();
    let mins = Math.floor(duration /1000 /60 % 60).toString();
    let secs = Math.floor(duration /1000 % 60).toString();
    
    return `${hours.padStart(2, '0')}:${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`;
}

export function getTime() {
    let today = new Date(),
        date = today.getTime();
    return date;
}

export function getDate() {
    let today = new Date(),
        date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return date;
}

export function getFullDate() {

    let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    let today = new Date();

    let year = today.getFullYear();
    let month = monthNames[today.getMonth()];
    let day = today.getDate();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let period = 'am';

    if (today.getHours() > 12) {
        hour -= 12;
        period = 'pm';
    }
    
    let date = `${month} ${day}, ${year} ${hour}:${minute.toString().padStart(2, '0')}${period}`;
    return date;
}
