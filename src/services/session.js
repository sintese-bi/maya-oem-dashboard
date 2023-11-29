import Cookies from "js-cookie";

// REMOVE O COOKIE ATUAL E ATUALIZA COM NOVO VALOR
export const setUserCookie = (session) => {
  Cookies.remove("maya_energy_userCookie");
  Cookies.set("maya_energy_userCookie", JSON.stringify(session), {
    expires: 15,
    path: "/",
  });
};

// RETORNA O COOKIE DO USUARIO OU NULL
export const getUserCookie = () => {
  const sessionCookie = Cookies.get("maya_energy_userCookie");
  if (sessionCookie === undefined) return null;
  return JSON.parse(sessionCookie);
};

// LIMPA O COOKIE DO USUARIO
export const removeUserCookie = () => {
  localStorage.clear();
  Cookies.remove("maya_energy_userCookie");
};
