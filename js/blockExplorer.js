
/*function newTd(content) {
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
}*/
function displayBlockHead(divB) {
    let div, html;
    div = document.getElementById(divB);

    html = "<div class='row justify-content-center mt-4 mb-5'>"+
        "<table class='table tabTran table-bordered text-center w-auto col-auto my-auto'>"+
        "<tr class='bgG'>"+
        "<td class='align-middle'>Height</td>"+
        "<td class='align-middle'>Date</td>"+
        "<td class='align-middle'>Time</td>"+
        "<td class='align-middle'>Transactions</td>"+
        "<td class='align-middle'>Total sent</td>"+
        "<td class='align-middle'>Total fees</td>"+
        "</tr>"+
        "</table>"+
        "</div>";
    div.innerHTML = html;
}

function displayBlock(block,divB) {

    let table, html, date;
    date = new Date(block.received_time);
    table = document.getElementById(divB).children[0].children[0];

    html = "<tr>"+
        "<td class='align-middle'><a href='./block.html?block="+block.height+"'>"+block.height+"</a></td>"+
        "<td class='align-middle'>"+date.toLocaleDateString()+"</td>"+
        "<td class='align-middle'>"+date.toLocaleTimeString()+"</td>"+
        "<td class='align-middle'>"+block.n_tx.toLocaleString()+"</td>"+
        "<td class='align-middle'>"+(block.total/100000000).toLocaleString(undefined, {maximumFractionDigits: 0})+"<a class='smCaps'> btc</a></td>"+
        "<td class='align-middle'>"+(block.fees/100000000).toLocaleString(undefined, {maximumSignificantDigits: 3})+"<a class='smCaps'> btc</a></td>"+
        "</tr>";
    table.innerHTML += html;
}

function displayTransaction(tran,divT) {

    let date, i, div, html;
    let somme = parseInt(tran.vin_sz)+parseInt(tran.vout_sz)+2;
    div = document.getElementById(divT);

    date = new Date(tran.received);

    html = "<div class='row justify-content-center mt-4 mb-5'>"+
        "<table class='table tabTran table-bordered text-center w-auto col-auto my-auto'>"+
        "<tr><td class='align-middle' colspan='3'><b>"+tran.hash+"</b></td></tr>"+
        "<tr>"+
        "<td class='align-middle' rowspan='"+somme.toString()+"'>"+
        "<p class='mt-3 mb-1'>"+date.toLocaleDateString()+"</p>"+
        "<p class='mt-1 mb-3'>"+date.toLocaleTimeString()+"</p>"+
        "<p class='mt-3 mb-1'>"+(tran.total/100000000).toLocaleString(undefined, {maximumSignificantDigits: 3})+" <a class='smCaps'>btc</a> sent</p>"+
        "<p class='mt-1 mb-3'>Fees "+(tran.fees/100000000).toLocaleString(undefined, {maximumSignificantDigits: 3})+" <a class='smCaps'>btc</a></p>"+
        "<p class='mt-3 mb-1'><a href='./block.html?block="+tran.block_height+"'>Block "+tran.block_height+"</a></p>"+
        "<p class='mt-1 mb-3'>"+tran.confirmations+" confirmations</p></td>"+
        "<td class='align-middle bgG' colspan='2'>Inputs</td>"+
        "</tr>";
    for (i=0; i<tran.inputs.length; i++) {
        html += "<tr>"+
            "<td class='align-middle'><a href='./address.html?address="+tran.inputs[i].addresses[0]+"'>"+tran.inputs[i].addresses[0]+"</a></td>"+
            "<td class='align-middle'>"+
            (tran.inputs[i].output_value/100000000).toLocaleString(undefined,{maximumSignificantDigits: 3})+" <a class='smCaps'>btc</a></td>"+
            "</tr>";
    }

    html += "<tr><td class='align-middle bgG' colspan='2'>Outputs</td></tr>";

    for (i=0; i<tran.outputs.length; i++) {
        html += "<tr>"+
            "<td class='align-middle'><a href='./address.html?address="+tran.outputs[i].addresses[0]+"'>"+tran.outputs[i].addresses[0]+"</a></td>"+
            "<td class='align-middle'>"+
            (tran.outputs[i].value/100000000).toLocaleString(undefined, {maximumSignificantDigits: 3})+" <a class='smCaps'>btc</a></td>"+
            "</tr>";
    }
    html += "</table>";
    html += "</div>";
    div.innerHTML += html;
}

