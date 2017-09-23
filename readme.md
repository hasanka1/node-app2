# Node.js - Demo app for Azure
This is a simple Node.js web app using the Express framework and EJS templates.

Based on the standard express-generator template with EJS views e.g. `express --git --view=ejs` but has been enhanced with Bootstrap, FontAwesome and App Insights.
The app has two basic pages accessed from the nav bar menu:
 - SYSTEM - Will show some system & runtime information, and will also display if the app is running from within a Docker container.  
 - WEATHER - Performs geo IP reverse lookup of the requesting client using [freegeoip.net](http://freegeoip.net). The resulting location is used to fetch a weather forecast from the [Dark Sky](http://darksky.net) weather API. The results are show using animated [Skycons](https://darkskyapp.github.io/skycons/). The has the added bonus of allowing you to see dependency calls (out to both external APIs) on the App Insights map
 
![screen](https://user-images.githubusercontent.com/14982936/30772489-40a02d14-a054-11e7-8a84-8e13e0af4725.png)

## Running 
Standard `npm install` and start with `npm start`. Web app will be listening on the usual Express port of 3000 or what is set in `PORT` environmental variable


## Docker 
Public Docker image is [available on Dockerhub](https://hub.docker.com/r/bencuk/nodejs-demoapp/).  
Note. The Docker image includes SSH support, this is to enable the web console feature when running this app as a container in Azure Web App for Containers.


## Application Insights 
The app has been instrumented with the Application Insights SDK, it will however need to be configured to point to your App Insights instance.  
To configure this, set the `APPINSIGHTS_INSTRUMENTATIONKEY` environmental variable to the relevant key for your active instance. If running in an Azure Web App, this can be set as an application setting in Azure.

[This article](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-nodejs) has more information on monitoring App Insights with Node.js 


## Updates
* Sept 2017 - Added weather page
* Sept 2017 - Major revamp. Switched to EJS, added Bootstrap and App Insights
* Aug 2017 - Minor changes and fixes for CRLF stuff
* July 2017 - Updated Dockerfile to use super tiny Alpine Node 6 image
* June 2017 - Moved repo to Github

