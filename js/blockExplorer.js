function displayBlock(block) {
    var table, td, tr, i;
    table = document.getElementById('blockExplorer');
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.appendChild(document.createTextNode(block.height));
    tr.appendChild(td);
    table.appendChild(tr);
}


function displayAndGetNext(block) {
    displayBlock(block);
    return $.get(block.prev_block_url);
}



$(document).ready(function() {

    var table, th, tr, i, url, d;
    d = document;
    table = d.getElementById('blockExplorer');
    table.className = "table";
    tr = d.createElement('tr');
    tr.className = "thead-light";
    th = d.createElement('th');
    th.appendChild(d.createTextNode('height'));
    tr.appendChild(th);
    th = d.createElement('th');
    th.appendChild(d.createTextNode('Age'));
    tr.appendChild(th);
    th = d.createElement('th');
    th.appendChild(d.createTextNode('fees'));
    tr.appendChild(th);
    th = d.createElement('th');
    th.appendChild(d.createTextNode('peer_count'));
    tr.appendChild(th);
    table.appendChild(tr);

    $.get("https://api.blockcypher.com/v1/btc/main").then(function(chain) {
        return $.get(chain.latest_url);
    }).then(displayAndGetNext).then(displayAndGetNext);
});

function createLine(blockData) {
    for (i=0; i<10; i++) {
    }
    return blockData.prev_block_url;
}