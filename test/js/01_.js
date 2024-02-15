window.onload = function () {
    setonclick();
}

var testDic = {
    urlhead: 'http://192.168.0.117:9613'
}

function setonclick() {
    document.querySelector('#login-btn').onclick = loginBtn;

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

    // console.log(typeof v5);
    // return ;
    
    
    // v5 = `username=${v5['username']}&password=${v5['username']}`;
    console.log(v5);



    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', testDic.urlhead + '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(v5);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('login succeed');
        }
    };
}