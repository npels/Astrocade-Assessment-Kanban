# Kanban Board App

A modern, feature-rich Kanban board application built with React Native, TypeScript, and Expo. Features include drag-and-drop task management, filtering, sorting, and a beautiful UI with smooth animations.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)
- iOS Simulator (Mac only) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:npels/Astrocade-Assessment-Kanban.git
   # or 
   git clone https://github.com/npels/Astrocade-Assessment-Kanban.git
   cd kanban-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI (if not already installed)**
   ```bash
   npm install -g expo-cli
   ```

### Running the App

#### Using Expo Go (Recommended for quick testing)

1. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   # or
   expo start
   ```

2. **Run on your device**
   - Install the Expo Go app on your iOS or Android device
   - Scan the QR code displayed in the terminal or browser
   - The app will load on your device

#### Using Simulators/Emulators

1. **iOS Simulator (Mac only)**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

2. **Android Emulator**
   ```bash
   npm run android
   # or
   yarn android
   ```

#### Using Web (Preview)
   ```bash
   npm run web
   # or
   yarn web
   ```

## 📦 Dependencies

The app uses the following key dependencies:

- **React Native 0.76** - Core framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **react-native-gesture-handler** - Touch gestures and drag-and-drop
- **react-native-reanimated** - Smooth animations
- **react-native-safe-area-context** - Safe area handling
- **@expo/vector-icons** - Icon library

## 🏗️ Project Structure

```
src/
├── components/
│   ├── BoardSection/         # Kanban board columns
│   ├── TaskCard/            # Individual task cards
│   ├── CreateTaskModal/     # Task creation modal
│   ├── TaskDetailModal/     # Task details view
│   ├── FilterModal/         # Filter configuration
│   ├── SortModal/          # Sort configuration
│   ├── FilterBar/          # Active filters display
│   ├── DragOverlay/        # Drag animation overlay
│   └── contexts/           # React contexts
│       ├── BoardConfigContext.tsx
│       └── DragDropContext.tsx
├── screens/
│   └── KanbanBoard/        # Main board screen
├── hooks/
│   └── useTasks.ts         # Task management hook
├── types/
│   └── index.ts            # TypeScript type definitions
├── constants/
│   └── theme.ts            # Theme configuration
└── utils/
    ├── mockApi.ts          # Mock API for demo
    └── storage.ts          # Local storage utilities
```

## ✨ Features

- **Drag and Drop**: Smoothly move tasks between columns
- **Task Management**: Create, update, and delete tasks
- **Filtering**: Filter by priority, assignee, due date, and tags
- **Sorting**: Sort tasks by various criteria
- **Responsive Design**: Works on phones and tablets
- **Smooth Animations**: 60fps animations using Reanimated 2
- **Mock API**: Simulates backend with realistic delays
- **Performance**: Optimized for 1000+ tasks

## 🔧 Configuration

### Board Sections
The default board has four sections:
- To Do
- In Progress
- Review
- Done

These can be customized in `BoardConfigContext.tsx`.

### Theme
Colors and styling can be customized in `src/constants/theme.ts`.

## 🐛 Troubleshooting

### Common Issues

1. **"Unable to resolve module" errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules
   npm install
   npm start -- --clear
   ```

2. **Gesture handler not working**
   - Make sure you've restarted the Metro bundler after installing gesture-handler
   - For bare React Native projects, you may need to rebuild the app

3. **Animations not smooth**
   - Ensure you're testing on a real device or release build
   - Development builds may have reduced performance

4. **iOS build issues**
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Development Tips

- Use `npm start -- --clear` to clear the cache if you encounter issues
- For better performance testing, create a release build
- The mock API generates 50 tasks by default (adjustable in `mockApi.ts`)

## 📱 Platform-Specific Notes

### iOS
- Requires iOS 13.0 or later
- Best tested on iPhone 11 or newer

### Android
- Requires Android 5.0 (API 21) or later
- Enable hardware acceleration for best performance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.