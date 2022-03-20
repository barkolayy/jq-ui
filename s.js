let groups = [] // массив с группами
let students = []
let quantity = 1

function best_func() {
	$('#best_btn').css({"display": "none"})
	$('#wrapper').css({"display": "block"})
	$('.btn').css({"display": "none"})
}

function load_from_site(){
    $.get('http://217.71.129.139:4003/students.php', function(data){
    	students = JSON.parse(data)['response']
    });
}

function rec(){
	$(document).ready(function() {
		$("#tabs").tabs();
	});
}

function count(){
	//первый элемент в массиве - группа первого студента в json
	groups.push(students[0].group) 
		
	let link_list = document.getElementById('links')  

	let link_1 = students[0].group

	let f_link = document.createElement('li')
	let f_link_a = document.createElement('a')

	f_link_a.href = '#group_1'

	f_link_a.textContent = link_1;

	link_list.appendChild(f_link);
	f_link.appendChild(f_link_a);

    let table = document.getElementById('group_1')

	for (let i = 0; i < students.length; i++){	
			let num = students[i].id
			let name = students[i].name + ' ' +students[i].surname
			let score = students[i].scores

			let tr = document.createElement('tr')
			let td1 = document.createElement('td')
			let td2 = document.createElement('td')
			let td3 = document.createElement('td')
			let td4 = document.createElement('td')

			td1.textContent = num
			td2.textContent = name
			td3.textContent = score
			td4.textContent = avg(i)
			td4.id = 'avg'
			tr.appendChild(td1)
			tr.appendChild(td2)
			tr.appendChild(td3)
			tr.appendChild(td4)

			table.appendChild(tr)		
			if (students[i].group != students[i+1].group){
				break
			}
	}

	let tables = document.getElementById('content')
	for (let i = 1; i < students.length; i++){
		if (students[i].group != students[i-1].group) { //если группы текущего студента и предыдущего разные, 
			groups.push(students[i].group)				//то в массив добавляется текущая группа;
			quantity += 1
			let vkl = document.createElement('li')
			let link = document.createElement('a')
			link.textContent = 	students[i].group
			link.href = '#group_' + quantity
			vkl.appendChild(link)	
			link_list.appendChild(vkl)	
			
			let group_table = document.createElement('table')
			group_table.id = 'group_' + quantity
 			tables.appendChild(group_table)	
 			load_students(i+1)										//если в json-e студенты не будут отсортированы по группам, 
		}												//то все пойдет не по плану
	}


	//alert(groups[0])   
}

function load_students(i) {
	let num_id = 1
	for (i; i < students.length; i++){
		if (students[i].group != students[i-1].group){
			break
		}

		let table = document.getElementById('group_' + quantity)
		
		let num = num_id 
		let name = students[i].name + ' ' + students[i].surname
		let score = students[i].scores

		let tr = document.createElement('tr')
		let td1 = document.createElement('td')
		let td2 = document.createElement('td')
		let td3 = document.createElement('td')
		let td4 = document.createElement('td')
		td4.id = 'avg'
		td1.textContent = num
		td2.textContent = name
		td3.textContent = score
		td4.textContent = avg(i)

		tr.appendChild(td1)
		tr.appendChild(td2)
		tr.appendChild(td3)
		tr.appendChild(td4)

		table.appendChild(tr)
		num_id += 1
	}
}

function avg(i){
	let sum = 0
	let avg = 1
	for (let j=0; j<students[i].scores.length; j++){
		sum += students[i].scores[j]
		console.log(j, sum)
		console.log(students[i].scores.length)
		
	}
	return(sum / (students[i].scores.length))
}