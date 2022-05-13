	/* 导航栏 */
/* 音频 */
window.addEventListener('load', function () {
	var audioimg = document.getElementById('audio_headerimg')
	var audioyuans = document.getElementById("bgMusic")
    audioyuans.loop = false;
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
            audioimg.src = "img/m1.png"
            audioyuans.play();
        }else if(audioimg.getAttribute('src') === "img/m1.png"){
            audioimg.src = "img/m2.png"
            audioyuans.pause();
        }
	})
})
//滚动事件 显示和隐藏导航栏背景颜色
window.addEventListener('scroll',function(){
	let nav = document.querySelector(".nav")
    let num = this.document.documentElement.scrollTop
    if(num != 0){
        nav.classList.add("nav_bgc")
    }else {
        nav.classList.remove("nav_bgc")
    }
})
// 鼠标经过显示信息
let logins = document.querySelectorAll(".login li")
let login_content = document.querySelector(".login_content")
let login_contents = ['QQ','邮箱','微博'];
for(let i=0,length=logins.length;i<length;i++){
    logins[i].addEventListener("mouseenter", function(){
        // console.log("!");
        login_content.innerHTML = `点击${login_contents[i]}联系我`
        
    })
    logins[i].addEventListener("mouseleave", function(){
        // console.log("!");
        login_content.innerHTML = "";
    })
}

// 点击开始阅读，滚动条滚动
let begin = document.querySelector(".login_message")
let home2 = document.querySelector(".home2")
begin.addEventListener("click", function(){
	document.documentElement.scrollTop = home2.offsetTop;
})




	/* 主体2 */
// 轮播图
//   鼠标经过小图，当前亮，其余淡  添加类
let lis = document.querySelectorAll('.indicator li')
let piclis = document.querySelectorAll('.slides ul li')
let text = document.querySelector('.extra h3')
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')
let main = document.querySelector('.main')
var catArr = ["狸花猫","橘猫","布偶","暹罗猫","银渐层","金渐层","英短","美短","缅因猫","无毛猫"]

// 给多个小li绑定事件
for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('mouseenter', function () {
    // 选出唯一的那个active ，删除类
    document.querySelector('.indicator .active').classList.remove('active')
    // 鼠标经过谁，谁加上active 这个类
    this.classList.add('active')

    // 选出唯一的那个active ，删除类
    document.querySelector('.slides ul .active').classList.remove('active')
    // 对应序号的那个 li，谁加上active 这个类
    piclis[i].classList.add('active')
    text.innerHTML = catArr[i]

    // 右侧按钮是通过 index 来了控制播放的
    index = i
    })
}


//   右侧按钮播放效果
let index = 0
next.addEventListener('click', function () {
    index++
    index = index % lis.length
    common()

})

//   左侧按钮播放效果
prev.addEventListener('click', function () {
    index--
    if (index < 0) {
    index = lis.length - 1
    }
    common()

})

function common() {
    document.querySelector('.indicator .active').classList.remove('active')
    lis[index].classList.add('active')
    // 选出 index 大图片 做操作
    document.querySelector('.slides ul .active').classList.remove('active')
    piclis[index].classList.add('active')
    text.innerHTML = catArr[index]
}


//   定时器自动播放 = 点击了右侧按钮，调用 next.click()
let timer = setInterval(function () {
    next.click()
}, 2000)

//   鼠标经过停止定时器
main.addEventListener('mouseenter', function () {
    clearInterval(timer)
})
//   鼠标离开开启定时器
main.addEventListener('mouseleave', function () {
    timer = setInterval(function () {
    next.click()
    }, 2000)
})





	/* 其他 */
//滚动事件 显示和隐藏二维码框
var btn = document.querySelector(".social_btn");
var social = document.querySelector(".social");
var i = document.querySelector(".iconfont")
var socila_list = document.querySelector(".social_list")
btn.addEventListener("click", function(){
    social.classList.toggle("social_left");
    if(i.className === "iconfont icon-arrow-right-bold"){
        i.className = "iconfont icon-arrow-left-bold"
    }else {
        i.className = "iconfont icon-arrow-right-bold"
    }
})
window.addEventListener('scroll',function(){
    let num = this.document.documentElement.scrollTop
    if(num < 500){
        social.classList.add("social_hide")
    }else {
        social.classList.remove("social_hide")
    }
})

/* 返回顶部 */
let backtop = document.querySelector('.backtop')
window.addEventListener('scroll', function () {
    let num = document.documentElement.scrollTop
    if (num >= 500) {
        backtop.style.display = 'block'
    } else {
        backtop.style.display = 'none'
    }
})
backtop.children[1].addEventListener('click', function () {
    document.documentElement.scrollTop = 0
});

// 左侧导航栏
    let items = document.querySelectorAll('.item')
    let homes = document.querySelectorAll('.homes')
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
            document.querySelector('.aside .active').classList.remove('active')
            this.classList.add('active')
			
            document.documentElement.scrollTop = homes[i].offsetTop;
        })
    };


