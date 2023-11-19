export default function DateTime({date}: { date: Date }) {
    const ms = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
    return date.getDate() + " " + ms + ", " + date.getFullYear();
}