# CoDaw

This README outlines the details of collaborating on this Ruby on Rails + Ember application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [rvm](https://rvm.io/) (we use ruby-2.1.2)
* [bundler](http://bundler.io/)
* [mysql](https://www.mysql.com/) (install with brew on a mac)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

### Cloning the Code
* `git clone --recursive git@github.com:ProjectCodaW/CoDaw.git` this repository

* **Note:** If you have already cloned this repository without the `--recursive` option:
            You must initialize and update the WAAX submodule as follows:

```
cd CoDaw/frontend/vendor/WAAX
git submodule init
git submodule update
```

* From the root directory run: `bundle install`
* `cd` into the 'frontend' directory and run:
```
npm install
bower install
```

### Setting up your databases

* `mysql -u root -p`
* Enter your mysql root password
* `create database codaw_dev;`
* `create database codaw_test;`
* `CREATE USER 'codaw'@'localhost' IDENTIFIED BY 'music';` (if you encounter a password validation error at this step,
then try the following step and retry):
  * `SET GLOBAL validate_password_length = 5;`
* `GRANT ALL ON codaw_dev.* TO 'codaw'@'localhost';`
* `GRANT ALL ON codaw_test.* TO 'codaw'@'localhost';`



## Running / Development

* Change into the root directory of your rails app
* `rails s`
* Visit your app at [http://localhost:3000](http://localhost:3000).

## The CoDaw Git Workflow

Here are some tips on how we can efficiently create clean commits and focus the majority of our time on development:
After successfully merging a PR, delete your old branch. This is because, we want to create commits on top of what
master already has. Your old branch is no longer of benefit unless it is identical to master. If you are not sure,
discard it!

### Deleting local and remote branches
to delete your old remote branch do:
```
git push origin --delete <-BranchName->
```
to delete your old local branch do:
```
git branch -D <-BranchName->
```
### Creating a new branch (from master)
now check out a new branch off the latest master:
```
git fetch origin
git checkout -b <-your_github_handle->/<-new_feature_name-> origin/master
```
Go ahead and push this branch to make it exist remotely:
```
git push origin <-your_github_handle->/<-new_feature_name->
```
### Creating Clean Commits
Now you are ready to develop. When developing try to create clean commits. For example, suppose I am creating database
migrations and also modifying the title in an html page. when I type:
```
git status
```
the files that I have changed are:
```
M db/migrate/234232.rb
M db/migrate/2383832.rb
M frontend/index.html
```

If I am ready to commit these files, I will create separate commits by adding and committing the db/migrate files
separate from the index.html file.

### Rebasing With master, and what that means
After you have committed your files, it is important that you fetch the latest copy of the master branch and rebase with
master. By rebasing with master, you are bringing in all commits that have been merged into master (good commits) and
laying your commits on top of them.

For example, let's say when you start development master has commits:
```
A, B, C
```
you create commits X, Y, so your branch looks like this:
```
A, B, C, X, Y
```
However another teammate merged commits D and E into master, so master now looks like:
```
A, B, C, D, E
```
By rebasing with master, you will make your branch go from looking like
```
A, B, C, X, Y 
```
to looking like 
```
A, B, C, D, E, X, Y
```
The idea is that your commits will appear as the last set of commits. This allows for incremental development and makes
easy to pinpoint where exactly something went wrong.

To get the latest copy of master, do
```
git fetch origin
```
this updates updates the copies of all remote branches locally

now rebase your branch with origin/master
```
git rebase -i origin/master
```
A text editor will open and you will see your list of commits that will be appended at the end of master's commit
history. Save and quit the text editor to confirm.

### Push your work to your remote branch
Finally, you'll want to update your remote branch to include the changes after the rebase.
```
git push origin <-your_github_handle->/<-new_feature_name->
```
If no one had updated master before your rebase, the above commit should have worked fine. However, if master was
changed, then github will not be happy with your push. Nothing to worry about. As long as the rebase with master was
successful, you definitely want the commit history of your current local branch to be the one that is used. Therefore,
 you can:
```
git push origin <-your_github_handle->/<-new_feature_name-> --force
``` 
This forces the contents of your local branch onto the remote branch. Referring back to the example above, your remote
branch should now contain commits:
```
A, B, C, D, E, X, Y 
```
while master contains commits:
```
A, B, C, D, E
```
### Creating your PR (base branch: master)
Now you can create your PR. Make sure that master is selected as the base branch, and that your remote branch is selected
as the compare branch. After your PR is reviewed by you and anyone you ask to review it, it must be tested on stage.

stage is the branch that is deployed to dev.codaw.co and dev.codaw.org

### To push your PR on stage do the following:
```
git push origin HEAD:stage --force
```
The command tells Git to replace the remote stage branch with the contents and commit history as your local branch.
Because previous state of the remote branch stage will be completely lost, make sure that you are the only person
pushing your work to stage at the given time.

###
Now stage must be deployed. Once you verify that your changes look good on the site, by testing the features out on
`dev.codaw.co` or `dev.codaw.org`, you are ready to merge your commits with master.
Pressing the merge button on your PR, will append your commits (X, and Y), to the end of master's commit history

#### Warning
DO NOT merge another person's branch into your branch.
This makes it almost impossible to create a PR that can be merged. (each person should focus on being able to merge
their own PR with master)
