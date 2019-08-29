const dragNDrop = {
    dragStart: function () {
        this.className += ' hold';
        setTimeout(() => {
            this.className = 'invisible'
        }, 0);
    },
    dragEnd: function () {
        this.className = 'fill';
    },
    dragOver: function () {
        
    }
}

export default dragNDrop;