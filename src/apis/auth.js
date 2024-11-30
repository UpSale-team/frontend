import apiHelper from "../utils/apiHelper";
import { apiUrls } from "../utils/constants";
import appStrings from "../utils/strings";
import { getCookie, setCookie, removeCookie } from "../utils/cookie";

export async function loginApi({ accessToken, onFail, onSuccess }) {
  try {
    // Remove current token (if exists)
    removeCookie("token");

    // Send login request to backend
    const response = await apiHelper.post(apiUrls.login, {
      access_token: accessToken,
    });

    console.log("Login response:", response);  // Log the full response to inspect it

    // Check if response contains the token
    if (response && response.token) {  // Directly access the token
      // Set token in cookies
      setCookie("token", response.token);
      
      // Add token to apiHelper
      apiHelper.addToken(response.token);
      
      // Call the success callback
      onSuccess();
    } else {
      // Handle failure: no token found in the response
      const errorMsg = response && response.detail ? response.detail : appStrings.language.utils.noDataFound;
      onFail(errorMsg);
    }
  } catch (error) {
    // Catch unexpected errors and pass a fallback message to the failure callback
    console.error("Login API error:", error);
    onFail(error.message || appStrings.language.utils.genericError);
  }
}

async function logoutApi() {
  const response = await apiHelper.get(apiUrls.logout)
  };
  const data = await response.json();
  if (data.status === 200) {
      // Successfully logged out, now remove the token
      localStorage.removeItem('access_token');  // Clear the token
      window.location.href = "/login";  // Redirect to the login page
  }


export async function getCurrentUserApi({ user, onFail, onSuccess }) {
  if (user) {
    onSuccess(user);
    return;
  }

  // Get token from cookie storage
  const token = getCookie("token");

  // If no token found, call onFail callback
  if (!token) {
    onFail(appStrings.language.auth.noLogin);
    return;
  }

  try {
    // Send getMe request to the server
    const response = await apiHelper.get(apiUrls.getMe, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });

    // Handle response
    if (response && response.user) {
      // On success, pass the user data to onSuccess
      onSuccess(response.user);
    } else {
      // Handle failure if there's no user in the response
      onFail(appStrings.language.utils.noDataFound);
    }
  } catch (error) {
    // Catch any errors and pass an error message to onFail
    console.error("Error fetching user data:", error);
    onFail(error.message || appStrings.language.utils.genericError);
  }
}