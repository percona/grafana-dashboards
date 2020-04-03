export const GROUPS = ['Service Name', 'Database', 'Schema', 'User Name', 'Client Host', 'Query']
export const GROUPING = {
	BY_QUERY: 'Query',
	BY_SERVICE_NAME: 'Service Name',
	BY_DATABASE: 'Database',
	BY_SCHEMA: 'Schema',
	BY_USERNAME: 'User Name',
	BY_CLIENT_HOST: 'Client Host'
}

export const FILTER_VALUES = ['ps-dev', 'ps-dev-cluster', 'ps-repl1', 'postgres', 'mysql', 'pmm-server', 'PXC_NODE-1',
	'pmm-managed', 'mongodb', 'generic']

const APPLIED_GROUPING_SELECTOR = '.ant-table-thead > tr > th'
const TABLE_RESULTS_SELECTOR = '.ant-table-fixed > .ant-table-tbody > tr'
const RESET_FILTERS_BUTTON = '#reset-all-filters'
const FILTERS_SEARCH_LOCATOR = 'input[placeholder="Filters search..."]'


export const waitForQANLoaded = () => {
	cy.get('.ant-table-fixed')
		.should('be.visible')
}

export const changeGroupingTo = grouping => {
	cy.get('h5')
		.contains('Group by')
		.next()
		.children()
		.first()
		.click()
	cy.get(`ul > li[label="${grouping}"]`).click()
}

export const checkAppliedGrouping = grouping => {
	cy.get(APPLIED_GROUPING_SELECTOR).eq(1)
		.should('contain', `Group by ${grouping}`)
}

export const checkGroupingResults = () => {
	cy.get(TABLE_RESULTS_SELECTOR).its('length')
		.should('be.gt', 1)
}

export const resetAllFilters = () => {
	cy.get(RESET_FILTERS_BUTTON).click()
}

export const verifyGlobalResultsNumber = value => {
	cy.get('ul > li').should('contain', value)
}

export const searchFilter = filterName => {
	cy.get(FILTERS_SEARCH_LOCATOR).type(filterName)
}

export const applyFilter = filterName => {
	cy.get('label > span').contains(filterName).click()
}

export const verifyFilterWasFound = filterName => {
	cy.get(FILTERS_SEARCH_LOCATOR).parent().parent()
		.contains('span', filterName).should('be.visible')
}
