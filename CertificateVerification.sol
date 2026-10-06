// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AcademicCertificate {

    // =====================================================
    // CERTIFICATE STRUCTURE
    // =====================================================

    struct Certificate {
        bool exists;
        bool revoked;
        string studentName;
        string course;
        string institution;
        uint256 issueDate;
    }


    // =====================================================
    // STATE VARIABLES
    // =====================================================

    address public owner;

    mapping(string => Certificate) private certificates;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor() {
        owner = msg.sender;
    }


    // =====================================================
    // ONLY OWNER MODIFIER
    // =====================================================

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only contract owner can perform this operation"
        );

        _;
    }


    // =====================================================
    // ISSUE CERTIFICATE
    // =====================================================

    function issueCertificate(
        string memory id,
        string memory name,
        string memory course,
        string memory institution
    )
        public
        onlyOwner
    {

        require(
            bytes(id).length > 0,
            "Certificate ID cannot be empty"
        );

        require(
            bytes(name).length > 0,
            "Student name cannot be empty"
        );

        require(
            bytes(course).length > 0,
            "Course cannot be empty"
        );

        require(
            bytes(institution).length > 0,
            "Institution cannot be empty"
        );

        require(
            !certificates[id].exists,
            "Certificate already exists"
        );


        certificates[id] = Certificate({

            exists: true,

            revoked: false,

            studentName: name,

            course: course,

            institution: institution,

            issueDate: block.timestamp

        });

    }


    // =====================================================
    // VERIFY / FETCH CERTIFICATE
    // =====================================================

    function verifyCertificate(
        string memory id
    )
        public
        view
        returns (
            bool,
            bool,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {

        Certificate memory certificate =
            certificates[id];


        if (!certificate.exists) {

            return (
                false,
                false,
                "",
                "",
                "",
                0
            );

        }


        return (

            certificate.exists,

            certificate.revoked,

            certificate.studentName,

            certificate.course,

            certificate.institution,

            certificate.issueDate

        );

    }


    // =====================================================
    // REVOKE CERTIFICATE
    // =====================================================

    function revokeCertificate(
        string memory id
    )
        public
        onlyOwner
    {

        require(
            certificates[id].exists,
            "Certificate does not exist"
        );

        require(
            !certificates[id].revoked,
            "Certificate already revoked"
        );


        certificates[id].revoked = true;

    }

}