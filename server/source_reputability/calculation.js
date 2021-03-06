const request = require('request');
var express = require('express');
const Graph = require('graphology');
const hits = require('graphology-hits');
var router = express.Router();

router.get('/', function (req, res, next) {
     var dummyURLs = [
        'https://en.wikipedia.org/wiki/Johann_Sebastian_Bach',
        'https://en.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart',
        'https://en.wikipedia.org/wiki/Joseph_Haydn',
        'https://en.wikipedia.org/wiki/Ludwig_van_Beethoven',
        'https://en.wikipedia.org/wiki/Vienna'
    ];

    generateGraph(dummyURLs).then(function (graph) {
        var scores = hits(graph).authorities;
        var output = JSON.stringify(scores, undefined, 4);
        //console.log(output);
        output = JSON.parse(output);
        res.send(output);
    }).catch(function (error) {
        console.log(error);
    });
});

function generateGraph(urls) {
    const graph = new Graph();
    return new Promise(function (resolve, reject) {
        Promise.all(
            urls.map(function (url) {
                return new Promise(function (resolve, reject) {
                    if (!graph.hasNode(url)) {
                        graph.addNode(url);
                    }
                    const domain = getDomain(url);
                    if (domain) {
                        getHTML(url).then(function (html) {
                            getLinks(html, domain).forEach(function (link) {
                                if (!graph.hasNode(link)) {
                                    graph.addNode(link);
                                }
                                if (!graph.hasEdge(url, link)) {
                                    const key = url + '->' + link;
                                    graph.addEdgeWithKey(key, url, link);
                                }
                            });
                            resolve();
                        }).catch(function (error) {
                            reject(error);
                        });
                    } else {
                        reject('could not extract domain for ' + url);
                    }
                });
            })
        ).then(function () {
            resolve(graph);
        }).catch(function (error) {
            reject(error);
        });
    });
}

function getDomain(url) {
    const result = url.match(/http(s)?:\/\/.*?.(?=(\/|\?|#|$))/);
    return result ? result[0] : null;
}

function getHTML(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                return resolve(body);
            } else {
                return reject(error);
            }
        });
    });
}

function getLinks(html, domain) {
    return html.match(/<a.*?>/g).map(function (link) {
        // chop off beginning junk
        link = link.replace(/.*href=('|")/, '');
        // chop off ending junk
        link = link.replace(/('|").*/g, '');
        // add domain if necessary
        return /http.*/.test(link) ? link : domain + link;
    });
}

module.exports = router;
