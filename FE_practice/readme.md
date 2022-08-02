### FE 박소정 경과 보고
-—

20220801
오늘 해낸 분량
1. 상어 이미지 클릭 5회시 사라지는 효과 구현
이 부분에서 정말 많은 시간을 할애했다. 기존에 테스트용으로 만든 미니게임에선 이미지 파일에 onClick 이벤트를 구현할 수 있어 빠르게 만들 수 있었지만, GLTF 파일은 컴포넌트로 만들거나 / 위에 div 태그로 감싸주거나 / 바로 onClick 이벤트를 달거나 등의 갖갖의 시도를 해봐도 클릭이 되지 않았다. 그래서 생각해낸 방법이 "상어를 클릭할 수 없다면 대체의 무언가를 클릭해서 사라지게 만들자" 였다. 이 아이디어 하나로 지난 주말을 쏟아냈지만 GLTF 파일이 너무 무거워서인지, 아님 독창적인 어떤 고유성이 있어서인지 잘 해결되지 않았다. 그러다 오늘에서야 load는 되지만 사라지지 않는 점, 그리고 상어 컴포넌트에 어떤 것도 달지 않았는데도 뭔가 구현될 때마다 새로운 캔버스가 겹겹이 쌓이고 있다는 점을 알게 되었다. 그래서 캔버스의 갯수가 6개가 되는 순간 각각의 캔버스 style 속성의 display를 none으로 처리, 그리고 그럼과 동시에 또다시 생성되는 또 하나의 캔버스는 삼항연산자로 없애주는 방식으로 처리했다. 이를 해결하기 위해 많은 시간과 많은 주석 코드를 사용했지만 해결할 수 있어 뿌듯하다.

2. 리액트 내에서 GLTF 애니메이션 에러 없이 구현
하는 코드를 드디어 작성했지만 일단 Canvas로 감싸줘야했고, 그 과정에서 바다맵 배경과 따로 노는 단점이 발생했다. 그래서 아마 이 코드는 당분간 보류할 것 같다.

그런 의미에서 앞으로 해야할 일들은..
1. GLTF 애니메이션 새로이 구현
2. GLTF 크기 및 위치를 조정할 수 있는 방법 강구