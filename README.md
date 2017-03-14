# RelationshipsG4 [![Join the chat at https://gitter.im/MusicConnectionMachine/RelationshipsG4](https://badges.gitter.im/MusicConnectionMachine/RelationshipsG4.svg)](https://gitter.im/MusicConnectionMachine/RelationshipsG4?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

In this repository we will try to build and determine relationships between composers

##Stanford CoreNLP
1. [download the latest Version](http://stanfordnlp.github.io/CoreNLP/#download)
2. run `java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer` in the extracted folder to start the magic on localhost:9000

##Express Project
1. navigate to server folder (in a new console)
2. run `npm install` to install dependencies
3. run `npm run start` to start the server on localhost:3000, or alternatively run the ./bin/www file in WebStorm

###Troubleshooting
- Mac specific: in case you don't have [wget](https://www.gnu.org/software/wget) installed, you can get it via [homebrew](https://brew.sh) by running `brew install wget`
- testing under Windows still in progress
