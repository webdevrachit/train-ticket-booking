import React from 'react';
import {Helmet} from 'react-helmet';
import config from 'config';

const DocumentHead = ({title}) => {
    var defaultTitle = 'Login';
    return (
        <Helmet>
            <title>{title ? title : defaultTitle} - {config.appName}</title>
        </Helmet>
    );
};

export default DocumentHead;