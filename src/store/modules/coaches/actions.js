export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;

    const token = context.rootGetters.token;

    const coachData = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      areas: payload.areas,
      description: payload.description,
      hourlyRate: payload.rate,
    };

    const response = await fetch(
      `https://vue3-coach-app-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    if (!response.ok) {
      const error = new Error(response.message || 'Failure to send data');

      throw error;
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue3-coach-app-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch.');

      throw error;
    }

    const responseData = await response.json();

    const coaches = [];

    for (const id in responseData) {
      coaches.push({
        id: id,
        firstName: responseData[id].firstName,
        lastName: responseData[id].lastName,
        areas: responseData[id].areas,
        description: responseData[id].description,
        hourlyRate: responseData[id].hourlyRate,
      });
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
