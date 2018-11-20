function unixToDate(timestamp)
{
    const date = new Date(timestamp);
    const year = date.getFullYear();
    let mon = date.getMonth();
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    mon = mon > 9 ? mon : `0${mon}`;
    day = day > 9 ? day : `0${day}`;

    hours = hours > 9 ? hours : `0${hours}`;
    minutes = minutes > 9 ? minutes : `0${minutes}`;
    seconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${mon}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}
export {
    unixToDate,
};
