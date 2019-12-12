import React, { createContext, useContext } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const auth = React.createContext(cookies.get('auth'));
console.log(auth)
export {
    auth
};