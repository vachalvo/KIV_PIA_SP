# KIV/PIA - Semestrální práce - Sociální síť Squirrel
Tento projekt je semestrální prací k předmětu KIV/PIA. 


# Spuštění
Pro spuštění byly vytvořeny přesně dva Dockerfile soubory ve složkách ./backend a ./frontend a jeden docker-compose.yml, který slouží pro vytvoření všech obrazů aplikací. 
Pro nastartování aplikace stačí dát v kořenovém adresář (tj. kde jsou složky ./backent a ./frontend) příkaz:
```
docker-compose up --build
```
A aplikace by měli nastartovat. Pro přístup k aplikace se použije odkaz na hlavní stránku [Login Page](http:/localhost:3000/login).

Při spouštění aplikace se do příkazové řádky vypíše i zároveň email a heslo k administrátorskému účtu, který je automaticky založen, pokud žádný v databázi neexistuje. Daný výpis má následující formát:
```
backend   | 2021-12-18 10:15:59.032  INFO 1 --- [           main] com.kiv.pia.backend.BackendApplication   : Admin account not found. New default admin account created. (Email: 297_fef@squirell.com; Password: yW!3odpXG2)
```
Pozov údaje obsažené v ukázke nejsou správné reálné a slouží pouze pro ukázku.

Při prvním spuštění aplikace se žádné jiné účty nevytvářejí, kromě administrátorského. Proto je potřeba dané účty vytvořit.

# Popis semestrální práce
Pro vývoj byl zvolen stack - **Spring Boot (BE), React (FE) a PostreSQL (DB)**. Všechny zdrojové kódy pro BE jsou ve složce **./backend** a pro FE **./frontend**. Pro většinu komunikace mezi FE a BE byl použit **REST**:
## Bonusové části
V průběhu vývoje jsem zapracoval i následující bonusové části:

 - entropy based password strength evaluation - 5 points
 - storing of chat messages in the DB - 5 points
 - possibility to show older posts - 7 points
 - instant check of the e-mail availability (not being used by an already registered user) on the registration screen (REST) - 2 points
 
Dále bylo přidáno následující rozšíření, které nebylo obsahem zadání ani bonusových částí:

 - přepnutí do tmavého a světlého režimu
 
## Bonusové technologie
 
 - Angular, React, any other frontend technology - 5 points
 - Use your Git repo properly and regularly - your activity there should give me a clear idea about your progress - 2 points

Pokud bychom tedy sečetli bonusové body z přidaných částí, vychází nám - 26 bonusových bodů, pokud by bylo všechny splněny.
 
# Zadání
# Semester Project PIA 2021

Your task is to implement a simple Social network prototype.

## Scope
### Mandatory parts
- login screen
    - will require e-mail and password
    - will inform the user in a safe way (no unnecessary information) about any failures
- registration screen (registration without an e-mail confirmation), you must keep at least these
information about any user
    - e-mail (will serve as a login name, must be unique, cannot register another user with the same e-mail)
    - name
    - password
    - role
      - by default, newly registered users will be assigned only the *USER* role
      - another role - *ADMIN* - will be available, see below
- friendship management
    - separate page with all the following capabilities
    - search
      - at least three characters must be provided
      - will return users with names containing the provided text
      - must exclude users who have blocked the searching user
      - must exclude users who are already friends
      - must include users with pending friend requests
      - friendship request - from the search results, the user can request friendship with any of the listed users
    - list of friends/pending friend requests/blocked users
      - accepting friendship - will make the accepting and requesting users friends
      - rejecting friendship - will decline the request, but the user remains open to other requests
      - blocking friendship - will decline the request and block the requesting user from any other requests
      - unblocking a user - will remove the block allowing the unblocked user to send friend requests to the current user again
- home page
    - feed - certain number of the most recent posts created by all friends and the current user, the most recent on top
      - must be refreshed, can be done by JavaScript polling in reasonal intervals, no need for an immediate reaction
      - when adding the new posts to the top, keep the old ones shown
    - new post - inline or popup window - limit to plain text, no images necessary
    - list of on-line friends
      - must be updated - implement using WebSockets - immediate reaction is necessary
    - pop-up chat
      - does not require storing of the messages, new chat windows can be empty
      - must be immediate - use WebSockets
      - you can limit to only one active chat at any time
