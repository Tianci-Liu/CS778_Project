const responseCode = {
  ERROR: -1,
  SUCCESS: 0,
  FAIL: 2,
  Forbidden: 403,
  Unauthorized: 401,
};

const response = {
  success: ({ data = null, message = 'success' } = {}) => ({
    code: responseCode.SUCCESS,
    message,
    data,
  }),
  error: ({ message = 'error', data = null }) => ({
    code: responseCode.ERROR,
    data,
    message,
  }),
  forbidden: ({ message = 'forbidden', data = null }) => ({
    code: responseCode.Forbidden,
    data,
    message,
  }),
  unauthorized: ({ message = 'unauthorized', data = null }) => ({
    code: responseCode.Unauthorized,
    data,
    message,
  }),
  fail: ({ data = null, message = 'fail' } = {}) => {
    return {
      code: responseCode.FAIL,
      message,
      data,
    };
  },
};

module.exports = response;
