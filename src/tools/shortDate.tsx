export const shortDate = (date:Date) => {
    return Intl.DateTimeFormat('en-US', {
        month: 'numeric',
        day: 'numeric',
    }).format(date)
}