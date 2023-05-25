import axios from "axios";
import { createBrowserRouter, RouterProvider as RP } from "react-router-dom"

import App from "../App"
import Orders from "../pages/orders/Orders";

axios.defaults.baseURL = 'http://localhost:5000';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/orders',
                element: <Orders />
            }
        ],
        loader: async () => {
            const data = await axios.get('/api/tasks/all');
            return data;
        }
    },
]);

export default () => {
    return <RP router={router} />;
};