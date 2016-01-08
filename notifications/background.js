
function show() {
  var time = /(..)(:..)/.exec(new Date());     // 当前时间.
  var hour = time[1] % 12 || 12;               // 当前小时.
  var period = time[1] < 12 ? '上午' : '下午'; 
  new Notification(period+ ' ' + hour + time[2]  , {
    icon: '48.png',
    body: '时间到了不要忘记签退吃饭.'
  });
}

// 有条件初始化选项.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display 激活.
  localStorage.frequency = 1;        // The display 频率, in minutes.
  localStorage.isInitialized = true; // The option 初始化.
}

// 测试通知支持.
if (window.Notification) {
  // 虽然激活，显示在显示频率的通知.
  if (JSON.parse(localStorage.isActivated)) { show(); }

  var interval = 0; // 显示间隔，以分钟.

  setInterval(function() {
    interval++;

    if (
      JSON.parse(localStorage.isActivated) &&
        localStorage.frequency <= interval
    ) {
      show();
      interval = 0;
    }
  }, 60000);
}
