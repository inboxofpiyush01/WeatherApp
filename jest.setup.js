jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  Provider: ({children}) => children,
}));

jest.mock('redux-mock-store', () => () => ({
  getState: jest.fn(),
  dispatch: jest.fn(),
}));

jest.mock('jest-mock-extended', () => ({
  mock: jest.fn(),
  mockReset: jest.fn(),
}));
