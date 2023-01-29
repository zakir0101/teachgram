
function deleteUserCookies() {
    setCookie('username', "", 1)
    setCookie('password', "", 1)
}

function saveUserCookies(user) {
    setCookie('username', user.username, 7)
    setCookie('password', user.password, 7)
}

function getUserCookies() {
    let username = getCookie('username');
    let password = getCookie('password');

    return {username: username, password: password}
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export {deleteUserCookies,saveUserCookies, getUserCookies}