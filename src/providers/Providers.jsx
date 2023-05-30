import AntProvider from "./Ant";
import RouterProvider from "./Router";
import { AuthProvider } from './Auth';

const Providers = () => {
    return (
        <AuthProvider>
            <AntProvider>
                <RouterProvider />
            </AntProvider>
        </AuthProvider>
    );
}

export default Providers;