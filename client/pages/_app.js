import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={ currentUser }/>
            <div>
                <Component currentUser={ currentUser } {...pageProps} />
            </div>
        </div>
    );
};

// This is called by the page that is being loaded. In this case
// If landing page is being loaded then the appContext for index.js
// would get passed into appContext with the Component being the first parameter
AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
    
    let pageProps = {};
    // appContext.Component.getInitialProps is used for referencing getInitialProps function
    // for individual pages, in this case index.js
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    }

    return {
        pageProps,
        ...data
    };
};

export default AppComponent;