import React, { use } from 'react';
import { AuthContext } from '../src/contexts/AuthContext'

const useAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo;
};

export default useAuth;

