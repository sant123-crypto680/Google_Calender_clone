/**
 * Google Calendar API Service for Indian Holidays
 * Fetches public holidays from Google's public calendar
 */

const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
const INDIAN_HOLIDAYS_CALENDAR_ID = process.env.INDIAN_HOLIDAYS_CALENDAR_ID;

class HolidaysService {
  constructor() {
    this.cache = null;
    this.cacheExpiry = null;
    this.cacheDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  }

  /**
   * Fetch holidays from Google Calendar API for a given date range
   * @param {Date} startDate - Start date for the range
   * @param {Date} endDate - End date for the range
   * @returns {Promise<Array>} Array of holiday events
   */
  async fetchHolidays(startDate, endDate) {
    // Check if we have valid cached data
    if (this.cache && this.cacheExpiry && Date.now() < this.cacheExpiry) {
      return this.filterHolidaysByDateRange(this.cache, startDate, endDate);
    }

    if (!GOOGLE_CALENDAR_API_KEY) {
      console.warn('Google Calendar API key not found. Please add it to your .env file.');
      return [];
    }

    try {
      // Fetch holidays for a broader range (1 year) and cache them
      const yearStart = new Date(startDate.getFullYear(), 0, 1);
      const yearEnd = new Date(startDate.getFullYear(), 11, 31, 23, 59, 59);

      const timeMin = yearStart.toISOString();
      const timeMax = yearEnd.toISOString();

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        INDIAN_HOLIDAYS_CALENDAR_ID
      )}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform Google Calendar events to our format
      const holidays = data.items.map((event) => ({
        id: `holiday-${event.id}`,
        title: event.summary,
        description: event.description || '',
        start: event.start.date || event.start.dateTime,
        end: event.end.date || event.end.dateTime,
        isHoliday: true,
        isAllDay: !!event.start.date, // If date field exists, it's an all-day event
        category: 'holidays',
        color: '#9E69AF', // Purple color for holidays like in Google Calendar
      }));

      // Cache the results
      this.cache = holidays;
      this.cacheExpiry = Date.now() + this.cacheDuration;

      return this.filterHolidaysByDateRange(holidays, startDate, endDate);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      return [];
    }
  }

  /**
   * Filter holidays by date range
   * @param {Array} holidays - Array of holiday events
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Array} Filtered holidays
   */
  filterHolidaysByDateRange(holidays, startDate, endDate) {
    return holidays.filter((holiday) => {
      const holidayStart = new Date(holiday.start);
      return holidayStart >= startDate && holidayStart <= endDate;
    });
  }

  /**
   * Get holidays for a specific month
   * @param {Number} year - Year
   * @param {Number} month - Month (0-11)
   * @returns {Promise<Array>} Array of holiday events for the month
   */
  async getHolidaysForMonth(year, month) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59);
    return this.fetchHolidays(startDate, endDate);
  }

  /**
   * Get holidays for a specific week
   * @param {Date} startOfWeek - Start date of the week
   * @returns {Promise<Array>} Array of holiday events for the week
   */
  async getHolidaysForWeek(startOfWeek) {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return this.fetchHolidays(startOfWeek, endOfWeek);
  }

  /**
   * Get holidays for a specific day
   * @param {Date} date - The date
   * @returns {Promise<Array>} Array of holiday events for the day
   */
  async getHolidaysForDay(date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return this.fetchHolidays(startOfDay, endOfDay);
  }

  /**
   * Clear the cache
   */
  clearCache() {
    this.cache = null;
    this.cacheExpiry = null;
  }

  /**
   * Check if a specific date is a holiday
   * @param {Date} date - The date to check
   * @returns {Promise<Boolean>} True if the date is a holiday
   */
  async isHoliday(date) {
    const holidays = await this.getHolidaysForDay(date);
    return holidays.length > 0;
  }

  /**
   * Get holiday names for a specific date
   * @param {Date} date - The date
   * @returns {Promise<Array>} Array of holiday names
   */
  async getHolidayNames(date) {
    const holidays = await this.getHolidaysForDay(date);
    return holidays.map((h) => h.title);
  }
}

// Create a singleton instance
const holidaysService = new HolidaysService();

export default holidaysService;
