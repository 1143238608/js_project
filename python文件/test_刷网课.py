from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# 地址：
# https://blog.csdn.net/Phage17/article/details/121998275?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164741775416780269821220%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=164741775416780269821220&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-121998275.142^v2^es_vector,143^v4^control&utm_term=python%E5%88%B7%E7%BD%91%E8%AF%BE&spm=1018.2226.3001.4187
url = 'https://www.icourse163.org/'
username = '1143238608@qq.com'
password = 'mxy19981028'
cha='/html/body/div[4]/div[2]/div[4]/div[2]/div/div[1]/div/div/div[1]/div[1]/div/div[1]/div/div[2]/div'
chapters=['1','2','3','4','5','6','7','8','9','10','11','12','13','14']
lists=['1','2','3','4','5','6','7','8','9','10',]
les='/html/body/div[4]/div[2]/div[4]/div[2]/div/div[1]/div/div/div[1]/div[1]/div/div[2]/div/div[2]/div'
lessons=['1','2','3','4','5','6','7','8','9']

path = 'chromedriver.exe'
driver = webdriver.Chrome(path)
driver.get(url)
driver.maximize_window()

login_xpath ='//*[@id="app"]/div/div/div[1]/div[3]/div[3]/div'
other_login = '/html/body/div[13]/div[2]/div/div/div/div/div[2]/span'

driver.find_element(By.XPATH, login_xpath).click()
driver.find_element(By.XPATH, other_login).click()

driver._switch_to.frame(0)
user_input = '/html/body/div[2]/div[2]/div[2]/form/div/div[1]/div[2]/input'
pass_input = '/html/body/div[2]/div[2]/div[2]/form/div/div[3]/div[2]/input[2]'
# print(driver.page_source)
driver.find_element(By.XPATH,user_input).send_keys(username)
driver.find_element(By.XPATH,pass_input).send_keys(password)
driver.find_element_by_link_text('登 录').click()
time.sleep(3)

driver.switch_to.default_content()

img_xpath = '/html/body/div[4]/div[2]/div[1]/div/div/div[1]/div[3]/div[1]/img'
driver.find_element_by_xpath(img_xpath).click()
time.sleep(3)

driver.find_element(By.XPATH,'/html/body/div[4]/div[2]/div[3]/div/div[1]/div[3]/div/div[2]/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/div[1]/a/div[1]/img').click()
time.sleep(4)
handle = driver.window_handles[-1]
driver.switch_to.window(handle)
study_path = '/html/body/div[4]/div[2]/div[4]/div[2]/div/div[1]/div/div[1]/div/div[1]/div/a[1]'
try:
    driver.find_element(By.XPATH,study_path).click()
except:
    print('点击开始学习失败！')
try:
    for c in chapters:
        time.sleep(1)

        js = "document.getElementsByClassName('down f-bg j-list')[0].style.display='block'"
        driver.execute_script(js)
        driver.find_element(By.XPATH, cha + '[' + c + ']').click()

        time.sleep(1)
        for l in lessons:
            try:
                time.sleep(1)
                js2 = "document.getElementsByClassName('down f-bg j-list')[1].style.display='block'"
                driver.execute_script(js2)
                driver.find_element(By.XPATH, les + '[' + l + ']').click()
                time.sleep(1)
            except:
                break
            for i in lists:
                try:
                    time.sleep(2)
                    driver.find_element(By.XPATH,
                                        '/html/body/div[4]/div[2]/div[4]/div[2]/div/div[1]/div/div/div[3]/ul/li[' + i + ']').click()
                    time.sleep(2)
                except:
                    break
except:
    print('刷课完毕！')
    driver.quit()