export function cul(year_fix, Array) {
	let m_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //массив для хранения баланса за каждый месяц
	let q = [0, 0, 0, 0]; //то же самое, но для кварталов
	let year = 0; //думаю сам поймешь
	let q_num = 0; //тут будет храниться номер квартала
	for (let i = 0; i < Array.length; i++) {
		if ((Array[i].date).match(/^\d\d\d\d/) == year_fix) { //проверяю год
			year = year - -Array[i].summ; //минусы нужны для того, чтобы год и сумму перевести в числа и сложить (не знаю как это работает, но оно работает)
			let j = Array[i].date.substr(5, 2).replace(/^0/, ''); //если месяц начинается на 0 (04, 09 и тд), то 0 убираю
			m_arr[j] = m_arr[j] - -Array[i].summ; //считаю шо там по месяцам мы заработали
			//дальше я определяю к какому кварталу принадлежит каждая запись и считаю доход (например, если месяц 5 разделить на 7, то значение будет болье 1, значит это второй квартал и тд)
			if ((j / 4) < 1) {
				q[0] = q[0] - -Array[i].summ;
				q_num = 0;
			} else if ((j / 7) < 1) {
				q[1] = q[1] - -Array[i].summ;
				q_num = 1;
			} else if ((j / 10) < 1) {
				q[2] = q[2] - -Array[i].summ;
				q_num = 2;
			} else if ((j / 13) < 1) {
				q[3] = q[3] - -Array[i].summ;
				q_num = 3;
			}
			//добавляю новые свойства в исходный объект
			Array[i].month = m_arr[j];
			Array[i].quartet = q[q_num];
			Array[i].year = year;
		}
	}
	Array = Array.filter((v)=>(
		new Date(v.date).getFullYear()==year_fix
		))
	let final = [];
	let j = 0;
	for (let i = 0; i < Array.length; i++) {
		if (Array[i].month) {
			final[j] = Array[i];
			j++;
		}
	}
    console.log("cul -> Array", Array)
	return Array
}
