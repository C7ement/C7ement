function newTh(content) {
    let th = document.createElement('th');
    th.appendChild(document.createTextNode(content))
    return th;
}

function newTd(content) {
    let td = document.createElement('td');
    td.appendChild(document.createTextNode(content))
    return td;
}

function displayBlockHead(table) {
    let tr;
    tr = document.createElement('tr');
    tr.className = "thead-light";
    tr.appendChild(newTh('Height'));
    tr.appendChild(newTh('Date'));
    tr.appendChild(newTh('Time'));
    tr.appendChild(newTh('Transactions'));
    tr.appendChild(newTh('Total sent'));
    tr.appendChild(newTh('Total fees'));
    table.appendChild(tr);
}

function displayBlock(block) {
    let table, tr, date;
    date = new Date(block.received_time);
    table = document.getElementById('blockExplorer');
    tr = document.createElement('tr');
    tr.appendChild(newTd(block.height));
    tr.appendChild(newTd(date.toLocaleDateString()));
    tr.appendChild(newTd(date.toLocaleTimeString()));
    tr.appendChild(newTd(block.n_tx.toLocaleString()));
    tr.appendChild(newTd((block.total/100000000).toLocaleString(undefined, {maximumFractionDigits: 0})+" BTC"));
    tr.appendChild(newTd((block.fees/100000000).toLocaleString()+" BTC"));
    table.appendChild(tr);
}


function displayAndGetNext(block) {
    displayBlock(block);
    return $.get(block.prev_block_url);
}



$(document).ready(function() {

    var table, th, tr, i, url;

    table = document.getElementById('blockExplorer');
    displayBlockHead(table);

    $.get("https://api.blockcypher.com/v1/btc/main").then(function(chain) {

        return $.get(chain.latest_url);
    }).then(displayAndGetNext).then(displayAndGetNext).then(displayAndGetNext);
});
