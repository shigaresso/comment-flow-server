const commentDelete = () => {
    const updateTime = Date.now();
    const dom = document.getElementsByClassName("chat");
    for (const iterator of dom) {
        console.log(iterator.getAttribute("data-timelimit"));
        if (updateTime - iterator.getAttribute("data-timelimit") >= 0) {
            iterator.remove();
        }
    }
}

export default commentDelete;