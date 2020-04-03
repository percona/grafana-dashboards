import { password, qanUrl, username } from '../../../../config'

import {
	GROUPS,
	GROUPING,
	changeGroupingTo,
	checkAppliedGrouping,
	checkGroupingResults
} from './qan.utils'

describe('QAN Query Grouping', () => {
	beforeEach(() => {
		cy.restLogin(username, password)
		cy.visit(qanUrl)
	})

	it('should be grouped by Query by default', () => {
		checkAppliedGrouping(GROUPING.BY_SERVICE_NAME)
	})

	GROUPS.forEach(group => {
		it(`should change grouping to ${group}`, () => {
			changeGroupingTo(group)
			checkAppliedGrouping(group)
			checkGroupingResults()
		})
	})
})
