import { createModel } from '.'

describe('createModel', () => {
  it('should require initialState to be defined', () => {
    expect(() => createModel()).toThrow()
  })
})
