import { ConfigProvider } from "antd"

const AntProvider = ({ children }) => {
    return (
        <ConfigProvider>{children}</ConfigProvider>
    );
}

export default AntProvider;