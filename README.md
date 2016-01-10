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

## The Git Workflow

### Starting Development
First off, we'll need a new branch. Unless otherwise specified, we
branch off of `origin/stage` (origin = ProjectCodaW). You can do
this with:
```shell
git fetch origin
git checkout -b azimpradhan/my_feature origin/stage
```
Now let's go ahead and push our new branch up to GitHub. For feature
branches on the ProjectCodaW repository, we prefix branch names with a
personal handle, so I would do:
```shell
git push origin azimpradhan/my_feature
```

### Active Development
Start writing code! While developing, be sure to commit early,
and often! As a distributed VCS, branching is cheap/easy in Git,
so branch away! Also, be sure to regularly push your changes to 
Github; hard drives crash, laptops are stolen, things happen; don't
lose your work! For now, don't worry about creating too many commits;
We will be able to clean up our branch before submitting a PR.
By committing often, it is easier to revert changes we make while
iterating.

#### A Note on commits
Don't forget to run `git diff` to ensure you're only committing intended
changes.  If you _really_ want to commit everything from the diff, tell
Git to add only files with updates _iff_ they are already under version
control:
```shell
git add --update
```
If you don't want to commit _everything_, you can selectively stage
portions of files by:
```shell
git add --patch
```
I often use the `--patch` option to exclude `debug`/`print` lines from
my commits.

##### Warning
Some people like to stage files to be committed with the wildcard syntax:
```shell
git add --all
```
Please, don't do this. Because it adds _all_ files, unintended files are
often committed erroneously (temp files, swap files, unrelated changes,
etc.). You should always run either `git add --patch` or `git add
--update`.

#### Rebasing
After all your changes are committed rebase your branch against the most
current version of origin/stage. Rebasing against origin/stage means
making sure that the changes in your branch will be layed out on top of
the current version of origin/stage. To do this:
`git fetch origin`
`git rebase -i origin/stage`
A text editor will appear with all the commits that are unique to your branch.
Save and quit the text editor to perform the rebase
If there are no conflicts the rebase was successful. If not, fix conflicts and run `git rebase --continue`
after rebasing be sure to push your branch to origin

