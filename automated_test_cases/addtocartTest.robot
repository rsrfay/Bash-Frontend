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
    Enter Menu Item Name In Search
    Verify And Click Menu Item
    Add Item To Cart
    Close Browser

*** Keywords ***
Open Browser To Website
    [Documentation]  Open the browser and navigate to the website.
    Open Browser    ${URL}    Chrome
    Maximize Browser Window
    Wait Until Page Contains Element    //input[@id='searchInput']    timeout=10s
    Log    Browser opened and website loaded successfully.

Enter Menu Item Name In Search
    [Documentation]  Enter the menu item name in the search input box and press Enter separately.
    Input Text    id=searchInput    ${MENU_ITEM}
    Log    Entered menu item name: ${MENU_ITEM} in search input.
    Press Key    id=searchInput    \\13  
    Wait Until Page Contains Element    id=Card    timeout=10s
    Log    Menu item ${MENU_ITEM} displayed in search results.

Verify And Click Menu Item
    [Documentation]  Click the displayed menu item to navigate to its details page.
    Wait Until Element Is Visible    xpath=//h3[@id="CardTitle" and contains(text(), "${MENU_ITEM}")]    timeout=10s
    Click Element    xpath=//h3[@id="CardTitle" and contains(text(), "${MENU_ITEM}")]
    Log    Clicked on ${MENU_ITEM} card to open details page.

Add Item To Cart
    [Documentation]  Click the "+" button on the first card that matches the ${MENU_ITEM} name to add it to the cart.
    Wait Until Element Is Visible    xpath=(//h3[@id="CardTitle" and contains(text(), "${MENU_ITEM}")]/ancestor::div[@id="Card"])[1]//button[text()='+']    timeout=10s
    Click Button    xpath=(//h3[@id="CardTitle" and contains(text(), "${MENU_ITEM}")]/ancestor::div[@id="Card"])[1]//button[text()='+']
    Log    Clicked "+" button to add ${MENU_ITEM} to cart.

Close Browser
    [Documentation]  Close the browser after the test is complete.
    Sleep    2s
    Close Browser








