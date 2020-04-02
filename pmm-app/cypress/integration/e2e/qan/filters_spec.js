import { baseUrl, password, qanUrl, username } from '../../../../config'
import QANPage, { FILTER_VALUES } from '../../../page-ojbects/pages/QANPage'

describe('QAN Filters Tests', () => {
	beforeEach(() => {
		cy.log(Cypress.config().baseUrl)
		cy.restLogin(username, password)
		cy.visit(qanUrl)
	})

	FILTER_VALUES.forEach(filter => {
		it(`should search for ${filter} in filters`, () => {
			QANPage.searchFilter(filter)
			QANPage.verifyFilterWasFound(filter)
		})
	})

	it('should be able to apply filters and check that query count is changed', () => {
		QANPage.applyFilter('generic')
			.applyFilter('pgsql-dev')
			.verifyGlobalResultsNumber(11)
	})

	it('should be able to reset all filters', () => {
		const filters = ['generic', 'pgsql-dev']
		QANPage.waitForQANLoaded()
		cy.get('.ant-pagination-total-text')
			.then((val) => {
				const count = val.text()
				filters.forEach(filter => {
					QANPage.applyFilter(filter)
				})
				QANPage.verifyGlobalResultsNumber(11)
					.resetAllFilters()
					.verifyGlobalResultsNumber(count)
			})
	})
})
