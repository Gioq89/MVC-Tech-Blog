module.exports = {
    format_time: (date) => {
        // Format time as HH:MM:SS AM/PM
        return date.toLocaleTimeString();
    },
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        console.log(date)
        return date.toLocaleDateString();
    }
};