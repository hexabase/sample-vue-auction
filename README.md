# sample-vue-auction

## Summary
This is sample application for Hexabase.

![https://auctions.hexabase.app](https://auctions.hexabase.app/site-image.png) 

## Prerequisites 
Download and install or execute cmd to install

|name            |version     |URL or cmd | note
|:-----------|:-----------|-------------------------------------|--
|node        |v16.x       |https://nodejs.org/en/download/| 
|npm         |latest      |$ (sudo) npm install -g npm |

## User registration to Hexabase and creation your Workspace
- access https://app.hexabase.com/login
- Click `Don't have an account? Signup`
- Select Signup with email address
- After entering the email address of the user you want to register, proceed with authentication from the received email
- After password registration, user registration is completed and your workspace is created

## Download source locally from repository
- `git clone` or download the zip file and extract it locally

## Restore application to workspace created using hexabase-cli
- access https://github.com/hexabase/hexabase-cli/tree/master
- Execute the following command
- `npm install -g hexabase-cli`
- `hx contexts:set prod --server https://api.hexabase.com --sse https://sse.hexabase.com `
- `hx contexts:use prod`
- `hx contexts:login`
- `hx workspaces:use` *select your workspace
- `hx projects:restore {Path where you placed the source}\sample_template.zip`
- if there are no problems, the template application will be restored to your workspace

## Launch the front application on localhost
- Run `npm install` at the path where you placed the source
- Run `npm run serve` application starts at localhost:5004

## Update config.js according to the created environment
- sample-vue-auction/public/config.js
- (example) update `VUE_APP_WORKSPACE_NAME`: "My Workspace"
- (example) update `VUE_APP_GROUP_ID`: "Grp-KlNruww7"
  - Open the workspace settings from the gear icon on the top right of Hexabase web-ui
  - Select `Groups and Members` tab and select `Edit Group` in the `Workspace Members` group of the group tree
  - Set the displayed group ID value

## Grant the member role of the created application to the group to be invited
- Select `Group Roles` tab on `Groups and Members` tab
- Check the `member` role of the created project from `Edit Roles`

## Login to the app as a workspace administrator and invitation user
- access `http://localhost:5004/signin` and Login
- access `http://localhost:5004/registration`
  - Specify the email of the user you want to register in the application and send
  - *Limited to email addresses of users who are not yet registered in Hexabase
- receive an invitation email, so authenticate on the app screen
- registered as a User master, bidding for auctions, and registering user information
