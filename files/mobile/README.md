# AutoBrain AI — Mobile (Expo + React Native)

Requirements:
- Node 18+
- Expo CLI (optional but recommended) - install: npm i -g expo-cli
- Run on simulator/emulator or device

Steps:
1. cd mobile
2. npm install
3. expo start
4. Open on iOS/Android simulator or device

Notes:
- The mobile app uses a demo flow with mocked backend calls if the backend is not reachable.
- Edit API_BASE in src/screens/ProcessingScreen.tsx and src/screens/HistoryScreen.tsx to point to your backend (e.g., http://localhost:4000/api or http://<your-host-ip>:4000/api).
- For Android emulator use 10.0.2.2:4000. For physical devices use your machine IP and allow backend to accept connections.