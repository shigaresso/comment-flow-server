const commentDelete = () => {
    const updateTime = Date.now();
    const dom = document.getElementsByClassName("comment");
    for (const iterator of dom) {
        if (updateTime - iterator.getAttribute("data-timelimit") < 0) {
            return;
        }
        iterator.remove();
    }
}

export default commentDelete;