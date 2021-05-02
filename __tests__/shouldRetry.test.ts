import { retry } from '../src/utils/retry'

it('retry return data when success', async () => {
  let counter = 0
  const result = await retry(async () => {
    counter++
    return 'data'
  })
  expect(result).toBe('data')
  expect(counter).toBe(1) // should be only one request, because first is success
})

it(`retry should fail when to much errors`, async () => {
  let counter = 0
  try {
    await retry(async () => {
      counter++
      throw Error('error ' + counter)
    }, 3)
  } catch (e) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(e.message).toBe('error 4')
    return
  }

  throw Error('This should not be invoked')
})
