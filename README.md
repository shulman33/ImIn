# ImIn
This automated course registration software (aka bot) utilizes the Node.js library Puppeteer to register for your classes as soon as registration opens so you will never be locked out again. 
## Step ☝🏼

Clone this repository to your computer or download the zip by clicking the green code button then click Download Zip
## Step ②

Download [Node.js](https://nodejs.org/en/download/) to your computer.
## Step 🥉: Project Configuration
Using the terminal or command line navigate into registration-bot directory then into src and enter the following commands into the terminal 
    
    npm i puppeteer
 

    npm install node-schedule --save
## Step ∜: Running the Bot
Navigate to the src directory and enter the following into the terminal
### IMPORTANT NOTE‼️

when entering the time of registration it is critical you enter it in army time for example 1:05pm would be 13:05

when entering the date of registration is critical there are always two digits for the months and and days for example April 8th woule be 04/08


    Node bot.js <YU Username> <YU Password> <Time of Registration> <Date of Registration> <crn1> <crn2> <crn3>
It should look something like this 

<img width="561" alt="Screen Shot 2022-03-31 at 11 19 02 PM" src="https://user-images.githubusercontent.com/62624776/161188862-c5de5fca-9e75-4ca5-aa12-485932e98e77.png">

## Step 𝟝: Checking Results 
Go into the src folder you will see registration-status.png which is a screenshot of the classes you were just registered for.

<img width="595" alt="Screen Shot 2022-04-01 at 12 04 24 AM" src="https://user-images.githubusercontent.com/62624776/161193016-954f8b57-1a93-4bbe-8d2b-de881b526fdf.png">

## Miscellaneous Points
 - Do not close the terminal until you have gotten your registration results
 - You can put in as many as 10 CRNs

## ENJOY NOT WORRYING ABOUT REGISTRATION ANYMORE🥳



