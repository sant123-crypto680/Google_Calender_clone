# Google Calendar Clone - Vanilla JavaScript

A fully functional calendar application built with vanilla JavaScript, HTML, and CSS. This is a zero-dependency clone of Google Calendar with multiple views, event management, category support, and Indian holidays integration.

## Screenshots

### Month View with Holidays
![Month View](screenshots/Screenshot%20(63).png)

### Week View with Events
![Week View](screenshots/Screenshot%20(64).png)

### Month View with Custom Events
![Month View with Events](screenshots/Screenshot%20(65).png)

## Features

### Calendar Views
- **Month View**: Classic monthly calendar grid showing all events and holidays
- **Week View**: 7-day week view with hourly time slots
- **Day View**: Single day view with detailed hourly breakdown
- **List View**: List format showing all upcoming events

### Event Management
- **Create Events**: Add events with title, date, time, and description
- **Edit Events**: Modify existing events
- **Delete Events**: Remove events from the calendar
- **Drag & Drop**: Move events by dragging them to different dates/times
- **All-Day Events**: Support for full-day events
- **Timed Events**: Events with specific start and end times

### Categories & Organization
- **Custom Categories**: Create and manage event categories
- **Color Coding**: Assign colors to categories for visual organization
- **Category Management**: Edit and delete categories
- **Filter by Category**: Show/hide events by category

### Indian Holidays Integration
- **Automatic Holiday Loading**: Fetches Indian holidays from Google Calendar API
- **Read-Only Holidays**: Holidays are displayed but cannot be edited
- **Smart Caching**: 24-hour cache to reduce API calls
- **Distinctive Styling**: Purple-colored holiday events matching Google Calendar
- **Major Festivals**: Includes Diwali, Dussehra, Holi, and many more

### Additional Features
- **Keyboard Shortcuts**: Quick navigation and actions via keyboard
- **Date Picker**: Jump to any date quickly
- **Search/Filter**: Find events easily
- **Toast Notifications**: User feedback for actions
- **Responsive Design**: Works on various screen sizes
- **Local Storage**: Events persist in browser storage
- **JSON Import/Export**: Backup and restore calendar data

## Technology Stack

- **JavaScript**: Pure vanilla JavaScript (ES6+)
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **Webpack**: Module bundler and build tool
- **ESLint**: Code linting and quality
- **Stylelint**: CSS linting
- **PostCSS**: CSS processing and optimization

## Project Structure

```
google-calendar-clone-vanilla/
├── src/
│   ├── components/
│   │   ├── forms/          # Event forms and input handling
│   │   ├── menus/          # Navigation and menu components
│   │   ├── toastPopups/    # Notification system
│   │   └── views/          # Calendar view components
│   ├── config/             # Application configuration
│   ├── factory/            # Data factories and models
│   ├── locales/            # Internationalization
│   ├── services/           # API services (holidays, etc.)
│   ├── styles/             # CSS stylesheets
│   ├── utilities/          # Helper functions and utilities
│   ├── index.html          # Main HTML template
│   └── index.js            # Application entry point
├── screenshots/            # Application screenshots
├── dist/                   # Production build output
├── .env                    # Environment variables (API keys)
├── .env.example            # Environment template
├── webpack.config.js       # Webpack configuration
├── package.json            # Project dependencies
└── README.md              # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone or extract the project**
   ```bash
   cd google-calendar-clone-vanilla
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (Optional - for holidays feature)

   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

   Add your Google Calendar API key to `.env`:
   ```env
   GOOGLE_CALENDAR_API_KEY=your_api_key_here
   INDIAN_HOLIDAYS_CALENDAR_ID=en.indian#holiday@group.v.calendar.google.com
   ```

   See [HOLIDAYS_SETUP.md](HOLIDAYS_SETUP.md) for detailed instructions on obtaining an API key.

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will open in your default browser at `http://localhost:8080`

## Available Scripts

### Development
```bash
npm run dev              # Start development server with hot reload
npm run start:server     # Start with JSON server (for testing)
```

### Production
```bash
npm run build           # Create production build in dist/
npm run deploy          # Deploy to GitHub Pages
```

### Code Quality
```bash
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues automatically
npm run stylelint       # Run Stylelint for CSS
npm run stylelint:fix   # Fix Stylelint issues automatically
```

### Analysis
```bash
npm run analyze2        # Analyze webpack bundle size
```

## Usage Guide

### Creating an Event
1. Click the "Create" button or press `C` on your keyboard
2. Fill in the event details (title, date, time, category)
3. Click "Save" to create the event

### Navigating Views
- Click on the view buttons (Month/Week/Day/List) in the header
- Use keyboard shortcuts for quick navigation:
  - `M` - Month view
  - `W` - Week view
  - `D` - Day view
  - `L` - List view

### Managing Categories
1. Access the sidebar category menu
2. Click the "+" icon to create a new category
3. Assign a name and color to the category
4. Edit or delete categories as needed

### Keyboard Shortcuts
- `C` - Create new event
- `T` - Go to today
- `←/→` - Navigate to previous/next period
- `M/W/D/L` - Switch between views
- `/` - Focus search
- `?` - Show all keyboard shortcuts

### Importing/Exporting Data
- **Export**: Save your calendar data as a JSON file
- **Import**: Load a previously exported JSON file to restore events

## Holidays Integration

The application supports automatic loading of regional holidays from Google Calendar's public holiday calendars.

### Supported Regions
By default, the app loads Indian holidays. You can change this by modifying the `INDIAN_HOLIDAYS_CALENDAR_ID` in your `.env` file:

- Indian holidays: `en.indian#holiday@group.v.calendar.google.com`
- US holidays: `en.usa#holiday@group.v.calendar.google.com`
- UK holidays: `en.uk#holiday@group.v.calendar.google.com`

For more information, see [HOLIDAYS_SETUP.md](HOLIDAYS_SETUP.md)

## Browser Support

- Chrome (recommended) - Latest 2 versions
- Firefox - Latest 2 versions
- Safari - Latest 2 versions
- Edge - Latest 2 versions

## Performance

- **Bundle Size**: Optimized with webpack and compression
- **Lazy Loading**: Components loaded on demand
- **Caching**: Smart caching for holidays and data
- **Minification**: CSS and JavaScript are minified in production

## Contributing

This is a personal project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow ESLint rules defined in `.eslintrc`
- Follow Stylelint rules defined in `.stylelintrc.json`
- Run `npm run lint:fix` and `npm run stylelint:fix` before committing

## Troubleshooting

### Holidays Not Appearing
1. Ensure you have a valid Google Calendar API key in `.env`
2. Check browser console for API errors
3. Verify the API is enabled in Google Cloud Console

### Events Not Persisting
- Make sure browser storage is not disabled
- Check if you're in private/incognito mode (storage may be limited)

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## License

ISC License - See [LICENSE](LICENSE) file for details

## Author

Chase Ottofy

## Acknowledgments

- Inspired by Google Calendar
- Built with modern vanilla JavaScript practices
- Uses Google Calendar API for holidays integration

## Links

- **Repository**: [https://github.com/chaseottofy/google-calendar-clone-vanilla](https://github.com/chaseottofy/google-calendar-clone-vanilla)
- **Issues**: [https://github.com/chaseottofy/google-calendar-clone-vanilla/issues](https://github.com/chaseottofy/google-calendar-clone-vanilla/issues)

---

**Version**: 1.0.1

Built with vanilla JavaScript - No frameworks, no dependencies, just pure code.
