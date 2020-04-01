const table_results = '.ant-table-fixed > .ant-table-tbody > tr'
const filters_search = 'input[placeholder="Filters search..."]'
const reset_filters_button = '#reset-all-filters'
export const APPLIED_GROUPING_SELECTOR = '.ant-table-thead > tr > th'
export const GROUPING = {
	BY_QUERY: 'Query',
	BY_SERVICE_NAME: 'Service Name',
	BY_DATABASE: 'Database',
	BY_SCHEMA: 'Schema',
	BY_USERNAME: 'User Name',
	BY_CLIENT_HOST: 'Client Host'
}

export const GROUPS = ['Service Name', 'Database', 'Schema', 'User Name', 'Client Host', 'Query']
export const FILTER_VALUES = ['ps-dev', 'ps-dev-cluster', 'ps-repl1', 'postgres', 'mysql', 'pmm-server', 'PXC_NODE-1',
			'pmm-managed', 'mongodb', 'generic']

class QANPage {

	static checkAppliedGrouping(grouping) {
		cy.get(APPLIED_GROUPING_SELECTOR).eq(1)
			.should('contain', `Group by ${grouping}`)
		return this
	}

	static changeGroupingTo(grouping) {
		cy.get('h5').contains('Group by').next().children().first().click()
		cy.get(`ul > li[label="${grouping}"]`).click()
		return this
	}

	static checkGroupingResults() {
		cy.get(table_results).its('length')
			.should('be.gt', 1)
		return this
	}

	static searchFilter(filterName) {
		cy.get(filters_search).type(filterName)
		return this
	}

	static verifyFilterWasFound(filterName) {
		cy.get(filters_search).parent().parent()
			.contains('span', filterName).should('be.visible')
		return this
	}

	static applyFilter(filterName) {
		cy.get('label > span').contains(filterName).click()
		return this
	}

	static verifyGlobalResultsNumber(value) {
		cy.get('ul > li').should('contain', value)
		return this
	}

	static resetAllFilters() {
		cy.get(reset_filters_button).click()
		return this
	}

	static waitForQANLoaded() {
		cy.get('.ant-table-fixed')
			.should('be.visible')
	}

}

export default QANPage
