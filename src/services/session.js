import Cookies from 'js-cookie'

export const setUserCookie = (session) => {
    Cookies.remove('maya_energy_userCookie');
    Cookies.set('maya_energy_userCookie', JSON.stringify(session), { expires: 15, path: '/' });
};

export const getUserCookie = () => {
    const sessionCookie = Cookies.get('maya_energy_userCookie');
    if (sessionCookie === undefined) return null;
    return JSON.parse(sessionCookie);
};

export const removeUserCookie = () => {
    Cookies.remove('maya_energy_userCookie');
};

