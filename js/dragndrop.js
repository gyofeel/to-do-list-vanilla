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
let initDrag = (e, guideId, containerDivId,  globalContainerId, arrangeStyle)=>{
    try{
        data.drag.arrange_style = arrangeStyle;
        if(data.drag.arrange_style !== 'HORIZONTAL' && data.drag.arrange_style !== 'VERTICAL' && data.drag.arrange_style !== 'GRID'){
            throw (new Error('Arrange Style Error!'));
        }
    }catch(e){
        console.log(e)
    }
    data.drag.global_container_id = globalContainerId;
    data.drag.init_drag = true;
    data.drag.dragged_id = e.currentTarget.id;
    data.drag.guide_id = guideId;
    data.drag.container_id = containerDivId;
    const draggedLeft = document.getElementById(e.currentTarget.id).getBoundingClientRect().left
    const draggedTop = document.getElementById(e.currentTarget.id).getBoundingClientRect().top
    const guide = document.getElementById(guideId);
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

let returnYPosIdx = (conChNum, mY)=>{
    let containerElement = document.getElementById(data.drag.container_id);
    let globalConElement = document.getElementById(data.drag.global_container_id);
    let conBCRect = containerElement.getBoundingClientRect();
    let gConBCRect = globalConElement.getBoundingClientRect();
    let aSpace = conBCRect.height / conChNum;
    let temp = -1;
    if(mY >= conBCRect.height + gConBCRect.y){
        temp = conChNum - 1;
    } else if(mY < gConBCRect.y){
        temp = 0;
    } else{
        temp = Math.floor((mY - gConBCRect.y)/aSpace);
    }
    return temp;
}
let returnXPosIdx = (conChNum, mX)=>{
    let containerElement = document.getElementById(data.drag.container_id);
    let globalConElement = document.getElementById(data.drag.global_container_id);
    let conBCRect = containerElement.getBoundingClientRect();
    let gConBCRect = globalConElement.getBoundingClientRect();
    let aSpace = conBCRect.width / conChNum;
    let temp = -1;
    if(mX >= conBCRect.width + gConBCRect.x){
        temp = conChNum - 1;
    } else if(mX < gConBCRect.x){
        temp = 0;
    } else{
        temp = Math.floor((mX - gConBCRect.x)/aSpace);
    }
    return temp;
}
let decideGuidePosition = (mX, mY)=>{//예외처리 필요! / 분기 필요!
    const container = document.getElementById(data.drag.container_id);
    const guide = document.getElementById(data.drag.guide_id);
    const containerMem = data.drag.container_member;
    const conChildNum = container.childElementCount - 1;
    
    switch(data.drag.arrange_style){
        case 'HORIZONTAL':{
            const positionIdx = returnXPosIdx(conChildNum, mX);
            if(containerMem[positionIdx] !== data.drag.guide_id){
                const idx = containerMem.findIndex((o)=>o === data.drag.guide_id);
                if(positionIdx>idx){
                    document.getElementById(containerMem[positionIdx]).insertAdjacentElement('afterend', guide);
                } else{
                    document.getElementById(containerMem[positionIdx]).insertAdjacentElement('beforebegin', guide);
                }        
                let temp = containerMem[idx];//swap
                containerMem[idx] = containerMem[positionIdx];
                containerMem[positionIdx] = temp;
            }
            break;
        }
        case 'VERTICAL':{
            const positionIdx = returnYPosIdx(conChildNum, mY);
            if(containerMem[positionIdx] !== data.drag.guide_id){
                const idx = containerMem.findIndex((o)=>o === data.drag.guide_id);
                if(positionIdx>idx){
                    document.getElementById(containerMem[positionIdx]).insertAdjacentElement('afterend', guide);
                } else{
                    document.getElementById(containerMem[positionIdx]).insertAdjacentElement('beforebegin', guide);
                }        
                let temp = containerMem[idx];//swap
                containerMem[idx] = containerMem[positionIdx];
                containerMem[positionIdx] = temp;
            }
            break;
        }
        case 'GRID':{

            break;
        }
        default:{
            break;
        }
    }

    return containerMem;
}
//drag(pGuideElementId)
let drag = (e)=>{
    data.drag.move_drag = true;
    const draggedId = data.drag.dragged_id;
    const dX = data.drag.dX;
    const dY = data.drag.dY;
    let guideElement = document.getElementById(data.drag.guide_id);
    let draggedElement = document.getElementById(draggedId);
    const mouseX = e.pageX + document.getElementById(data.drag.global_container_id).scrollLeft;
    const mouseY = e.pageY + document.getElementById(data.drag.global_container_id).scrollTop;
    const cX = e.clientX;
    const cY = e.clientY;

    guideElement.style.display = 'block';
    draggedElement.setAttribute('class', `${draggedElement.getAttribute('class')} drag`);
    draggedElement.insertAdjacentElement('afterend', guideElement);
    draggedElement.style.left = `${cX-dX}px`;
    draggedElement.style.top = `${cY-dY}px`;
    data.drag.container_member = returnContainerMem(draggedId, data.drag.container_id);
    data.drag.container_member = decideGuidePosition(mouseX, mouseY);
}

let drop = (e)=>{
    data.drag.move_drag = false;
    const guideElement = document.getElementById(data.drag.guide_id);
    const draggedElement = document.getElementById(data.drag.dragged_id);
    guideElement.insertAdjacentElement('beforebegin', draggedElement);
    draggedElement.setAttribute('class', draggedElement.getAttribute('class').split(' ')[0]);
    draggedElement.style.left = '0px';
    draggedElement.style.top = '0px';
    guideElement.style.display = 'none';
}