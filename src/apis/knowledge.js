import apiHelper from '../utils/apiHelper';
import { apiUrls } from '../utils/constants';
import appStrings from '../utils/strings';

export async function uploadDocumentApi({ file, projectId, onSuccess, onFail }) {
  try {
    const formData = new FormData();
    formData.append('document_file', file);
    formData.append('project_id', projectId);

    const response = await apiHelper.postFormData(apiUrls.UploadDocument, formData);

    if (response && response.data) {
      onSuccess(response.data);
    } else {
      onFail(response?.error || appStrings.language.utils.genericError);
    }
  } catch (error) {
    console.error("Upload document error:", error);
    onFail(error?.message || appStrings.language.utils.genericError);
  }
}

export async function uploadDocumentsApi({ document_files, projectId, onProgress, onSuccess, onFail }) {
  try {
    const formData = new FormData();
    document_files.forEach(file => {
      formData.append('document_files', file);
    });
    formData.append('project_id', projectId);

    const response = await apiHelper.postFormData(
      apiUrls.UploadDocuments, 
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) {
            onProgress(percentCompleted);
          }
        }
      }
    );

    if (response?.data) {
      onSuccess(response.data);
    } else {
      onFail(response?.error || 'Upload failed');
    }
  } catch (error) {
    console.error('Upload documents error:', error);
    onFail(error?.message || 'Upload failed');
  }
}


export async function getDocumentApi({ documentId, onSuccess, onFail }) {
  try {
    const response = await apiHelper.get(apiUrls.GetDocument(documentId));

    if (response && response.data) {
      onSuccess(response.data);
    } else {
      onFail(response?.detail || appStrings.language.utils.noDataFound);
    }
  } catch (error) {
    console.error("Get document error:", error);
    onFail(error.message || appStrings.language.utils.genericError);
  }
}

export async function getAllDocumentsApi({ projectId, onSuccess, onFail }) {
  try {
    console.log('Fetching documents for project:', projectId);
    const url = `${apiUrls.GetAllDocuments}?project_id=${projectId}`;
    
    const response = await apiHelper.get(url);
    console.log('API Response:', response);

    if (response?.data) {
      onSuccess(response.data);
    } else {
      onFail(appStrings.language.utils.noDataFound);
    }
  } catch (error) {
    console.error("Get all documents error:", error);
    onFail(error.message || appStrings.language.utils.genericError);
  }
}
export async function deleteDocumentApi({ documentId, onSuccess, onFail }) {
  try {
    const response = await apiHelper.delete(apiUrls.DeleteDocument(documentId));

    if (response && response.data) {
      onSuccess(response.data);
    } else {
      onFail(response?.detail || appStrings.language.utils.genericError);
    }
  } catch (error) {
    console.error("Delete document error:", error);
    onFail(error.message || appStrings.language.utils.genericError);
  }
}


export async function optimizePromptApi({
  prompt,
  model_name = 'gemini',
  onFail,
  onSuccess,
}) {
  const data = {
    prompt: prompt,
    model_name: model_name,
  };

  try {
    const response = await apiHelper.post(apiUrls.OptimizePrompt, data);

    if (response.status === 200) {
      onSuccess(response.data); // API returns optimized prompt directly
    } else {
      onFail(response.message || 'Failed to optimize prompt');
    }
  } catch (error) {
    console.error('Optimize prompt error:', error);
    onFail(error.message || 'Failed to optimize prompt');
  }
}

export async function getAnswersApi({ 
  question,
  projectId,
  modelName = 'gemini',
  promptTemplate,
  onSuccess,
  onFail
}) {
  try {
    const data = {
      question,
      project_id: projectId,
      model_name: modelName,
      system_prompt: promptTemplate || ""
    };

    console.log('Sending request with data:', data);

    const response = await apiHelper.post(apiUrls.GetAnswers, data);
    
    console.log('Received response:', response);

    if (!response) {
      throw new Error('No response received from server');
    }

    if (response.error) {
      throw new Error(response.error);
    }

    // Ensure sources is always an array
    const sources = Array.isArray(response.data?.sources) ? response.data.sources : [];

    const result = {
      data: {
        answer: response.data?.answer || '',
        question: response.data?.question || '',
        sources: sources
      }
    };

    if (onSuccess) {
      onSuccess(result);
    }

    return result;

  } catch (error) {
    console.error('GetAnswers Error:', error);
    if (onFail) {
      onFail(error.message || 'Failed to get response');
    }
    throw error;
  }
}

 

  

export async function SendMessageApi({ project_id, message, onSuccess, onFail }) {
  try {
    const response = await apiHelper.post(apiUrls.SendMessage, {
      project_id,
      message
    });

    if (response && response.data) {
      onSuccess(response.data);
    } else {
      onFail(response?.error || appStrings.language.utils.genericError);
    }
  } catch (error) {
    console.error("Send message error:", error);
    onFail(error?.message || appStrings.language.utils.genericError);
  }
}

export async function getChatHistoryApi({ projectId, onSuccess, onFail }) {
  try {
    const response = await apiHelper.get(apiUrls.GetChatHistory(projectId));

    if (response && response.data) {
      onSuccess(response.data);
    } else {
      onFail(response?.error || appStrings.language.utils.genericError);
    }
  } catch (error) {
    console.error("Get chat history error:", error);
    onFail(error?.message || appStrings.language.utils.genericError);
  }
}

export async function publishChatbotApi({ projectId, widgetConfig, onSuccess, onFail }) {
  try {
    const url = `${apiUrls.PublishChatbot}/${projectId}`;
    
    // Validate required fields
    if (!projectId || !widgetConfig) {
      throw new Error("Missing required parameters");
    }

    // Standardize widget config format
    const standardConfig = {
      project_id: projectId,
      widget_config: {
        chatbot_name: widgetConfig.chatbotName,
        header_color: widgetConfig.headerColor,
        avatar_url: widgetConfig.avatarUrl,
        position: widgetConfig.position || "bottom-right",
        authorized_domains: widgetConfig.authorized_domains || [],
        max_messages: widgetConfig.maxMessages || 50,
        session_timeout: widgetConfig.sessionTimeout || 30,
        rate_limit: widgetConfig.rateLimit || 60,
        system_prompt: widgetConfig.systemPrompt,
        is_active: true,
        opening_text: widgetConfig.opening_text
      }
    };

    const response = await apiHelper.post(url, standardConfig);

    if (response?.data?.api_key) {
      onSuccess({
        apiKey: response.data.api_key,
        widgetConfig: response.data.widget_config,
        projectId
      });
    } else {
      throw new Error("Invalid API response structure");
    }

  } catch (error) {
    console.error("Publish error:", error);
    onFail(
      error?.response?.data?.detail || 
      error?.message || 
      "Failed to publish chatbot"
    );
  }
}