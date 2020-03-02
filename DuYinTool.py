import requests


#获取真正的原始url
def get_duyin_raw_url(url):
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/65.0.3325.181 Safari/537.36'}
    http_result = requests.get(url, headers=headers)
    if http_result.ok:
        raw_url = process_raw_video_url(str(http_result.content, "utf-8"))
        if len(raw_url) > 0:
            raw_url = raw_url.replace("playwm", "play")
            return raw_url

    return ""


# 处理返回Url的内容
# 逻辑：
#   1：先找到playAddr: 2：再去切割，第二个就是我们要地址
def process_raw_video_url(reuslt):
    raw_url = ""
    find_url = "playAddr: "
    if len(reuslt) > 0:
        find_pos = reuslt.find(find_url)

        if find_pos != -1:
            new_url = reuslt[find_pos:-1]
            str_array = new_url.split("\"")
            raw_url = str_array[1]

    return raw_url


def main():
    test_url = "https://v.douyin.com/tAUFJ4/"

    raw_url = get_duyin_raw_url(test_url)
    print(raw_url)

main()
