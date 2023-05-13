/* eslint-disable quotes */
/* eslint-disable function-paren-newline */
import testCreator from '../../../../client/utils/testCreator';

const { switchCase, describeCreator } = testCreator;

describe('TestCreator Test', () => {
  describe('Unit test for switchCase Generate Cypress code for each type of action: click, change, navigate, assertion', () => {
    it('should generate Cypress test for click', () => {
      expect(`${switchCase({
        action: 'click',
        selector: '//input[@id="username"]',
        URL: 'http://localhost:3000/signin',
        a: false,
        href: '',
      })}`).toBe(
        `cy.xpath('//input[@id="username"]').should('exist');
      cy.xpath('//input[@id="username"]').click({force:true});`);
    });
    it('should generate Cypress test for change', () => {
      expect(`${switchCase({
        action: 'change',
        selector: '//input[@id="username"]',
        input: 'Test',
        URL: 'http://localhost:3000/signin',
        a: false,
        href: '',
      })}`).toBe(`cy.xpath('//input[@id="username"]').type('Test');`);
    });
    it('should generate Cypress test for navigate', () => {
      expect(`${switchCase({
        action: 'navigate',
        selector: '//a[@data-test="sidenav-home"]/div[2]/span[1]',
        URL: 'http://localhost:3000/signin',
        a: true,
        href: '/',
      })}`).toBe(`cy.xpath('//a[@data-test="sidenav-home"]/div[2]/span[1]').click();
      cy.location('pathname').should('eq','/');`);
    });
    it('should generate Cypress test for assertion', () => {
      expect(`${switchCase({
        action: 'assertion',
        selector: '//a[@data-test="sidenav-user-settings"]/div[2]/span[1]',
        input: {
          mouseXPath: '//a[@data-test="sidenav-user-settings"]/div[2]/span[1]',
          className: 'MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock',
          innerHTML: 'My Account',
          id: '',
          innerText: 'My Account',
        },
        URL: 'http://localhost:3000/signin',
        a: false,
      })}`).toBe(`cy.xpath(\'//a[@data-test="sidenav-user-settings"]/div[2]/span[1]\').should(\'exist\');cy.xpath(\'//a[@data-test="sidenav-user-settings"]/div[2]/span[1]\').should(\'have.html\',"My Account").and(\'be.visible\');cy.xpath(\'//a[@data-test="sidenav-user-settings"]/div[2]/span[1]\').should(\'have.attr\', \'MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock\');`);
    });
  });
  describe('Integration test for describeCreator', () => {
    const describeObj = {
      URL: "http://localhost:3000/",
      description: "",
      writeUp: "Trydent is cool",
      itStatements: [
        {
          itStatement: "",
          eventArr: [
            {
              action: "click",
              selector: "//main[@data-test=\"main\"]",
              URL: "http://localhost:3000/",
              a: false,
              href: "",
            },
            {
              action: "click",
              selector: "//main[@data-test=\"main\"]",
              URL: "http://localhost:3000/",
              a: false,
              href: "",
            },
            {
              action: "click",
              selector: "//main[@data-test=\"main\"]",
              URL: "http://localhost:3000/",
              a: false,
              href: "",
            },
            {
              action: "click",
              selector: "//main[@data-test=\"main\"]",
              URL: "http://localhost:3000/",
              a: false,
              href: "",
            },
            {
              action: "click",
              selector: "//main[@data-test=\"main\"]",
              URL: "http://localhost:3000/",
              a: false,
              href: "",
            },
          ],
        },
      ],
    };
    it('This will take our describe obj from panel.js and return the final cypress code. It will pass through describeCreator -> itCreator -> actionCreator -> switchCase', () => {
      expect(`${describeCreator(describeObj)}`).toContain(`//Trydent is cool
    describe('', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/')
      })
        
      
    it('', () => {
        cy.xpath('//main[@data-test="main"]').should('exist');
      cy.xpath('//main[@data-test="main"]').click({force:true});
        cy.xpath('//main[@data-test="main"]').should('exist');
      cy.xpath('//main[@data-test="main"]').click({force:true});
        cy.xpath('//main[@data-test="main"]').should('exist');
      cy.xpath('//main[@data-test="main"]').click({force:true});
        cy.xpath('//main[@data-test="main"]').should('exist');
      cy.xpath('//main[@data-test="main"]').click({force:true});
        cy.xpath('//main[@data-test="main"]').should('exist');
      cy.xpath('//main[@data-test="main"]').click({force:true});
      })
    })`);
    });
  });
});
