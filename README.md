# Alumni Heritage Site

A professional, institutional-style frontend application for educational institutions to showcase alumni profiles and maintain their heritage connections. This is not a social media platform, but rather a legitimate, professional site focused on maintaining institutional relationships and professional networking.

## Features

- **Professional Authentication System**: Secure login with institutional credentials
- **Comprehensive User Profiles**: Detailed alumni information including:
  - Personal Information
  - Academic Records
  - Professional Experience
  - Skills and Certifications
  - Alumni Activities and Contributions
  - Achievements and Recognition
- **Dashboard Overview**: Quick stats and recent activity summary
- **Responsive Design**: Modern, clean interface optimized for all devices
- **Institutional Styling**: Professional appearance suitable for educational institutions

## Technology Stack

- **Frontend**: React 18 with modern hooks
- **Styling**: Styled Components for maintainable CSS-in-JS
- **Routing**: React Router for navigation
- **State Management**: React Context API for authentication
- **Data**: Static JSON files (easily replaceable with API endpoints)

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.js        # Authentication component
│   ├── Header.js       # Navigation header
│   ├── Dashboard.js    # Main dashboard view
│   └── Profile.js      # Detailed profile view
├── context/            # React context
│   └── AuthContext.js  # Authentication state management
├── data/               # Static data files
│   └── users.json      # Sample user profiles
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Demo Credentials

The application includes sample user profiles for testing:

### User 1: John Doe
- **Email**: john.doe@alumni.edu
- **Password**: password123
- **Profile**: Computer Science graduate, Senior Software Engineer

### User 2: Sarah Smith
- **Email**: sarah.smith@alumni.edu
- **Password**: password123
- **Profile**: MBA graduate, Vice President of Operations

## Customization

### Adding New Users

1. Edit `src/data/users.json`
2. Add new user objects following the existing structure
3. Include all required profile sections:
   - `personalInfo`
   - `academicInfo`
   - `professionalInfo`
   - `alumniActivities`
   - `achievements`

### Styling Changes

- Modify styled components in each component file
- Update color schemes in the styled components
- Adjust spacing and typography as needed

### Data Structure

The user profile structure is comprehensive and includes:

```json
{
  "id": "unique_id",
  "email": "user@alumni.edu",
  "password": "secure_password",
  "profile": {
    "personalInfo": { /* personal details */ },
    "academicInfo": { /* educational background */ },
    "professionalInfo": { /* career information */ },
    "alumniActivities": { /* institutional involvement */ },
    "achievements": { /* recognition and awards */ }
  }
}
```

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Traditional Hosting**: Upload build folder to web server
- **Container**: Dockerize the application

## Security Considerations

- **Current Implementation**: Uses static JSON for demo purposes
- **Production Recommendations**:
  - Implement proper backend authentication
  - Use secure session management
  - Add input validation and sanitization
  - Implement HTTPS
  - Add rate limiting for login attempts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a template project designed for educational institutions. Feel free to:

1. Customize the styling to match your institution's branding
2. Add additional profile sections as needed
3. Integrate with your existing authentication systems
4. Extend functionality based on institutional requirements

## License

This project is provided as a template for educational institutions. Please ensure compliance with your institution's policies and requirements.

## Support

For questions or customization requests, please refer to your institution's IT department or development team.

---

**Note**: This application is designed for institutional use and maintains a professional, non-social media approach to alumni networking and information sharing.
