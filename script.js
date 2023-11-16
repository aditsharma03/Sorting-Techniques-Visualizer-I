const num = 15;
const array = [];

function init(){
    for( let i=0; i<num; i++ ){
        array[i] = Math.random();
    }
    showBars();
}
init();


function play(){
    const temp = [...array];
    let technique = document.getElementById('technique');
    // const moves = bubbleSort(temp);
    let moves;
    if (technique.value === 'bubble' ){
        moves = bubbleSort(temp);
    }
    else if ( technique.value === 'selection' ){
        moves = selectionSort(temp);
    }
    else if ( technique.value === 'insertion' ){
        moves = insertionSort(temp);
    }
    animate(moves);
    showBars();
}


function animate( moves ){

    if( moves.length == 0 ){
        showBars();
        return;
    }

    const move = moves.shift();
    const [x,y] = move.indices;

    if( move.type === "swap" ){
        [ array[x], array[y]] = [ array[y], array[x]];
    }
    else if( move.type === "allocate" ){
        array[x] = y;
    }
    showBars(move);

    setTimeout( function(){
        animate(moves);
    }, move.type === "swap"? 500: 300 );
}




// ____________________________________________________________________________________

function bubbleSort(array){
    const moves = [];
    for( let i=0; i<num-1; i++ ){
        for( let j=0; j<num-1-i; j++ ){
            moves.push({indices: [j, j+1], type: "comparison"});
            if( array[j] > array[j+1] ){
                moves.push({indices: [j, j+1], type: "swap"});
                [ array[j], array[j+1]] = [ array[j+1], array[j]];
            }
        }
    }
    return moves;
}

function selectionSort(array){
    const moves = [];
    for( let i=0; i<num-1; i++ ){
        let min_pos = i;
        for( let j=i+1; j<num; j++ ){
            moves.push({indices: [j, min_pos], type: "comparison"});
            if( array[j] < array[min_pos] ){
                min_pos = j;
            }
        }
        if( min_pos != i ){
            moves.push({indices: [i, min_pos], type: "swap"});
            [array[i], array[min_pos]] = [array[min_pos], array[i]];
        }
    }
    return moves;
}

function insertionSort(array){
    const moves = [];
    for( let i=1; i<num; i++ ){
        let temp = array[i];
        let j=i-1;
        while( j>=0 && array[j]>temp ){
            moves.push({indices: [j], type: "comparison"});
            array[j+1] = array[j];
            moves.push({indices: [j+1, array[j]], type: "allocate"});
            j--;
        }
        moves.push({indices: [j+1, temp], type: "allocate"});
        array[j+1] = temp;
    }
    return moves;
}









//------------------------------------------------------------------------------------------

function showBars(move){
    container.innerHTML = "";
    for( let i=0; i<num; i++ ){
     const bar = document.createElement("div");
     bar.style.height = array[i]*100 + "%";
     bar.classList.add("bar");

     if( move && move.indices.includes(i) ){
        bar.style.background = (move.type == "swap")?"red": "blue";
     }

     container.appendChild(bar);
 }
}