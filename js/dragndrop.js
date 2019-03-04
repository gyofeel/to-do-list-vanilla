let returnComputedStyle = (elId ,property)=>{
    return window.getComputedStyle(document.getElementById(elId))[property];
}
let returnContainerMem = (draggedId, containerDivId)=>{
    let containerDivChil =document.getElementById(containerDivId).children;
    const temp = Array.from(containerDivChil).reduce((acc, el)=>{
        if(el.id !== draggedId) acc.push(el.id)
        return acc;
    }, [])
    return temp;
}
let initDrag = (e, guideCardId, containerDivId)=>{
    data.drag.init_drag = true;
    data.drag.dragged_id = e.currentTarget.id;
    data.drag.guide_id = guideCardId;
    data.drag.container_id = containerDivId;

    const draggedLeft = document.getElementById(e.currentTarget.id).getBoundingClientRect().left
    const draggedTop = document.getElementById(e.currentTarget.id).getBoundingClientRect().top
    const guide = document.getElementById(guideCardId);
    const draggedElement = document.getElementById(data.drag.dragged_id);
    data.drag.dX = e.clientX - draggedLeft;
    data.drag.dY = e.clientY - draggedTop;

    //guide element의 width, height를 dragged element와 동기화
    const cDraggedWidth = returnComputedStyle(data.drag.dragged_id, 'width');
    const cDraggedHeight = returnComputedStyle(data.drag.dragged_id, 'height');
    guide.style.width = cDraggedWidth;
    guide.style.height = cDraggedHeight;
    draggedElement.style.width = cDraggedWidth;
    draggedElement.style.height = cDraggedHeight;
}

let returnYPosIdx = (conHeight, conChNum, mY)=>{
}
let returnXPosIdx = (conWidth, conChNum, mX)=>{
    let aSpace = conWidth / conChNum;
    let temp = -1;
    if(mX >= conWidth){
        temp = conChNum - 1;
    } else{
        temp = Math.floor(mX/aSpace);
    }
    return temp;
}
let decideGuide = (mX, mY)=>{//예외처리 필요! / 분기 필요!
    const container = document.getElementById(data.drag.container_id);
    const guide = document.getElementById(data.drag.guide_id);
    const conChildNum = container.childElementCount - 1;
    data.drag.position_idx = returnXPosIdx(container.getBoundingClientRect().width, conChildNum, mX);

    if(data.drag.container_member[data.drag.position_idx] !== data.drag.guide_id){
        // debugger
        const idx = data.drag.container_member.findIndex((o)=>o === data.drag.guide_id);
        console.log(data.drag.position_idx, idx);
        if(data.drag.position_idx>idx){
            document.getElementById(data.drag.container_member[data.drag.position_idx]).insertAdjacentElement('afterend', guide);
        } else{
            document.getElementById(data.drag.container_member[data.drag.position_idx]).insertAdjacentElement('beforebegin', guide);
        }        

        let temp = data.drag.container_member[idx];//swap
        data.drag.container_member[idx] = data.drag.container_member[data.drag.position_idx];
        data.drag.container_member[data.drag.position_idx] = temp;
    }
    console.log(data.drag.container_member)
    console.log(data.drag.position_idx)

    // if(data.drag.position_idx !== 0){
    //     data.drag.container_member[data.drag.position_idx].insertAdjacentElement('beforebegin', guide);
    //     // console.log(container.children[data.drag.position_idx])
    // }else if(data.drag.position_idx === data.drag.container_member.length-1){
    //     container.insertAdjacentElement('beforeend', guide);
    // }else {
    //     container.insertAdjacentElement('afterbegin', guide);
    // }

}
//drag(pGuideElementId)
let drag = (e)=>{
    data.drag.move_drag = true;
    const draggedId = data.drag.dragged_id;
    const dX = data.drag.dX;
    const dY = data.drag.dY;
    let guideElement = document.getElementById(data.drag.guide_id);
    let draggedElement = document.getElementById(draggedId);
    const mouseX = e.pageX + document.getElementById('content').scrollLeft;
    const mouseY = e.pageY;
    const cX = e.clientX;
    const cY = e.clientY;

    guideElement.style.display = 'block';
    draggedElement.setAttribute('class', 'card drag');
    draggedElement.insertAdjacentElement('afterend', guideElement);
    draggedElement.style.left = `${cX-dX}px`;
    draggedElement.style.top = `${cY-dY}px`;
    data.drag.container_member = returnContainerMem(draggedId, data.drag.container_id);
    decideGuide(mouseX, mouseY);
}

let drop = (e)=>{
    data.drag.move_drag = false;
    const guideElement = document.getElementById(data.drag.guide_id);
    const draggedElement = document.getElementById(data.drag.dragged_id);
    guideElement.insertAdjacentElement('beforebegin', draggedElement);
    draggedElement.setAttribute('class', 'card');
    draggedElement.style.left = '0px';
    draggedElement.style.top = '0px';
    guideElement.style.display = 'none';
}