<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use SignInApp\Authenticate\Authenticate;
use Psr\Container\ContainerInterface;

/**
 * To decide whether React app URL is from deployed app or local server (set is prod to true for deployed version)
 *
 * @return string- the URL needed
 */
function getBaseUrl() {
    $isProd = false;

    if($isProd) {
        return '{addProductionApiUrlHere}';
    } else {
        return 'http://localhost:3000';
    }
}

return function (App $app) {
    $app->options('/{routes:.+}', function (Request $request, Response $response, $args) {
        return $response;
    });

    $app->add(function ($req, $res, $next) {
        $url = getBaseUrl();
        $response = $next($req, $res);
        return $response
            ->withHeader('Access-Control-Allow-Origin', $url)
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });

    //Api Routes
    $app->post('/api/visitorSignIn', 'AddVisitorController');
    $app->put('/api/visitorSignOut', 'SignOutVisitorController');
    $app->put('/api/signOutVisitors','SignOutVisitorsController')->add('Authenticate');
    $app->get('/api/admin', 'GetAllSignedInVisitorsController')->add('Authenticate');
    $app->get('/api/signedOutVisitors', 'GetAllSignedOutVisitorsController')->add('Authenticate');
    $app->get('/api/signedOutVisitorsByBatch', 'GetBatchOfSignedOutVisitorsController')->add('Authenticate');

    //Route to acquire authenticated active token
    $app->post('/adminLogin', 'LoginController');


    // Catch-all route to serve a 404 Not Found page if none of the routes match
    // NOTE: make sure this route is defined last
    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
        $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
        return $handler($req, $res);
    });
};
