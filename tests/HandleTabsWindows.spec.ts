/*
Each BrowserContext can have multiple pages. 
A Page refers to a 'single tab' or a 'popup window' within a browser context. 
It should be used to navigate to URLs and interact with the page content.

*/

import { test, expect } from '@playwright/test';


test('handle new tab', async({context})=>{

    const page = await context.newPage();
    await page.goto("https://sdetqa.vercel.app/autoplay")

    //Appraoch 1:
    /*
    await page.getByRole('button', { name: 'New Tab' }).click()
    const newPage = await context.waitForEvent('page'); // Wait for any new page in this context and Get the opened page/tab
    */

    //Appraoch 2 : using Proimis.all()

   const [,newPage]= await Promise.all(
                        [
                          page.getByRole('button', { name: 'New Tab' }).click(),
                          context.waitForEvent('page')
                        ]
                    )


    console.log("Main page title:",await page.title())
    console.log("New page/Tab title:",await newPage.title())

    await expect(newPage).toHaveURL(/playwright.dev/);

})


test('handle new window', async({context})=>{

    const page = await context.newPage();
    await page.goto("https://sdetqa.vercel.app/autoplay")

    //Appraoch 1:
    /*
    await page.getByRole('button', { name: 'New Window' }).click()
    const newPage = await context.waitForEvent('page'); // Wait for any new page in this context and Get the opened page/tab
    */

    //Appraoch 2 : using Proimis.all()
   
   const [,newPage]= await Promise.all(
                        [
                          page.getByRole('button', { name: 'New Window' }).click(),
                          context.waitForEvent('page')
                        ]
                    )
  

    console.log("Main page title:",await page.title())
    console.log("New page/Tab title:",await newPage.title())

    await expect(newPage).toHaveURL(/playwright.dev/);

})

