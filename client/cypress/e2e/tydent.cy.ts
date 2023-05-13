//Trydent is cool
describe("E2E test for trydent", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
  
    it("Should function as expected", () => {
      cy.xpath('//div[@id="root"]/div[1]/div[2]').should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]').click({ force: true });
      cy.xpath('//div[@id="root"]/div[1]/div[1]/div[2]/button[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[1]/div[2]/button[1]')
        .should("have.html", "New Test")
        .and("be.visible");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/h1[1]').should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/h1[1]')
        .should("have.html", "New Test")
        .and("be.visible");
      cy.xpath('//button[@id="startTest"]').should("exist");
      cy.xpath('//button[@id="startTest"]')
        .should("have.html", "Start Test")
        .and("be.visible");
      cy.xpath('//button[@id="startTest"]').should("have.id", "startTest");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/summary[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/summary[1]')
        .should("have.html", "Instructions")
        .and("be.visible");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/summary[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/summary[1]').click({
        force: true,
      });
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/ol[1]/li[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/ol[1]/li[1]')
        .should(
          "have.html",
          "Enter your describe statement for your test!<ul><li>Remember, `describe` breaks your test suite into components. </li><li>`it` statements further break down `describe` tests into smaller individual tests</li></ul>"
        )
        .and("be.visible");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/ol[1]/li[2]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/ol[1]/li[2]')
        .should("have.html", 'Once you are ready, "Start Test"')
        .and("be.visible");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/ol[1]/li[3]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/ol[1]/li[3]')
        .should(
          "have.html",
          "Trydent won't start recording until you ask, so click 'Start Recording' on the next page when you're ready"
        )
        .and("be.visible");
      cy.xpath('//textarea[@id="describeStatement"]').should("exist");
      cy.xpath('//textarea[@id="describeStatement"]').click({ force: true });
      cy.xpath('//textarea[@id="describeStatement"]').type("Test");
      cy.xpath('//button[@id="startTest"]').should("exist");
      cy.xpath('//button[@id="startTest"]').click({ force: true });
      cy.xpath('//input[@id="itStatement"]').should("exist");
      cy.xpath('//input[@id="itStatement"]').click({ force: true });
      cy.xpath('//input[@id="itStatement"]').type("test");
      cy.xpath('//div[@id="root"]/div[1]').should("exist");
      cy.xpath('//div[@id="root"]/div[1]').click({ force: true });
      cy.xpath('//div[@id="root"]/div[1]/div[1]/div[2]/button[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[1]/div[2]/button[1]')
        .should("have.html", "New Test")
        .and("be.visible");
      cy.xpath('//button[@id="startRecording"]').should("exist");
      cy.xpath('//button[@id="startRecording"]')
        .should("have.html", "Start Recording")
        .and("be.visible");
      cy.xpath('//button[@id="startRecording"]').should(
        "have.id",
        "startRecording"
      );
      cy.xpath('//button[@id="generate"]').should("exist");
      cy.xpath('//button[@id="generate"]')
        .should("have.html", "Stop Recording &amp; Generate Test")
        .and("be.visible");
      cy.xpath('//button[@id="generate"]').should("have.id", "generate");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]').should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]')
        .should(
          "have.html",
          "<div class=\"instructions\"><summary><h3>Instructions:</h3></summary><ol><li>Enter your `it` statement</li><li>Click 'Start Recording'</li><li>Execute the user jounrey and we will capture the events</li><li>When you are ready, \"Generate Test\"</li><li>Now you're ready to copy your Cypress code, and paste it in your source code to run Cypress</li></ol></div><div class=\"assertions\"><p><h3>Capturing assertions:</h3><br>Assertions enable you to validate scenarios such as whether an element is visible or has a particular attribute, CSS class, or state. </p><ol><li>Hover your mouse over the component you want to assert</li><li>Keydown 'e'+'z'</li><li>This will capture components on the page so cypress will check to see if the component exists when running your E2E test</li><li>Look in the 'Inputs Log' to see your assertion target</li></ol></div>"
        )
        .and("be.visible");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]').should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]').click({
        force: true,
      });
      cy.xpath(
        '//div[@id="root"]/div[1]/div[2]/details[1]/div[1]/ol[1]/li[1]'
      ).should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[1]/ol[1]/li[1]')
        .should("have.html", "Enter your `it` statement")
        .and("be.visible");
      cy.xpath(
        '//div[@id="root"]/div[1]/div[2]/details[1]/div[1]/ol[1]/li[2]'
      ).should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[1]/ol[1]/li[2]')
        .should("have.html", "Click 'Start Recording'")
        .and("be.visible");
      cy.xpath(
        '//div[@id="root"]/div[1]/div[2]/details[1]/div[1]/ol[1]/li[3]'
      ).should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[1]/ol[1]/li[3]')
        .should(
          "have.html",
          "Execute the user jounrey and we will capture the events"
        )
        .and("be.visible");
      cy.xpath(
        '//div[@id="root"]/div[1]/div[2]/details[1]/div[1]/ol[1]/li[4]'
      ).should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[1]/ol[1]/li[4]')
        .should("have.html", 'When you are ready, "Generate Test"')
        .and("be.visible");
      cy.xpath(
        '//div[@id="root"]/div[1]/div[2]/details[1]/div[1]/ol[1]/li[5]'
      ).should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[1]/ol[1]/li[5]')
        .should(
          "have.html",
          "Now you're ready to copy your Cypress code, and paste it in your source code to run Cypress"
        )
        .and("be.visible");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[2]/p[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[2]/p[1]')
        .should(
          "have.html",
          "<h3>Capturing assertions:</h3><br>Assertions enable you to validate scenarios such as whether an element is visible or has a particular attribute, CSS class, or state. "
        )
        .and("be.visible");
      cy.xpath(
        '//div[@id="root"]/div[1]/div[2]/details[1]/div[2]/ol[1]/li[1]'
      ).should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[2]/ol[1]/li[1]')
        .should(
          "have.html",
          "Hover your mouse over the component you want to assert"
        )
        .and("be.visible");
      cy.xpath(
        '//div[@id="root"]/div[1]/div[2]/details[1]/div[2]/ol[1]/li[2]'
      ).should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[2]/ol[1]/li[2]')
        .should("have.html", "Keydown 'e'+'z'")
        .and("be.visible");
      cy.xpath(
        '//div[@id="root"]/div[1]/div[2]/details[1]/div[2]/ol[1]/li[3]'
      ).should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[2]/ol[1]/li[3]')
        .should(
          "have.html",
          "This will capture components on the page so cypress will check to see if the component exists when running your E2E test"
        )
        .and("be.visible");
      cy.xpath(
        '//div[@id="root"]/div[1]/div[2]/details[1]/div[2]/ol[1]/li[4]'
      ).should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/details[1]/div[2]/ol[1]/li[4]')
        .should(
          "have.html",
          "Look in the 'Inputs Log' to see your assertion target"
        )
        .and("be.visible");
      cy.xpath('//button[@id="startRecording"]').should("exist");
      cy.xpath('//button[@id="startRecording"]').click({ force: true });
      cy.xpath('//div[@id="root"]/div[1]/div[2]').should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]').click({ force: true });
      cy.xpath('//button[@id="startRecording"]').should("exist");
      cy.xpath('//button[@id="startRecording"]')
        .should("have.html", "Recording in progress...")
        .and("be.visible");
      cy.xpath('//button[@id="startRecording"]').should(
        "have.id",
        "startRecording"
      );
      cy.xpath('//button[@id="startRecording"]').should(
        "have.class",
        "recording"
      );
      cy.xpath('//button[@id="generate"]').should("exist");
      cy.xpath('//button[@id="generate"]').click({ force: true });
      cy.xpath('//div[@id="root"]/div[1]/div[2]').should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]').click({ force: true });
      cy.xpath('//div[@id="root"]/div[1]/div[2]/div[1]/h1[1]').should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/div[1]/h1[1]')
        .should("have.html", "Generated Test")
        .and("be.visible");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/div[1]/div[1]/button[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[2]/div[1]/div[1]/button[1]')
        .should("have.html", "Copy")
        .and("be.visible");
      cy.xpath('//div[@id="root"]/div[1]/div[1]/div[2]/button[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[1]/div[2]/button[1]')
        .should("have.html", "New Test")
        .and("be.visible");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/div[1]/div[1]/button[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[2]/div[1]/div[1]/button[1]').click({
        force: true,
      });
      cy.xpath('//div[@id="root"]/div[1]/div[2]/div[1]/div[1]/button[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[2]/div[1]/div[1]/button[1]')
        .should("have.html", "Copy")
        .and("be.visible");
      cy.xpath("/html[1]/body[1]/textarea[1]").type("ez");
      cy.xpath('//div[@id="root"]/div[1]/div[1]/div[2]/button[1]').should(
        "exist"
      );
      cy.xpath('//div[@id="root"]/div[1]/div[1]/div[2]/button[1]').click({
        force: true,
      });
      cy.xpath('//div[@id="root"]/div[1]/div[2]/h1[1]').should("exist");
      cy.xpath('//div[@id="root"]/div[1]/div[2]/h1[1]')
        .should("have.html", "New Test")
        .and("be.visible");
      cy.xpath('//button[@id="startTest"]').should("exist");
      cy.xpath('//button[@id="startTest"]')
        .should("have.html", "Start Test")
        .and("be.visible");
      cy.xpath('//button[@id="startTest"]').should("have.id", "startTest");
    });
  });
  