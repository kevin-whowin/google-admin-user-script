# New User Script for Google Workspace

## Overview
This script automates the process of creating a new user in Google Workspace as part of the IT processes (at my old company)

## Objective
To streamline and automate the creation of new user accounts in Google Workspace

## Features
1. Generates email address in the default format based on first and last name input
2. Creates a password in default format using the input
3. Adds new user to default groups
4. Assigns Google Workspace Business Standard license to the user

## Usage Instructions
1. Create a new Project in the specified Google Sheet
2. Copy and paste `code.js` and `new-user.html` files into project
3. Rename the `code.js` file to `code.gs`
4. Add `Enterprise License Manager API service` and `Admin SDK API` services
3. Run the script! ! ! !

## Implementation Details
- **Platform**: Google Workspace
- **Language**: Google Apps Script (fancy javascript)
- **License Type**: Google Workspace Business Standard (can change this)

## Notes
- Ensure you have the necessary permissions to create users and assign licenses
- Make the HTML prettier if u want lol, we didn't really need it to be fancy
