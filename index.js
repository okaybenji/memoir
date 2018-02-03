const $ = (query) => document.querySelector(query);

// Make DOM element draggable
const makeMoveable = (element, isWindow) => {
  let offsetX, offsetY;

  // Move element to mouse position (maintaining mouse position relative to room)
  const move = e => {
    element.style.top = `${e.clientY - offsetY}px`;
    element.style.left = `${e.clientX - offsetX}px`;
  };

  element.addEventListener('mousedown', e => {
    // Capture mouse position relative to element
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    // Only move if clicking title bar
    if (isWindow && offsetY > 42) {
      return;
    }

    // Disable highlighting while dragging
    element.style.userSelect = 'none';

    $('body').addEventListener('mousemove', move);
  }, false);

  $('body').addEventListener('mouseup', (e) => {
    element.style.userSelect = 'auto';
    $('body').removeEventListener('mousemove', move);
  }, false);

  element.addEventListener('mouseup', (e) => {
    element.style.userSelect = 'auto';
    $('body').removeEventListener('mousemove', move);
  }, false);
};

makeMoveable($('main'), true);
