export async function messageBackground(request) {
  return new Promise((resolve, reject) => {
    try {
      chrome.extension.sendMessage(request, (response) => {
        if (!response) { return resolve(response); }

        if (response.status === 200) {
          return resolve(response.data);
        }
        // Raise error by default
        return reject(response.message);
      });
    } catch (e) {
      throw new Error(e.message);
    }
  });
}
