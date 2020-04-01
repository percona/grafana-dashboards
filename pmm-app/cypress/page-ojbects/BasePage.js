export default class BasePage {
	static pause (ms) {
		cy.wait(ms)
	}

	static logMessage (message) {
		cy.log(message)
	}

	static reloadPage() {
		cy.reload()
	}
}
