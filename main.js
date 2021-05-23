const web3 = new Web3("https://ropsten.infura.io/v3/"+INFURA_API_KEY)

var address;
var privateKey;

function createNewWallet(){

    newWallet = web3.eth.accounts.create();
    address = newWallet.address;
    privateKey = newWallet.privateKey;
    saveWallet();
    updateKeys();
}

function updateKeys(){
    addr = document.getElementById('addr');
    private = document.getElementById('private');
    addr.innerHTML = address;
    private.innerHTML = privateKey;
}

function updateBalance(){
    web3.eth.getBalance(address, (err, wei) => {
        balance = web3.utils.fromWei(wei, 'ether')
        balanceDiv = document.getElementById('balance');
        balanceDiv.innerHTML = balance;
    })
}

function saveWallet(){
    Cookies.set('address', address);
    Cookies.set('privateKey', privateKeyImport);
}

function loadWallet(){
    address = Cookies.get('address');
    privateKey = Cookies.get('privateKey');
}

function importWallet(){
    privateKeyImport = document.getElementById("privateKeyImport");
    privateKeyImport = privateKeyImport.value;
    importedWallet = web3.eth.accounts.privateKeyToAccount(privateKeyImport, true);
    address = importedWallet.address;
    privateKey = importedWallet.privateKey;
    saveWallet();
    updateKeys();
    updateBalance();
}

if(Cookies.get('address') == undefined){
    console.log("Wallet not found. Creating.");
    createNewWallet();
    updateBalance();
} else {
    console.log("Loading existing wallet.");
    loadWallet();
    updateKeys();
    updateBalance();
}