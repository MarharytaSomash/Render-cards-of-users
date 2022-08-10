const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];


class User {
	constructor(user) {
		for (let key in user) {
			this[key] = user[key];
		}
	}
	
	render() {
	
		return `<div class="user">
                           		<div class="user__info">
                            				<div class = " user__info--data ">
                                       <img src = " images/users/${this.name}.png"  alt = "${this.name}" width="30" height="30">
                                 			 <div class = " user__naming ">
                                              <p> Name: <b>${this.name}</b></p>
                                              <p> Age: <b>${this.age}</b></p>
										 			    </div>
													
													</div>
	
                                               <div class = " user__info--role ${this.role}">
									                      <img src = " images/roles/${this.role}.png"  alt = " ${this.role} " width="20" height=20">
                                                 <p>${this.role}</p>
															 </div>
									       </div>
											         
                                               ${this.courses ? this.renderCourses() : ``}
                            </div>`
		                	 
	}
	 
	
	renderCourses() {
		return `<div class="user__courses">
                  ${this.courses
				.map(item => `<p class = " user__courses--course student ">
                  ${item.title} 
            <span class= "${getMark(item.mark)}"> ${getMark(item.mark)} </span>
            </p>`)
				.join(``)
			}
             </div>`
	
	}
}
   

class Student extends User {
	constructor(user) {
		super(user);
	}
}


class Lector extends User {
	constructor(user) {
		
		super(user);
	}
 
	renderCourses() {
	 
		return ` <div class="user__courses admin--info">
                     ${this.courses
				   .map(item => `<div class = " user__courses--course lector ">
	                              	   	<p> Title: <b> ${item.title} </b> </p>
													   <p> Lector's score: <span class=" ${getMark(item.score)}">  ${getMark(item.score)}  </span>
												      </p>
                                          <p>Average student's score: <span class = " ${getMark(item.studentsScore)} " >   ${getMark(item.studentsScore)}  </span>
													   </p>
											    </div>`)
											
				.join(``)
			}
	    	  </div>`;
	}
}


class Admin extends User {
	constructor(user) {
		
		super(user);
		
	}

	renderCourses() {
		return ` <div class = " user__courses admin--info ">
		           ${this.courses
				.map(item => `<div class = " user__courses--course admin ">
	                              				<p> Title: <b>" ${item.title} </b></p>
															<p> Admin's score: <span class="${getMark(item.score)}"> ${getMark(item.score)}  </span>
															</p>
                                     		    <p> Lector: <b> "${item.lector}</b> 
															</p>
										</div>`)
				.join(``)
			}                 	
					 </div>`;
 	                         
	}
}


const ROLES = {
     student: user => new Student(user),
     admin:   user => new Admin(user),
     lector:  user => new Lector(user)
}


const getMark = value => {
	for (let key in gradation) {
		if (value <= key)
			return gradation[key];
	}
}

	let modifiedUsers = users
		.map(user => ROLES[user.role] ? ROLES[user.role](user) : new ROLES(user))
		.map(user => user.render())
		.join(``);


document.write(`<div class = "users" > ${modifiedUsers} </div>`);

