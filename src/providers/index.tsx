import type { ReactNode } from 'react';
import QueryProvider from './query.provider';
import GoogleAuthProvider from './googleAuth.provider';

const Providers = ({children}:{children:ReactNode}) => {
    return (
        <GoogleAuthProvider>
        <QueryProvider>
            {children}
        </QueryProvider>
        </GoogleAuthProvider>
    );
};

export default Providers;