*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}         http://localhost:3000/
${MENU_ITEM}   Pinky Milk
${EXPECTED_COUNT_ALL}  47
${POPUP_MESSAGE}  Item added to cart successfully!
${TIMEOUT}        5s
${MAX_PAGES}      3

*** Keywords ***
Open Browser To Website
    [Documentation]  Open the browser and navigate to the website.
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

Verify All Items Show
    [Arguments]    ${expected_count}
    [Documentation]  Checks that the displayed matching count equals the provided expected value.
    Wait Until Element Is Visible    id=matchedNumber    timeout=5s
    ${count}=    Get Text    id=matchedNumber
    Should Be Equal As Numbers    ${count}    ${expected_count}

Click Plus Button
    [Documentation]  Finds the card with the specified menu item title and clicks the + button.
    Wait Until Element Is Visible    xpath=//div[@id="Card" and .//h3[@id="CardTitle" and text()="${MENU_ITEM}"]]    timeout=5s
    Sleep    2s
    Click Element    xpath=//div[@id="Card" and .//h3[@id="CardTitle" and text()="${MENU_ITEM}"]]//button[@id="Addbtn"]

Add To Cart
    Click Element    xpath=//button[text()='Add to Cart']

Check Popup Success
    [Documentation]  Verifies that the pop-up message appears and matches the expected text.
    Wait Until Element Is Visible    xpath=//p[contains(text(), '${POPUP_MESSAGE}')]    timeout=5s
    ${popup_text}=    Get Text    xpath=//p[contains(text(), '${POPUP_MESSAGE}')]
    Should Be Equal    ${popup_text}    ${POPUP_MESSAGE}
    Click Element    xpath=//button[text()='Close']

Scroll Down
    [Documentation]  Scrolls down to a specified element on the page.
    Wait Until Element Is Visible    id=Card    timeout=${TIMEOUT}
    Sleep    1s
    Execute JavaScript    document.getElementById('CardTitle').scrollIntoView();

Scroll To Pagination And Click Next
    [Documentation]  Scrolls to the pagination section and clicks the next page button.
    Execute JavaScript    document.getElementById('Pagination').scrollIntoView();
    Sleep    1s
    Wait Until Element Is Visible    id=Pagination    timeout=${TIMEOUT}
    Wait Until Element Is Visible    xpath=//li[@aria-label="next page button"]    timeout=${TIMEOUT}
    Click Element    xpath=//li[@aria-label="next page button"]


Search For Card On Next Page
    [Documentation]  Scrolls down and searches for the card again on the new page.
    Scroll Down
    Click Plus Button

Select Add-Ons
    Wait Until Element Is Visible    id=description-page    timeout=3s
    Click Element    xpath=//button[text()='Cold']
    Sleep    1s
    Wait Until Element Is Visible    id=Options    timeout=1s
    Click Element    xpath=//button[contains(text(), 'Brown Sugar Jelly')]
    Sleep    1s
    Click Element    xpath=//button[text()='100%']

*** Test Cases ***
Test TRYTRY
    Open Browser To Website
    Maximize Browser Window
    Verify All Items Show    ${EXPECTED_COUNT_ALL}
    # Scroll To Pagination And Click Next
    ${current_page}=    Set Variable    1
    FOR    ${i}    IN RANGE    1    ${MAX_PAGES}  # Corrected loop declaration
        Scroll Down        
        ${item_found}=    Run Keyword And Return Status    Wait Until Element Is Visible    xpath=//h3[@id="CardTitle" and text()="${MENU_ITEM}"]    timeout=${TIMEOUT}
        Run Keyword If    ${item_found}    Click Plus Button
        Run Keyword If    not ${item_found}    Scroll To Pagination And Click Next
    END
    Select Add-Ons
    Add To Cart
    Check Popup Success
    Close Browser






