const el = document.querySelector('.draggable');

// With AbortController
// const controller = new AbortController();
// el.addEventListener('mousedown', e => {
//   if (e.buttons !== 1) return;
//   const { offsetX, offsetY } = e;

//   window.addEventListener('mousemove', e => {
//     if (e.buttons !== 1) return;
//     el.style.left = e.pageX - offsetX + 'px';
//     el.style.top = e.pageY - offsetY + 'px';
//   }, { signal: controller.signal });

//   window.addEventListener('mouseup', e => {
//     if (!e.buttons || e.buttons === 1) return;
//     controller.abort();
//   }, { signal: controller.signal });
// });


// Without Abort Controller
// el.addEventListener('mousedown', e => {
//   if (e.buttons !== 1) return;
//   const { offsetX, offsetY } = e;

//   const onMouseMove = e => {
//     if (e.buttons !== 1) return;
//     el.style.left = e.pageX - offsetX + 'px';
//     el.style.top = e.pageY - offsetY + 'px';
//   }

//   const onMouseUp = e => {
//     if (!e.buttons || e.buttons === 1) return;

//     window.removeEventListener('mousemove', onMouseMove);
//     window.removeEventListener('mouseup', onMouseUp);
//   }

//   window.addEventListener('mousemove', onMouseMove);
//   window.addEventListener('mouseup', onMouseUp);
// });
