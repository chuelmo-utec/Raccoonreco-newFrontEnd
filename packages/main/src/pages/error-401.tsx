import Layout from "../layouts";
import Content from "../layouts/content";
import ErrorContainer from "../containers/error-401";

const ErrorNotFound = () => {
    return (
        <Layout hideHeader={true}>
            <Content fullHeight align="center">
                <ErrorContainer />
            </Content>
        </Layout>
    );
};

export default ErrorNotFound;
