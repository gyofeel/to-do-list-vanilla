let returnComputedStyle = (elId ,property)=>{
    return window.getComputedStyle(document.getElementById(elId))[property];
}

let initDrag = (e)=>{
    data.drag.mouse_x = e.pageX;
    data.drag.mouse_y = e.pageY;
    data.drag.init_drag = true;
    data.drag.dragged_id = e.currentTarget.id;
    let temp = document.getElementById(e.currentTarget.id).getBoundingClientRect().left;
    data.drag.dX = e.clientX - temp;
    data.drag.dY = e.clientY - document.getElementById(e.currentTarget.id).getBoundingClientRect().top;
    // debugger
}

//drag(pGuideElementId)
let drag = (e, guideId)=>{
    const draggedId = data.drag.dragged_id;
    const dX = data.drag.dX;
    const dY = data.drag.dY;
    let guideElement = document.getElementById(guideId);
    let draggedElement = document.getElementById(draggedId);
    data.drag.drop_x = e.pageX;
    data.drag.drop_y = e.pageY;
    const pX = e.clientX;
    const pY = e.clientY;

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
    draggedElement.style.left = `${pX-dX}px`;
    draggedElement.style.top = `${pY-dY}px`;
    console.log(pX-dX, pY-dY);
// debugger
}

let drop = (e)=>{
    data.drag.init_drag = false;
}