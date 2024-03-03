window.onload = function () {
    setonclick();
}

var testDic = {
    // urlhead: 'https://v4server.wangtrust.top:9611/api' + '/jwt';
    urlhead: 'https://v6.wangtrust.top:9611/api' + '/jwt'
}

function setonclick() {
    document.querySelector('#login-btn').onclick = loginBtn;
    document.querySelector('#login-exit').onclick = loginExit;
    document.querySelector('#login-access').onclick = loginAccess;
    document.querySelector('#login-test').onclick = loginTest;
    document.querySelector('#login-Fetch').onclick = loginFetch;
    document.querySelector('#login-axios').onclick = loginaxios;

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
    xhr.open('POST', testDic.urlhead + '/login/refresh');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;
    xhr.send(v5);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('login succeed');
        }
    };
}


function loginExit() {
    let v1, v2, v3, v4, v5, v6;

    console.log('exit-btn ok');
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', testDic.urlhead + '/login/exit');
    xhr.withCredentials = true;

    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('login succeed');
        }
    };
}

function loginAccess() {
    let v1, v2, v3, v4, v5, v6;

    console.log('access-btn ok');
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', testDic.urlhead + '/login/access');
    xhr.withCredentials = true;

    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.response.token);
        }
    };
}


function loginTest() {
    let v1, v2, v3, v4, v5, v6;

    v1 = { a: 1 };
    console.log('test-btn ok');

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', testDic.urlhead + '/login/test');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    xhr.send(JSON.stringify(v1));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('login succeed');
        }
    };
}

async function loginFetch() {
    console.log('loginFetch ok');
    // fetch(testDic.urlhead + '/login/test', {
    //     method: 'POST',
    //     headers: {},
    //     credentials: 'include',  // xhr.withCredentials = true 写法
    //     body: {}
    // }).then(res => {
    //     return res.json();
    // }).then(res => {
    //     console.log(res);
    // }).catch((error) => {
    //     console.log('error:', error);
    // })

    // *******************************
    // async function getxhr(){
    //     const xhr = await fetch(testDic.urlhead + '/login/test', {
    //         method: 'POST',
    //         headers: {},
    //         credentials: 'include',
    //         body: {}
    //     });
    //     return xhr.json();
    //     // res =  await xhr.json(); 
    //     // res =  await xhr.text();
    //     // res =  await xhr.formData();
    //     // res =  await xhr.blob();
    //     // res =  await xhr.arrayBuffer();
    // }
    // let xhr = getxhr();


    // // 也还可以使用回调方式
    // getxhr().then( res => {
    //     console.log(res);
    // }).catch(error => {
    //     console.log(error);
    // })


    // *******************************
    const xhr = await fetch(testDic.urlhead + '/login/test', {
        method: 'POST',
        headers: {},
        credentials: 'include',
        body: {}
    });
    res =  await xhr.json(); 
    console.log(res);
}

async function loginaxios(){
    console.log('loginaxios ok');

    // axios.post(testDic.urlhead + '/login/test',
    //     {},
    //     {
    //         params: {},
    //         headers: {},
    //         withCredentials: true
    //     }
    // ).then(res => {
    //     console.log(res);
    //     console.log(res.data);
    // })
    const xhr = await axios.post(testDic.urlhead + '/login/test',
        {}, // body
        {
            params: {},
            headers: {},
            withCredentials: true
        }
    )
    console.log(xhr.data);

}

