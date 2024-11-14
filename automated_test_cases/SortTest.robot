*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}                 http://localhost:3000/
${SORT_BUTTON}         //select
${PRICE_LOW_TO_HIGH}   //select/option[@value='Price Low to High' and text()='Price, low to high']
${PRICE_HIGH_TO_LOW}   //select/option[@value='Price High to Low' and text()='Price, high to low']
${PRODUCT_PRICE}          //div[@class='Card_cardPrice__pajUN']/span


*** Keywords ***
Open Browser To Website
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

Select Sort by Price Low to High
    Click Element    ${SORT_BUTTON}
    Click Element    ${PRICE_LOW_TO_HIGH}

*** Test Cases ***
Test Sort by Price low to high 
    [Documentation]  Verify that the website accepts a valid menu item name.
    Open Browser To Website
    Maximize Browser Window
    Wait Until Element Is Visible    id=Card    timeout=10s
    Close Browser