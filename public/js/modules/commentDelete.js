const commentDelete = () => {
    const updateTime = Date.now();
    const dom = document.getElementsByClassName("chat");
    for (const iterator of dom) {
        if (updateTime - iterator.getAttribute("data-timelimit") >= 0) {
            iterator.remove();
        }
    }
}

export default commentDelete;