*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        http://localhost:3000/
${MENU_ITEM}  Espresso


*** Test Cases ***
Test Valid Menu Item Search
    [Documentation]  Verify that the website accepts a valid menu item name.
    Open Browser To Website
    Maximize Browser Window
    Enter Menu Item Name
    Wait Until Element Is Visible    id=Card    timeout=2s
    Element Text Should Be    id=CardTitle    ${MENU_ITEM}
    Close Browser

*** Keywords ***
Open Browser To Website
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

Enter Menu Item Name
    Input Text    id=searchInput   ${MENU_ITEM}

Close Browser
    Close Browser