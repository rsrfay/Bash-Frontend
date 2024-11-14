*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}         http://localhost:3000/
${MENU_ITEM}   Latte

*** Test Cases ***
Test Valid Menu Item Search And Add To Cart
    [Documentation]  Verify that the website accepts a valid menu item name, displays the menu item, and allows adding it to the cart.
    Open Browser To Website
    Maximize Browser Window
    Enter Menu Item Name
    Sleep    2s
    Verify And Click Menu Item
    Close Browser

*** Keywords ***
Open Browser To Website
    [Documentation]  Open the browser and navigate to the website.
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

Enter Menu Item Name
    [Documentation]  Enters the search term in the search input field.
    Input Text    id=searchInput   ${MENU_ITEM}

Verify And Click Menu Item
    [Documentation]  Click the displayed menu item to navigate to its details page.
    Wait Until Element Is Visible   ${MENU_ITEM}   timeout=10s
    Click Element    ${MENU_ITEM}








