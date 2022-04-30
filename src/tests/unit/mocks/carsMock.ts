export const carPayload = {
  model: 'Ford',
  year: 1993,
  color: 'red',
  status: true,
  buyValue: 54399,
  doorsQty: 4,
  seatsQty: 5,
};

export const carPayloadUpdated = {
  model: 'Ford',
  year: 1993,
  color: 'Black',
  status: false,
  buyValue: 54399,
  doorsQty: 4,
  seatsQty: 5,
};

export const carResponse = {
  _id: '5e9f8f9f9f9f9f9f9f9f9f92',
  model: 'Ford',
  year: 1993,
  color: 'Black',
  status: false,
  buyValue: 54399,
  doorsQty: 4,
  seatsQty: 5,
};

export const carResponseUpdated = {
  _id: '5e9f8f9f9f9f9f9f9f9f9f92',
  model: 'Ford',
  year: 1993,
  color: 'red',
  status: true,
  buyValue: 54399,
  doorsQty: 4,
  seatsQty: 5,
};

export const carsListResponse = [
  {
    _id: '5e9f8f9f9f9f9f9f9f9f9f92',
    model: 'Ford',
    year: 1993,
    color: 'red',
    status: true,
    buyValue: 54399,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    _id: '5e9f8f9f9f9f9f9f9f9f9f93',
    model: 'Fiat Uno',
    year: 2000,
    color: 'white',
    status: true,
    buyValue: 24999,
    doorsQty: 4,
    seatsQty: 5,
  }];

export const carInvalidPayload = {
  model: 'Ford',
  year: 1993,
  color: 'red',
  status: true,
  buyValue: 54399,
  doorsQty: '4',
  seatsQty: 5,
};