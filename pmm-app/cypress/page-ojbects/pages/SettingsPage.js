const DATA_RETENTION_INPUT = 'input[name="data_retention_count"]'
const SUBMIT_BUTTON = 'button[type="submit"]'
const POPUP_TITLE = '.alert-title'
export const MESSAGES = {
	SUCCESS_MESSAGE: 'Settings updated'
}

class SettingsPage {

	static changeDataRetentionTo(value) {
		cy.get('ol > li > a').contains('PMM Settings')
			.should('be.visible')
		return this
	}

	static clickApplyChangesBtn() {
		cy.get(SUBMIT_BUTTON)
			.click()
		return this
	}

	static checkDataRetentionValue(value) {
		cy.get(DATA_RETENTION_INPUT)
			.should('have.value', value)
		return this
	}

	static checkPopUp(message){
		cy.server()
		cy.route(`/v1/Settings/Change`).as('changeSettings')
		cy.wait('@changeSettings').its('status').should('eq', 200)
		cy.get(POPUP_TITLE).should('have.value', 'Settings Updated')
	}

	static isSuccess() {
		return MESSAGES.SUCCESS_MESSAGE
	}
}

export default SettingsPage
