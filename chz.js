// MetaMask setup
let provider;
let signer;
const auctionAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // Podaj właściwy adres kontraktu

async function init() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("Provider initialized");
    } else {
        alert("Proszę zainstalować MetaMask!");
    }
}

async function requestAccount() {
    if (typeof window.ethereum === 'undefined') {
        alert("Proszę zainstalować MetaMask!");
        return;
    }

    // Połączenie z MetaMask
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        signer = provider.getSigner();  // Ustaw signer po połączeniu
        console.log("Account connected:", accounts[0]);
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
    }
}

// Funkcje bid, withdraw i endAuction muszą być poprawnie zdefiniowane
async function placeBid() {
    console.log("placeBid function called");
    if (!signer) {
        console.error("Signer is not initialized. Please connect to MetaMask.");
        return;
    }
    
    if (!ethers.utils.isAddress(auctionAddress)) {
        console.error("Invalid auction address.");
        alert("Nieprawidłowy adres aukcji.");
        return;
    }

    try {
        const auctionContract = new ethers.Contract(auctionAddress, auctionABI, signer);
        const tx = await auctionContract.bid({ value: ethers.utils.parseEther("1.0") });
        await tx.wait();
        console.log("Bid placed!");
    } catch (error) {
        console.error("Error placing bid:", error);
        alert("Wystąpił błąd podczas składania oferty: " + error.message);
    }
}

// Definicje withdrawFunds i endAuction (przykładowe)
async function withdrawFunds() {
    console.log("withdrawFunds function called");
    if (!signer) {
        console.error("Signer is not initialized. Please connect to MetaMask.");
        return;
    }

    try {
        const auctionContract = new ethers.Contract(auctionAddress, auctionABI, signer);
        const tx = await auctionContract.withdrawFunds();
        await tx.wait();
        console.log("Funds withdrawn!");
    } catch (error) {
        console.error("Error withdrawing funds:", error);
        alert("Wystąpił błąd podczas wypłaty środków: " + error.message);
    }
}

async function endAuction() {
    console.log("endAuction function called");
    if (!signer) {
        console.error("Signer is not initialized. Please connect to MetaMask.");
        return;
    }

    try {
        const auctionContract = new ethers.Contract(auctionAddress, auctionABI, signer);
        const tx = await auctionContract.endAuction();
        await tx.wait();
        console.log("Auction ended!");
    } catch (error) {
        console.error("Error ending auction:", error);
        alert("Wystąpił błąd podczas zakończenia aukcji: " + error.message);
    }
}

// Wywołaj init() przy załadowaniu strony
window.onload = init;
