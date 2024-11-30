import apiHelper from "../utils/apiHelper";
import { apiUrls } from "../utils/constants";
import appStrings from "../utils/strings";

export async function createProjectApi({
  name,
  description,
  alias,
  onFail,
  onSuccess,
}) {
  //Send the request
  const data ={
    name,
    description,
    alias
  }
  const response = await apiHelper.post(apiUrls.createProject, data);
  //Handle response
  if (response.message === "Project created successfully.") {
    onSuccess(response.data);

  } else {
    onFail(response.message || "Unknown error");
  }

}

export async function getProjectApi(projectId) {
  try {
    const response = await apiHelper.get(apiUrls.GetProject(projectId));
    
    // Add debug logging
    console.debug('Project API response:', response);
  
    // Check if response exists and has data
    if (!response || !response.data) {
      throw new Error('Invalid response format');
    }
  
    // Check for success message or valid data structure
    if (response.message === "Project retrieved successfully." || response.data) {
      return response.data;
    }
  
    throw new Error(response.detail || 'Failed to retrieve project');
  } catch (error) {
    // Handle specific HTTP errors
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`Project with ID ${projectId} not found`);
      }
      throw new Error(error.response.data?.detail || error.response.data?.message || 'Failed to retrieve project');
    }
    
    // Enhanced error logging
    console.error("Get project error:", {
      error: error.message,
      projectId,
      response: error.response
    });
    throw error;
  }
}
export async function deleteProjectApi({
  projectId,
  onFail,
  onSuccess,
}) {
  try {
    const response = await apiHelper.delete(apiUrls.DeleteProject(projectId));
    
    // Simplified success condition
    if (response?.status === 200 || response?.message?.includes("success")) {
      onSuccess(projectId);  // Pass projectId back to maintain consistency
      return;
    }
    
    onFail(response?.error || response?.detail || "Failed to delete project");
  } catch (error) {
    console.error("Delete error:", error);
    onFail(error?.message || "An error occurred while deleting the project");
  }
}

export async function updateProjectFieldsApi({
  projectId,
  fields,
  onSuccess,
  onFail
}) {
  if (!projectId) {
    onFail("Project ID is required");
    return;
  }
  try {
    const response = await apiHelper.put(apiUrls.UpdateProject(projectId), fields);
    
    if (response?.message?.includes("success")) {
      onSuccess(response.data);
    } else {
      onFail(response?.message || "Failed to update project");
    }
  } catch (error) {
    console.error("Update error:", error);
    onFail(error?.message || "An error occurred while updating the project");
  }
}
