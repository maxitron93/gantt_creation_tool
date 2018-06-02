import { Sortable } from '@shopify/draggable';

// To enable the swap animation
import { Plugins } from '@shopify/draggable';

export const sortable = new Sortable(document.querySelectorAll('.container-rows'), {
  draggable: '.row',
  
  // Start of additional code to enable animation on sortable:sorted
  swapAnimation: {
    duration: 200,
    easingFunction: 'ease-in-out'
  },
  plugins: [Plugins.SwapAnimation]
  // End of additional code to enable animation on sortable:sorted
});

sortable.on('sortable:start', event => {
  // Hides the div that is selected upon selection
  event.data.dragEvent.data.source.style.opacity = "0"
});
// sortable.on('sortable:sort', () => console.log('sortable:sort'));
// sortable.on('sortable:sorted', () => console.log('sortable:sorted'));
// sortable.on('sortable:stop', () => console.log('sortable:stop'));

// Start of code to cancel the drag event when a child element is selected
sortable.on('drag:start', (event) => {
  const currentTarget = event.originalEvent.target;
  
  if (isPrevented(currentTarget, ['text-field', 'timeline', 'deadline', 'btn-delete'])) {
    event.cancel();
  }
});

const isPrevented = (element, classesToPrevent) => {
  let currentElem = element;
  let isParent = false;
  
  while (currentElem) {
    const hasClass = Array.from(currentElem.classList).some((cls) => classesToPrevent.includes(cls));
    if (hasClass) {
      isParent = true;
      currentElem = undefined;
    } else {
      currentElem = currentElem.parentElement;
    }
  }
  
  return isParent;
}
// End of code to cancel the drag event when a child element is selected