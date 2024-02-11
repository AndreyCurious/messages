// Можно указать любой набор символов
const alph = 'абвгодеёжзийклмнопрстуфхцчщъшьыэюя#%^&*@~'
async function sendWord(word) {
  await fetch('http://localhost/messages/messages.php', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      message: word
    }),
    mode: 'no-cors'
  })
}
// Точно не понял задание. Раз в написано, что нельзя использовать массив строк, то я подумал, что необходимо по одному слову отправлять в БД, а не целое сообщение
async function sendData(data, alph) {
  let result = '';
  for (let i of data) {
    if (alph.includes(i.toLowerCase())) {
      result += i
    } else {
      if (result.length) {
        await sendWord(result);
        result = '';
      }
      await sendWord(i);
    }
  }
  if (result !== '') {
    await sendWord(result);
  }
}


document.querySelector('button').addEventListener('click', function () {
  let file = document.getElementById('file').files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = async function () {
    await sendData(reader.result, alph);
    alert('Message has been sent')
  }
  reader.onerror = function () {
    console.log(reader.error);
  }
})


