import { paramsSerializer } from '@/api/paramsSerializer'
import { describe, expect, it } from 'vitest'

describe('Params Serializer', () => {
  it('should serialize request params correctly', () => {
    expect(
      paramsSerializer({
        num: ['one', 'two', 'three'],
      }),
    ).toEqual('num=one&num=two&num=three')
  })
})
