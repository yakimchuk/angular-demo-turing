# Great demo for Turing.ly

This application is not a real product, it is just a live demo 
of an online store in order to demonstrate the candidate's technical skills.

It done with:
+ Angular
+ Google Material
+ JSON Schema Validator
+ Device Detector Module
+ Tour Module

Additionally:
+ SCSS
+ Flexbox
+ Scoped CSS
+ i18n

**Demo links**
* English version — https://yakimchuk.github.io/turing/en/
* Russian version — https://yakimchuk.github.io/turing/ru/

## Preface

This application built with basic constraints:
- There are no teams so there are no technically implemented boundaries for 
separately managed entities (api, components, services, etc). They are 
formed, but is not implemented, it is not required here.

- There are no acceptance and unit tests, they'd take a lot time, but they are 
not necessary for demo, I think. If you think opposite, test me, I know so 
much about testing (functional/integrity/unit testing, Selenium, 
WebDrivers, Karma, Gherkin, almost everything you want to see).

- It is not platform-based solution, so there are no correct technical 
implementation for developing of a company platform for R&D department. There 
are no correct interfaces (as they must be, first describe system, then 
implement it with instruments, like Angular or everything else), isolation for 
external modules, external services for inner needs, and other. This demo 
is one-time solution, otherwise it would take months to implement it. Read 
more in the book "Clean Code" by uncle Bob.

## Features
Short demonstration of a few vital features plus bonus

### Navigation
![demo_navigation]

### Search
![demo_search]

### Product
![demo_product]

### Cart & Checkout
![demo_checkout]

### Account
![demo_account]

### Exceptions handling
One of the key and, unfortunately, underestimated basic concepts is 
an exception handling. Almost every user scenario can have numerous 
unexpected scenarios and the more you will find and handle, the better.

#### Product
![demo_exceptions_product]

#### Navigation
![demo_exceptions_navigation]

#### Checkout
![demo_exceptions_checkout_network]

#### Unexpected browser reload while the checkout process
![demo_exceptions_checkout_user]

#### Navigation
![demo_exceptions_navigation]

## Afterword
There are many significant things can be done to make this demo relatively 
completed:
* Outline modules boundaries
* Describe all contracts (interfaces and schemas)
* Split app by external team-maintained modules (ui, features, feature 
sets, and other)
* Resolve issues with framework and other technical debt
* Write tests (functional, integrity, unit, load)
* Setup CI (plus CD if needed)
* Write analysis documents
* Write technical documents
* Write user documentation
* Write acceptance documentation
* ...and make a spaceship J

Thanks for the interest to this demo!

Roman Yakimchuk, Lead Software Engineer

[demo_navigation]: docs/images/navigation.gif
[demo_search]: docs/images/search.gif
[demo_product]: docs/images/product.gif
[demo_checkout]: docs/images/checkout.gif
[demo_account]: docs/images/demo_account.gif
[demo_exceptions_product]: docs/images/product_exceptions.gif
[demo_exceptions_navigation]: docs/images/navigation_exceptions.gif
[demo_exceptions_checkout_network]: docs/images/demo_checkout_network_exceptions.gif
[demo_exceptions_checkout_user]: docs/images/demo_checkout_user_exceptions.gif
