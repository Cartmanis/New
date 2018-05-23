 /*
 ---------------------------------------------------------------------

Функция - дает возможность ввода только цифровых значений, при покидании фокуса переводит их в удобный читаемый вид elem(input)
	@options.elem - поле, в которое вводится текст. Например <input type ='text'/>
	@options.integer - даёт возможность ввода только целочисленных значений	
	@options.numberFormat - свой объект Intl.NumberFromat(...)

  --------------------------------------------------------------------
*/

function DecimalInput(options) {	
        var elem = options.elem;
        var flagDigital = options.integer || false; //флаг для проверки на возможность ввода только целочисленных значений. По умолчанию ввод для всех значений
        var formatter = options.numberFormat || ((flagDigital) ? new Intl.NumberFormat('ru') 
        					:new Intl.NumberFormat('ru', {minimumFractionDigits:2, maximumFractionDigits:2}));  	
  		  var lastValue = 0; //последнее корректное значение
  		  var currentValue = ''; //текущее значение типа Number
      	

      	elem.oninput = function(e) {
  			   replaceOnPoint(); //Меняем запятую на точку, а также в случае русской раскладки меняем 'б' и 'ю' тоже на точку
  			   onlyTwoDecimalPlaces();//Разрешаем ввод только двух символов после запятой  		  		  		  			
  			   notFirstZero(); //Запрещаем первый ноль

  			   if(isNaN(this.value)){
  				    currentValue = (lastValue) ? lastValue : ''; 			
  			   } else {
  			   		var indexPoint = elem.value.indexOf('.');
  				    currentValue =(~indexPoint && flagDigital) ? lastValue : this.value; //проверяем на наличие точки, при возможности ввода только целочисленных значений
  				    lastValue = currentValue;
  			   }
  			   this.value = currentValue;  		
  		  } 

  		  elem.onblur = function(){
  			   	this.value = formatter.format(this.value);
  		  		
  		  }
  		  elem.onfocus = function() {
  			   this.value = currentValue;
  		  }       

        //Добавляем открытые свойства с типом Number для использования в расчетах и String для красивого отображения
        Object.defineProperty(this, "numberValue", {
  			   get: function() {
    			   return (currentValue) ? +currentValue : 0;
  			   }
		    });
		    Object.defineProperty(this, "stringValue", {
  			   get: function() {
    			   return  formatter.format(currentValue);
  			   }
		    });   
        

        //Вспомогательные функции
       function replaceOnPoint() { 
  			var indexComma = elem.value.indexOf(','); 		
  			var indexB = elem.value.toLowerCase().indexOf('б');
  			var indexYou = elem.value.toLowerCase().indexOf('ю');

  			if(~indexComma ) elem.value = elem.value.replace(',','.');
  		
  			if(~indexB) elem.value = elem.value.replace('б', '.').replace('Б', '.');
  		
  			if(~indexYou) elem.value = elem.value.replace('ю', '.').replace('Ю', '.');  		
  		}  	

  		function onlyTwoDecimalPlaces() {
  			var indexPoint = elem.value.indexOf('.');
  			if(~indexPoint && elem.value.slice(indexPoint + 1).length > 2){
  				elem.value = lastValue;
  			}
  		}
  	
  		function notFirstZero() {
  			if(elem.value == '0' && elem.value.length == 1)
  				elem.value = '';	
  		}
}


