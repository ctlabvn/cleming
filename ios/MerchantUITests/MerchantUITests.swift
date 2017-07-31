//
//  MerchantUITests.swift
//  MerchantUITests
//
//  Created by Thanh Tu on 7/31/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import XCTest

class MerchantUITests: XCTestCase {
        
    override func setUp() {
        super.setUp()
        
        // Put setup code here. This method is called before the invocation of each test method in the class.
        
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
  
    func waitForElementToAppear(_ element: XCUIElement, timeout: TimeInterval = 2,  file: String = #file, line: UInt = #line) {
      let existsPredicate = NSPredicate(format: "exists == true")
      
      expectation(for: existsPredicate,
                  evaluatedWith: element,
                  handler: nil)
      
      waitForExpectations(timeout: timeout) { (error) -> Void in
        if (error != nil) {
          let message = "Failed to find \(element) after \(timeout) seconds."
          self.recordFailure(withDescription: message, inFile: file, atLine: line, expected: true)
        }
      }
    }
  
    func testExample() {
        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
      
      let app = XCUIApplication()
      
      waitForElementToAppear(app.textFields["username"])
      
      app.textFields["username"].tap()
      app.textFields["username"].typeText("ha@clingme.vn")
      
      app.textFields["password"].tap()
      app.textFields["password"].typeText("12345")
      
      app.staticTexts["Đăng nhập"].tap()
    }
    
}
