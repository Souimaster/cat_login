var user = document.getElementById("user");
var pwd = document.getElementById("pwd");
var remenber_pwd = document.getElementById("remenber_pwd");
var message = document.getElementById("login_message");
var border = document.querySelectorAll(".border");

//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase() //检测浏览器语言
}

// 取出本地存储的信息
// console.log(JSON.parse(localStorage.getItem('obj')))
if(localStorage.getItem('obj')){
    let userMessage = JSON.parse(localStorage.getItem('obj'))
    user.value = userMessage.name;
    pwd.value = userMessage.password;
}
// 登录
function login() {
    //本地存储用户信息
    let obj = {
        name: user.value,
        password: pwd.value
    }
    // console.log(obj.name, obj.password)
	border[0].className = "border"
	border[1].className = "border"
	
    var username = user.value;
    var password = pwd.value;
    var isRmbPwd = remenber_pwd.checked;
    if(!username && !password){ //拦截空内容
        msg("block","red","用户名或密码为空");
		border[0].className = "wrong"
		border[1].className = "wrong"
    }else if(!username && password){
        msg("block","red","用户名为空");
		border[0].className = "wrong"
    }else if(username && !password){
        msg("block","red","密码为空");
		border[1].className = "wrong"
    }else{
        //请求操作
        if(username == "aite" && password == "aite" ){
            msg("block","green","登陆成功，1s后自动跳转...");
            //若复选框勾选,则记录密码
            if ( isRmbPwd == true )
            {
                localStorage.setItem('obj', JSON.stringify(obj))
            }
            //否则清除
            else
            {
                localStorage.removeItem('obj')
            };
            setTimeout(function(){ //1s跳转到指定地址
                // window.open('2.html');
                if(browser.versions.mobile || browser.versions.android || browser.versions.ios){
                    // alert("移动端");
                    // window.location.href="https://www.bilibili.com/";    有些时候不兼容
                    window.open('2.html');
                }else if(!(browser.versions.mobile || browser.versions.android || browser.versions.ios)){
                    // alert("Pc端");
                    window.open('2.html');
                }
            },1000)
            setTimeout(function(){
                location.reload([false]) //页面重新加载
            },1000)
        }else{
            msg("block","red","登陆失败，请确认用户名或密码")
        }
    }
}
//提示信息
function msg(show,color,txt) {
    message.style.display = show;
    message.style.background = color;
    message.innerText = txt;
}


//音频播放
window.addEventListener('load', function () {
	//导航区
	var audioimg = document.getElementById('audio_headerimg')
	//音频播放
	var audioyuans = document.getElementById("bgMusic")
    
    audioyuans.loop = false;    //取消默认循环
    audioyuans.addEventListener('ended',function(){
        if(audioyuans.getAttribute('src') === "audio/1.mp3"){
            audioyuans.src = "audio/2.mp3"
            audioyuans.play();
        }else if(audioyuans.getAttribute('src') === "audio/2.mp3"){
            audioyuans.src = "audio/1.mp3"
            audioyuans.play();
        }
    },false)
    
	audioimg.addEventListener('click',()=>{
        if(audioimg.getAttribute('src') === "img/m2.png"){
            /* audioimg.getAttribute('src') = "img/m1.png" */   /* 此方法只能用于获取 不能赋值 */
            audioimg.src = "img/m1.png"
            audioyuans.play();
        }else if(audioimg.getAttribute('src') === "img/m1.png"){
            audioimg.src = "img/m2.png"
            audioyuans.pause();
        }
	})
})
//密码显示与隐藏
var password_eye = document.querySelector("#password_eye")
var pwd = document.querySelector("#pwd")
var flag = 0
password_eye.onclick = function(){
	if (flag == 0){
        pwd.type = 'text'
		password_eye.src = 'img/open.png'
		flag = 1
	}else {
        pwd.type = 'password'
		password_eye.src = 'img/close.png'
		flag = 0
	}
}
//回车事件
/* document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        login();
    }
} */
document.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        login();
    }
})
/* 雨滴 */
const box = document.getElementById("rainBox");
let boxHeight = box.clientHeight;
let boxWidth = box.clientWidth;
// 页面大小发生变化时，改变盒子大小
window.onresize=function(){
    boxHeight=box.clientHeight;
    boxWidth=box.clientWidth;
}
// 每隔一段时间，添加雨滴
setInterval(()=>{
    const rain=document.createElement("div");
    rain.classList.add("rain");
    rain.style.top=0;
    // 随机刷新雨点位置
    rain.style.left=Math.random()*boxWidth+"px";
    // 随机雨点透明度
    rain.style.opacity=Math.random();
    box.appendChild(rain);
        // 每隔一段时间,雨水下落
        let race=1;
        const timer=setInterval(()=>{
            if(parseInt(rain.style.top)>boxHeight){
                clearInterval(timer);
                box.removeChild(rain);
            }
            race++;
            rain.style.top=parseInt(rain.style.top)+race+'px';
        },20);
},50)
// 收缩
var btn = document.querySelector(".social_btn");
var social = document.querySelector(".social");
var i = document.querySelector(".iconfont")
btn.addEventListener("click", function(){
    social.classList.toggle("social_left"); //显示与隐藏
    /* if(this.innerHTML === "&#xe688;"){
        this.innerHTML = "&#xe689;"
        console.log("1");
    }else if(this.innerHTML === "&#xe689;"){
        this.innerHTML = "&#xe688;"
        console.log("2");
    } */

    /* 上述方法无法判断！！！！！！！！ */
    /* if(this.value === "0"){
        this.innerHTML = "&#xe689;"
        this.value = "1"
    }else {
        this.innerHTML = "&#xe688;"
        this.value = "0"
    } */
    
    /* 上述方法不用编译器打开的话 矢量图标无法加载！！！ */
    if(i.className === "iconfont icon-arrow-left-bold"){
        i.className = "iconfont icon-arrow-right-bold"
    }else {
        i.className = "iconfont icon-arrow-left-bold"
    }
})

