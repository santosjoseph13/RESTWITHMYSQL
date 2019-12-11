module.exports = {
    INTERNAL_SERVER_ERROR: {
      status: 500,
      body: {
        code: -1,
        message: 'Internal server error.'
      }
    },
    NOT_FOUND: {
      status: 404,
      body: {
        code: -2,
        message: 'Not found.'
      }
    },
    UNAUTHORIZED: {
      status: 401,
      body: {
        code: -3,
        message: 'Unauthorized'
      }
    },
    INVALID_CREDENTIALS: {
      status: 401,
      body: {
        code: -4,
        message: 'Invalid email/username or password.'
      }
    },
    ACCOUNT_VERIFY_FAIL: {
      status: 400,
      body: {
        code: -5,
        message: 'Account verification failed.'
      }
    },
    INVALID_TOKEN: {
      status: 400,
      body: {
        code: -6,
        message: 'Invalid token.'
      }
    },
    EMAIL_EXISTS: {
      status: 200,
      body: {
        code: -7,
        message: 'Email already exists.'
      }
    },
    ENDPOINT_NOT_FOUND: {
      status: 404,
      body: {
        code: -8,
        message: 'Endpoint not found.'
      }
    },
    ALREADY_EXISTS: {
      status: 409,
      body: {
        code: -9,
        message: 'Data already exists.'
      }
    },
    BAD_REQUEST: {
      status: 400,
      body: {
        code: -10,
        message: 'Bad request.'
      }
    },
    INVALID_OLD_PASSWORD: {
      status: 200,
      body: {
        code: -11,
        message: 'Old password do not match.'
      }
    },
    EMAIL_ERROR: {
      status: 500,
      body: {
        code: -12,
        message: 'Something went wrong to email service.'
      }
    },
    EMPLOYEE_EXISTS: {
      status: 409,
      body: {
        code: -13,
        message: 'Employee already exists.'
      }
    },
    EMPLOYEE_NOT_EXISTS: {
      status: 404,
      body: {
        code: -14,
        message: 'Employee not existing.'
      }
    },
    EMPLOYEE_BANK_NOT_EXISTS: {
      status: 404,
      body: {
        code: -15,
        message: 'Employee bank info not existing.'
      }
    },
    EMPLOYEE_BANK_EXISTS: {
      status: 409,
      body: {
        code: -16,
        message: 'Employee bank info already existing.'
      }
    },
    EMPLOYEE_LEGAL_NOT_EXISTS: {
      status: 404,
      body: {
        code: -17,
        message: 'Employee legal info not existing.'
      }
    },
    EMPLOYEE_LEGAL_EXISTS: {
      status: 409,
      body: {
        code: -18,
        message: 'Employee legal info already existing.'
      }
    },
    DEPARTMENT_NOT_EXISTS: {
      status: 404,
      body: {
        code: -19,
        message: 'Department not existing.'
      }
    },
    PERSONAL_NOT_EXISTS: {
      status: 404,
      body: {
        code: -20,
        message: 'Employee personal info not existing.'
      }
    },
    PERSONAL_LEGAL_EXISTS: {
      status: 409,
      body: {
        code: -21,
        message: 'Employee personal info already existing.'
      }
    },
    TRAINING_NOT_EXISTS: {
      status: 404,
      body: {
        code: -22,
        message: 'Employee training info not existing.'
      }
    },
    EMPLOYMENT_NOT_EXISTS: {
      status: 404,
      body: {
        code: -23,
        message: 'Employee employment history not existing.'
      }
    },
    EMPLOYEE_TIMEKEEPING_NOT_EXISTS: {
      status: 404,
      body: {
        code: -24,
        message: 'Employee timekeeping not existing.'
      }
    },
    EMPLOYEE_TIMEKEEPING_EXISTS: {
      status: 409,
      body: {
        code: -25,
        message: 'Employee timekeeping already existing.'
      }
    },
    EMPLOYEE_EDUCATION_NOT_EXISTS: {
      status: 404,
      body: {
        code: -26,
        message: 'Employee educational background not existing.'
      }
    },
    EMPLOYEE_PAYROLL_NOT_EXISTS: {
      status: 404,
      body: {
        code: -27,
        message: 'Employee payroll information not existing.'
      }
    },
    EMPLOYEE_PAYROLL_EXISTS: {
      status: 409,
      body: {
        code: -28,
        message: 'Employee payroll information already existing.'
      }
    },
    EMPLOYEE_ADDRESS_NOT_EXISTS: {
      status: 404,
      body: {
        code: -29,
        message: 'Employee address information not existing.'
      }
    },
    EMPLOYEE_ADDRESS_EXISTS: {
      status: 409,
      body: {
        code: -30,
        message: 'Employee address already existing.'
      }
    },
    BOOK_EXISTS: {
      status: 409,
      body: {
        code: -30,
        message: 'Book already existing.'
      }
    }
  };