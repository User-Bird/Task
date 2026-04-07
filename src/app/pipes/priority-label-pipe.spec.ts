import { PriorityLabelPipe } from './priority-label-pipe';

describe('PriorityLabelPipe', () => {
  const pipe = new PriorityLabelPipe();

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "high" to "🔴 Haute"', () => {
    expect(pipe.transform('high')).toBe('🔴 Haute');
  });

  it('should transform "medium" to "🟡 Moyenne"', () => {
    expect(pipe.transform('medium')).toBe('🟡 Moyenne');
  });

  it('should transform "low" to "🟢 Basse"', () => {
    expect(pipe.transform('low')).toBe('🟢 Basse');
  });
});
