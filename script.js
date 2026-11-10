/* =========================================
   NIMBUS LAB
   PREMIUM INTERACTIVE JAVASCRIPT
========================================= */


/* SHORTCUT */

const $ = (id) => document.getElementById(id);


/* =========================================
   MOUSE LIGHT
========================================= */

const cursorLight =
    document.querySelector(".cursor-light");


document.addEventListener(
    "mousemove",
    function(event){

        if(cursorLight){

            cursorLight.style.left =
                event.clientX + "px";

            cursorLight.style.top =
                event.clientY + "px";

        }

    }
);


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

document
    .querySelectorAll(".eye-btn")
    .forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    const input =
                        $(button.dataset.target);

                    if(!input) return;


                    if(
                        input.type ===
                        "password"
                    ){

                        input.type = "text";

                        button.textContent =
                            "◌";

                    }

                    else{

                        input.type =
                            "password";

                        button.textContent =
                            "◉";

                    }

                }
            );

        }
    );


/* =========================================
   LIVE DIGITAL STUDENT CARD
========================================= */

const nameInput =
    $("name");

const courseInput =
    $("course");

const semesterInput =
    $("semester");

const emailInput =
    $("email");

const mobileInput =
    $("mobile");


function updatePreview(){

    if(!$("previewName"))
        return;


    const name =
        nameInput.value.trim();

    const course =
        courseInput.value;

    const semester =
        semesterInput.value;


    /* NAME */

    $("previewName").textContent =
        name || "YOUR NAME";


    /* AVATAR */

    $("avatar").textContent =
        name
        ?
        name.charAt(0).toUpperCase()
        :
        "N";


    /* COURSE */

    $("previewCourse").textContent =

        course || semester

        ?

        `${course || "COURSE"} • ${
            semester || "SEMESTER"
        }`

        :

        "COURSE • SEMESTER";


    /* STUDENT ID */

    if(emailInput.value.trim()){

        const digits =
            emailInput.value
            .replace(/\D/g,"")
            .slice(-4)
            .padStart(4,"0");


        $("previewId").textContent =
            `NL-2026-${digits}`;

    }

    else{

        $("previewId").textContent =
            "NL-2026-XXXX";

    }

}


/* UPDATE LIVE */

[
    nameInput,
    courseInput,
    semesterInput,
    emailInput,
    mobileInput

].forEach(
    function(input){

        if(input){

            input.addEventListener(
                "input",
                updatePreview
            );

            input.addEventListener(
                "change",
                updatePreview
            );

        }

    }
);


/* =========================================
   PROGRESS STEPS
========================================= */

function updateSteps(){

    if(!$("step1"))
        return;


    const hasProfile =

        nameInput.value.trim() &&

        emailInput.value.trim() &&

        mobileInput.value.trim();


    const hasAcademic =

        courseInput.value &&

        semesterInput.value;


    const hasSecurity =

        $("password").value &&

        $("confirmPassword").value;


    const steps = [

        $("step1"),
        $("step2"),
        $("step3")

    ];


    steps.forEach(
        step =>
            step.classList.remove(
                "active",
                "done"
            )
    );


    if(hasSecurity){

        steps.forEach(
            step =>
                step.classList.add("done")
        );

    }


    else if(hasAcademic){

        $("step1")
            .classList.add("done");

        $("step2")
            .classList.add("done");

        $("step3")
            .classList.add("active");

    }


    else if(hasProfile){

        $("step1")
            .classList.add("done");

        $("step2")
            .classList.add("active");

    }


    else{

        $("step1")
            .classList.add("active");

    }


    const line =
        $("progressLine");


    if(line){

        line.style.width =
            hasAcademic
            ?
            "100%"
            :
            hasProfile
            ?
            "55%"
            :
            "0%";

    }

}


