import { describe, expect, it, test } from 'vitest';

describe('test', () => {
  test('should be able to test', () => {
    expect(1).toBe(1);
  });

  it('should be able to perform a sum', () => {
    const result = 2 + 3;
    expect(result).toEqual(5);
  });
});