// Клас для HTTP-помилок з кодом статусу.
// Використовується у сервісах і контролерах замість ручного res.status().json().
const messages = {
  400: 'Bad Request',
  404: 'Not Found',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
};

class HttpError extends Error {
  constructor(status, message = messages[status] ?? 'Unknown Error') {
    super(message);
    this.status = status;
  }
}

module.exports = HttpError;
