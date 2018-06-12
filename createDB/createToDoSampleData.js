// Create User DB soon.........................
/*db = db.getSiblingDB('toDoSample')
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
{
	  name: "Spanish 101",
	  description: "Section 1 Spanish Course",
	  courseId: 1,
	  total_assessments: "2",
	  state: "A",
	  owner: "samM"
}
)
*/

db = db.getSiblingDB('toDoSample')
db.createCollection('courses')
coursesCollection = db.getCollection("courses")
coursesCollection.remove({})
coursesCollection.insert(
{
	  name: "Spanish 101",
	  description: "Section 1 Spanish Course",
	  courseId: 1,
	  total_assessments: 2,
	  total_students: 21,
	  owner: "samM"
}
)
coursesCollection.insert(
{
	  name: "Tagalog 101",
	  description: "Section 1 Tagalog Course",
	  courseId: 2,
	  total_assessments: 2,
	  total_students: 23,
	  owner: "samM"
}
)
coursesCollection.insert(
{
	  name: "Vietnamese 101",
	  description: "Section 1 Vietnamese Course",
	  courseId: 3,
	  total_assessments: "2",
	  total_students: 19,
	  owner: "samM"
}
)

//assessments per course
db.createCollection('assessments')
assessmentsCollection = db.getCollection("assessments")
assessmentsCollection.remove({})
assessmentsCollection.insert(
{
	courseId : 1,
	assessments : [
	 {
	  description: "Spanish Test 1",
	  total_questions: 4,
	  due_date: "10-04-2017",
	  options: ["Hay preguntas?","Hoy preguntas?","Hay preguntos?","Hoy preguntos?"],
	  assessmentId: 1,
	  shared: "N",
	  
	 },
	 {
	  description: "Spanish Test 2",
	  total_questions: 9,
	  due_date: "11-3-2017",
	  options: ["Mos despacio, por favor","Mas despiacio, por favor","Mos despacio, por favor"],
	  assessmentId: 2,
	  shared: "N",
	  
	 }
	]
}
)
assessmentsCollection.insert(
{
	courseId : 2,
	assessments : [
	 {
	  description: "Tagalog Quiz",
	  total_questions: 6,
	  due_date: "02-13-2018",
	  options: ["Hay preguntas?","Hoy preguntas?","Hay preguntos?","Hoy preguntos?"],
	  assessmentId: 1,
	  shared: "N",
	 },
	 {
	  description: "Tagalog Pop Quiz",
	  total_questions: 4,
	  due_date: "03-01-2018",
	  options: ["Mos despacio, por favor","Mas despiacio, por favor","Mos despacio, por favor"],
	  assessmentId: 2,
	  shared: "N",
	 }
	]	
}
)
assessmentsCollection.insert(
{
	courseId : 3,
	assessments : [
	 {
	  description: "Translate Vietnamese 111",
	  total_questions: 9,
	  due_date: "04-15-2018",
	  options: ["Hay preguntas?","Hoy preguntas?","Hay preguntos?","Hoy preguntos?"],
	  assessmentId: 1,
	  shared: "N",  
	 },
	 {
	  description: "Translate Vietnamese 222",
	  total_questions: 8,
	  due_date: "05-28-2018",
	  options: ["Mos despacio, por favor","Mas despiacio, por favor","Mos despacio, por favor"],
	  assessmentId: 2,
	  shared: "N",
	 },
	]	
}
)

/*
assessmentsCollection.insert(
	{
		courseId : 3,
		assessments : [
		 {
		  description: "Translate Vietnamese 111",
		  total_questions: 9,
		  options: ["Hay preguntas?","Hoy preguntas?","Hay preguntos?","Hoy preguntos?"],
		  assessmentId: 1,
		  shared: "N",  
		 },
		 {
		  description: "Translate Vietnamese 222",
		  total_questions: 8,
		  options: ["Mos despacio, por favor","Mas despiacio, por favor","Mos despacio, por favor"],
		  assessmentId: 2,
		  shared: "N",
		 },
		]	
	}
	)	
	*/	