function convertDateTimeToThaiFormat(dateTime: Date) {
    return dateTime.toLocaleString('th-TH', { hourCycle: 'h24' })
}

export { convertDateTimeToThaiFormat };