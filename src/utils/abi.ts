export const karyatipABI = [
{
				"inputs": [
					{
						"internalType": "address",
						"name": "_tokenAddress",
						"type": "address"
					}
				],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "author",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "bio",
						"type": "string"
					}
				],
				"name": "AuthorRegistered",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "author",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "newBio",
						"type": "string"
					}
				],
				"name": "BioUpdated",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "TipSent",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "author",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "workId",
						"type": "uint256"
					}
				],
				"name": "WorkDeleted",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "author",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "workId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "content",
						"type": "string"
					}
				],
				"name": "WorkSubmitted",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "author",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "workId",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "newTitle",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "newContent",
						"type": "string"
					}
				],
				"name": "WorkUpdated",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "authors",
				"outputs": [
					{
						"internalType": "address",
						"name": "authorAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bio",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalTips",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "registered",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "workId",
						"type": "uint256"
					}
				],
				"name": "deleteWork",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getAllAuthorsBasicInfo",
				"outputs": [
					{
						"internalType": "address[]",
						"name": "addresses",
						"type": "address[]"
					},
					{
						"internalType": "string[]",
						"name": "names",
						"type": "string[]"
					},
					{
						"internalType": "string[]",
						"name": "bios",
						"type": "string[]"
					},
					{
						"internalType": "uint256[]",
						"name": "totalTips",
						"type": "uint256[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getAllAuthorsWorks",
				"outputs": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "content",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "totalTips",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "author",
								"type": "address"
							}
						],
						"internalType": "struct KaryaTip.Work[]",
						"name": "works",
						"type": "tuple[]"
					},
					{
						"internalType": "address[]",
						"name": "owners",
						"type": "address[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getAllWorks",
				"outputs": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "content",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "totalTips",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "author",
								"type": "address"
							}
						],
						"internalType": "struct KaryaTip.Work[]",
						"name": "",
						"type": "tuple[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_author",
						"type": "address"
					}
				],
				"name": "getAuthor",
				"outputs": [
					{
						"internalType": "address",
						"name": "authorAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bio",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalTips",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "content",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "totalTips",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "author",
								"type": "address"
							}
						],
						"internalType": "struct KaryaTip.Work[]",
						"name": "works",
						"type": "tuple[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getAuthorAddresses",
				"outputs": [
					{
						"internalType": "address[]",
						"name": "",
						"type": "address[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_author",
						"type": "address"
					}
				],
				"name": "getWorksByAuthor",
				"outputs": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "content",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "totalTips",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "author",
								"type": "address"
							}
						],
						"internalType": "struct KaryaTip.Work[]",
						"name": "",
						"type": "tuple[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_author",
						"type": "address"
					}
				],
				"name": "rankWorks",
				"outputs": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "content",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "totalTips",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "author",
								"type": "address"
							}
						],
						"internalType": "struct KaryaTip.Work[]",
						"name": "",
						"type": "tuple[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_bio",
						"type": "string"
					}
				],
				"name": "registerAuthor",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "_title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_content",
						"type": "string"
					}
				],
				"name": "submitWork",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_author",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_amount",
						"type": "uint256"
					}
				],
				"name": "tipAuthor",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_author",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "workIndex",
						"type": "uint256"
					}
				],
				"name": "tipAuthorWork",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "tipToken",
				"outputs": [
					{
						"internalType": "contract IERC20",
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
						"name": "_newBio",
						"type": "string"
					}
				],
				"name": "updateBio",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "workId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "newTitle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "newContent",
						"type": "string"
					}
				],
				"name": "updateWork",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
] as const;

export const verifierABI = [
{
				"inputs": [],
				"name": "ProofLengthWrong",
				"type": "error"
			},
			{
				"inputs": [],
				"name": "PublicInputsLengthWrong",
				"type": "error"
			},
			{
				"inputs": [],
				"name": "ShpleminiFailed",
				"type": "error"
			},
			{
				"inputs": [],
				"name": "SumcheckFailed",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "bytes",
						"name": "proof",
						"type": "bytes"
					},
					{
						"internalType": "bytes32[]",
						"name": "publicInputs",
						"type": "bytes32[]"
					}
				],
				"name": "verify",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
] as const;