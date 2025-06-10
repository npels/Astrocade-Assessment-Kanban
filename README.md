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
## Process notes

This was my first time ever using React Native (I have some limited experience with normal react for web from Kodable). Before starting the assessment, I researched how to set up my dev environment and get a project up and running, and made a very simple counter app for practice.

I started the actual assessment by feeding the take home document into Claude Opus 4 and told it to create the app as directed (I wish I could have used Claude Code for this assessment, but unfortunately it is not supported on windows and I only have a personal windows device).

It generated all of the code required for the basic functionality of the project, which I then made files for and started actually testing out the app.

Claude's version generally worked pretty well, though there were a number of missing features. There was no filtering functionality, which was one of the requirements for the assessment, so I had it generate the code for that as well. It worked pretty well out of the box, thankfully.

There were a couple glaring bugs as well, such as the drag-to-refresh function conflicting with scrolling up within a section. I ended up fixing that one manually with a little bit of research.

Around this time, I hit the rate limit for Claude and couldn't use it to help me anymore. I tried switching to ChatGPT, but it was generating code with quite a few errors and some sections that just did not make sense, so I was without AI assistance from then on.

Another feature that Claude did not implement was dragging and dropping tasks; it left some skeleton functions for it, but not enough to easily complete the implementation. I figured that I would not have time to implement this myself since I am not familiar with the dependencies that would be needed and it seems like a rather complex task for a newbie to do in just a few hours.

I ended up having to compromise by adding buttons within the task info modal to change a task's section. It's no drag and drop, but it works well enough for what it is. Doing this required adding a context provider so that the names and colors for each section could be globally accessed by the task info modal.

I tried briefly to implement drag and drop at the end, since I was feeling okay about the rest of the project, but I ran out of time to debug some errors that it was causing. I ended up commiting my progress on it to a separate branch `dragDrop`; I reckon I could have figured it out given another 30-60 minutes.

I also ran out of time to implement adding/changing sections, though the architecture should be able to support it without too many changes.