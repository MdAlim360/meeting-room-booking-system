# Meeting Room Booking System

## Introduction

The Meeting Room Booking System is a web application that allows users to book available meeting rooms for specific time slots. The system is designed for two types of users: **Admins** and **Users**. Admins can manage rooms, create slots, and handle bookings, while regular users can explore rooms, view room details, and book available time slots for meetings.

## Project Description

This project provides an efficient way for organizations to manage meeting room bookings. Admins have the ability to create rooms, define available slots, and manage bookings. Users can log in, explore available meeting rooms, view details, check slot availability by selecting dates, and book rooms for their meetings. The system ensures that users only book rooms during available slots and receive feedback on their bookings.

## Features

- **Admin Features:**
  - Create and manage meeting rooms.
  - Define and manage time slots for meeting rooms.
  - Manage users and view all bookings.
- **User Features:**
  - Log in and explore meeting rooms.
  - View room details and availability.
  - Select available slots based on the chosen date.
  - Book available meeting room slots.
  - View and manage personal bookings.
- **General Features:**
  - Responsive design for mobile,tablet and desktop.
  - Smooth animations for UI interactions.
  - Role-based access control (Admin/User).
  - Higher security

## Technology Stack

- **Frontend:**
  - Typescript
  - React
  - Redux (State management)
  - RTK Query (Data fetching)
  - Tailwind CSS (Styling)
  - ShadCN (Component library)
  - Framer Motion (Animations)
  - React Icons (Iconography)
- **Backend:** (if applicable)
  - Typescript
  - Node.js
  - Express.js
  - Mongoose
  - MongoDB (Database)
  - Eslint
  - prettier
  - jwt token

## Installation Guideline

### Prerequisites

Before installing the project, ensure you have the following installed:

- **Node.js** (v14 or above)
- **npm** or **yarn**

### Installation Steps

1. **Clone the repository:**
   ```bash
   https://github.com/MdAlim360/meeting-room-booking-system.git
   cd meeting-room-booking-system
   ```
1. **Install dependencies:**
   ```bash
   npm install

   ```
1. **Run the development server:**
   ```bash
   npm run dev
   ```

## Usage

### Admin Workflow:

1. Log in to the system as an Admin.
2. Create and manage meeting rooms.
3. Define time slots for each room.
4. Monitor and manage user bookings.

### User Workflow:

1. Log in as a User.
2. Browse available meeting rooms on the home page.
3. View details of a selected room.
4. Select a date to check available time slots.
5. Book a meeting room by selecting a slot and confirming the booking.
6. View and manage your bookings.
