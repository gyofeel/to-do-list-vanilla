let returnFormattedDate = (objDate)=>{
    return `${objDate.getFullYear()}. ${objDate.getMonth()+1}. ${objDate.getDate()}`;
}

let initInform = (username)=>{
    let today = new Date();
    today.getDate
    data.date = returnFormattedDate(today);
    
    let result = `
    <h3 class="logo">To Do List</h3>
    <p class="date">${data.date}</p>
    <div class="user"><p class="username">${username}</p></div>
    `

    return result;
}
