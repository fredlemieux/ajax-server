#  Node.js server
Node.js server for the Ajax exercise for the Code Your Future students in Glasgow. It is supposed to mimic a basic chatroom functionality. 

## API

Server url: http://ajax-cyf.eu-west-1.elasticbeanstalk.com/

### Requests

##### POST 
/chatroom/?id=[ID]
where ID is of your choice

You can POST message with curl:
```
curl -d "Hello there" "http://ajax-cyf.eu-west-1.elasticbeanstalk.com/chatroom/?id=67"
```

##### GET 
/chatroom/?id=[ID]
where ID is of your choices, i.e.
```
curl -v http://ajax-cyf.eu-west-1.elasticbeanstalk.com/chatroom/?id=67
```

## Basic Testing Using Mocha and Chai

### Intro/Outline:
We’ll use Michael’s AJAX server, as it hopefully will be familiar, and the whole thing is not complicated, so it’s a good place to start.
This will run through setting up the testing environment; then we’ll write some tests.

### Mocha and Chai:
I’ve been using Mocha as the testing Framework, mainly because it seems to be one of the most popular ones, whether it is the best, it is hard to say?
Mocha doesn’t come with its own assertion library, for this we use Chai which makes the tests a lot easier to write and understand.  Again there are many other options you can use, we may cover other options in later sessions.
Jasmine, another popular testing framework does come with everything built into it, but I’ve not had the chance to use it yet.

### Setting up your testing framework:
1.	Install Mocha globally so that you can run mocha from your command line (you can also add this to your package.json if you want):
```
npm install –g mocha
```

2.	Then add the chai package to your project and save it to development dependencies in your package.json file
```
npm install chai –save-dev
```

3.	We’ll also include another assertion library for common http tasks:
```
npm install chai-http
```

4.	Then create a folder called “tests” in your project’s parent folder, this is where mocha will look for the tests when you run it.
5.	Finally in the package.json file add the following key, value pair to the “scripts” object:
```
"test": "mocha tests --recursive --watch" – Note the error below!!
```

This will allow you to start the testing using the command "npm test"
..*The command “mocha” will start tests in a folder called “test”, so we have specified a different folder “tests”,
..*the -recursive argument will make mocha looking with in all folders in “tests” so you can split your tests into different folders,
..*and –watch will mean rather than just run the test once it’ll watch the folder and whenever you make changes the tests are run once more

#### Writing our first Test:
In the tests folder, lets create a .js file it can be named anything you like, we’ll call it generic-tests.js, in this file you are going to need to
..* require(‘chai’);
..* use the should(), assert or expect assertions )see note below!
..* require(‘chai-http’) -->if we need it
..* the chai.use(chaiHttp) for it to work
..* pull in any of your .js files that you are testing using require(“./../app”)

Note:  On the surface, assert and expect all seem to do pretty much the same thing, but it'll be worth exploring this further.  All I could find was:
..* assert/expect do not modify the Object.prototype
..* assert/expect support custom messages

6. Start up your testing suite using the commage: npm test

Hopefully everything should work, however any errors you can amend whilst the tests are still running and the –-watch will mean that it’ll reload enabling some flow in your development

7. Now we can write a test, start with a simple test for a function that multiplies two numbers:
Use describe() to group your test suites and you can nest a much of these as you want, then use it() as the test case, within the callback for it() you have all your tests for that test case.  Use the done() callback if you are using promises to give them enough time to resolve for your tests
```
describe("The main app", function(){
   it("The multiply function should multiply two numbers and return the result", function(done){
      expect(app.multiply(2,3)).to.be.a('number');
   })
})
```

The accepted work flow of test driven development it that you should write the test first, and the test should fail, then you get the test to pass then write another test
This will fail:

8. Let’s create our function, don’t forgot you need to export the function for it to work


Chai-Http:

### ERRORs you may encounter!!

```
1) Uncaught error outside test suite:
Uncaught Error: listen EADRINUSE :: 3000
...
```

This is because app.listen is being called twice, once by the test, and once in the actual app?  I think…….
A detailed explanation can be found [here](http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html)

Solution is to only call app.listen once by checking the module.parent is not present when the app is executed
```
if(!module.parent){
    app.listen(3000);
}
```

TODO! Create more advanced tests, cover mocking, and API tests......