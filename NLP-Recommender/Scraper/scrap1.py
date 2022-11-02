import urllib3
import numpy as np
import pandas as pd
from urllib import request
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
from queue import Queue
from threading import Thread

# get content from the url
def askURL(url):
    http = urllib3.PoolManager()

    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"}
    req = request.Request(url, headers=headers)
    html = urlopen(req, timeout=3000).read()
    soup = BeautifulSoup(html, 'html.parser', from_encoding='utf-8')

    return soup


def getDataList(url):
    sub_url = re.compile(r'<a href=(.*) target="_blank">\n(<i>|'')(.*[^</i>])(</i>|'')</a>', re.S)

    soup = askURL(url)
    queue = Queue()
    for item in soup.find_all('p', class_='item'):
        item = str(item)

        # paper url
        url_ob = re.search(sub_url, item)
        article_url = url_ob.group(1) if url_ob else ''

        # get paper info
        if article_url:
            article_url = article_url.strip('"')
            queue.put(article_url)

    return queue





def run(in_q, out_list):

    while in_q.empty() is not True:
        article_url = in_q.get()
        article = str(askURL(article_url))
        # print(article)
        data = []
        # title, writer, keyword, abstract
        tit = re.search('<meta content="(\s*)(.+?)(\s*)" name="DC.Title"/>', article)
        # print('---')
        # print(tit.group(2))
        if tit:
            sub = tit.group(2)
            data.append(sub)
        else:
            data.append('')

        wtr = re.search('<meta content="(\s*)(.+?)(\s*)" name="DC.Creator"/>', article)
        if wtr:
            sub = wtr.group(2)
            data.append(sub)
        else:
            data.append('')

        kwd = re.search('<meta content="(\s*)(.+?)(\s*)" name="DC.Subject"/>', article)
        if kwd:
            sub = kwd.group(2)
            data.append(sub)
        else:
            data.append('')

        abs = re.search('<meta content="(\s*)(.+?)(\s*)" name="DC.Abstract"/>', article)
        if abs:
            sub = abs.group(2)
            data.append(sub)
        else:
            abs1 = re.search('<meta content="(\s*)(.+?)(\s*)" name="DC.Description"/>', article)
            if abs1:
                sub = abs1.group(2)
                data.append(sub)
            else:
                data.append('')

        data.append(article_url)

        out_list.append(data)
        in_q.task_done()


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    url = 'https://www.jasss.org/index_by_issue.html'
    # url = "https://www.jasss.org/25/2/8.html"
    paper_url_queue = getDataList(url)
    # paper_url_queue = Queue()
    # paper_url_queue.put(url)
    print('queue size is %d' % paper_url_queue.qsize() )
    # print(paper_list)
    res_list = []
    for i in range(10):
        thread = Thread(target=run, args=(paper_url_queue, res_list, ))
        thread.daemon = True  # 随主线程退出而退出
        thread.start()

    paper_url_queue.join()
    print('res_list length is %d' % len(res_list))
    paper_array = np.array(res_list)
    # # print((paper_array))
    paper_df = pd.DataFrame(paper_array)
    paper_df.columns = ['Title', 'Writer', 'KeyWord', 'Abstract', 'URL']
    paper_df.to_csv('jass_paper_final_last_copy.csv', encoding='utf-8', index=False)
# See PyCharm help at https://www.jetbrains.com/help/pycharm/
