7月7号更新支持最新获取水印的方法，其实背景音乐也可以随便获取了
原理：
https://www.codercto.com/a/74766.html

我用python简单实现获取真实地址。

问题点：
1：用python用改变http user-agent，否者不会返回正确数据给你
2：解析真正的数据
	我通过找到 playAddr，然后切割真正的内容就可以了
	
详细见代码：

**python代码应该是过期了，思路基本不变，node js 是抓了具体包，更加方便了，不用解析html**


---
因为我在别的工程用node js 写，我就懒得python写一遍了，如果自己想用python,自己按照我的node js 写一下就可以了


