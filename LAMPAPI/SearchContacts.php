<<?php

        $inData = getRequestInfo();
        // ini_set('log_errors', TRUE);
        // ini_set('display_errors', TRUE);

        $searchResults = "";
        $searchCount = 0;

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
        if ($conn->connect_error)
        {
                returnWithError( $conn->connect_error );
        }
        else
        {
                $stmt = $conn->prepare("select * from Contacts where (FirstName like ? OR LastName like ? OR ID like ?) and UserID=?");
                $contactName = "%" . $inData["search"] . "%";
                $stmt->bind_param("ssss", $contactName, $contactName, $contactName, $inData["userId"]);
                $stmt->execute();

                $result = $stmt->get_result();

                while($row = $result->fetch_assoc())
                {
                        if( $searchCount > 0 )
                        {
                                $searchResults .= ",";
                        }
                        $searchCount++;

                        $searchResults .= '{"firstName" : "' . $row["FirstName"].'", "lastName" : "' . $row["LastName"].'", "email" : "' . $row["Email"].'", "phoneNumber" : "' . $row["Phone"].'", "address" : "' . $row["Address"].'", "city" : "' . $row["City"].'", "state" : "' . $row["State"].'", "userId" : "' . $row["UserID"].'", "id" : "' . $row["ID"].'"}';
                }

                if( $searchCount == 0 )
                {
                        returnWithError( "No Records Found" );
                }
                else
                {
                        returnWithInfo( $searchResults );
                }

                $stmt->close();
                $conn->close();
        }

        function getRequestInfo()
        {
                return json_decode(file_get_contents('php://input'), true);
        }

        function sendResultInfoAsJson( $obj )
        {
                header('Content-type: application/json');
                echo $obj;
        }

        function returnWithError( $err )
        {
                $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
                sendResultInfoAsJson( $retValue );
        }

        function returnWithInfo( $searchResults )
        {
                $retValue = '{ "contacts": [' . $searchResults . '] }';
                sendResultInfoAsJson( $retValue );
        }

?>
