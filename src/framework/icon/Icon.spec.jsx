
import { TestCaseFactory } from 'react-test-kit';
import Icon from './Icon.jsx';

describe('Icon', () => {
  describe('DOM structure', () => {
    it('is one span element', () => {
      const testCase =
        TestCaseFactory.createFromFunction(Icon);
      expect(testCase.dom.tagName).toBe('SPAN');
      expect(testCase.dom.className).toBe('icon');
    });
  });

  describe('Props', () => {
    describe('classes', () => {
      it('is applied to the element', () => {
        const props = {
          classes: 'test',
        };
        const testCase =
          TestCaseFactory.createFromFunction(Icon, props);
        expect(testCase.dom.className).toContain(props.classes);
      });
    });

    describe('onClick', () => {
      let testCase;
      let onClick;

      beforeEach(() => {
        onClick = jasmine.createSpy('onClick');

        testCase =
          TestCaseFactory.createFromFunction(Icon, {onClick});

        testCase.trigger('click');
      });

      it('is called once', () => {
        expect(onClick.calls.count()).toEqual(1);
      });

      it('is called with event object as an argument', () => {
        expect(onClick).toHaveBeenCalledWith(
          jasmine.any(Object), // SyntheticEvent
          jasmine.any(String) // React ID
        );
      });

      it('adds a clickable modifier class', () => {
        expect(testCase.dom.className).toContain('icon--clickable');
      });
    });
  });
});
