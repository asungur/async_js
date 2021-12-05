const el = document.querySelector('.draggable');

// With AbortController
let controller = new AbortController();
el.addEventListener('mousedown', e => {
  if (e.buttons !== 1) return;
  const { offsetX, offsetY } = e;

  window.addEventListener('mousemove', e => {
    el.style.left = e.pageX - offsetX + 'px';
    el.style.top = e.pageY - offsetY + 'px';
  }, { signal: controller.signal });

  window.addEventListener('mouseup', e => {
    controller.abort();
    controller = new AbortController();
  });
});


// Without Abort Controller
el.addEventListener('mousedown', e => {
  if (e.buttons !== 1) return;
  const { offsetX, offsetY } = e;

  const onMouseMove = e => {
    el.style.left = e.pageX - offsetX + 'px';
    el.style.top = e.pageY - offsetY + 'px';
  }

  const onMouseUp = e => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
});
