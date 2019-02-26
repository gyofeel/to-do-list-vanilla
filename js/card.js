let initCard = (card)=>{
    let result = card.reduce((acc, el)=>{
        let value = `
        <div class="card" id="${el.card_id}">
            <div class="card-title" id="ct-${el.card_id}">
                <input class="card-title-text" id="ctc-${el.card_id}" value="${el.card_title}">
                <span class="card-delete" id="cd-${el.card_id}">이 카드를 삭제</span>
            </div>
            <div class="list">
            <div class="div-list" id="dl-${el.card_id}">
                ${initList(el.list, el.card_id)}
            </div>
                <div class="guide-item"></div>
                <div class="add-item" id="ai-${el.card_id}"><span>+ Add Another item</span></div>
            </div>
            <div class="number-item" id=""><span class="complete-num" id="cn-${el.card_id}">${el.complete_num}</span> / <span class="total-num" id="tn-${el.card_id}">${el.total_num}</span></div>
        </div>
        `
        return acc+value;
    }, '')
    result = `<div id="div-card">${result}</div>
    <div class="guide-card"></div>
    <div id="add-card"><span>+ Add Anoter Card</span></div>
    `

    return result;
}

let createCardElement = (cardData)=>{
    let card = document.createElement("div");
    card.setAttribute('class', 'card');
    card.setAttribute('id', cardData.card_id);
    let element = `
    <div class="card-title" id="ct-${cardData.card_id}">
        <input class="card-title-text" id="ctc-${cardData.card_id}" value="${cardData.card_title}">
        <span class="card-delete" id="cd-${cardData.card_id}">이 카드를 삭제</span>
    </div>
    <div class="list">
        <div class="div-list" id="dl-${cardData.card_id}"></div>
        <div class="guide-item"></div>
        <div class="add-item" id="ai-${cardData.card_id}"><span>+ Add Another item</span></div>
    </div>
    <div class="number-item" id=""><span class="complete-num" id="cn-${cardData.card_id}">${cardData.complete_num}</span> / <span class="total-num" id="tn-${cardData.card_id}">${cardData.total_num}</span></div>
    `

    card.innerHTML = element;

    return card;
}

let createCardData = ()=>{
    return ({
        card_id : makeId()+'',
        card_title : "",
        list : [],
        complete_num : 0,
        total_num : 0
    })
}

let updateCardData = (cardId, cardTitle)=>{
    const targetIdx = data.card.findIndex((o)=> o.card_id === cardId);

    data.card[targetIdx].card_title = cardTitle;
    
    return targetIdx;
}
