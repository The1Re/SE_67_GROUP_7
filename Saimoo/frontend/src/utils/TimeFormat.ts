function convertDateTimeToThaiFormat(dateTime: Date, showTime: boolean = true) {
    const result = dateTime.toLocaleString('th-TH', { hourCycle: 'h24' });  
    return showTime ? result : result.split(' ')[0];
}

function formatDateTimeLocal(dateInput: string | Date): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


export { convertDateTimeToThaiFormat, formatDateTimeLocal };