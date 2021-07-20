class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random() * 100000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

class Storage {
    static getCourses() {
        let courses;
        if (localStorage.getItem("courses") === null)
            courses = [];
        else
            courses = JSON.parse(localStorage.getItem("courses"));

        return courses;
    }
    static displayCourse() {
        const courses = this.getCourses();
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
    }
    static addCourse(course) {
        const courses = this.getCourses();
        courses.push(course);
        localStorage.setItem("courses", JSON.stringify(courses));
    }
    static deleteCourse(element) {
        if (element.classList.contains("dalete")) {
            let id = element.getAttribute("data-id");
            const courses = Storage.getCourses();
            courses.forEach((course, index) => {
                if (course.courseId == id)
                    courses.splice(index, 1);
            });
            localStorage.setItem("courses", JSON.stringify(courses));
        }
    }
}
class UI {
    addCourseToList(course) {
        let html = `                  
        <tr>
          <td>${course.title}</td>
          <td>${course.instructor}</td>
          <td><img src="./img/${course.image}"</td>
          <td><a href="#" data-id="${course.courseId}" class="btn btn-danger delete">Delete</a></td>
        </tr>  
      `;
        let courseLıst = document.getElementById("course-list").insertAdjacentHTML("afterbegin", html);
    }
    deleteCourse(element) {
        if (element.classList.contains("delete"))
            element.parentElement.parentElement.remove();

        return true;
    }

    clearControl() {
        const title = document.getElementById("title").value = "";
        const instructor = document.getElementById("instructor").value = "";
        const image = document.getElementById("image").value = "";
    }
    showAlert(message, className) {
        let html = `
       <div class="alert alert-${className}">${message}</div>`;

        let container = document.querySelector(".container").insertAdjacentHTML("afterbegin", html);

        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 3000);
    }
    valueControl(...args) {
        let count = 0;
        args.forEach(value => {
            if (value == "") {
                count++;
            }
        });
        if (count === args.length)
            return false;
        else if (count == 0)
            return true;

    }
}

document.addEventListener("DOMcontentLoaded", Storage.displayCourse);

document.getElementById("new-course").addEventListener("submit", (e) => {

    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    const courses = new Course(title, instructor, image);

    const ui = new UI();

    if (ui.valueControl(title, instructor, image)) {
        ui.addCourseToList(courses);

        ui.showAlert("The course has been added ", "success");

        ui.clearControl();

        Storage.addCourse(courses);

    } else {
        ui.showAlert("Pleace complete the form", "warning");
    }


    e.preventDefault();
});

document.getElementById("course-list").addEventListener("click", (e) => {
    const ui = new UI();
    ui.deleteCourse(e.target);

    if (Storage.deleteCourse(e.target)) {
        ui.showAlert("The course has been deleted", "danger");
    }
});