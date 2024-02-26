
function formatDate(time){
    let year = time.getFullYear();
    let month = (time.getMonth()+1).toString().padStart(2,'0');
    let day = time.getDate().toString().padStart(2,'0');
    let hour = time.getHours().toString().padStart(2,'0');
    let minute = time.getMinutes().toString().padStart(2,'0');
    let second = time.getSeconds().toString().padStart(2,'0');
    let str = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    // console.log(str);
    return str;
}

export {
    formatDate
}
