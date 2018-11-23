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
        "<p class='mt-3 mb-1'>Block "+tran.block_height+"</p>"+
        "<p class='mt-1 mb-3'>"+tran.confirmations+" confirmations</p></td>"+
        "<td class='align-middle bgG' colspan='2'>Inputs</td>"+
        "</tr>";
    for (i=0; i<tran.inputs.length; i++) {
        html += "<tr>"+
            "<td class='align-middle'>"+tran.inputs[i].addresses[0]+"</td>"+
            "<td class='align-middle'>"+
            (tran.inputs[i].output_value/100000000).toLocaleString(undefined,{maximumSignificantDigits: 3})+" <a class='smCaps'>btc</a></td>"+
            "</tr>";
    }

    html += "<tr><td class='align-middle bgG' colspan='2'>Outputs</td></tr>";

    for (i=0; i<tran.outputs.length; i++) {
        html += "<tr>"+
            "<td class='align-middle'>"+tran.outputs[i].addresses[0]+"</td>"+
            "<td class='align-middle'>"+
            (tran.outputs[i].value/100000000).toLocaleString(undefined, {maximumSignificantDigits: 3})+" <a class='smCaps'>btc</a></td>"+
            "</tr>";
    }
    html += "</table>";
    html += "</div>";
    div.innerHTML = html;
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

function displayAddressInToto(address) {
    displayAddress(address,'address1')
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
    /*$.get("https://api.blockcypher.com/v1/btc/main/txs/5404e339ba82e6e52fcc24cb40029bed8425baa4c7f869626ef9de956186f910").then(displayInTran1);*/
    /*scrollto*/
}

function searchAddress() {
    $.get('https://api.blockcypher.com/v1/btc/main/addrs/1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD/balance').then(displayAddressInToto);
}