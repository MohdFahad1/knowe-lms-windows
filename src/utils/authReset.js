import storageHelper from "./storageHelper";

export const clearAuthData = () => {
  storageHelper.removeItem("token");
  storageHelper.removeItem("user");
};

export default clearAuthData;
