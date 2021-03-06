<?php

namespace SignInApp\Controllers;

use SignInApp\Models\VisitorModel;
use SignInApp\Entities\ValidationEntity;
use \DateTime;
use Slim\Http\Request;
use Slim\Http\Response;

class SignOutVisitorController extends ValidationEntity
{
    private $visitorModel;

    /**
     *  Constructor assigns VisitorModel to this object
     *  SignOutVisitorController constructor.
     *
     * @param VisitorModel $visitorModel
     */
    public function __construct(VisitorModel $visitorModel)
    {
        $this->visitorModel = $visitorModel;
    }

    /**
     * On invoke check input for Name or ID value, if data there, call appropriate methods from VisitorModel
     * (signOutById or signOutByName) and respond as whether that was successful or not
     *
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function __invoke(Request $request, Response $response, array $args)
    {
        $requestData = $request->getParsedBody();
        $name = self::sanitiseString($requestData['Name']);
        $sanitisedName = self::validateLength($name, 255);
        $company = self::sanitiseString($requestData['Company']);
        $sanitisedCompany = self::validateLength($company, 255);
        $now = new DateTime('Europe/London');
        $timeOfSignOut = $now->format('H:i:s');
        $id = $requestData['id'];

        $responseData = [
            'Success' => false,
            'Message' => 'Unable to connect to server',
            'Data' => []
        ];
        $statusCode = 500;

        if (isset($id) && count($requestData) > 1) {
            $responseData = [
                'Success' => false,
                'Message' => 'Too many parameters'
            ];
            $statusCode = 400;

            return $response->withJson($responseData, $statusCode);
        }

        if (isset($id) == true) {
            if (!self::checkDigitInput($requestData['id'])) {
                $responseData = [
                    'Success' => false,
                    'Message' => 'This is not a valid ID'
                ];
                $statusCode = 400;

                return $response->withJson($responseData, $statusCode);
            }

            $signOutData = $this->visitorModel->signOutVisitorById($id, $timeOfSignOut);
            if ($signOutData) {
                $responseData = [
                    'Success' => true,
                    'Message' => 'Visitor successfully signed out'
                ];
                $statusCode = 200;
            }
            return $response->withJson($responseData, $statusCode);

        }

        if (strlen($name) > 0) {
            if (strlen($sanitisedCompany) > 0) {
                $signOutData = $this->visitorModel->getSignedInVisitorsByNameAndCompany($sanitisedName, $sanitisedCompany);
            } else {
                $signOutData = $this->visitorModel->getSignedInVisitorsByName($sanitisedName);
            }

            if (count($signOutData) == 0) {
                $responseData = [
                    'Success' => false,
                    'Message' => 'No visitor found'
                ];
                $statusCode = 404;
            }

            if (count($signOutData) == 1) {
                $resultOfSignOut = $this->visitorModel->signOutVisitorById($signOutData[0]['id'], $timeOfSignOut);

                if ($resultOfSignOut == true) {
                    $responseData = [
                        'Success' => true,
                        'Message' => 'Visitor successfully signed out'
                    ];
                    $statusCode = 200;
                }

            } elseif (count($signOutData) > 1) {
            $responseData = [
                'Success' => false,
                'Message' => 'Multiple matches found',
                'Data' => $signOutData
            ];
                $statusCode = 422;
            }

        } else {
            $responseData = [
                'Success' => false,
                'Message' => 'Name or ID is required'
                ];
            $statusCode = 400;
        }
        return $response->withJson($responseData, $statusCode);

    }
}