- admins
    - any user with the *ADMIN* role will be allowed to assign/unassign the *ADMIN* role to other users (for simplicity, use the already
    existing friend list meaning that only admin's friends can be modified
    - no admin can unassign his own *ADMIN* role
    - at the application start ensure that at least one admin is present in the database, if not, create one
      - be sure to check for the user name (e-mail) availability when doing so
      - generate a new strong password for the user
      - log both, the e-mail/username and password to the console
- announcements
    - special posts visible to all users regardless the friendship status
    - only *ADMIN* users can create announcments
    - their placement in the feed follows the same rules as regular posts

All mandatory parts must be fully implemented and work without failures. Login and registration
screen must have all fields validated and must never end in any kind of server error.

**Total: 25 points**

### Bonus parts

- entropy based password strength evaluation - **5 points**
    - there are better ways than just enforcing a minimum length and multiple character classes, try
    calculating the entropy and set reasonable boundaries for each strength intervals - weak, reasonable, strong
    - inform the user about their current password strength when entering passwords on the registration page
    - don't allow using weak passwords
- OAuth2 authentication using Facebook, Google or any other OAuth2 IDM - **5 points**
    - users must behave in the exact same way as the regularly registered
- password reset using an e-mail (reset link) - **5 points**
    - one time link with a limited time validity (5 minutes so I can easilly test it)
      - visiting the link must invalidate it
      - waiting for too long must invalidate it
    - will not require the old password, only twice the new one
    - must follow the same rules as the registration page (don't forget password strength evaluation if you are implementing it) - additional **1 point** for this combo
- storing of chat messages in the DB - **5 points**
    - chats will contain a limited history (for example the last 10 messages)
- possibility to show older posts - **7 points**
    - by scrolling to the bottom of the page, load more posts and show them at the bottom of the feed (keep the order)
- instant check of the e-mail availability (not being used by an already registered
user) on the registration screen (REST) - **2 points**
- likes - **5 points**
    - users can like/unlike any posts shown in their feed (except for their own)
    - display the number of likes for each post
    - on click display a pop-up with the list of users liking the post
    - the number of likes must get updated with the regular feed update
- feel free to come up with any other suggestion

## Technology

You may use any stack you like as long as the following mandatory technologies
are present.

Prefered stack is based on Java 11+, Spring 5, Spring Boot 2, Hibernate (JPA).

### Mandatory

* HTML, CSS
* responsive design - using of pre-defined templates is forbidden, but you
may use frameworks such as [Bootstrap](https://getbootstrap.com/),
[Foundation](https://get.foundation/) or other, don't worry about
the design, it has to be functional, not pretty
* IoC/DI
* ORM
* sdandalone database (MySQL, PostgreSQL or anything else you are able to
start in a Docker container)
* REST - there are many places where you can choose between REST and server-side, use REST
at least once
* web sockets
* docker
* docker compose

### Bonus

* [OpenAPI](https://swagger.io/specification/), Swagger, [RAML](https://raml.org/)
or any other API modeling/specification language with code generation - **10 points**
* Angular, React, any other frontend technology - **5 points**
* Use your Git repo properly and regularly - your activity there should give me a clear idea about
your progress - **2 points**

## Solution details

### User Registration

* use e-mail address as the login name
* the e-mail address must be unique within the user database
* pasword and password validation must be provided by the user
* the user must be notified in case of any problems (e-mail address already
registered, passwords don't match, ...)
* users are stored in the database, passwords must be encrypted
* can be implemented as a REST call or a server-side logic

### Login

* e-mail and password
* user must be notified of authentication failures without hinting what field was incorrect
* can be implemented as a REST call or a server-side logic

### Fatal problems

These problems will lead to an immediate return of the whole work and loss of 7 points + another seven days
to fix these:

1. the application won't start
    - please, test this, be sure it will start even on a fresh computer, test in a virtual machine if necessary
    - I will follow your set-up/run manual by the letter, be sure it is complete
2. login/registration screen failure or ISE 500
    - I will try to break your application here - try any combination of inputs, be sure everything is handled properly
    - I must not be able to register a user when
       - the password is empty
       - the given passwords don't match
       - a user with the same e-mail is already registered
    - I must not be able to login with wrong credentials
3. an improper use of the DB
    - the goal is to learn how to use the DB properly, use proper relations
    - roles must be implemented as a separate DB table with many-to-many relation to users
    - passwords are stored in plain-text
4. your REST API does not follow the [basic rules](https://restfulapi.net/resource-naming/)
    - use the proper methods
    - use the proper paths
5. your application is not properly layered, keep your layers separate
    - presentation/controller
    - logic/service
    - data access
6. any of the mandatory parts/technologies is missing

## Submission

The project submission must consist of:

1. the source code
2. a Dockerfile to build the project
3. Dockerfiles and a docker compose file to run the entire project
4. a manual describing how to run the whole project including a database
or any other containers necessary
    - should be something like
       - enter the folder
       - run `docker-compose build`
       - run `docker-compose up`
5. a short document (A4, can be a single markdown file) on the solution
    - don't forget to list all bonus features included in your application so that I can check them

You can either provide an archive containing all the parts (upload to the courseware)
or **preferably** a link to a GIT repository of your choice (GitHub, BitBucket, ...).

### Points

All the bonus points listed are maximum values and can be reduced in case of incomplete
work or other problems. You can receive maximum of **50 points** for the whole project.