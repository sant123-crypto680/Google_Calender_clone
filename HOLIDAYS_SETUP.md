# Indian Holidays Integration Setup

This guide explains how the Google Calendar API integration for Indian holidays works in your calendar application.

## Setup Instructions

### 1. Google Calendar API Key

You need a Google Calendar API key to fetch holidays. Follow these steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Calendar API** for your project
4. Go to "Credentials" and create an **API Key**
5. (Optional but recommended) Restrict the API key to only the Calendar API

### 2. Environment Configuration

The API key should be added to the `.env` file in the root directory:

```env
GOOGLE_CALENDAR_API_KEY=your_api_key_here
INDIAN_HOLIDAYS_CALENDAR_ID=en.indian#holiday@group.v.calendar.google.com
```

**Note:** The `.env` file is already created with your API key. The `.env.example` file is provided as a template for other users.

## How It Works

### Architecture

1. **Holiday Service** (`src/services/holidaysService.js`)
   - Fetches holidays from Google Calendar's public holiday calendar for India
   - Implements caching (24-hour duration) to reduce API calls
   - Provides methods for fetching holidays by month, week, or day

2. **Store Integration** (`src/context/store.js`)
   - Holidays are loaded in the background after the app initializes
   - The calendar remains fully functional while holidays load
   - Holidays are automatically merged with regular calendar entries
   - Holidays are marked as read-only (`isHoliday: true`, `isReadOnly: true`)
   - Holidays are cached per year to avoid redundant API calls

3. **View Integration**
   - Month View: Displays holidays as purple all-day events
   - Week View: Shows holidays in the top section (all-day area)
   - Day View: Displays holidays as all-day events
   - Calendar is immediately interactive; holidays appear when loaded

### Features

- **Non-Blocking Load**: Calendar is immediately interactive; holidays load in the background
- **Automatic Loading**: Holidays are automatically fetched for the current year when the app starts
- **Read-Only**: Holidays cannot be edited or deleted
- **Distinctive Styling**: Holidays appear in purple (#9E69AF) to match Google Calendar
- **Smart Caching**:
  - Service-level caching (24 hours) to reduce API calls
  - Year-level caching to prevent redundant fetches when navigating
- **All Indian Festivals**: Displays major Indian festivals and holidays including:
  - Diwali/Deepavali
  - Dussehra
  - Holi
  - Karaka Chaturthi
  - Maha Navami
  - Guru Nanak Jayanti
  - And many more

## Files Modified

- `.env` - Environment variables (your API key)
- `.env.example` - Template for environment variables
- `webpack.config.js` - Added dotenv-webpack plugin
- `src/services/holidaysService.js` - **New** - Holiday fetching service
- `src/context/store.js` - Integrated holidays with entries
- `src/index.js` - Initialize holiday loading
- `src/components/menus/entryOptions.js` - Prevent editing/deleting holidays
- `src/components/views/monthview.js` - Add holiday styling attributes
- `src/styles/holidays.css` - **New** - Holiday-specific styles

## Usage

### Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
```

### Changing the Holiday Calendar

To use a different regional calendar, modify the `INDIAN_HOLIDAYS_CALENDAR_ID` in the `.env` file:

- Indian holidays: `en.indian#holiday@group.v.calendar.google.com`
- US holidays: `en.usa#holiday@group.v.calendar.google.com`
- UK holidays: `en.uk#holiday@group.v.calendar.google.com`

See [Google Calendar IDs](https://www.thunderbird.net/en-US/calendar/holidays/) for more regional calendars.

## API Rate Limits

The Google Calendar API has the following limits:
- **Free tier**: 1,000,000 queries per day
- **Per-user limit**: 10,000 queries per day

With caching enabled, the app typically makes:
- 1 request per year (on first load)
- Cached for 24 hours
- This results in ~365 requests per year under normal usage

## Troubleshooting

### Holidays Not Showing

1. Check that your API key is valid in the `.env` file
2. Check the browser console for any API errors
3. Ensure the Google Calendar API is enabled in your Google Cloud project
4. Verify that the API key has no IP restrictions (or add your IP to allowed list)

### API Key Errors

If you see "API key not found" warnings:
- Make sure the `.env` file exists in the root directory
- Ensure `GOOGLE_CALENDAR_API_KEY` is set (no quotes around the value)
- Restart the development server after updating `.env`

## Security Notes

- The `.env` file is added to `.gitignore` to prevent accidentally committing your API key
- API keys should be restricted to only the Calendar API in Google Cloud Console
- For production, consider using server-side API calls to keep the key secure

## Future Enhancements

Possible improvements:
- Add a settings panel to toggle holiday visibility
- Support multiple regional holiday calendars simultaneously
- Allow users to add custom holiday calendars
- Implement year-switching to load holidays for different years
