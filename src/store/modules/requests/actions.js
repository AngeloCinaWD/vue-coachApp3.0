export default {
  async addRequest(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://vue3-coach-app-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to send request.');

      throw error;
    }

    const responseData = await response.json();

    newRequest.id = responseData.name;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue3-coach-app-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
    );

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch data.');

      throw error;
    }

    const responseData = await response.json();

    const requests = [];

    for (const idRequest in responseData) {
      requests.push({
        id: idRequest,
        coachId: coachId,
        userEmail: responseData[idRequest].userEmail,
        message: responseData[idRequest].message,
      });
    }

    context.commit('setRequests', requests);
  },
};
