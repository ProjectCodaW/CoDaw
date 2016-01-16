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

* `git clone git@github.com:ProjectCodaW/CoDaw.git` this repository
* change into the new directory
* `bundle install`
* change into the `frontend` directory
* `npm install`
* `bower install`

### Setting up your databases

* `mysql -u root -p`
* Enter your mysql root password
* `create database codaw_dev;`
* `create database codaw_test;`
* `CREATE USER 'codaw'@'localhost' IDENTIFIED BY 'music';` (if you encounter a ppassword validation error at this step, then try the following step and retry):
* `SET GLOBAL validate_password_length = 5;`
* `GRANT ALL ON codaw_dev.* TO 'codaw'@'localhost';`
* `GRANT ALL ON codaw_test.* TO 'codaw'@'localhost';`



## Running / Development

* Change into the root directory of your rails app
* `rails s`
* Visit your app at [http://localhost:3000](http://localhost:3000).

## The CoDaw Git Workflow

Here are some tips on how we can efficiently create clean commits and focus the majority of our time on development:
After successfully merging a PR, delete your old branch. This is because, we want to create commits on top of what stage already has. Your old branch is no longer of benefit unless it is identical to stage. If you are not sure, discard it!

### Deleting local and remote branches
to delete your old remote branch do:
```
git push origin --delete <-BranchName->
```
to delete your old local branch do:
```
git branch -D <-BranchName->
```
### Creating a new branch (from stage)
now check out a new branch off the latest stage:
```
git fetch origin
git checkout -b <-your_github_handle->/<-new_feature_name-> origin/stage
```
Go ahead and push this branch to make it exist remotely:
```
git push origin <-your_github_handle->/<-new_feature_name->
```
### Creating Clean Commits
Now you are ready to develop. When developing try to create clean commits. For example, suppose I am creating database migrations and also modifying the title in an html page. when I type:
```
git status
```
the files that I have changed are:
```
M db/migrate/234232.rb
M db/migrate/2383832.rb
M frontend/index.html
```

If I am ready to commit these files, I will create separate commits by adding and comitting the db/migrate files separate from the index.html file.

### Rebasing With Stage, and what that means
After you have committed your files, it is important that you fetch the latest copy of the stage branch and rebase with stage. By rebasing with stage, you are bringing in all commits that have been merged into stage (good commits) and laying your commits on top of them:
for example,
let's say when you start development stage has commits:
```
A, B, C
```
you create commits X, Y, so your branch looks like this:
```
A, B, C, X, Y
```
However another teammate merged commits D and E into stage, so stage now looks like:
```
A, B, C, D, E
```
By rebasing with stage, you will make your branch go from looking like
```
A, B, C, X, Y 
```
to looking like 
```
A, B, C, D, E, X, Y
```
The idea is that your commits will appear as the last set of commits.

to get the latest copy of stage, do 
```
git fetch origin
```
this updates updates the copies of all remote branches locally

now rebase your branch with origin/stage
```
git rebase -i origin/stage
```
### Push your work to your remote branch
Finally, you'll want to update your remote branch to include the changes after the rebase.
```
git push origin <-your_github_handle->/<-new_feature_name->
```
If no one had updated stage before your rebase, the above commit should have worked fine. However, if stage was changed, then github will not be happy with your push. Nothing to worry about. If the rebase with stage was successful you definitely want the commit history of your current local branch to be the one that is used. Therefore you can:
```
git push origin <-your_github_handle->/<-new_feature_name-> --force
``` 
This forces the contents of your local branch onto the remote branch. To refer to the example above your remote branch should now contain commits:
```
A, B, C, D, E, X, Y 
```
while stage contains commits:
```
A, B, C, D, E
```
### Creating your PR (base branch: stage)
Now you can create your PR. Once your PR is reviewed by yourself and anyone you ask to review it, pressing the merge button, will append your commits (X, and Y), to the end of stage's commit history

#### Warning
DO NOT merge another person's branch into your branch. This makes it almost impossible to create a PR that can be merged. (each person should focus on being able to merge their own PR with stage)
