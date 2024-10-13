const { ethers } = require("ethers");

let provider, signer;

async function requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
    } else {
        alert("Please install MetaMask!");
    }
}

const auctionAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // Podaj właściwy adres kontraktu
const auctionABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "winner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timeLeft",
                "type": "uint256"
            }
        ],
        "name": "AuctionEnded",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "bid",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "bidder",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "NewBid",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "auctionActive",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "auctionDuration",
        "outputs": [
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
        "inputs": [],
        "name": "auctionEndTime",
        "outputs": [
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
        "inputs": [],
        "name": "BID_AMOUNT",
        "outputs": [
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
        "inputs": [],
        "name": "currentBid",
        "outputs": [
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
        "inputs": [],
        "name": "getTimeLeft",
        "outputs": [
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
        "inputs": [],
        "name": "highestBidder",
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
        "inputs": [],
        "name": "REWARD_AMOUNT",
        "outputs": [
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
        "inputs": [],
        "name": "totalBids",
        "outputs": [
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
        "inputs": [],
        "name": "totalCollected",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

async function init() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        console.log("Provider and signer initialized");
    } else {
        alert("Proszę zainstalować Metamask!");
    }
}

async function requestAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log("Account connected:", accounts[0]);
}

async function placeBid() {
    console.log("placeBid function called");
    if (!signer) return;

    try {
        const auctionContract = new ethers.Contract(auctionAddress, auctionABI, signer);
        const tx = await auctionContract.bid({ value: ethers.utils.parseEther("1.0") });
        await tx.wait();
        console.log("Bid placed!");
    } catch (error) {
        console.error("Error placing bid:", error);
    }
}

async function withdrawFunds() {
    console.log("withdrawFunds function called");
    if (!signer) return;

    try {
        const auctionContract = new ethers.Contract(auctionAddress, auctionABI, signer);
        const tx = await auctionContract.withdrawFunds();
        await tx.wait();
        console.log("Funds withdrawn!");
    } catch (error) {
        console.error("Error withdrawing funds:", error);
    }
}

async function endAuction() {
    console.log("endAuction function called");
    if (!signer) return;

    try {
        const auctionContract = new ethers.Contract(auctionAddress, auctionABI, signer);
        const tx = await auctionContract.endAuction();
        await tx.wait();
        console.log("Auction ended!");
    } catch (error) {
        console.error("Error ending auction:", error);
    }
}

// Wywołaj init() przy załadowaniu strony
window.onload = init;
