import requests
from PIL import Image
from io import BytesIO

url = "https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740"

response = requests.get(url)

if response.status_code == 200 and 'image' in response.headers.get('Content-Type', ''):
    img = Image.open(BytesIO(response.content))
    img.show()  # 또는 img.save() 등 원하는 작업
else:
    print("이미지를 불러오지 못했습니다.")
    print("상태 코드:", response.status_code)
    print("응답 헤더:", response.headers)
