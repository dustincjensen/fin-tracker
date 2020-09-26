import { createStaticWidthCell } from './table.utils';

describe('utils', () => {
  describe('table', () => {
    describe('createStaticWidthCell', () => {
      it('should create a flex none cell with a specific width', () => {
        expect(createStaticWidthCell(150)).toEqual({ flex: 'none', width: 150 });
      });
    });
  });
});
