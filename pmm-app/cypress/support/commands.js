// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'
addMatchImageSnapshotCommand()

Cypress.Commands.add('isVisible', selector => {
	cy.get(selector).should('be.visible')
})

Cypress.Commands.add('notPresent', selector => {
	cy.get(selector).should('not.exist')
})

Cypress.Commands.add('login', (username, password) =>{
	cy.get('#login-view').should('be.visible')
	cy.get('input[name="user"]')
		.clear()
		.type(username)
	cy.get('input[name="password"]')
		.clear()
		.type(password)
	cy.contains('Log In')
		.click()
	cy.contains('Skip')
		.click()
	cy.get('#current_version', {timeout:30000}).should('be.visible')
})

Cypress.Commands.add('restLogin', (username, password) => {
	cy.request('POST', `/graph/login`, {user: `${username}`, password: `${password}`, email: ""})
		.then(response => {
			expect(response.body).to.have.property('message', 'Logged in')
	})
})
