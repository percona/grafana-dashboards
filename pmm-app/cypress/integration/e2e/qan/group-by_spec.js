import { password, qanUrl, username } from '../../../../config'
import QANPage, { GROUPING, GROUPS } from '../../../page-ojbects/pages/QANPage'

describe('QAN Query Grouping', () => {
	beforeEach(() => {
		cy.restLogin(username, password)
		cy.visit(qanUrl)

	})

	it('should be grouped by Query by default', () => {
		QANPage.checkAppliedGrouping(GROUPING.BY_QUERY)
	})

	GROUPS.forEach(group => {
		it(`should change grouping to ${group}`, () => {
			QANPage.changeGroupingTo(group)
				.checkAppliedGrouping(group)
				.checkGroupingResults()
		})
	})
})
