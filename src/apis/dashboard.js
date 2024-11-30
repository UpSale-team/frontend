import apiHelper from "../utils/apiHelper";
import { apiUrls } from "../utils/constants";
import { getCookie } from "../utils/cookie";
import appStrings from "../utils/strings";

export async function getYourProjectsApi({ onFail, onSuccess }) {
  try {
    // Get token from cookie storage
    const token = getCookie("token");
    
    if (!token) {
      onFail(appStrings.language.auth.noLogin);
      return;
    }

    // Send get request
    const params = {
      get_type: "owned",
    };
    
    // Using correct endpoint from constants
    const response = await apiHelper.get(apiUrls.GetAllProjects, params);

    // Improved response handling
    if (!response) {
      onFail(appStrings.language.utils.noDataFound);
      return;
    }

    if (response.error || response.detail) {
      onFail(response.error || response.detail);
      return;
    }

    // Success case
    if (response.data) {
      onSuccess(response.data);
      return;
    }

    onFail(appStrings.language.utils.noDataFound);

  } catch (error) {
    console.error('Error fetching projects:', error);
    onFail(appStrings.language.utils.unexpectedError);
  }
}