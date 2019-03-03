let returnComputedStyle = (elId ,property)=>{
    return window.getComputedStyle(document.getElementById(elId))[property];
}

let initDrag = (e)=>{
    data.drag.init_drag = true;
    data.drag.dragged_id = e.currentTarget.id;
    let draggedLeft = document.getElementById(e.currentTarget.id).getBoundingClientRect().left
    let draggedTop = document.getElementById(e.currentTarget.id).getBoundingClientRect().top
    data.drag.drop_x = draggedLeft
    data.drag.drop_y = draggedTop
    data.drag.dX = e.clientX - draggedLeft;
    data.drag.dY = e.clientY - draggedTop;
}

//drag(pGuideElementId)
let drag = (e, guideId)=>{
    const draggedId = data.drag.dragged_id;
    const dX = data.drag.dX;
    const dY = data.drag.dY;
    let guideElement = document.getElementById(guideId);
    let draggedElement = document.getElementById(draggedId);
    let draggedLeft = document.getElementById(draggedId).getBoundingClientRect().left
    let draggedTop = document.getElementById(draggedId).getBoundingClientRect().top
    data.drag.drop_x = draggedLeft;
    data.drag.drop_y = draggedTop;
    const cX = e.clientX;
    const cY = e.clientY;
    // console.log(e.pageX, e.pageY)
    // console.log(document.getElementById('content').scrollLeft);
    const draggedPosX = e.pageX + document.getElementById('content').scrollLeft;
    
    //guide element의 width, height를 dragged element와 동기화
    const cDraggedWidth = returnComputedStyle(draggedId, 'width');
    const cDraggedHeight = returnComputedStyle(draggedId, 'height');
    guideElement.style.width = cDraggedWidth;
    guideElement.style.height = cDraggedHeight;

    guideElement.style.display = 'block'
    draggedElement.insertAdjacentElement('afterend', guideElement)
    
    // draggedElement.style.position = 'fixed';
    draggedElement.setAttribute('class', 'card drag')
    draggedElement.style.width = cDraggedWidth;
    draggedElement.style.height = cDraggedHeight
    draggedElement.style.left = `${cX-dX}px`;
    draggedElement.style.top = `${cY-dY}px`;
}

let drop = (e)=>{
    data.drag.init_drag = false;
}