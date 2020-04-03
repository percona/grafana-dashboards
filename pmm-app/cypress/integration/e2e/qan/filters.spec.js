import { baseUrl, password, qanUrl, username } from '../../../../config'
import {
	FILTER_VALUES,
	verifyGlobalResultsNumber,
	resetAllFilters,
	searchFilter,
	applyFilter,
	waitForQANLoaded,
	verifyFilterWasFound
} from './qan.utils'

describe('QAN Filters Tests', () => {
	beforeEach(() => {
		cy.log(Cypress.config().baseUrl)
		cy.restLogin(username, password)
		cy.visit(qanUrl)
	})

	FILTER_VALUES.forEach(filter => {
		it.skip(`should search for ${filter} in filters`, () => {
			searchFilter(filter)
			verifyFilterWasFound(filter)
		})
	})

	it.skip('should be able to apply filters and check that query count is changed', () => {
		const filters = ['generic', 'pgsql-dev']
		filters.forEach(filter =>{
			applyFilter(filter)
		})
		verifyGlobalResultsNumber(11)
	})

	it.skip('should be able to reset all filters', () => {
		const filters = ['generic', 'pgsql-dev']
		waitForQANLoaded()
		cy.get('.ant-pagination-total-text')
			.then((val) => {
				const count = val.text()
				filters.forEach(filter => {
					applyFilter(filter)
				})
				verifyGlobalResultsNumber(11)
				resetAllFilters()
				verifyGlobalResultsNumber(count)
			})
	})
})
