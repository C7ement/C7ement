function newTd(content) {
    let td = document.createElement('td');
    td.appendChild(document.createTextNode(content));
    return td;
}
function newTr(content) {
    let td, tr;
    td = document.createElement('td');
    tr = document.createElement('tr');
    td.appendChild(document.createTextNode(content));
    tr.appendChild(td);
    return tr;
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

function displayTransaction(tran,div) {
    let date, i, table, tbody, thead;

    table = document.createElement('table');
    thead = document.createElement('thead');
    tbody = document.createElement('tbody');
    table.className = "table mt-4 col-10 text-center";
    thead.className = "bg-dark text-light";

    date = new Date(tran.received);

    thead.appendChild(newTr(tran.hash));
    tbody.appendChild(newTr("inputs"));
    for (i=0; i<tran.inputs.length; i++) {
        tbody.appendChild(newTr(tran.inputs[i].addresses[0]));
    }
    tbody.appendChild(newTr("outputs"));
    for (i=0; i<tran.outputs.length; i++) {
        tbody.appendChild(newTr(tran.outputs[i].addresses[0]));
    }
    tbody.appendChild(newTr(tran.block_height));
    tbody.appendChild(newTr((tran.total/100000000).toLocaleString(undefined, {maximumFractionDigits: 0})+" BTC"));
    tbody.appendChild(newTr((tran.fees/100000000).toLocaleString()+" BTC"));
    tbody.appendChild(newTr(date.toLocaleDateString()));
    tbody.appendChild(newTr(date.toLocaleTimeString()));
    tbody.appendChild(newTr(tran.confirmations));

    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById(div).appendChild(table);
}


function displayAndGetNext(block) {
    displayBlock(block,'tab1');
    return $.get(block.prev_block_url);
}

function displayIntab2(block) {
    displayBlock(block,'tab2');
}

function displayInTran1(tran) {
    displayTransaction(tran,'tran1');
}


function latestBlocks() {/*

    displayBlockHead('tab1');

    $.get("https://api.blockcypher.com/v1/btc/main?token=abd583bddb494903be6472d67069f5af").then(function(chain) {
        return $.get(chain.latest_url);
    }).then(displayAndGetNext).then(displayAndGetNext).then(displayAndGetNext);*/
}

function searchBlock() {
    let trTab = document.getElementById('tab2').getElementsByTagName('tr');
    if (!trTab.length) {
        displayBlockHead('tab2');
    }
    var x = document.getElementById("blockHeight");
    $.get("https://api.blockcypher.com/v1/btc/main/blocks/"+x.value+"?txstart=1&limit=1&token=abd583bddb494903be6472d67069f5af").then(displayIntab2);
    /*scrollto*/
}

function searchTransaction() {
    var x = document.getElementById("transactionHash");
    $.get("https://api.blockcypher.com/v1/btc/main/txs/"+x.value).then(displayInTran1);
    /*scrollto*/
}