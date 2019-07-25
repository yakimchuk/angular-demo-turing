export { environment } from '@app/../environments/environment'

export const api = {
  endpoint: 'https://backendapi.turing.com'
};

export const pagination = {
  limit: 10,
  page: 1,
  debounce: 1000
};

export const network = {
  aggregation: {
    time: 50
  }
};

export const navigation = {
  loginRedirectUrl: '/account?error=session'
};

export const ui = {
  mobile: {
    maxWidth: 991,
  },
  toasts: {
    duration: 5000,
    delay: 1000
  },
  autocomplete: {
    limit: 25,
    debounce: 500
  }
};

export const images = {
  directory: 'https://backendapi.turing.com/images/products/'
};
