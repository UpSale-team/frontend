import apiHelper from "../utils/apiHelper";
import { apiUrls } from "../utils/constants";
import appStrings from "../utils/strings";

/**
 * Create a new widget
 */


/**
 * Update widget configuration
 */
export async function UpdateWidgetConfig({
  project_id,
  apiKey,
  config,
  onSuccess,
  onFail
}) {
  try {
    const response = await apiHelper.put(
      apiUrls.UpdateWidgetConfig(project_id),
      config,
      {
        headers: {
          'api_key': apiKey
        }
      }
    );

    console.log('Update response:', response); // Log the response

    if (response.status === 200) {
      if (onSuccess) {
        onSuccess(response.data);
      }
    } else {
      if (onFail) {
        onFail(response.data);
      }
    }
  } catch (error) {
    console.error('Update widget config error:', error); // Log the error
    if (onFail) {
      onFail(error.message || 'Failed to update widget configuration');
    }
  }
}

/**
 * Get widget configuration
 */
export async function createWidgetApi({ 
  project_id, 
  name,
  apiKey,
  config,
  onSuccess, 
  onFail 
}) {
  // Validate required inputs
  if (!project_id || !name || !apiKey) {
    onFail('Project ID, name and API key are required');
    return;
  }

  // Validate config structure
  const widgetConfig = config || {
    chatbot_name: name,
    header_color: "#228be6",
    position: "bottom-right",
    authorized_domains: [],
    max_messages: 50,
    session_timeout: 30,
    is_active: true
  };

  try {
    const requestBody = {
      name: name,
      config: widgetConfig
    };

    console.log('Creating widget with:', requestBody); // Debug log

    const response = await apiHelper.post(
      apiUrls.CreateWidget(project_id),
      requestBody,
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    // Validate response
    if (!response || !response.data) {
      throw new Error('Empty response received from server');
    }

    // Handle different success response structures
    if (response.status === 201 || response.status === 200) {
      const responseData = response.data.data || response.data;
      
      if (!responseData) {
        throw new Error('Missing data in server response');
      }

      onSuccess(responseData);
      return;
    }

    throw new Error(`Unexpected status code: ${response.status}`);

  } catch (error) {
    console.error('Widget creation failed:', {
      data: error?.response?.data,
      status: error?.response?.status, 
      message: error?.message,
      stack: error?.stack
    });

    const errorMessage = 
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Failed to create widget';

    console.error('Error message:', errorMessage);
    onFail(errorMessage);
  }
}

export async function updateWidgetApi({
  project_id,
  apiKey,
  config,
  onSuccess,
  onFail
}) {
  // Validate inputs
  if (!project_id || !apiKey || !config) {
    onFail('Missing required parameters');
    return;
  }

  try {
    // Make API request
    const response = await apiHelper.put(
      apiUrls.UpdateWidget(project_id),
      config,
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Update widget response:', response);

    // Handle successful response
    if (response?.status === 200) {
      const responseData = response.data.data || response.data;
      
      if (!responseData) {
        throw new Error('Missing data in server response');
      }

      onSuccess(responseData);
      return;
    }

    throw new Error(`Unexpected status code: ${response.status}`);

  } catch (error) {
    // Detailed error logging
    console.error('Widget update failed:', {
      data: error?.response?.data,
      status: error?.response?.status,
      message: error?.message,
      stack: error?.stack
    });

    // Extract error message
    const errorMessage = 
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Failed to update widget';

    console.error('Error message:', errorMessage);
    onFail(errorMessage);
  }
}

export const getWidgetConfigApi = async ({ widgetId, onSuccess, onFail }) => {
  try {
    const response = await apiHelper.get(apiUrls.GetWidget(widgetId));

    if (!response) {
      console.error('Missing response data');
      onFail('Invalid response from server');
      return;
    }

    const config = response.config || {};

    const widgetConfig = {
      widget_id: response.project_id,
      project_id: response.project_id,
      name: response.name,
      user_id: response.user_id,
      api_key: response.api_key,
      config: {
        allow_origins: config.allow_origins || [],
        authorized_domains: config.authorized_domains || [],
        avatar_url: config.avatar_url || null,
        chatbot_name: config.chatbot_name || 'AI Assistant',
        header_color: config.header_color || '#228be6',
        is_active: config.is_active !== undefined ? config.is_active : true,
        max_messages: config.max_messages || 50,
        opening_text: config.opening_text || 'Hello! How can I help you today?',
        position: config.position || 'bottom-right',
        rate_limit: config.rate_limit || 60,
        session_timeout: config.session_timeout || 30,
        tracking_enabled: config.tracking_enabled !== undefined ? config.tracking_enabled : true
      }
    };

    if (!widgetConfig.api_key) {
      console.error('Missing API key in response');
      onFail('Invalid widget configuration: missing API key');
      return;
    }

    onSuccess(widgetConfig);

  } catch (error) {
    console.error('Widget config error:', error);
    handleApiError("Get widget config", error, onFail);
  }
}


/**
 * Validate widget domain
 */
export const validateWidgetApi = async ({ widgetId, domain, onSuccess, onFail }) => {
  try {
    const response = await apiHelper.get(
      `${apiUrls.ValidateWidget(widgetId)}?domain=${encodeURIComponent(domain)}`
    );

    if (response?.valid) {
      onSuccess();
    } else {
      onFail(response?.message || 'Invalid widget or domain');
    }
  } catch (error) {
    console.error('Validation Error:', error);
    onFail(error.message || 'Validation failed');
  }
}

export const getWidgetSessionApi = async ({ projectId, apiKey, sessionId, onSuccess, onFail }) => {
  try {
    console.log('Getting widget session:', {
      projectId,
      apiKey,
      sessionId 
    });

    const response = await apiHelper.get(
      apiUrls.GetWidgetSessionId(projectId),
      {
        headers: {
          'api-key': apiKey,
          'session-id': sessionId
        }
      }
    );

    if (response) {
      onSuccess(response);
    } else {
      onFail('Failed to get widget session');
    }
  } catch (error) {
    console.error('Session Error:', error);
    onFail(error.message || 'Failed to get widget session');
  }
};

/**
 * Get chat history
 */
export async function getChatHistoryWidgetApi({
  projectId,
  sessionId,
  apiKey,
  onSuccess,
  onFail,
}) {
  try {
    if (!projectId || !sessionId || !apiKey) {
      throw new Error('Missing required parameters: projectId, sessionId, or apiKey');
    }

    // Use axios config object correctly
    const config = {
      headers: {
        'session-id': sessionId,
        'api-key': apiKey
      }
    };

    // Make direct axios request
    const response = await api.get(
      apiUrls.GetChatHistoryWidget(projectId),
      config
    );

    console.log('Chat history response:', response);

    if (response?.data?.messages) {
      onSuccess?.(response.data.messages);
    } else {
      throw new Error('Invalid response format');
    }

  } catch (error) {
    console.error('Get chat history error:', error);
    
    if (error.response?.status === 422) {
      onFail?.('Invalid request format. Please check session ID and API key.');
      return;
    }
    
    onFail?.(
      error.response?.data?.detail || 
      error.message || 
      'Failed to get chat history'
    );
  }
}

/**
 * Chat with widget
 */
export async function chatWithWidgetApi({ 
  projectId,
  message,
  sessionId,
  userId, // Added userId parameter
  apiKey,
  modelName = 'gemini',
  system_prompt,
  onSuccess, 
  onFail 
}) {
  // Log the parameters to debug
  console.log('chatWithWidgetApi parameters:', {
    projectId,
    message,
    sessionId,
    userId,
    apiKey,
    modelName,
    system_prompt
  });

  if (!projectId || !sessionId || !userId || !message) { // Added userId check
    onFail('Missing required parameters');
    return;
  }

  try {
    // Format request body to match ChatRequest schema
    const requestBody = {
      message: message,
      model_name: modelName,
      system_prompt: system_prompt || ''
    };

    // Make request with proper headers
    const response = await apiHelper.post(
      apiUrls.ChatWithWidget(projectId),
      requestBody,
      {
        headers: {
          'session-id': sessionId,
          'user-id': userId, // Added user-id header
          'api-key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    // Debug response
    console.log('Raw response:', response);

    // Handle different response structures
    if (response?.data?.answer) {
      onSuccess({
        message: response.data.answer
      });
      return;
    }

    if (response?.data?.data?.answer) {
      onSuccess({
        message: response.data.data.answer
      });
      return;
    }

    // If we get here, response format is invalid
    console.error('Invalid response format:', response);
    throw new Error('Unexpected response format from server');

  } catch (error) {
    // Debug error
    console.error('Chat error details:', {
      message: error.message,
      response: error.response,
      status: error.response?.status,
      data: error.response?.data
    });

    onFail(
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'Failed to send message'
    );
  }
}