function convertDateTimeToThaiFormat(dateTime: Date, showTime: boolean = true) {
    const result = dateTime.toLocaleString('th-TH', { hourCycle: 'h24' });  
    return showTime ? result : result.split(' ')[0];
}

export { convertDateTimeToThaiFormat };