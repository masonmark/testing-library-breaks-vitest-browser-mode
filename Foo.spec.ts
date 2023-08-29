import { Foo } from './Foo';
import { describe, it, expect } from 'vitest';

describe('Foo', () => {
  it('should work', () => {
    expect(Foo()).toEqual('foo');
  });
});
