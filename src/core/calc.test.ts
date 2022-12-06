import { plateHeight, plateWidth } from './calc';

describe('calc', () => {
  describe('plateWidth', () => {
    it('can convert from inches', () => {
      expect(plateWidth({ type: '19inch', width: 19, height: 3, radius: 3 })).toBe(482.6);
      expect(plateWidth({ type: '19inch', width: 10, height: 3, radius: 3 })).toBe(254);
      expect(plateWidth({ type: '19inch', width: 0, height: 3, radius: 3 })).toBe(0);
    });

    it('can convert from hp', () => {
      expect(plateWidth({ type: 'eurorack', width: 10, height: 3, radius: 3 })).toBe(50.8);
      expect(plateWidth({ type: 'eurorack', width: 15, height: 3, radius: 3 })).toBe(76.2);
      expect(plateWidth({ type: 'eurorack', width: 0, height: 3, radius: 3 })).toBe(0);
    });

    it('will leave custom untouched', () => {
      expect(plateWidth({ type: 'custom', width: 10, height: 3, radius: 3 })).toBe(10);
      expect(plateWidth({ type: 'custom', width: 15, height: 3, radius: 3 })).toBe(15);
      expect(plateWidth({ type: 'custom', width: 0, height: 3, radius: 3 })).toBe(0);
    });

    it('handles negative width', () => {
      expect(() => plateWidth({ type: '19inch', width: -1, height: 3, radius: 3 })).toThrow();
      expect(() => plateWidth({ type: 'eurorack', width: -1, height: 3, radius: 3 })).toThrow();
      expect(() => plateWidth({ type: 'custom', width: -1, height: 3, radius: 3 })).toThrow();
    });
  });

  describe('plateHeight', () => {
    it('can convert from RU typed 19inch', () => {
      expect(plateHeight({ type: '19inch', width: 19, height: 3, radius: 3 })).toBe(128.55);
      expect(plateHeight({ type: '19inch', width: 19, height: 5, radius: 3 })).toBe(217.45);
      expect(plateHeight({ type: '19inch', width: 19, height: 0, radius: 3 })).toBe(0);
    });

    it('can convert from RU typed eurorack', () => {
      expect(plateHeight({ type: 'eurorack', width: 10, height: 3, radius: 3 })).toBe(128.55);
      expect(plateHeight({ type: 'eurorack', width: 10, height: 5, radius: 3 })).toBe(217.45);
      expect(plateHeight({ type: 'eurorack', width: 10, height: 0, radius: 3 })).toBe(0);
    });

    it('will leave custom untouched', () => {
      expect(plateHeight({ type: 'custom', width: 10, height: 10, radius: 3 })).toBe(10);
      expect(plateHeight({ type: 'custom', width: 10, height: 15, radius: 3 })).toBe(15);
      expect(plateHeight({ type: 'custom', width: 10, height: 0, radius: 3 })).toBe(0);
    });

    it('handles negative height', () => {
      expect(() => plateHeight({ type: '19inch', width: 19, height: -1, radius: 3 })).toThrow();
      expect(() => plateHeight({ type: 'eurorack', width: 10, height: -1, radius: 3 })).toThrow();
      expect(() => plateHeight({ type: 'custom', width: 10, height: -1, radius: 3 })).toThrow();
    });
  });
});

export {};
