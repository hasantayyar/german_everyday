const loadJSON = (file, callback) => {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    console.log('Getting data...');
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

const init = () => {
    console.log('Init app');
    loadJSON( "/words.json", response => {
        console.log('data fetched');
        let data = JSON.parse(response);
    });
}

init();