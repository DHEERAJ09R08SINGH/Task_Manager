export const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

export const getRole = () => {
  const user = getUser();
  return user?.role;
};