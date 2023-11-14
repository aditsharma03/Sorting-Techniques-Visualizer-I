const num = 30;
const array = [];

function init(){
    for( let i=0; i<num; i++ ){
        array[i] = Math.random();
    }
    showBars();
}
init();

function showBars(){
    container.innerHTML = "";
    for( let i=0; i<num; i++ ){
     const bar = document.createElement("div");
     bar.style.height = array[i]*100 + "%";
     bar.classList.add("bar");
     container.appendChild(bar);
 }
}

function animate( moves ){
    const [x,y] = moves.shift();
    [ array[x], array[y]] = [ array[y], array[x]];
    showBars();

    setTimeout( function(){
        animate(moves);
    }, 100 );
}

function play(){
    const temp = [...array];
    const moves = bubbleSort(temp);
    animate(moves);
}



function bubbleSort(array){
    const moves = [];
    for( let i=0; i<num-1; i++ ){

        
        for( let j=0; j<num-1-i; j++ ){
            if( array[j] > array[j+1] ){
                moves.push([j,j+1]);
                [ array[j], array[j+1]] = [ array[j+1], array[j]];
            }
        }
    }
    return moves;
}
