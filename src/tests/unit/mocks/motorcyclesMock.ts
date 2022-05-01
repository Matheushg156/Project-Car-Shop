export const motorcyclePayload = {
  model: 'Honda CG 160',
  year: 2018,
  color: 'red',
  status: true,
  buyValue: 14190,
  engineCapacity: 162,
  category: 'Street',
};

export const motorcyclePayloadUpdated = {
  model: 'Honda CG 160',
  year: 2019,
  color: 'Black',
  status: true,
  buyValue: 12999,
  engineCapacity: 162,
  category: 'Street',
};

export const invalidId = '5e9f8f9f9f9f9f9f9f9f9f';

export const motorcycleResponse = {
  _id: '5e9f8f9f9f9f9f9f9f9f9f92',
  model: 'Honda CG 160',
  year: 2018,
  color: 'red',
  status: true,
  buyValue: 14190,
  engineCapacity: 162,
  category: 'Street',
};

export const motorcycleResponseUpdated = {
  _id: '5e9f8f9f9f9f9f9f9f9f9f92',
  model: 'Honda CG 160',
  year: 2019,
  color: 'Black',
  status: true,
  buyValue: 12999,
  engineCapacity: 162,
  category: 'Street',
};

export const motorcyclesListResponse = [
  {
    _id: '5e9f8f9f9f9f9f9f9f9f9f92',
    model: 'Honda CG 160',
    year: 2018,
    color: 'red',
    status: true,
    buyValue: 14190,
    engineCapacity: 162,
    category: 'Street',
  },
  {
    _id: '5e9f8f9f9f9f9f9f9f9f9f93',
    model: 'Honda Biz 125',
    year: 2000,
    color: 'white',
    status: true,
    buyValue: 12360,
    engineCapacity: 124,
    category: 'Street',
  }];

export const motorcycleInvalidPayload = {
  model: 'Honda CG 160',
  year: 2018,
  color: 'red',
  status: true,
  buyValue: 14190,
  engineCapacity: '162',
  category: 'Street',
};

export const motorcycleErrorResponse = {
  error: {
    issues: [
      {
        code: "invalid_type",
        expected: "number",
        received: "string",
        path: [
          "engineCapacity"
        ],
        message: "Expected number, received string"
      }
    ],
    name: "ZodError"
  }
};