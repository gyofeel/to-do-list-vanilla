let init = ()=>{
    let content = document.getElementById('content');
    content.innerHTML = initCard(data.card);

    let inform = document.getElementById('inform');
    inform.innerHTML = initInform(data.username, data.date);
}
init();

let makeId = ()=>{//Date.getTime()
    let id = new Date();
    return id.getTime();
}