function displayAddress(addr,divT) {

    let i, div, html;
    div = document.getElementById(divT);


    html = "<div class='row justify-content-center mt-4 mb-5'>"+
        "<table class='table tabTran table-bordered text-center w-auto col-auto my-auto'>"+
        "<tr><td class='align-middle bgG' colspan='4'><b>"+addr.address+"</b></td></tr>"+
        "<tr>"+
        "<td class='align-middle'>Received<br>"+(addr.total_received/100000000).toLocaleString(undefined, {maximumSignificantDigits: 3})+"<a class='smCaps'> btc</a></td>"+
        "<td class='align-middle'>Sent<br>"+(addr.total_sent/100000000).toLocaleString(undefined, {maximumSignificantDigits: 3})+"<a class='smCaps'> btc</a></td>"+
        "<td class='align-middle'>Balance<br>"+(addr.balance/100000000).toLocaleString(undefined, {maximumSignificantDigits: 3})+"<a class='smCaps'> btc</a></td>"+
        "<td class='align-middle'>Transactions<br>"+addr.n_tx+"</td>"+
        "</tr>";
    html += "</table>";
    html += "</div>";
    div.innerHTML = html;

    new QRCode(document.getElementById("qrcode"), {
        text: addr.address,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    for (i=0; i<addr.n_tx; i++) {
        displayTransactionInAddressPage(addr.txrefs[i],'transactionElement');
    }
}

function displayTransactionInAddressPage(tran,divT) {

    let date, div, html, inOut;
    div = document.getElementById(divT);

    date = new Date(tran.confirmed);

    if(parseInt(tran.tx_input_n)<0) {
        inOut = 'received';
    } else {
        inOut = 'sent';
    }

    html = "<div class='row justify-content-center mt-4 mb-5'>"+
        "<table class='table tabTran table-bordered text-center w-auto col-auto my-auto'>"+
        "<tr><td colspan='3'><a href='./transaction.html?transaction="+tran.tx_hash+"'><b>"+tran.tx_hash+"</b></a></td></tr>"+
        "<tr>"+
        "<td>"+date.toLocaleDateString()+
        "<br>"+date.toLocaleTimeString()+"</td>"+
        "<td>"+(tran.value/100000000).toLocaleString(undefined, {maximumSignificantDigits: 3})+" <a class='smCaps'>btc</a><br>"+inOut+"</td>"+
        "<td><a href='./block.html?block="+tran.block_height+"'>Block "+tran.block_height+"</a><br>"+tran.confirmations+" confirmations</td>"+
        "</tr></table></div>";
    div.innerHTML += html;
}

function displayAndGetNext(block) {
    displayBlock(block,'blockElement1');
    return $.get(block.prev_block_url);
}

function displayInTran1(tran) {
    displayTransaction(tran,'tran1');
}

function displayAddressInToto(address) {
    displayAddress(address,'address1');
}

function displayAddressPage(address) {
    displayAddress(address,'addressElement');
}

function displayTransactionPage(transaction) {
    displayTransaction(transaction,'transactionElement');
}

function displayBlockPage(block) {
    displayBlock(block,'blockElement');
    $.get('https://api.blockcypher.com/v1/btc/main/blocks/'+block.hash+'?limit=500').then(displayTransactionList);
}

function displayTransactionList(block) {
    let div, html, i;
    div = document.getElementById('transactionList');


    html = "<div class='row justify-content-center mt-4 mb-5'>"+
        "<table class='table tabTran table-bordered text-center w-auto col-auto my-auto'>"+
        "<tr><td>Transactions</td></tr>";
    for (i=0; i<block.n_tx; i++) {
        html += "<tr><td><a href='./transaction.html?transaction="+block.txids[i]+"'>"+block.txids[i]+"</a></td></tr>";
    }
    html += "</table></div>";
    div.innerHTML += html;
}

function displayBlockSearch(block) {
    if (!document.getElementById('blockElement2').children[0]) {
        displayBlockHead('blockElement2');
    }
    displayBlock(block,'blockElement2');
}

function latestBlocks() {
    displayBlockHead('blockElement1');
    $.get("https://api.blockcypher.com/v1/btc/main?token=abd583bddb494903be6472d67069f5af").then(function(chain) {
        return $.get(chain.latest_url);
    }).then(displayAndGetNext).then(displayAndGetNext).then(displayAndGetNext);
}

function searchBlock() {
    let x = document.getElementById("blockHeight");
    $.get("https://api.blockcypher.com/v1/btc/main/blocks/"+x.value+"?txstart=1&limit=1&token=abd583bddb494903be6472d67069f5af").then(displayBlockSearch);
}

function searchTransaction() {
    var x = document.getElementById("transactionHash");
    $.get("https://api.blockcypher.com/v1/btc/main/txs/"+x.value).then(displayInTran1);
}

function searchAddress() {
    $.get('https://api.blockcypher.com/v1/btc/main/addrs/1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD').then(displayAddressInToto);
}

function processAddress()
{
    let parameters = location.search.substring(1).split("&");
    let tmp = parameters[0].split("=");
    $.get('https://api.blockcypher.com/v1/btc/main/addrs/'+decodeURI(tmp[1])+
        '?token=abd583bddb494903be6472d67069f5af').then(displayAddressPage);
}

function processTransaction()
{
    let parameters = location.search.substring(1).split("&");
    let tmp = parameters[0].split("=");
    $.get("https://api.blockcypher.com/v1/btc/main/txs/"+decodeURI(tmp[1])+
        "?token=abd583bddb494903be6472d67069f5af").then(displayTransactionPage);
}

function processBlock()
{
    let parameters = location.search.substring(1).split("&");
    let tmp = parameters[0].split("=");
    displayBlockHead('blockElement');
    $.get("https://api.blockcypher.com/v1/btc/main/blocks/"+decodeURI(tmp[1])+
        "?txstart=1&limit=1&token=abd583bddb494903be6472d67069f5af").then(displayBlockPage);
}