import axios from "axios";
import { createBrowserRouter, RouterProvider as RP } from "react-router-dom"

import App from "../App"

axios.defaults.baseURL = 'http://localhost:5000';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: async () => {
            const data = await axios.get('/tasks/all');
            return data;
        }
    },
]);

export default () => {
    return <RP router={router} />;
};