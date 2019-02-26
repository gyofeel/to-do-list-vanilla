let initList = (list, cardId)=>{
    let result = list.reduce((acc, el)=>{
        let value = `
        <div class="item">
            <form class="item-form">
                <input class="checkbox" id="${cardId}-${el.item_id}" type="checkbox" ${el.item_complete?"checked":''}/>
                <label for="${cardId}-${el.item_id}"></label>
                <input class="item-content" id="ic-${cardId}-${el.item_id}" type="text" value="${el.item_content}"/>
                <span class="item-delete" id="id-${cardId}-${el.item_id}">삭제</span>
            </form>
        </div>
        `
        return acc+value;
    }, '')
    return result;
}

let createItemElement = (itemData, cardId)=>{
    let item = document.createElement('div');
    item.setAttribute('class', 'item');
    let element = `
    <form class="item-form">
        <input class="checkbox" id="${cardId}-${itemData.item_id}" type="checkbox" ${itemData.item_complete?"checked":''}/>
        <label for="${cardId}-${itemData.item_id}"></label>
        <input class="item-content" id="ic-${cardId}-${itemData.item_id}" type="text" value="${itemData.item_content}"/>
        <span class="item-delete" id="id-${cardId}-${itemData.item_id}">삭제</span>
    </form>
    `

    item.innerHTML = element;

    return item;
}

let createItemData = ()=>{
    return ({
        item_id : makeId()+'',
        item_content:"",
        item_complete:false
    });
}

let updateItemData = (cardId, itemId, toUpdate, dir)=>{
    const targetCardIdx = data.card.findIndex((o)=>o.card_id===cardId)
    const targetItemIdx = data.card[targetCardIdx].list.findIndex((o)=>o.item_id === itemId);

    switch(dir){
        case 0 : {
            data.card[targetCardIdx].list[targetItemIdx].item_content = toUpdate;
            break;
        }
        case 1 : {
            data.card[targetCardIdx].list[targetItemIdx].item_complete = toUpdate;
            break;
        }
        default:{
            break;
        }
    }

    return targetIdx;
}