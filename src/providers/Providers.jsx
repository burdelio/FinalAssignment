import AntProvider from "./Ant";
import RouterProvider from "./Router";

const Providers = () => {
    return (
        <AntProvider>
            <RouterProvider />
        </AntProvider>
    );
}

export default Providers;