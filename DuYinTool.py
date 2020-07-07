import json

import requests


# 获取真正的原始url
def get_duyin_raw_url(url):
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/65.0.3325.181 Safari/537.36'}
    try:
        http_result = requests.get(url, headers=headers, allow_redirects=False)
        if http_result.status_code == 302:
            url = http_result.headers["location"]
            video_id = get_video_id_from_url(url)
            if len(video_id) > 0:
                url = "https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=" + video_id
                http_result = requests.get(url, headers=headers)
                ret_info = json.loads(http_result.content)
                real_url = str(ret_info['item_list'][0]['video']['play_addr']['url_list'][0])
                real_url = real_url.replace("playwm", "play")
                return real_url
    except:
        pass

    return ""


def get_video_id_from_url(url):
    find_keys = "/share/video/"
    find_pos = url.find(find_keys)
    if find_pos != -1:
        find_pos += len(find_keys)
        new_url = url[find_pos:-1]
        str_array = new_url.split("/")
        if len(str_array) > 0:
            return str_array[0]
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
    test_url = "https://v.douyin.com/vqUNVw/"

    raw_url = get_duyin_raw_url(test_url)
    print(raw_url)


main()