document
    .querySelectorAll(
        "#registrationForm input, #registrationForm select"
    )
    .forEach(
        function(element){

            element.addEventListener(
                "input",
                updateSteps
            );

            element.addEventListener(
                "change",
                updateSteps
            );

        }
    );


/* =========================================
   PASSWORD STRENGTH
========================================= */

const password =
    $("password");


if(password){

    password.addEventListener(
        "input",
        function(){

            const value =
                password.value;

            const bar =
                $("strengthBar");

            const text =
                $("strengthText");


            let score = 0;


            if(value.length >= 6)
                score++;


            if(/[A-Z]/.test(value))
                score++;


            if(/[0-9]/.test(value))
                score++;


            if(/[^A-Za-z0-9]/.test(value))
                score++;


            const widths = [

                "0%",
                "25%",
                "50%",
                "75%",
                "100%"

            ];


            const labels = [

                "Password strength",
                "Weak",
                "Fair",
                "Strong",
                "Excellent"

            ];


            bar.style.width =
                widths[score];


            text.textContent =
                labels[score];


            if(score <= 1){

                bar.style.background =
                    "#ff8585";

            }

            else if(score === 2){

                bar.style.background =
                    "#ffd166";

            }

            else{

                bar.style.background =
                    "#70ffbd";

            }

        }
    );

}


/* =========================================
   REGISTRATION
========================================= */

const registrationForm =
    $("registrationForm");


if(registrationForm){

    registrationForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const name =
                $("name").value.trim();

            const email =
                $("email").value.trim();

            const mobile =
                $("mobile").value.trim();

            const dob =
                $("dob").value;

            const course =
                $("course").value;

            const semester =
                $("semester").value;

            const pass =
                $("password").value;

            const confirm =
                $("confirmPassword").value;


            const genderElement =
                document.querySelector(
                    'input[name="gender"]:checked'
                );


            const gender =
                genderElement
                ?
                genderElement.value
                :
                "";


            /* CLEAR */

            document
                .querySelectorAll(
                    ".input-group small"
                )
                .forEach(
                    el =>
                        el.textContent = ""
                );


            let valid = true;


            /* NAME */

            if(name.length < 3){

                $("nameError").textContent =
                    "Enter at least 3 characters.";

                valid = false;

            }


            /* EMAIL */

            if(
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)
            ){

                $("emailError").textContent =
                    "Enter a valid email address.";

                valid = false;

            }


            /* MOBILE */

            if(
                !/^[6-9][0-9]{9}$/
                    .test(mobile)
            ){

                $("mobileError").textContent =
                    "Enter a valid 10-digit mobile number.";

                valid = false;

            }


            /* GENDER */

            if(!gender){

                $("genderError").textContent =
                    "Please select gender.";

                valid = false;

            }


            /* DOB */

            if(!dob){

                $("dobError").textContent =
                    "Please select date of birth.";

                valid = false;

            }


            /* COURSE */

            if(!course){

                $("courseError").textContent =
                    "Please select a course.";

                valid = false;

            }


            /* SEMESTER */

            if(!semester){

                $("semesterError").textContent =
                    "Please select a semester.";

                valid = false;

            }


            /* PASSWORD */

            if(pass.length < 6){

                $("passwordError").textContent =
                    "Password must contain at least 6 characters.";

                valid = false;

            }


            /* CONFIRM */

            if(!confirm){

                $("confirmPasswordError").textContent =
                    "Please confirm your password.";

                valid = false;

            }

            else if(pass !== confirm){

                $("confirmPasswordError").textContent =
                    "Passwords do not match.";

                valid = false;

            }


            if(!valid)
                return;


            /* STUDENT DATA */

            const student = {

                name:name,

                email:email,

                mobile:mobile,

                gender:gender,

                dob:dob,

                course:course,

                semester:semester,

                password:pass,

                studentId:
                    `NL-2026-${
                        email
                        .replace(/\D/g,"")
                        .slice(-4)
                        .padStart(4,"0")
                    }`

            };


            /* SAVE */

            localStorage.setItem(
                "studentData",
                JSON.stringify(student)
            );


            $("successMessage").textContent =
                "✓ Identity created. Opening secure portal...";


            setTimeout(
                function(){

                    window.location.href =
                        "login.html";

                },
                1000
            );

        }
    );

}


