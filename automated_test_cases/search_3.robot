*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        http://localhost:3000/
${MENU_ITEM}  matcha
${EXPECTED_COUNT}  5


*** Test Cases ***
Test Valid Menu Item Search
    [Documentation]  Verify that the website accepts a valid menu item name.
    Open Browser To Website
    Maximize Browser Window
    Enter Menu Item Name
    Sleep    2s
    Verify Matching Count
    Verify All Results Contain Matcha
    Close Browser

*** Keywords ***
Open Browser To Website
    [Documentation]  Opens the website URL in Chrome and maximizes the window.
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

Enter Menu Item Name
    [Documentation]  Enters the search term in the search input field.
    Input Text    id=searchInput   ${MENU_ITEM}

Verify Matching Count
    [Documentation]  Checks that the displayed matching count equals the expected value.
    Wait Until Element Is Visible    id=matchedNumber    timeout=5s
    ${count}=    Get Text    id=matchedNumber
    Should Be Equal As Numbers    ${count}    ${EXPECTED_COUNT}

Verify All Results Contain Matcha
    ${elements}=    Get WebElements    xpath=//h2[contains(@id, 'CardTitle')]
    FOR    ${element}    IN    @{elements}
        ${text}=    Get Text    ${element}
        Should Contain    ${text}    matcha
    END
