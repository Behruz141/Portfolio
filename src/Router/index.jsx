import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import About from "../pages/about/About.jsx";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="About" element={<About />} />
        {/* Keyinchalik yangi sahifalar qo'shsangiz, ularni ham shu yerga yozasiz */}
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
