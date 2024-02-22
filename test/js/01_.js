window.onload = function () {
    setonclick();
}

var testDic = {
    urlhead: 'https://v4server.wangtrust.top:9611/api'
}

function setonclick() {
    document.querySelector('#login-btn').onclick = loginBtn;
    document.querySelector('#login-exit').onclick = loginExit;
    document.querySelector('#login-test').onclick = loginTest;

}
function loginBtn() {
    let v1, v2, v3, v4, v5, v6;

    v1 = document.querySelector('#username').value;
    v2 = document.querySelector('#password').value;
    v3 = document.querySelector('#showinfo');
    if (v1 === '' || v2 === '') {
        v3.innerText = '用户名和密码不能为空！';
        return;
    }
    v5 = {};
    v5['username'] = v1;
    v5['password'] = v2;
    v5 = JSON.stringify(v5);

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', testDic.urlhead + '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;
    xhr.send(v5);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('login succeed');
        }
    };
}


function loginTest() {
    let v1, v2, v3, v4, v5, v6;

    v1 = { a: 1};
    console.log('test-btn ok');

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', testDic.urlhead + '/test');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;
    
    xhr.send(JSON.stringify(v1));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('login succeed');
        }
    };
}


function loginExit() {
    let v1, v2, v3, v4, v5, v6;

    v1 = { a: 1};
    console.log('exit-btn ok');

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', testDic.urlhead + '/login/exit');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;
    
    xhr.send(JSON.stringify(v1));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('login succeed');
        }
    };
}