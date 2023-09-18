난 코드를 이렇게 변경하고 싶어. Clock 생성자에 다음과같은 configuration object를 입력할 수 있게 하고 싶어.

{
    ElSelector:
    targetDate:
    output:
    targetId:


}



1. ElSelector: 어디에 위치할 것인가? 어떤 html element 하위에 위치할 것인지, css Select2 String을 입력할 수 있게 해서 그 html 을 찾으면 그 html 하위에 위치 시키고 싶어.

2. targetDate는 원하는 시간, 카운트 다운의 종료시간을 의미하는것.. 변경없음.

3. output: 은 다음과 같이 입력할 수 있어.

  ```html
<div id="countdown_container" style="display: flex;">      
   <span class="countdown_title" style="color: white;">반짝특가 남은시간</span>
    <div id="countdown_core"></div>
</div>

4. targetId는 "countdown_core"를 말하는 거야. countdown_core가 실제 카운트 다운 시계가 렌더링 되는 곳이지.


위의 요구조건을 충족시킬 수 있도록 앞서 네가 알려준 코드를 수정해줘.



