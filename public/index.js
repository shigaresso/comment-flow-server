const calcRow = commentMessage => {
    let comment = {
        bornTime: Date.now(),
        flowRow: 0,
        minCollisionWidth: commentMoveWidth,
        width: strWidth(commentMessage),
        flag: false,
    };
    comment.speed = (commentMoveWidth + comment.width)/commentDisplayTime;
    
    for (let i=0; i<row.length; i++) {
        let relativeSpeed = comment.speed - row[i].speed;
        let timeLag = comment.bornTime - row[i].bornTime;
        let rowCommentRightSide = row[i].speed * timeLag - row[i].width
        let collisionWidth = relativeSpeed * (commentDisplayTime - timeLag) - rowCommentRightSide;
        
        // 行にコメントが存在していない時
        if (timeLag >= commentDisplayTime) {
            createComment(commentMessage, comment, row, i);
            break;

        // コメントが行の右側まで出ていて、衝突しない時
        } else if (rowCommentRightSide >= 0 && collisionWidth <= 0) {   
            createComment(commentMessage, comment, row, i);
            break;
        
        } else if (i == row.length - 1) {
            console.log("コメントを流せませんでした");
        }
    }
}

const createComment = (strMessage, comment, row, index) => {
    // 次、この行にコメントが流れる為の条件についての情報
    row[index].bornTime = comment.bornTime;
    row[index].speed = comment.speed;
    row[index].width = comment.width;

    comment.flowRow = index;
    // コメントのDOMの作成時刻を持たせる
    const wrapper = $(`<div data-timelimit=${comment.bornTime+commentDisplayTime}>`);      
    wrapper.attr("class", "chat");
    // CSSを付与
    wrapper.css("top", commentHeight * comment.flowRow);
    // wrapperにID:chatを付加
    wrapper.append(strMessage);
    $('#placeholder').append(wrapper);
}

const commentDelete = () => {
    let updateTime = Date.now()
    // placeholder要素内の全ての子要素に対して以下の操作を行う
    $(placeholder).children().each((index, i) => {
        if(updateTime - $(i).attr("data-timelimit") >= 0) $(i).remove();
    });
    console.log("コメント削除関数を呼び出し完了")
}

/**
 * コメントが画面幅+コメント幅移動するので、コメント幅を調べる為の関数
 * @param {コメントにする文字列} str 
 * @returns コメント幅
 */
const strWidth = str => {
    let e = $("#ruler");
    let width = e.text(str).get(0).offsetWidth;
    e.empty();
    return width;
}