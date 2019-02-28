let initDrag = (e)=>{
    data.drag.mouse_x = e.pageX;
    data.drag.mouse_y = e.pageY;
    data.drag.init_drag = true;
    data.drag.dragged_id = e.currentTarget.id;
}

//drag(pGuideElementId)
let drag = (guideId)=>{
    //guide element의 width, height를 dragged element와 동기화 하는 것 ...
    const draggedId = data.drag.dragged_id;
    let guideElement = document.getElementById(guideId);
    let draggedElement = document.getElementById(draggedId);
    let comDraggedStyle = window.getComputedStyle(draggedElement);
    
    guideElement.style.width = comDraggedStyle.width;
}

let drop = (e)=>{
    data.drag.init_drag = false;
}