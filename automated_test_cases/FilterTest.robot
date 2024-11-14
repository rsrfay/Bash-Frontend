*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        http://localhost:3000/
${COLD_MENU_BUTTON}    //span[text()='Cold menu']


*** Keywords ***
Open Browser To Website
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

*** Test Cases ***
Test Filter by drink type
    [Documentation]  Verify that the website accepts a valid menu item name.
    Open Browser To Website
    Maximize Browser Window
    Wait Until Element Is Visible    id=Card    timeout=2s
    Click Button    COLD_MENU_BUTTON
    Close Browser