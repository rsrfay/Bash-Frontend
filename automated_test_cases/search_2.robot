*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        http://localhost:3000/
${MENU_ITEM}  zzz


*** Test Cases ***
Test Valid Menu Item Search
    [Documentation]  Verify that the website accepts a valid menu item name.
    Open Browser To Website
    Maximize Browser Window
    Enter Menu Item Name
    Sleep    2s
    Verify No Results Message
    Close Browser

*** Keywords ***
Open Browser To Website
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

Enter Menu Item Name
    Input Text    id=searchInput   ${MENU_ITEM}

Verify No Results Message
    Wait Until Element Is Visible    id=Notfound    timeout=5s
    Element Text Should Be    id=Notfound    No Result  # Verify the text header
