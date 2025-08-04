# University Vehicle Sticker System

This is a mobile application developed using **React Native** and **Firebase**, designed to streamline the process of vehicle registration, sticker generation, and administrative approval for university staff and students. The system provides different interfaces for both users and administrators.

## Features

- **User Authentication**
- **Add and manage vehicles**
- **Admin dashboard**
- **Real time updates**
- **User and admin roles**

## Tech Stack

- **React Native (Expo)**
- **Firebase (Auth & Firestore)**
- **JavaScript (ES6+)**

## Installation and Setup

> [!IMPORTANT]  
> You will need to download the "Expo Go" app from your designated app store
> https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=docs https://apps.apple.com/us/app/expo-go/id982107779

```bash
#Clone the repository
git clone https://github.com/B1t-Master/university-vehicle-system.git
cd university-vehicle-system
#Install dependacies
npm install
#Run the Project
npx expo start --tunnel
```

> [!CAUTION]
> You may need to write in the url of the code since the scanning function is not always consistent you may come across an error from time to time.
> You may also need to update the expo version in the dependancies

## Screenshots

<div style="display: flex; flex-wrap: wrap;">

  <img src="./screenshots/login.jpg" width="200" height="433.6" />
  <img src="./screenshots/user-dashboard.jpg" width="200" height="433.6" />
  <img src="./screenshots/approvals.jpg" width="200" height="433.6" />

  <img src="./screenshots/add-vehicle.jpg" width="200" height="433.6" />
  <img src="./screenshots/vehicles.jpg" width="200" height="433.6" />
  <img src="./screenshots/admin-dashboard.jpg" width="200" height="433.6" />

  <div style="width: 100%; text-align: center; margin-top: 10px;">
    <img src="./screenshots/qr.jpg" width="200" height="211" />
  </div>

</div>
