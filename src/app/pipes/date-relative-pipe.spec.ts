import { DateRelativePipe } from './date-relative-pipe';

describe('DateRelativePipe', () => {
  const pipe = new DateRelativePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform today\'s date to "Aujourd\'hui"', () => {
    const today = new Date().toISOString();
    expect(pipe.transform(today)).toBe("Aujourd'hui");
  });
});
