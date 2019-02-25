let initList = (list)=>{
    let result = list.reduce((acc, el)=>{
        let value = `
        <div class="item">
            <form class="item-form">
                <input class="checkbox" id="${el.item_id}" type="checkbox" ${el.item_complete?"checked":''}/>
                <label for="${el.item_id}"></label>
                <input class="item-content" id="ic-${el.item_id}" type="text" value="${el.item_content}"/>
                <span class="item-delete" id="id-${el.item_id}">삭제</span>
            </form>
        </div>
        `
        return acc+value;
    }, '')
    return result;
}

let createItemElement = (itemData)=>{
    let item = document.createElement('div');
    item.setAttribute('class', 'item');
    let element = `
    <form class="item-form">
        <input class="checkbox" id="${itemData.item_id}" type="checkbox" ${itemData.item_complete?"checked":''}/>
        <label for="${itemData.item_id}"></label>
        <input class="item-content" id="ic-${itemData.item_id}" type="text" value="${itemData.item_content}"/>
        <span class="item-delete" id="id-${itemData.item_id}">삭제</span>
    </form>
    `

    item.innerHTML = element;

    return item;
}

let createItemData = ()=>{
    return ({
        item_id : makeId(),
        item_content:"",
        item_complete:false
    });
}

let updateItemData = (itemId, toUpdate, dir)=>{
    const targetIdx = data.card.list.findIndex((o)=>o.item_id === itemId);

    switch(dir){
        case 0 : {
            data.card.list[targetIdx].item_content = toUpdate;
            break;
        }
        case 1 : {
            data.card.list[targetIdx].item_complete = toUpdate;
            break;
        }
        default:{
            break;
        }
    }

    return targetIdx;
}