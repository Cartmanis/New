# DecimalInput


Модуль для работы с денежными значениями в input. Использовав данный модуль мы не сможем вводить в input других значений, 
кроме как числовых. При покидании фокуса переводит их в удобный читаемый вид c отступами (Например 32 123 121, 12).

**Пример использования:**

`let decimalInput = new DecimalInput({elem: document.body.querySelector('#elem'), integer: false
,numberFormat: new Intl.NumberFormat('ru', {minimumFractionDigits:2, maximumFractionDigits:2})
 });`

  @options.elem - 1 параметр поле, в которое вводится текст. Например <input type ='text'/>
  @optons.integer - 2 не обязательный параметр параметр- даёт возможность ввода только целочисленных значений. По умалчанию false.
  @options.numberFormat - 3 необязательный параметр свой объект Intl.NumberFromat(...). По умолчанию
  Intl.NumberFormat('ru', {minimumFractionDigits:2, maximumFractionDigits:2})

  **Свойства:**

 numberValue - возвращает текущее значение поля input с типом Number
 stringValue - возвращает текущее значение поля input с отспупами типа String
