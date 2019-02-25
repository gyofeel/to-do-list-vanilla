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
}
document.getElementById('add-card').addEventListener('click', onAddCard)

let onAddItem = (e)=>{
    let targetCardId = e.target.id?e.target.id.split('-')[1]:e.target.parentElement.id.split('-')[1];
    let newItemData = createItemData();
    console.log(targetCardId)
    let divList = document.getElementById(`dl-${targetCardId}`);
    let element = createItemElement(newItemData);
    console.log(divList);
    divList.appendChild(element);
    document.getElementById(`ic-${newItemData.item_id}`).focus();
    console.log(targetCardId)
    let targetIdx = data.card.findIndex((o)=>o.card_id===targetCardId);
    data.card[targetIdx].list.push(newItemData);
    document.getElementById(`tn-${targetCardId}`).textContent=++data.card[targetIdx].total_num;
}
let addItem = document.getElementsByClassName('add-item');
Array.from(addItem).forEach((el)=>{
    el.addEventListener('click', onAddItem);
})