const animatedForm = () => {
    const arrows = document.querySelectorAll('.fa-arrow-down');

    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const input = arrow.previousElementSibling;
            const parent = arrow.parentElement;
            const nextForm = parent.nextElementSibling;

            if(input.type === 'text' && validateUser(input)){
                nextSlide(parent, nextForm);
            }
            else if(input.type === 'email' && validateEmail(input)){
                nextSlide(parent, nextForm);
            }
            else if(input.type === 'password' && validateUser(input)){
                nextSlide(parent, nextForm);
            }
            else{
                parent.style.animation = "shake 0.5s ease";
            }

            parent.addEventListener("animationend", () => {
                parent.style.animation = "";
            });
        })
    })
}

const validateUser = user => {
    if (user.value.length < 6) {
        colorShift("rgb(189,87,87)");
        return false;
    }
    else {
        colorShift("rgb(87,189,130)");
        return true;
    }
}

const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email.value)) {
        colorShift("rgb(189,87,87)");
        return false;
    }

    else {
        colorShift("rgb(87,189,130)");
        return true;
    }
}

const nextSlide = (parent, nextForm) => {
    parent.classList.add('inactive');
    parent.classList.remove('active');
    nextForm.classList.add('active');
    nextForm.classList.remove('inactive');
}

const colorShift = color => {
    document.body.style.backgroundColor = color;
}


animatedForm();