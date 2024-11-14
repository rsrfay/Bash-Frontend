*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}         http://localhost:3000/
${MENU_ITEM}   Latte
${ADD_ON_OAT_MILK}     Oat Milk (15.-)
${ADD_ON_BROWN_SUGAR}  Brown Sugar Jelly (15.-)
${SWEETNESS}           100
${EXPECTED_TOTAL}      95

*** Test Cases ***
Test Valid Menu Item Selection and Customization
    [Documentation]  Verify that the website accepts a valid menu item name, allows customization, and adds the item to the cart.
    Open Browser To Website
    Maximize Browser Window
    Enter Menu Item Name In Search
    Verify And Click Menu Item
    Add Item To Cart
    Select Cold Option
    Select Add-On    Oat Milk (15.-)    80
    Select Add-On    Brown Sugar Jelly (15.-)    95
    Set Sweetness    100%
    Click Add to Cart
    Verify Success Message
    Close Browser

*** Keywords ***
Open Browser To Website
    [Documentation]  Open the browser and navigate to the website.
    Open Browser    ${URL}    Chrome
    Maximize Browser Window
    Wait Until Page Contains Element    //input[@id='searchInput']    timeout=10s
    Log    Browser opened and website loaded successfully.

Enter Menu Item Name In Search
    Input Text    id=searchInput    ${MENU_ITEM}
    Log    Entered menu item name: ${MENU_ITEM} in search input.
    Press Key    id=searchInput    \\13  
    Wait Until Page Contains Element    id=Card    timeout=10s
    Log    Menu item ${MENU_ITEM} displayed in search results.

Verify And Click Menu Item
    Wait Until Element Is Visible    xpath=//h3[@id="CardTitle" and contains(text(), "${MENU_ITEM}")]    timeout=10s
    Click Element    xpath=//h3[@id="CardTitle" and contains(text(), "${MENU_ITEM}")]
    Log    Clicked on ${MENU_ITEM} card to open details page.

Add Item To Cart
    Wait Until Element Is Visible    xpath=(//h3[@id="CardTitle" and contains(text(), "${MENU_ITEM}")]/ancestor::div[@id="Card"])[1]//button[text()='+']    timeout=10s
    Click Button    xpath=(//h3[@id="CardTitle" and contains(text(), "${MENU_ITEM}")]/ancestor::div[@id="Card"])[1]//button[text()='+']
    Log    Clicked "+" button to add ${MENU_ITEM} to cart.

Select Cold Option
    [Documentation]  Select the "Cold" option for the drink.
    Wait Until Element Is Visible    xpath=//button[contains(text(), "Cold")]    timeout=10s
    Click Button    xpath=//button[contains(text(), "Cold")]
    Log    Selected Cold option for ${MENU_ITEM}.

Select Add-On
    [Arguments]    ${add_on}    ${expected_price}
    [Documentation]  Select the specified add-on and verify the price is updated.
    Wait Until Element Is Visible    xpath=//button[contains(text(), "${add_on}")]    timeout=10s
    Click Button    xpath=//button[contains(text(), "${add_on}")]
    Log    Selected add-on: ${add_on}.
    Wait Until Page Contains    ${expected_price}.-    timeout=5s
    Log    Price updated to ${expected_price} as expected.

Set Sweetness
    [Arguments]    ${sweetness}
    [Documentation]  Change the sweetness level to the specified percentage.
    Wait Until Element Is Visible    xpath=//button[contains(text(), "${sweetness}")]    timeout=10s
    Click Button    xpath=//button[contains(text(), "${sweetness}")]
    Log    Set sweetness to ${sweetness}.

Click Add to Cart
    [Documentation]  Click the "Add to Cart" button.
    Wait Until Element Is Visible    xpath=//button[contains(@class, "add-to-cart")]    timeout=10s
    Click Button    xpath=//button[contains(@class, "add-to-cart")]
    Log    Clicked Add to Cart button.

Verify Success Message
    [Documentation]  Verify the success message is displayed in the modal after adding the item to the cart.
    Wait Until Element Is Visible    xpath=//div[contains(@class, "modal-overlay")]    timeout=10s
    Element Text Should Be    xpath=//div[contains(@class, "modal-content")]/p    Item added to cart successfully!
    Log    Success message displayed: Item added to cart successfully!
