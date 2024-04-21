# Time Frame

![Logo](https://github.com/prince-ao/hackdartmouth2024/assets/122007821/d6b410df-5a22-48bd-a9b7-f423b6749284)

Timeframe is an Augmented Reality (AR) mobile application that reveals the history of places through your smartphone. Simply aim your phone at historical landmarks and buildings, and Timeframe will take you on a journey back in time.

This project was made for HackDartmouth IX, it is for the Education track, Best use of AI in Education, Best DEI Hack by Fidelity, and Best Domain Name from GoDaddy.

## Features

- **AR Experience**: Engage users with an immersive AR experience that overlays historical information on current landmarks.
- **Cross-Platform**: Support for both iOS and Android devices.
- **User-Friendly Web Interface**: A Next.js-based website that provides additional information and user engagement.
- **Scalable Backend**: Python backend designed to efficiently serve both the mobile app and the website.
- **Augmented Reality**: View historical landmarks and buildings in AR mode, with information about their history and significance.
- **Interactive Timeline**: Explore the history of a location through an interactive timeline, with photos, videos, and text.
- **Location-Based Information**: Get information about historical sites based on your current location, with notifications and alerts.
- **User Profiles**: Create a user profile to save your favorite locations, share your discoveries, and connect with other users.
- **Social Sharing**: Share your discoveries and experiences with friends and family on social media platforms.
- **Gamification**: Earn points, badges, and rewards for visiting new locations, completing challenges, and learning about history.

## Technologies Used

- **Expo & React Native**:Used as primary framework for our mobile app. Expo is used for testing and simplifying React Native whenever possible.
- **React/Expo Navigation**: Provides navigation functionality for the app, allowing users to navigate between different screens and components.
- **Axios**: Used to fetch or send data to a backend server or third-party services.
- **Misc Expo Modules**: Various Expo modules (expo-camera, expo-location, expo-splash-screen, etc.) are used to access device hardware and native APIs.
- **React Native Reanimated & Gesture Handler**: Used for creating smooth animations and handling user gestures in the app. Enhances the app's UI/UX with fluid animations and responsive touch interactions.

## Overview

![Landing](https://github.com/prince-ao/hackdartmouth2024/assets/122007821/6ddac9ba-5bc5-4abf-b206-688513ab56e0)
![SignUp](https://github.com/prince-ao/hackdartmouth2024/assets/122007821/9123315b-9ad7-44b4-9298-2c614e7232da)

## Getting Started

### Prerequisites

- Node.js and npm/yarn for the website and frontend
- Python for the backend
- Git for version control

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/prince-ao/hackdartmouth2024.git
   cd hackdartmouth2024
   ```

2. Setup the website:

   ```bash
   cd website
   npm install
   npm run dev
   ```

3. Setup the frontend:

   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Setup the backend:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Running the Development Server

- **Website**: The website is hosted as a Python Flask API for authenication at [TimeFrame.Study](www.timeframe.study) Hosted by GoDaddy.

- **Website**: Navigate to the `website` directory and run `npm run dev`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- **Frontend**: In the `frontend` directory, run `npm start` to start the Expo development server.
- **Backend**: Details on running the backend server are TBD based on the backend setup.

## Deployment

- **Website**: The website can be deployed on Vercel, following the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
- **Frontend**: The React Native app can be built and deployed to iOS and Android app stores.
- **Backend**: Deployment instructions for the backend will vary based on the chosen infrastructure.

## Contributing

Contributions are welcome! Please read our contributing guidelines for details on how to submit pull requests to the project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
