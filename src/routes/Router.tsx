import App from "@/App";
import BookingManagement from "@/components/Admin/bookingManagement/BookingManagement";
import MainLayout from "@/components/layout/MainLayout";
import AdminDashboard from "@/pages/private/AdminDashboard";
import AboutUs from "@/pages/public/AboutUs";
import { createBrowserRouter } from "react-router-dom";
import SlotManagement from "@/components/Admin/slotManagement/SlotManagement";
import RoomManagement from "@/components/Admin/roomManagement/RoomManagement";
import RoomDetails from "@/pages/private/RoomDetails";
import BookingForm from "@/components/bookingProcess/BookingForm";
import Checkout from "@/pages/private/CheckOut";
import MeetingRooms from "@/pages/public/MeetingRooms";
import MyBookings from "@/pages/private/MyBookings";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ContactUs from "@/pages/public/ContactUs";
import NotFound from "@/pages/public/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },

      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "meeting-rooms",
        element: (
          <ProtectedRoute role="user">
            <MeetingRooms />
          </ProtectedRoute>
        ),
      },
      {
        path: "rooms/:roomId",
        element: (
          <ProtectedRoute role="user">
            <RoomDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "booked-form/:roomId",
        element: (
          <ProtectedRoute role="user">
            <BookingForm roomId={""} />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkOut",
        element: (
          <ProtectedRoute role="user">
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoute role="user">
            <MyBookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <RoomManagement />,
          },
          {
            path: "rooms",
            element: <RoomManagement />,
          },
          {
            path: "slots",
            element: <SlotManagement />,
          },
          {
            path: "bookings",
            element: <BookingManagement />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
