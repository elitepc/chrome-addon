import { getCompanyDetails } from '../../../api/teamlyzer';

const handleMessage = async (request) => {
  try {
    if (!request.method) {
      return;
    }
    switch (request.method) {
      case 'company.get':
        return {
          status: 200,
          data: await getCompanyDetails(request.data),
        };
      default: {
        return {
          status: 404,
          message: 'Method doesn\'t exist',
        };
      }
    }
  } catch (err) {
    return {
      status: 404,
      message: err,
    };
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleMessage(request).then(sendResponse);
  return true; // return true to indicate we wish to send a response asynchronously
});
