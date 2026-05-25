import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Admin from "./pages/Admin";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import Bookings from "./pages/Bookings";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />
        <Route
  path="/admin"
  element={<Admin />}
/>

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/seats"
          element={<SeatSelection />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/ticket"
          element={<Ticket />}
        />

        <Route
          path="/my-bookings"
          element={<Bookings />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;