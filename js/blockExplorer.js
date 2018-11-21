function newTd(content) {
    let td = document.createElement('td');
    td.appendChild(document.createTextNode(content));
    return td;
}

function displayBlockHead(tab) {
    let tr, thead;
    thead = document.getElementById(tab).children[0];
    tr = document.createElement('tr');
    tr.appendChild(newTd('Height'));
    tr.appendChild(newTd('Date'));
    tr.appendChild(newTd('Time'));
    tr.appendChild(newTd('Transactions'));
    tr.appendChild(newTd('Total sent'));
    tr.appendChild(newTd('Total fees'));
    thead.appendChild(tr);
}

function displayBlock(block,tab) {
    let tbody, tr, date;
    date = new Date(block.received_time);
    tbody = document.getElementById(tab).children[1];
    tr = document.createElement('tr');
    tr.appendChild(newTd(block.height));
    tr.appendChild(newTd(date.toLocaleDateString()));
    tr.appendChild(newTd(date.toLocaleTimeString()));
    tr.appendChild(newTd(block.n_tx.toLocaleString()));
    tr.appendChild(newTd((block.total/100000000).toLocaleString(undefined, {maximumFractionDigits: 0})+" BTC"));
    tr.appendChild(newTd((block.fees/100000000).toLocaleString()+" BTC"));
    tbody.appendChild(tr);
}

function displayTransactionHead(tab) {
    let tr;
    tr = document.createElement('tr');
    tr.appendChild(newTd('Hash'));
    tr.appendChild(newTd('Block height'));
    tr.appendChild(newTd('Adresses'));
    tr.appendChild(newTd('Total sent'));
    tr.appendChild(newTd('Total fees'));
    tr.appendChild(newTd('Date'));
    tr.appendChild(newTd('Time'));
    tr.appendChild(newTd('Confirmations'));
    document.getElementById(tab).children[0].appendChild(tr);
}

function displayTransaction(tran,tab) {
    let tr, date, addressTab, address, i, td;

    date = new Date(tran.received);
    addressTab = (tran.addresses+'').split(',');
    address = "";
    for (i=0; i<addressTab.length; i++) {
        address += addressTab[i]+' ';
    }
    tr = document.createElement('tr');
    tr.appendChild(newTd(tran.hash.substring(0,32)+" "+tran.hash.substring(32,64)));
    tr.appendChild(newTd(tran.block_height));
    tr.appendChild(newTd(address));
    tr.appendChild(newTd((tran.total/100000000).toLocaleString(undefined, {maximumFractionDigits: 0})+" BTC"));
    tr.appendChild(newTd((tran.fees/100000000).toLocaleString()+" BTC"));
    tr.appendChild(newTd(date.toLocaleDateString()));
    tr.appendChild(newTd(date.toLocaleTimeString()));
    tr.appendChild(newTd(tran.confirmations));

    document.getElementById(tab).children[1].appendChild(tr);
}


function displayAndGetNext(block) {
    displayBlock(block,'tab1');
    return $.get(block.prev_block_url);
}

function displayIntab2(block) {
    displayBlock(block,'tab2');
}

function displayIntab3(tran) {
    displayTransaction(tran,'tab3');
}


function latestBlocks() {

    displayBlockHead('tab1');

        $.get("https://api.blockcypher.com/v1/btc/main").then(function(chain) {
            return $.get(chain.latest_url);
        }).then(displayAndGetNext).then(displayAndGetNext).then(displayAndGetNext);
}

function searchBlock() {
    let trTab = document.getElementById('tab2').getElementsByTagName('tr');
    if (!trTab.length) {
        displayBlockHead('tab2');
    }
    var x = document.getElementById("blockHeight");
    $.get("https://api.blockcypher.com/v1/btc/main/blocks/"+x.value+"?txstart=1&limit=1").then(displayIntab2);
    /*scrollto*/
}

function searchTransaction() {
    let trTab = document.getElementById('tab3').getElementsByTagName('tr');
    if (!trTab.length) {
        displayTransactionHead('tab3');
    }
    var x = document.getElementById("transactionHash");
    $.get("https://api.blockcypher.com/v1/btc/main/txs/"+x.value).then(displayIntab3);
    /*scrollto*/
}