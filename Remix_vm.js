(async () => {

    // ==========================================
    // YOUR DEPLOYED CONTRACT ADDRESS
    // ==========================================

    const CONTRACT_ADDRESS = "PASTE_YOUR_CONTRACT_ADDRESS_HERE";


    // ==========================================
    // CONTRACT ABI
    // ==========================================

    const ABI = [
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },

        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "id",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "course",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "institution",
                    "type": "string"
                }
            ],
            "name": "issueCertificate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },

        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "id",
                    "type": "string"
                }
            ],
            "name": "verifyCertificate",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },

        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "id",
                    "type": "string"
                }
            ],
            "name": "revokeCertificate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];


    // ==========================================
    // CHECK ADDRESS
    // ==========================================

    if (CONTRACT_ADDRESS === "PASTE_YOUR_CONTRACT_ADDRESS_HERE") {

        console.log("ERROR");
        console.log("Please enter your deployed contract address.");
        return;
    }


    // ==========================================
    // GET REMIX VM ACCOUNT
    // ==========================================

    const accounts = await web3.eth.getAccounts();

    const account = accounts[0];

    console.log("Connected Remix VM account:");
    console.log(account);


    // ==========================================
    // CONNECT TO CONTRACT
    // ==========================================

    const contract = new web3.eth.Contract(
        ABI,
        CONTRACT_ADDRESS
    );

    console.log("Contract connected:");
    console.log(CONTRACT_ADDRESS);


    // ==========================================
    // GET CONTRACT OWNER
    // ==========================================

    const owner = await contract.methods
        .owner()
        .call();

    console.log("Contract owner:");
    console.log(owner);


    // ==========================================
    // CHECK OWNER
    // ==========================================

    if (owner.toLowerCase() !== account.toLowerCase()) {

        console.log("");
        console.log("WARNING:");
        console.log("The current Remix VM account is not");
        console.log("the owner of this contract.");

        console.log("");
        console.log("Current account:");
        console.log(account);

        console.log("");
        console.log("Contract owner:");
        console.log(owner);

        return;
    }


    console.log("");
    console.log("=================================");
    console.log("Remix VM connection successful!");
    console.log("=================================");


    // ==========================================
    // ISSUE CERTIFICATE FUNCTION
    // ==========================================

    async function issueCertificate(
        id,
        name,
        course,
        institution
    ) {

        console.log("");
        console.log("Issuing certificate...");

        const result = await contract.methods
            .issueCertificate(
                id,
                name,
                course,
                institution
            )
            .send({
                from: account
            });

        console.log("");
        console.log("Certificate issued successfully!");

        console.log("Certificate ID:");
        console.log(id);

        console.log("Transaction hash:");
        console.log(result.transactionHash);
    }


    // ==========================================
    // VERIFY CERTIFICATE FUNCTION
    // ==========================================

    async function verifyCertificate(id) {

        console.log("");
        console.log("Verifying certificate...");

        const result = await contract.methods
            .verifyCertificate(id)
            .call();

        console.log("");
        console.log("=================================");
        console.log("CERTIFICATE DETAILS");
        console.log("=================================");

        console.log("Certificate ID:");
        console.log(id);

        console.log("Exists:");
        console.log(result[0]);

        console.log("Revoked:");
        console.log(result[1]);

        console.log("Student Name:");
        console.log(result[2]);

        console.log("Course:");
        console.log(result[3]);

        console.log("Institution:");
        console.log(result[4]);

        console.log("Issue Date:");
        console.log(result[5]);

        console.log("=================================");

        return result;
    }


    // ==========================================
    // REVOKE CERTIFICATE FUNCTION
    // ==========================================

    async function revokeCertificate(id) {

        console.log("");
        console.log("Revoking certificate...");

        const result = await contract.methods
            .revokeCertificate(id)
            .send({
                from: account
            });

        console.log("");
        console.log("Certificate revoked successfully!");

        console.log("Certificate ID:");
        console.log(id);

        console.log("Transaction hash:");
        console.log(result.transactionHash);
    }


    // ==========================================
    // MAKE FUNCTIONS AVAILABLE
    // ==========================================

    globalThis.issueCertificate = issueCertificate;

    globalThis.verifyCertificate = verifyCertificate;

    globalThis.revokeCertificate = revokeCertificate;


    // ==========================================
    // FINAL MESSAGE
    // ==========================================

    console.log("");
    console.log("Available commands:");
    console.log("");
    console.log(
        'issueCertificate("CERT001", "Soham Bhishma", "B.Tech Computer Science", "Your College")'
    );

    console.log("");
    console.log(
        'verifyCertificate("CERT001")'
    );

    console.log("");
    console.log(
        'revokeCertificate("CERT001")'
    );

})();