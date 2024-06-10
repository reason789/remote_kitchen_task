## Answer to the question no: 1

Branch name will be hotfix/brief-description

PR anf MERGE steps are:

Firstly, we have to switch to the production branch by this below command
=> git checkout production

then we have to pull latest change by this below command
=> git pull origin production

After taht, we have to create the hotfix branch:
=> git checkout -b hotfix/brief-description

Then we have to implement and commit the hotfix changes by these commands
=> git add .
=> git commit -m "Fix: brief description of the hotfix"

then push hotfix branch to the remote repository:
=> git push origin hotfix/brief-description

Now,
We have to open a Pull Request on github from hotfix/brief-description to production. Request reviews and make any changes based
on feedback.After approve, we have to merge PR into the production branch using the github interface.

Fetch and pull latest production branch locally by these commands
=> git checkout production
=> git pull origin production

Finally, we have to delete the hotfix branch both locally and remotely:
=> git branch -d hotfix/brief-description
=> git pu origin --delete hotfix/brief-description

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

## Answer to the question no: 2

Initially, we have to loop through MENU Collections.Each menu in the dummyArr.

Then we have to create a map of menu items. For each menu, we have to make a map where the key is the menuItem ID and the value is the menuItem object.

After taht we loop through In each menu, go through each category.

Match menu item IDs to menu items. For each category,we have to use the menuItemIds to find and collect the matching menuItem objects from the map.

Finnaly, we have to store the Results thar matched menu items under each category for each menu.
