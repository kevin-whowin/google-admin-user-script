function addUser(firstName, lastName, selectCity) {
    let user = {
      primaryEmail: generateEmail(firstName, lastName),
      name: {
        givenName: firstName,
        familyName: lastName
      },
      password: generatePassword(firstName),
      changePasswordAtNextLogin: true
    };
  
    try {
      user = AdminDirectory.Users.insert(user);
      console.log(`Created user with primaryEmail: ${user.primaryEmail}`);
      addGroupMember(user.primaryEmail); //These will add users to default groups, assign license and selected city after user is made.
      insertLicenseAssignment(user.primaryEmail); 
      selectCityEmail(user.primaryEmail, selectCity); 
      return `
      User ${user.primaryEmail} 
      created with ID ${user.id}`;
    } catch (err) {
      return `Failed with error ${err.message}`;
    }
  }
  
  function generatePassword(firstName) { // This will generate password for the user {example + firstName + example}
    const prefix = "example";
    const suffix = "example";
    const password = `${prefix}${firstName}${suffix}`;
    return password;
  }
  
  function generateEmail(firstName, lastName) {
    const domain = "@example.com.au";
    const primaryEmail = `${firstName}.${lastName}${domain}`;
    return primaryEmail;
  }
  
  function addGroupMember(primaryEmail) {
    const groupEmails = [
      'default@example.com.au',
      'provisioning@example.com.au',
      'provisioning-second@example.com.au'
    ];
  
    const member = {
      email: primaryEmail,
      role: 'MEMBER'
    };
  
    groupEmails.forEach(groupEmail => {
      try {
        AdminDirectory.Members.insert(member, groupEmail);
        console.log('User %s added as a member of group %s.', primaryEmail, groupEmail);
      } catch (err) {
        console.log('Failed to add user %s to group %s with error %s', primaryEmail, groupEmail, err.message);
      }
    });
  }
  function selectCityEmail(primaryEmail, selectCity) {
    const userEmail = primaryEmail;
    const member = { email: userEmail, role: 'MEMBER' };
    let groupEmail;
  
    switch (selectCity) {
      case 'Melbourne':
        groupEmail = 'campus-first@example.com.au';
        break;
      case 'Sydney':
        groupEmail = 'campus-second@example.com.au';
        break;
      case 'Canberra':
        groupEmail = 'campus-third@example.com.au';
        break;
      case 'Brisbane':
        groupEmail = 'campus-fourth@example.com.au';
        break;
      default:
        console.log('Invalid city selected');
        return;
    }
  
    try {
      AdminDirectory.Members.insert(member, groupEmail);
      console.log(`User ${userEmail} added as a member of group ${groupEmail}.`);
    } catch (err) {
      console.log(`Failed with error ${err.message}`);
    }
  }
  function insertLicenseAssignment(primaryEmail) {//This will assign Google Workspace Business Standard license to the user. To assign a different license refer to: https://developers.google.com/admin-sdk/licensing/v1/how-tos/products
    const productId = 'Google-Apps';
    const skuId = '1010020028';
    const userId = primaryEmail;
    console.log(`Assigning license to user: ${userId}`);
    try {
      const results = AdminLicenseManager.LicenseAssignments.insert({userId: userId}, productId, skuId);
      console.log('License assigned: ', results);
    } catch (e) {
      console.log('Failed to assign license with error %s ', e.message);
    }
  }
  
  function onOpen() {//adding UI to the google sheet
    SpreadsheetApp.getUi()
      .createMenu('Operations')
      .addItem('new g-suite user', 'showUserManagementSidebar')
      .addToUi();
  }
  
  function showUserManagementSidebar() {
    const html = HtmlService.createHtmlOutputFromFile('newUser')
      .setTitle('Create new users here!');
    SpreadsheetApp.getUi().showSidebar(html);
  }
  