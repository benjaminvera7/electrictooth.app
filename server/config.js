let dbUri;

if (process.env.NODE_ENV === 'development') {
  dbUri = 'mongodb://localhost:27017/ET3';
} else {
  dbUri =
    'mongodb+srv://ben:pacers@cluster0-jxib3.mongodb.net/ET3?retryWrites=true&w=majority';
}

module.exports = {
  secret: 'littlesecret',
  dbUri: dbUri,
  port: 3090,
  PAYPAL_CLIENT_ID:
    'AReCIFKo4ImyQTlrRjMEuHpmmcVGXyciNf-Dne81-84WWejTmwJ5NtB65z-AV_jMU4zJIUQwql3VtzMM',
  PAYPAL_CLIENT_SECRET:
    'EF6531tqIPafbNi4-4-47Qn_EBp8ERX3ant6Z6JN3ZIiM05TiGkfPuRl8zPSepgGsdGlZTf_I46t6X-b',
};
