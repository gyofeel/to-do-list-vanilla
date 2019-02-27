let onResizeWrap = ()=>{
    let wrap = document.getElementById('wrap');
    wrap.style.height = window.innerHeight+'px';
}
onResizeWrap();
window.addEventListener('resize', onResizeWrap)

let onAddCard = (e)=>{
    let newCardData = createCardData();
    let divCard = document.getElementById('div-card');
    divCard.appendChild(createCardElement(newCardData))
    document.getElementById(`ctc-${newCardData.card_id}`).focus();
    data.card.push(newCardData);
    document.getElementById(`ai-${newCardData.card_id}`).addEventListener('click', onAddItem);
    document.getElementById(`ctc-${newCardData.card_id}`).addEventListener('blur', onUpdateCardTitle);
    document.getElementById(`ct-${newCardData.card_id}`).addEventListener('mouseover', onShowDeleteCard);
    document.getElementById(`ct-${newCardData.card_id}`).addEventListener('mouseout', onHideDeleteCard);
    document.getElementById(`cd-${newCardData.card_id}`).addEventListener('click', onDeleteCard);

}
document.getElementById('add-card').addEventListener('click', onAddCard)

let onAddItem = (e)=>{
    let targetCardId = (e.target.id?e.target.id:e.target.parentElement.id).split('-')[1];
    let newItemData = createItemData();
    let divList = document.getElementById(`dl-${targetCardId}`);
    let element = createItemElement(newItemData, targetCardId);
    divList.appendChild(element);
    document.getElementById(`ic-${targetCardId}-${newItemData.item_id}`).focus();
    let targetIdx = data.card.findIndex((o)=>o.card_id===targetCardId);
    data.card[targetIdx].list.push(newItemData);
    document.getElementById(`tn-${targetCardId}`).textContent=++data.card[targetIdx].total_num;
    document.getElementById(`ic-${targetCardId}-${newItemData.item_id}`).addEventListener('blur', onUpdateItemContent);
    document.getElementById(`${targetCardId}-${newItemData.item_id}`).addEventListener('change', onUpdateItemComplete);
    document.getElementById(`i-${targetCardId}-${newItemData.item_id}`).addEventListener('mouseover', onShowDeleteItem);
    document.getElementById(`i-${targetCardId}-${newItemData.item_id}`).addEventListener('mouseout', onHideDeleteItem);
    document.getElementById(`id-${targetCardId}-${newItemData.item_id}`).addEventListener('click', onDeleteItem);

}
let addItem = document.getElementsByClassName('add-item');
Array.from(addItem).forEach((el)=>{
    el.addEventListener('click', onAddItem);
})

let onUpdateCardTitle = (e)=>{
    const targetCardId = e.target.id.split('-')[1];
    const targetTitleValue = e.target.value;
    updateCardData(targetCardId, 0, targetTitleValue);
}
let cardTitleText = document.getElementsByClassName('card-title-text');
Array.from(cardTitleText).forEach((el)=>{
    el.addEventListener('blur', onUpdateCardTitle);
})

let onUpdateItemContent = (e)=>{
    const splitTarget = e.target.id.split('-');
    const targetCardId = splitTarget[1];
    const targetItemId = splitTarget[2];
    const targetContentValue = e.target.value;
    updateItemData(targetCardId, targetItemId, 0, targetContentValue);
}
let itemContent = document.getElementsByClassName('item-content');
Array.from(itemContent).forEach((el)=>{
    el.addEventListener('blur', onUpdateItemContent);
})

let onUpdateItemComplete = (e)=>{
    const splitTarget = e.target.id.split('-');
    const targetCardId = splitTarget[0];
    const targetItemId = splitTarget[1];
    updateItemData(targetCardId, targetItemId, 1);
    updateCardData(targetCardId, 1);
    document.getElementById(`cn-${targetCardId}`).textContent = data.card[data.card.findIndex((o)=>o.card_id===targetCardId)].complete_num;
}
let checkbox = document.getElementsByClassName('checkbox');
Array.from(checkbox).forEach((el)=>{
    el.addEventListener('change', onUpdateItemComplete);
})


let onShowDeleteCard = (e)=>{
    if(e.target.tagName === 'DIV'){
        e.target.children[1].setAttribute('class', 'card-delete mouseover');
    } else if(e.target.tagName === 'INPUT'){
        e.target.nextSibling.nextSibling.setAttribute('class', 'card-delete mouseover');
    } else if(e.target.tagName === 'SPAN'){
        e.target.setAttribute('class', 'card-delete mouseover');
    }
}
let onHideDeleteCard = (e)=>{
    if(e.target.tagName === 'DIV'){
        e.target.children[1].setAttribute('class', 'card-delete');
    } else if(e.target.tagName === 'INPUT'){
        e.target.nextSibling.nextSibling.setAttribute('class', 'card-delete');
    } else if(e.target.tagName === 'SPAN'){
        e.target.setAttribute('class', 'card-delete');
    }
}
let onDeleteCard = (e)=>{
    const targetCardId = e.target.id.split('-')[1];
    deleteCardData(targetCardId)
    document.getElementById(targetCardId).remove();
}
let cardTitle = document.getElementsByClassName('card-title');
Array.from(cardTitle).forEach((el)=>{
    el.addEventListener('mouseover', onShowDeleteCard);
    el.addEventListener('mouseout', onHideDeleteCard);
    el.children[1].addEventListener('click', onDeleteCard);
})

let onShowDeleteItem = (e)=>{
    if(e.target.tagName === 'DIV'){
        e.target.children[0].children[3].setAttribute('class', 'item-delete mouseover');
    } else if(e.target.tagName === 'SPAN'){
        e.target.setAttribute('class', 'item-delete mouseover');
    } else if(e.target.tagName === 'INPUT'){
        e.target.nextSibling.nextSibling.setAttribute('class', 'item-delete mouseover');
    }
}
let onHideDeleteItem = (e)=>{
    if(e.target.tagName === 'DIV'){
        e.target.children[0].children[3].setAttribute('class', 'item-delete');
    } else if(e.target.tagName === 'SPAN'){
        e.target.setAttribute('class', 'item-delete');
    } else if(e.target.tagName === 'INPUT'){
        e.target.nextSibling.nextSibling.setAttribute('class', 'item-delete');
    }
}
let onDeleteItem = (e)=>{
    const target = e.target.id.split('-');
    const targetCardId = target[1];
    const targetItemId = target[2];
    deleteItemData(targetCardId, targetItemId);
    // updateItemData(targetCardId, targetItemId, 1);
    updateCardData(targetCardId, 1);
    document.getElementById(`i-${targetCardId}-${targetItemId}`).remove();
    document.getElementById(`cn-${targetCardId}`).textContent = data.card[data.card.findIndex((o)=>o.card_id===targetCardId)].complete_num;
    document.getElementById(`tn-${targetCardId}`).textContent=--data.card[data.card.findIndex((o)=>o.card_id === targetCardId)].total_num;
}
let item = document.getElementsByClassName('item');
Array.from(item).forEach((el)=>{
    el.addEventListener('mouseover', onShowDeleteItem);
    el.addEventListener('mouseout', onHideDeleteItem);
    el.children[0].children[3].addEventListener('click', onDeleteItem);
})