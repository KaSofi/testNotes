const todoContainer = document.querySelector('.todoContainer');
const textarea = document.querySelector('.inputField');
const btn = document.querySelector('.btn');
const savebtn = document.querySelector('.savebtn');
const clearbtn = document.querySelector('.clearbtn');
const deleteBtn = document.querySelector('.deleteBtn');

document.addEventListener('DOMContentLoaded', ready);
function ready() {
   let i = 1;
   while (1 == 1) {
      let b = 'textarea' + i;
      i = i + 1;
      savedText = localStorage.getItem(b);
      if (savedText == null) {
         break;
      }

      const text = document.createElement('textarea');
      text.innerText = savedText;
      text.classList.add('todoAdded');
      todoContainer.appendChild(text);
      textarea.value = '';
   }
}

btn.addEventListener('click', () => {
   const text = document.createElement('textarea');
   text.innerText = textarea.value;
   if (textarea.value.length === 0) {
      Swal.fire({
         text:'Ты ничего не написал, мне нечего сохранять :)',
         confirmButtonColor: '#3085d6',
      })
      return false;
   }
   text.classList.add('todoAdded');
   todoContainer.appendChild(text);
   textarea.value = '';
   saveNotepad();
})


function saveNotepad() {
   const textarea = document.querySelectorAll('textarea');

   let i = 0;
   textarea.forEach(item => {
      let b = 'textarea' + i;
      localStorage.setItem(b, item.value);
      i = i + 1;
   })
   Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Сохранил',
      iconColor: '#49e849',
      showConfirmButton: false,
      timer: 1500
   })
}

deleteBtn.addEventListener('click', clearNotepad);

function clearNotepad() {
   Swal.fire({
      title: 'Уверен?',
      text: "Не будет возможности восстановить записи!",
      icon: 'warning',
      iconColor: '#ff0000',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Да, удалить все',
      cancelButtonText: 'Передумал'
   }).then((result) => {
      if (result.isConfirmed) {
         localStorage.clear();
         const textarea = todoContainer.querySelectorAll('textarea');
         textarea.forEach(item => {
            todoContainer.removeChild(item);
         })
         Swal.fire({
          title: 'Удалено!',
          text: 'Все файлы удалены и восстановлению не подлежат!',
          icon: 'успешно',
          confirmButtonColor: '#3085d6'
      })
      }
   })
}

clearbtn.addEventListener('click', clearCurrentNotepad);

function clearCurrentNotepad() {
   textarea.value = '';
}


