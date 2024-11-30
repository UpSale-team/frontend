import apiHelper from "../utils/apiHelper";
import { apiUrls } from "../utils/constants";
import appStrings from "../utils/strings";

export async function subscribePaymentApi({ plan, onSuccess, onFail }) {
  try {
    const response = await apiHelper.post(apiUrls.Subcribe, { plan });

    console.log('Subscribe Payment API Response:', response); // Add this line

    if (response?.success) {
      onSuccess?.(response);
    } else {
      onFail?.(response?.detail || appStrings.errors.paymentFailed);
    }
  } catch (error) {
    console.error('Payment subscription error:', error);
    onFail?.(error.message || appStrings.errors.paymentFailed);
  }
}

export async function handlePaymentCallbackApi({ orderCode, status, onSuccess, onFail }) {
    try {
      // Input validation
      if (!orderCode || !status) {
        throw new Error('Missing required parameters: orderCode and status');
      }
  
      // Sanitize and encode URL parameters
      const sanitizedOrderCode = encodeURIComponent(orderCode);
      const sanitizedStatus = encodeURIComponent(status);
  
      const response = await apiHelper.get(
        `${apiUrls.CallBack}?orderCode=${sanitizedOrderCode}&status=${sanitizedStatus}`
      );
  
      // Explicit response checking
      if (response && response.success) {
        onSuccess?.(response);
      } else {
        const errorMessage = response?.detail || appStrings.errors.paymentFailed;
        onFail?.(errorMessage);
      }
    } catch (error) {
      console.error('Payment callback error:', error);
      const errorMessage = error.message || appStrings.errors.paymentFailed;
      onFail?.(errorMessage);
    }
  }