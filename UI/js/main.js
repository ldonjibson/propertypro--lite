//To toggle menu on mobile
let menumobil = document.querySelector('#mobile-m').style.display = 'none';
const menuToggle = () => {
    const getburger = document.querySelector('#mobile-m');
    if (getburger.style.display === 'none') {
        return getburger.style.display = 'block';
    } else {
        return getburger.style.display = 'none';
    }

}

//load login button
const loginLoad = () => {
    let toLoadlogin = document.querySelector('#login');
    toLoadlogin.innerHTML = "<i class='fa-li fa fa-spinner fa-spin'></i> Logging you in ...";
    setTimeout(() => {
        location.assign(document.querySelector('#login-form').getAttribute("action"))
    }, 5000)
    event.preventDefault();
}

//load register button
const registerLoad = () => {
    let toLoadregister = document.querySelector('#register');
    console.log(toLoadregister.innerText);
    toLoadregister.innerHTML = "<i class='fa-li fa fa-spinner fa-spin'></i> Registering you now ...";
    setTimeout(() => {
        toLoadregister.innerHTML = "<i class='fa-li fa fa-spinner fa-spin'></i> Registered";
        document.querySelector('#registering').innerHTML = "<h4>Registration Successful.<br/>Wait!!! Redirecting...</h4>"
    }, 3000)
    setTimeout(() => {
        location.assign('./login.html')
    }, 10000)
    event.preventDefault();
}


//profile page codes
const revealImgForm = () => {
    let imgForm = document.querySelector('#edit-image');
    if (imgForm) {
        document.querySelector('#profile-upload').style.display = 'block';
        imgForm.style.display = 'none';
    } else {
        document.querySelector('#profile-upload').style.display = 'none';
        imgForm.style.display = 'block';
    }
}

const revealProfileForm = () => {
    if (document.querySelector('#edit-profile')) {
        document.querySelector('#edit-profile').style.display = 'block';
        document.querySelector('#edit-changepassword').style.display = 'none';
        document.querySelector('#profile-details').style.display = 'none';
    }
}

const revealPassword = () => {
    if (document.querySelector('#edit-changepassword')) {
        document.querySelector('#edit-changepassword').style.display = 'block';
        document.querySelector('#edit-profile').style.display = 'none';
        document.querySelector('#profile-details').style.display = 'none';
    }
}

const editProfile = () => {
    document.querySelector('#p-message').innerHTML = "<h4>Profile Successfully changed</h4>";
    setTimeout(() => {
        document.querySelector('#p-message').innerHTML = "";
    }, 3000);
    document.querySelector('#edit-profile').style.display = 'none';
    document.querySelector('#profile-details').style.display = 'block';
    event.preventDefault();
}

const changePassword = () => {
    document.querySelector('#p-message').innerHTML = "<h4>Password Successfully changed</h4>";
    setTimeout(() => {
        document.querySelector('#p-message').innerHTML = "";
    }, 3000);
    document.querySelector('#edit-changepassword').style.display = 'none';
    document.querySelector('#profile-details').style.display = 'block';
    event.preventDefault();
}

//send password reset email link to the user 
const passWordReset = () => {
    document.querySelector('#passwordreset').innerHTML = "<h4>Password Reset Request Has Been Sent to Your Email</h4>";
    setTimeout(() => {
        location.assign(document.querySelector('#passwordreset-form').getAttribute('action'));
    }, 3000);
    event.preventDefault();
}

// when user click the link they land on this page 
const chPassword = () => {
    document.querySelector('#passwordchange').innerHTML = "<h4>Password Has Successfully Been Changed<br/>Redirecting to login page ...</h4>";
    setTimeout(() => {
        location.assign(document.querySelector('#passchange-form').getAttribute('action'));
    }, 5000);
    event.preventDefault();
}

// let updateUS = document.querySelector('#admin-create-user-profile');
const updateUserStaff = () => {
    const getuserstaffform = document.querySelector('#admin-create-user-profile');
    let formValu = "";
    let i;
    console.log(getuserstaffform);
    for (i = 0; i < getuserstaffform.length; i++) {
        formValu = formValu + getuserstaffform.elements[i].value + ",";
    }
    document.querySelector('#passwordtop').innerHTML = "<h5>" + "User Updated Successfully (" + formValu + ")</h4>"
    setTimeout(() => {
        document.querySelector('#passwordtop').innerHTML = "";
    }, 3000);
    event.preventDefault();
}

//loader
const loading = () => {
    setTimeout(showPage, 1000);
}


const showPage = () => {
    document.querySelector('#loader').setAttribute('class', 'hide-content');
    document.querySelector('#body-content').setAttribute('class', 'display-content');
}

// Get the modal
var modal = querySelector('#myModal');
var btn = document.querySelector('#delete');
var span = document.querySelector('.close')[0];

const modalOn = () => {
    modal.style.display = "block";
}
btn.onclick = () => {
    modal.style.display = "block";
}
span.onclick = () => {
    modal.style.display = "none";
}
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}