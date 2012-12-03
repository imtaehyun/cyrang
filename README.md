# Cyrang Notes

## JSON URL
- [관심집중 - http://cyrang.cyworld.com/if/get_interest](http://cyrang.cyworld.com/if/get_interest)
- [싸이랑 Best - http://cyrang.cyworld.com/if/get_best](http://cyrang.cyworld.com/if/get_best)
- [공감 Best - http://cyrang.cyworld.com/bestlike](http://cyrang.cyworld.com/bestlike)

## 관심집중
- result
    - set[0]
        - seq : 다음 seq 번호
        - item_count : json item 갯수
        - item[]
            - title : 제목
            - text : 내용
            - url : 해당 컨텐츠 url
            - thumb_url : 썸네일 이미지
            - tocy_info
                - spsvccode : 미니홈피(2), 블로그(8) 구분
                - spwritertid : 미니홈피 유저 number
                - spwriterbid : 블로그 유저 number
                - spitemseq : 글 번호

## 미니홈피, 블로그 게시글 모바일 주소
mMiniHpPhotoViewURL
http://m.minihp.cyworld.nate.com/minihp/photoView.php?hp_id=spwritertid&bo_no=spitemseq&frompage=1&fromvt=thumb
mBlogPostViewURL
http://m.cyworld.nate.com/blog/postView.php?home_id=spwriterbid&post_seq=spitemseq

## TODO
- json을 app.js내에서 처리하도록 변경 필요
- 각각의 user가 접근했을때 seq를 랜덤하게 부여하도록 변경 필요