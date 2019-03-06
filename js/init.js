let init = ()=>{
    let inform = document.getElementById('inform');
    inform.innerHTML = initInform(data.username);

    let content = document.getElementById('content');
    content.innerHTML = initCard(data.card);
}
init();

let makeId = ()=>{//Date.getTime()
    let id = new Date();
    return id.getTime();
}