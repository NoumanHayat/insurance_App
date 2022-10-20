import ClaimTypeModal from '../src/components/modals/claims/ClaimTypeModal'

const { render } = require("react-dom");



describe('', () => {
    test('should first', () => {
        expect(2 + 2).toBe(4)
    })

    test('should first', () => {
        const modal = render(<ClaimTypeModal />).toJSON();
        expect(modal).toMatchSnapshot();
    })
});
