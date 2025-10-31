const { getTimestamp, md5 } = require('../src/utils');

describe('Utils Functions', () => {
  test('getTimestamp converts time string to seconds', () => {
    expect(getTimestamp('12:30:45')).toBe(12 * 3600 + 30 * 60 + 45);
    expect(getTimestamp('00:00:00')).toBe(0);
  });

  test('md5 generates hash', () => {
    const hash = md5('test');
    expect(hash).toBeTruthy();
    expect(typeof hash).toBe('string');
    expect(hash.length).toBe(32);
  });
});