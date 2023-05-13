/* eslint-disable quotes */
/* eslint-disable function-paren-newline */
import switchCase from '../../../../client/utils/testCreator';

describe('TestCreator Test', () => {
  describe('SwitchCase Tester Generate Cypress code for each type of action: click, change, navigate, assertion', () => {
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
  describe('describeCreator', () => {
    const Describe = {
  URL: string;
  description: string;
  writeUp: string;
  itStatements: itObject[];
};
    it('This will take our describe obj from panel.js and return the final cypress code', () => {
      expect(``).toBe(``);
    });
  });
  // describe('itCreator', () => {
  //   it('This will take in our eventArr and send each obj to our action', () => {
  //     expect(``).toBe(``);
  //   });
  // });
  // describe('actionCreator', () => {
  //   it('This will take in our eventArr and send each obj to our switchCase', () => {
  //     expect(``).toBe(``);
  //   });
  // });
});
