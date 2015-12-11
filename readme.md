# Compass
> A demonstration of common cognitive biases such as anchoring and base rate neglect

## Dependencies

Npm, MongoDb

## Setting up your environment

1. Fork this repository.
2. Change your server/config/local.env.sample.js to local.env.js and add needed keys.
3. Install mongodb and have a local mongod process running. (https://docs.mongodb.org/v3.0/tutorial/install-mongodb-on-os-x/)
3. Run 'grunt serve' from the command line.

## Deploying to Bluemix

1. Install cloudfoundry command line interface (https://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html)
2. Run 'grunt build' from the command line to compile your code.
3. Set your api endpoint with cf api and log in using your IBM id (not intranet id).
4. Navigate to the dist folder.
5. Run 'cf push <appname>' from the command line to deploy to Bluemix. App will upload but fail to start because environment variables are not defined.
6. Go to your Bluemix dashboard, select your newly chosen app, and navigate to environment variables.
7. Set environment variables to match your server/config/local.env.js file. Set NODE_ENV to 'production' or 'development'.
8. Set your MongoDB database uri using your environment variables. For instance, if you set it to production environment, you can set MONGOLAB_URI, MONGOHQ_URL, OPENSHIFT_MONGODB_DB_URL + OPENSHIFT_APP_NAME, or set it manually in server/config/environment.
8. Go back to the overview and start your app. Good job!

## Code Structure

### Stack
This application uses a MEAN stack, with Bootstrap 2 for styling. This requires MongoDB, Node.js, and has Angular and Express servers built in. This app infrastructure was generated using the yeoman generator angular-fullstack.

### Organization
The code is separated into the client and server sides. The server side creates an Express server running on Node.js that exposes several different apis (located in the server/api folder). The index.js file defines the routes and the controller defines the process behind the call. For many apis, there is also a MongoDb database object associated and the JSON structure is defined in the model.

### Auth
The authentication system is currently built independently of IBM's authentication system. The authentication system uses a passport system. Several LDAP passport modules are available for install using the node package manager and would be easy to integrate.
