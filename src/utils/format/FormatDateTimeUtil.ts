/**
 * Array of month names in Russian
 */
const RU_MONTHS = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября',
    'ноября', 'декабря'];

/**
 * Utils to transfer a date to a string
 */
export class FormatDateTimeUtil {
    /**
     * Converts a date to string DD.MM.YYYY ("31.05.2024", for example)
     * @param date The date
     */
    stringifyDate(date: Date) {
        const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    /**
     * Converts a date to string DD <RU month name> YYYY ("31 мая 2024", for example)
     * @param date The date
     */
    stringifyDateWithMonthName(date: Date) {
        return date.getDate() + " " + RU_MONTHS[date.getMonth()] + " " + date.getFullYear();
    }

    /**
     * Converts a date (with time) to string DD.MM.YYYY HH:MM:SS ("31:05:2024 21:25:31", for example)
     * @param datetime The datetime
     */
    stringifyDateTime(datetime: Date) {
        //const newDate = new Date(datetime.getTime() - (5 * 60 * 60 * 1000)); // -5 hours
        const strDate = this.stringifyDate(datetime);
        const hours = datetime.getHours();
        const minutes = (datetime.getMinutes() < 10 ? '0' : '') + datetime.getMinutes();
        const seconds = (datetime.getSeconds() < 10 ? '0' : '') + datetime.getSeconds();

        return `${strDate} ${hours}:${minutes}:${seconds}`
    }
}