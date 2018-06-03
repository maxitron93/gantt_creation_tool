const interact = require('interactjs')

// interaction to enable dragging and resizing of timelines
export const timelineInteraction = interact('.timeline')
.draggable({
  // enable snapping
  snap: {
    targets: [
      interact.createSnapGrid({ x: 2, y: 1 })
    ],
    range: Infinity,
    relativePoints: [ { x: 0, y: 0 } ]
  },
  // enable inertial throwing
  inertia: false,
  // keep the element within the area of it's parent
  restrict: {
    restriction: "parent",
    // endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },
  // enable autoScroll
  autoScroll: true,

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function (event) {
    var textEl = event.target.querySelector('p');

    textEl && (textEl.textContent =
      'moved a distance of '
      + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                    Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px');
  }
})
.resizable({
  // enable snapping
  snap: {
    targets: [
      interact.createSnapGrid({ x: 2, y: 2 })
    ],
    range: Infinity,
    relativePoints: [ { x: 0, y: 0 } ]
  },
  // resize from all edges and corners
  edges: { left: true, right: true, bottom: false, top: false },

  // keep the edges inside the parent
  restrictEdges: {
    outer: 'parent',
    // endOnly: true,
  },

  // minimum size
  restrictSize: {
    min: { width: 20, height: 50 },
  },
  inertia: false,
})

.on('resizemove', function (event) {
  var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0),
      y = (parseFloat(target.getAttribute('data-y')) || 0);

  // update the element's style
  target.style.width  = event.rect.width + 'px';
  // target.style.height = event.rect.height + 'px';

  // translate when resizing from top or left edges
  x += event.deltaRect.left;
  y += event.deltaRect.top;

  target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)';

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
  // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
});

// interaction to enable dragging, but not resizing of deadlines
export const deadlineInteraction = interact('.deadline')
.draggable({
  // enable snapping
  snap: {
    targets: [
      interact.createSnapGrid({ x: 2, y: 1 })
    ],
    range: Infinity,
    relativePoints: [ { x: 0, y: 0 } ]
  },
  // enable inertial throwing
  inertia: false,
  // keep the element within the area of it's parent
  restrict: {
    restriction: "parent",
    // endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },
  // enable autoScroll
  autoScroll: true,

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function (event) {
    var textEl = event.target.querySelector('p');

    textEl && (textEl.textContent =
      'moved a distance of '
      + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                    Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px');
  }
})

// Function to enable dragging
function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;