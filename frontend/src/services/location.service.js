import axios from 'axios';

export default {
  getLocationData(zipCode) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/api/location-data',
        params: {
          zipCode: zipCode
        }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err.response);
      });
    });
  },

  validateZipCode(zipCode) {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zipCode);
  }
};
