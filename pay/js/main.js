var show_modal = true;

function isQQ(qq) {
    var filter = /^\s*[.0-9]{5,11}\s*$/;
    return filter.test(qq);
}

function isGithub(username) {
    var filter = /^@[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    return filter.test(username);
}

function isColor(text) {
    var filter = /^#[a-fA-F0-9]{6}$/;
    return filter.test(text);
}

function isEmpty(s) {
    return !(typeof s == 'string' && s.length > 0)
}

function show(val) {
    // Clear style
    $(".app-name").css({ display: "none" });
    show_modal = true;

    if (val == "qr") {
        show_modal = false;
        location.href = "fullqr.html";
    } else if (val == "alipay") {
        $("#alipay-name").css({ display: "inline-block" });
        var imgSrc = urls.alipay;
        var img = $('<img>').attr('src', imgSrc).css({margin: "auto", "max-width": "240px"});
        $("#qrcode").html(img);
    } else if (val == "wechat") {
        $("#wechat-name").css({ display: "inline-block" });
        var imgSrc = urls.wechat;
        var img = $('<img>').attr('src', imgSrc).css({margin: "auto", "max-width": "240px"});
        $("#qrcode").html(img);
    }
    
    $("#scan-tip").text("手机用户可截图后打开相应应用扫描");
    $("#qrcode canvas").remove();
}

window.onload = function() {
    $("button").click(
        function () {
            show($(this).val());
            if (show_modal) { $('#QRModal').modal("show"); }
        }
    );

    if (settings.hide_badge_generator) {
        document.getElementById('badge_generator').style.display = 'none';
    }

    if (isEmpty(urls.alipay)) {
        $("#alipay-btn").remove();
    }
    if (isEmpty(urls.wechat)) {
        $("#wechat-btn").remove();
    }

    if (isQQ(settings.avatar)) {
        document.getElementById("avatar").src = "http://q1.qlogo.cn/g?b=qq&nk=" + settings.avatar + "&s=640";
    } else if (isGithub(settings.avatar)) {
        document.getElementById("avatar").src = "https://avatars.githubusercontent.com/" + settings.avatar.substr(1) + "?v=3";
    } else {
        document.getElementById("avatar").src = settings.avatar;
    }

    $("#qrcode > img").css({
        "margin": "auto",
        "height": "128px",
        "width": "128px",
    });

    $("body").css("background", isColor(settings.background) ? settings.background : "url(" + settings.background + ")")

    var have_matched = true;
    if (navigator.userAgent.match(/Alipay/i)) {
        show("alipay"); // 支付宝
    } else if (navigator.userAgent.match(/MicroMessenger\//i)) {
        show("wechat"); // 微信
    } else {
        have_matched = false; // 其它
    }
    if (have_matched) {
        $("#scan-tip").text("可直接长按识别");
        $('#QRModal').modal({ backdrop: 'static', keyboard: false });
        $('#QRModal').modal("show");
    }
}