/* =========================================
   LOGIN
========================================= */

const loginForm =
    $("loginForm");


if(loginForm){

    loginForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const email =
                $("loginEmail")
                .value
                .trim();


            const pass =
                $("loginPassword")
                .value;


            $("loginEmailError")
                .textContent = "";


            $("loginPasswordError")
                .textContent = "";


            $("loginMessage")
                .textContent = "";


            let valid = true;


            if(!email){

                $("loginEmailError")
                    .textContent =
                    "Email is required.";

                valid = false;

            }


            if(!pass){

                $("loginPasswordError")
                    .textContent =
                    "Password is required.";

                valid = false;

            }


            if(!valid)
                return;


            const saved =
                localStorage.getItem(
                    "studentData"
                );


            if(!saved){

                $("loginMessage")
                    .textContent =
                    "No account found. Please register first.";

                return;

            }


            const student =
                JSON.parse(saved);


            /* CHECK LOGIN */

            if(
                email === student.email &&
                pass === student.password
            ){

                $("loginMessage")
                    .textContent =
                    "✓ Identity verified";


                document.body
                    .classList
                    .add("login-success");


                createSuccessOverlay(
                    student
                );


                createParticles();

            }

            else{

                $("loginMessage")
                    .textContent =
                    "✕ Invalid email or password.";

            }

        }
    );

}


/* =========================================
   SUCCESS OVERLAY
========================================= */

function createSuccessOverlay(student){

    const overlay =
        document.createElement("div");


    overlay.className =
        "success-overlay";


    overlay.innerHTML = `

        <div class="success-box">

            <div class="success-icon">
                ✓
            </div>

            <h2>
                Identity Verified
            </h2>

            <p>

                Welcome back,
                <strong>
                    ${escapeHtml(student.name)}
                </strong>.

                <br>

                Student ID:
                ${escapeHtml(student.studentId)}

                <br>

                Your Nimbus Lab portal is ready.

            </p>

        </div>

    `;


    document.body
        .appendChild(overlay);


    requestAnimationFrame(
        function(){

            overlay.classList
                .add("show");

        }
    );


    setTimeout(
        function(){

            overlay.classList
                .remove("show");

        },
        3600
    );


    setTimeout(
        function(){

            overlay.remove();

            document.body
                .classList
                .remove("login-success");

        },
        4300
    );

}


/* =========================================
   GOLDEN PARTICLES
========================================= */

function createParticles(){

    for(let i = 0; i < 32; i++){

        const particle =
            document.createElement("span");


        particle.className =
            "particle";


        particle.style.left =
            "50%";


        particle.style.top =
            "50%";


        const x =
            (Math.random() - .5)
            * 760;


        const y =
            (Math.random() - .5)
            * 520;


        particle.style
            .setProperty(
                "--x",
                `${x}px`
            );


        particle.style
            .setProperty(
                "--y",
                `${y}px`
            );


        const size =
            Math.random() * 5 + 2;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        particle.style.animationDelay =
            `${Math.random() * .35}s`;


        document.body
            .appendChild(particle);


        setTimeout(
            function(){

                particle.remove();

            },
            2100
        );

    }

}


/* =========================================
   SECURITY
========================================= */

function escapeHtml(value){

    return String(value)
        .replace(
            /[&<>"']/g,
            function(character){

                return {

                    "&":"&amp;",
                    "<":"&lt;",
                    ">":"&gt;",
                    '"':"&quot;",
                    "'":"&#039;"

                }[character];

            }
        );

}


/* INITIAL */

updatePreview();

updateSteps();