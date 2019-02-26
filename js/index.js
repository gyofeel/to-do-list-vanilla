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
}
let addItem = document.getElementsByClassName('add-item');
Array.from(addItem).forEach((el)=>{
    el.addEventListener('click', onAddItem);
})

let onUpdateCardTitle = (e)=>{
    const targetCardId = e.target.id.split('-')[1];
    const targetTitleValue = e.target.value;
    updateCardData(targetCardId, targetTitleValue);
}
let cardTitleText = document.getElementsByClassName('card-title-text');
Array.from(cardTitleText).forEach((el)=>{
    el.addEventListener('blur', onUpdateCardTitle);
})

let onUpdateItemContent = (e)=>{
    const targetItemId = e.target.id.split('-')[1];
    const targetContentValue = e.target.value;
    console.log(targetContentValue);
    let targetIdx;
}
let itemContent = document.getElementsByClassName('item-content');
Array.from(itemContent).forEach((el)=>{
    el.addEventListener('blur', onUpdateItemContent);
})