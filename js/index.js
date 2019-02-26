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
    document.getElementById(`ic-${targetCardId}-${newItemData.item_id}`).addEventListener('blur', onUpdateItemContent);
    document.getElementById(`${targetCardId}-${newItemData.item_id}`).addEventListener('change', onUpdateItemComplete);
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
    const splitTarget = e.target.id.split('-');
    const targetCardId = splitTarget[1];
    const targetItemId = splitTarget[2];
    const targetContentValue = e.target.value;
    updateItemData(targetCardId, targetItemId, targetContentValue, 0);
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
    console.log(data.card)
}
let checkbox = document.getElementsByClassName('checkbox');
Array.from(checkbox).forEach((el)=>{
    el.addEventListener('change', onUpdateItemComplete);
})