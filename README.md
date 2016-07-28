#READ ME

##Intro
This program aims to create a set of static HTML files to allow a user to browse the images contained in the API. 

###Software requirements
Python 2.7

##Input Arguments

`python RedBubbleTest.py [Save Directory Path] [API URL]`

Example:

`python RedBubbleTest.py abc http://take-home-test.herokuapp.com/api/v1/works.xml`

##Output

Output will be stored in the working directory unless otherwise specified. API URL is <a>http://take-home-test.herokuapp.com/api/v1/works.xml</a> unless otherwise specified. If only one argument provided, it would be taken as the URL. 

##Known Bugs and Errors

1. Python's "assert" statement has been used for testing and debugging. However, the use of "assert" is not recommended in production code and it should be replaced with proper error handling mechanisms. 
2. If the tree made of all works is damaged or updated, it can affect the URLs availability or correctness. This has been noted on line 140 of the code where the bug exists.
3. There is not a user interface available at the moment.


##Further development and maintenance
Adjustments to the program could be made, however given the specification and time limit the developer decided on best action. Further adjustments will be made upon request. 
